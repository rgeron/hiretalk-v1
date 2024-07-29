import { getServerUrl } from "@/lib/server-url";
import { SiteConfig } from "@/site-config";
import { Link, Preview, Section, Text } from "@react-email/components";
import { EmailLayout } from "./utils/EmailLayout";

export default function OrganizationInvitationEmail({
  token,
  organizationId,
  organizationName,
}: {
  token: string;
  organizationId: string;
  organizationName: string;
}) {
  const url = `${getServerUrl()}/organizations/${organizationId}/invitations/${token}`;
  return (
    <EmailLayout>
      <Preview>You are invited to join {organizationName}</Preview>
      <Section className="my-6">
        <Text className="text-lg leading-6">
          {organizationName} has invited you to join their organization.
        </Text>
        <Text>If you didn't request this, please ignore this email.</Text>
        <Text className="text-lg leading-6">
          <Link className="text-sky-500 hover:underline" href={url}>
            👉 Click here to accept the invitation 👈
          </Link>
        </Text>
        <Text className="text-lg leading-6">
          If you don't have an account, you will need to create one.
        </Text>
      </Section>
      <Text className="text-lg leading-6">
        Best,
        <br />- {SiteConfig.maker.name} from {SiteConfig.title}
      </Text>
    </EmailLayout>
  );
}
