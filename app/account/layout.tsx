import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { auth } from "@/lib/auth/helper";
import type { LayoutParams } from "@/types/next";
import { AccountNavigation } from "./AccountNavigation";
import { VerifyEmailButton } from "./verify-email/VerifyEmailButton";

export default async function RouteLayout(props: LayoutParams<{}>) {
  const user = await auth();

  const isEmailNotVerified = user?.email && !user.emailVerified;

  return (
    <>
      <AccountNavigation>
        <>
          {isEmailNotVerified ? (
            <Alert className="mb-4">
              <AlertTitle>Email not verified</AlertTitle>
              <AlertDescription>
                Please verify your email to access your account.
              </AlertDescription>
              <VerifyEmailButton />
            </Alert>
          ) : null}
          {props.children}
        </>
      </AccountNavigation>
    </>
  );
}
