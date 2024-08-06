"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { sendEmail } from "@/lib/mail/sendEmail";
import { prisma } from "@/lib/prisma";
import { getOrgsMembers } from "@/query/org/get-orgs-members";
import OrganizationInvitationEmail from "@email/OrganizationInvitationEmail.email";
import { nanoid } from "nanoid";
import { z } from "zod";
import {
  OrgDangerFormSchema,
  OrgDetailsFormSchema,
  OrgMemberFormSchema,
} from "./org.schema";

export const updateOrganizationMemberAction = orgAction
  .metadata({
    roles: ["OWNER"],
  })
  .schema(OrgMemberFormSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    const members = input.members.filter((member) => member.id !== ctx.user.id);

    const deletedMembers = prisma.organizationMembership.deleteMany({
      where: {
        organizationId: ctx.org.id,
        id: {
          notIn: members.map((m) => m.id),
        },
        role: {
          notIn: ["OWNER"],
        },
      },
    });

    const updatedMembers = members.map((member) => {
      return prisma.organizationMembership.update({
        where: {
          organizationId: ctx.org.id,
          id: member.id,
        },
        data: {
          role: member.role,
        },
      });
    });

    await prisma.$transaction([deletedMembers, ...updatedMembers]);

    return { members: await getOrgsMembers(ctx.org.id) };
  });

export const updateOrganizationDetailsAction = orgAction
  .schema(z.union([OrgDetailsFormSchema, OrgDangerFormSchema]))
  .metadata({
    roles: ["OWNER"],
  })
  .action(async ({ parsedInput, ctx }) => {
    const updatedOrganization = await prisma.organization.update({
      where: {
        id: ctx.org.id,
      },
      data: parsedInput,
    });

    return updatedOrganization;
  });

export const inviteUserInOrganizationAction = orgAction
  .metadata({
    roles: ["OWNER", "ADMIN"],
  })
  .schema(
    z.object({
      email: z.string().email(),
    }),
  )
  .action(async ({ parsedInput: { email }, ctx }) => {
    const verificationToken = await prisma.verificationToken.create({
      data: {
        identifier: `${email}-invite-${ctx.org.id}`,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        token: nanoid(32),
        data: {
          orgId: ctx.org.id,
          email,
        },
      },
    });

    await sendEmail({
      to: email,
      subject: `Invitation to join ${ctx.org.name}`,
      react: OrganizationInvitationEmail({
        token: verificationToken.token,
        orgId: ctx.org.id,
        organizationName: ctx.org.name,
      }),
    });

    return { identifier: verificationToken.identifier };
  });
