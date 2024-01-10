"use client";

import { Divider } from "@/components/ui/divider";
import { Loader } from "@/components/ui/loader";
import { Typography } from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";
import { MagicLinkForm } from "./MagicLinkForm";
import { ProviderButton } from "./ProviderButton";

export const SignInProviders = () => {
  const { data: providers } = useQuery({
    queryFn: () => fetch(`/api/auth/providers`).then((res) => res.json()),
    queryKey: ["providers"],
  });

  if (!providers) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-4">
      {providers.email ? (
        <>
          <Typography variant="large">Use your email</Typography>
          <MagicLinkForm />
          <Divider>or</Divider>
          <Typography variant="large">Use a provider</Typography>
        </>
      ) : null}

      <div className="flex flex-col gap-2">
        {/* ℹ️ Add provider you want to support here */}
        {providers.github ? <ProviderButton providerId="github" /> : null}
      </div>
    </div>
  );
};
