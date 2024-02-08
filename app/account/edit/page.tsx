import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requiredAuth } from "@/lib/auth/helper";
import prisma from "@/lib/prisma";
import { EditPasswordForm } from "./EditPasswordForm";
import { EditProfileForm } from "./EditProfileForm";

export default async function EditProfilePage() {
  const user = await requiredAuth();
  const hasPassword = await prisma.user.findFirst({
    where: {
      id: user.id,
      passwordHash: {
        not: null,
      },
    },
    select: {
      id: true,
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit your profile</CardTitle>
      </CardHeader>
      <CardContent>
        <EditProfileForm defaultValues={user} />
        {Boolean(hasPassword) && (
          <>
            <div className="h-16" />
            <EditPasswordForm />
          </>
        )}
      </CardContent>
    </Card>
  );
}
