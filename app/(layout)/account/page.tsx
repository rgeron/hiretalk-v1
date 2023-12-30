import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requiredAuth } from "@/lib/auth";
import { displayName } from "@/lib/format/displayName";
import { Mail, Pen } from "lucide-react";
import Link from "next/link";

export default async function page() {
  const session = await requiredAuth();
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>{session.user.email.slice(0, 2)}</AvatarFallback>
            {session.user.image ? (
              <AvatarImage src={session.user.image} />
            ) : null}
          </Avatar>

          <CardTitle>{displayName(session.user)}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 divide-y">
        <p className="flex items-center gap-2">
          <Mail size={16} /> {session.user.email}
        </p>
        <p className="flex items-center gap-2 pt-2">
          <Pen size={16} /> {session.user.name}
        </p>
      </CardContent>
      <CardFooter>
        <Link
          href="/account/edit"
          className={buttonVariants({ variant: "link" })}
        >
          Edit profile
        </Link>
      </CardFooter>
    </Card>
  );
}
