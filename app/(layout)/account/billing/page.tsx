import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { requiredFullAuth } from "@/lib/auth";
import { getServerUrl } from "@/lib/server-url";
import { stripe } from "@/lib/stripe";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function DeleteProfilePage() {
  const user = await requiredFullAuth();

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId ?? "",
    return_url: `${getServerUrl()}/account/billing`,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing information</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Typography>
          Plan : <Typography variant="code">{user.plan}</Typography>
        </Typography>
        <Link
          className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
          href={stripeSession.url}
        >
          Update billing informations
        </Link>
      </CardContent>
    </Card>
  );
}
