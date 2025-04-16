// @ts-check
// TypeScript file for templates functionality
/* eslint-disable */
/* language=typescript */

import { prisma } from "@/lib/prisma";

export async function getOrganizationTemplates(organizationId: string) {
  // Fetch templates for organization
  const templates = await prisma.template.findMany({
    where: {
      organizationId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Get question counts separately to avoid the Prisma error
  const templateIds = templates.map((template) => template.id);

  const questionCounts = await Promise.all(
    templateIds.map(async (templateId) => {
      const count = await prisma.templateQuestion.count({
        where: { templateId },
      });
      return { templateId, count };
    }),
  );

  // Map the counts to the templates
  const templatesWithCounts = templates.map((template) => {
    const questionCount =
      questionCounts.find((qc) => qc.templateId === template.id)?.count || 0;
    return {
      ...template,
      questionsCount: questionCount,
    };
  });

  return templatesWithCounts;
}
