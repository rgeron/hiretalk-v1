import { auth } from '@/lib/auth';
import { LoggedInButton } from './AuthentificatedButton';
import { LoginButton } from './LoginButton';

export const AuthButton = async () => {
  const session = await auth();

  if (session?.user) {
    return <LoggedInButton user={session?.user} />;
  }

  return <LoginButton />;
};
