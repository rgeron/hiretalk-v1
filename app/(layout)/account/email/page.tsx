import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requiredAuth } from "@/lib/auth/helper";
import prisma from "@/lib/prisma";
import { ToggleEmailCheckbox } from "./ToggleEmailCheckbox";

export default async function MailProfilePage() {
  const session = await requiredAuth();
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: { unsubscribed: true },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mail settings</CardTitle>
        <CardDescription>
          Update your email notifications settings to match your preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ToggleEmailCheckbox unsubscribed={user.unsubscribed} />
      </CardContent>
    </Card>
  );
}
