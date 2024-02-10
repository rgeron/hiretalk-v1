import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth/helper";
import { displayName } from "@/lib/format/displayName";
import { SignInButton } from "./SignInButton";
import { UserDropdown } from "./UserDropdown";

export const AuthButton = async () => {
  const user = await auth();

  if (user) {
    return (
      <UserDropdown>
        <Button variant="outline" size="sm">
          <Avatar className="mr-2 size-6 bg-card">
            <AvatarFallback className="bg-card">
              {user.email.slice(0, 1).toUpperCase()}
            </AvatarFallback>
            {user.image && <AvatarImage src={user.image} />}
          </Avatar>
          <span className="max-lg:hidden">{displayName(user)}</span>
        </Button>
      </UserDropdown>
    );
  }

  return <SignInButton />;
};
