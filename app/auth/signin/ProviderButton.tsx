import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Github, Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

type ProviderButtonProps = {
  providerId: string;
};

// ℹ️ Update this object with the providers you want to support
const ProviderData: Record<string, { icon: ReactNode; name: string }> = {
  github: {
    icon: <Github size={16} />,
    name: "Github",
  },
};

export const ProviderButton = (props: ProviderButtonProps) => {
  const searchParams = useSearchParams();

  const githubSignInMutation = useMutation({
    mutationFn: () =>
      signIn(props.providerId, {
        callbackUrl: searchParams?.get("callbackUrl") ?? undefined,
      }),
  });

  const data = ProviderData[props.providerId];

  return (
    <Button
      className="border-gray-500 bg-black text-white hover:bg-gray-950"
      size="lg"
      onClick={() => {
        githubSignInMutation.mutate();
      }}
    >
      {githubSignInMutation.isPending ? <Loader size={16} /> : data.icon}
      <span className="ml-2 text-base">Sign in with {data.name}</span>
    </Button>
  );
};
