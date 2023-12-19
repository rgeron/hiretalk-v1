import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { requiredAuth } from '@/lib/auth';
import { EditProfileForm } from './EditProfileForm';

export default async function DeleteProfilePage() {
  const session = await requiredAuth();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit your profile</CardTitle>
      </CardHeader>
      <CardContent>
        <EditProfileForm defaultValues={session.user} />
      </CardContent>
    </Card>
  );
}
