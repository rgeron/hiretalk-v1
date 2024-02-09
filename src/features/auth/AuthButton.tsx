import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth/auth";
import { LoginButton } from "./LoginButton";
import { UserDropdown } from "./UserDropdown";

export const AuthButton = async () => {
  const session = await auth();

  if (session?.user) {
    return (
      <UserDropdown>
        <Button variant="outline" size="sm">
          <Avatar className="mr-2 size-6">
            <AvatarFallback>
              {session.user.email ? session.user.email.slice(0, 2) : "??"}
            </AvatarFallback>
            {session.user.image && <AvatarImage src={session.user.image} />}
          </Avatar>
          <span className="max-lg:hidden">{session.user.name}</span>
        </Button>
      </UserDropdown>
    );
  }

  return <LoginButton />;
};
