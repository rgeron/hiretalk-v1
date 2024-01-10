import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { LoggedInButton } from "./AuthentificatedButton";
import { LoginButton } from "./LoginButton";

export const AuthButton = async () => {
  const session = await auth();

  if (session?.user) {
    return (
      <LoggedInButton>
        <Button variant="outline" size="sm">
          <Avatar className="mr-2 h-6 w-6">
            <AvatarFallback>
              {session.user.email ? session.user.email.slice(0, 2) : "??"}
            </AvatarFallback>
            {session.user.image && <AvatarImage src={session.user.image} />}
          </Avatar>
          <span className="max-lg:hidden">{session.user.name}</span>
        </Button>
      </LoggedInButton>
    );
  }

  return <LoginButton />;
};
