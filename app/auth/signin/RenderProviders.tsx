'use client';

import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { Typography } from '@/components/ui/typography';
import { getServerUrl } from '@/lib/server-url';
import { useMutation } from '@tanstack/react-query';
import { Github } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';

export type RenderProvidersProps = {
  providers: Record<string, unknown>;
};

export const RenderProviders = ({ providers }: RenderProvidersProps) => {
  const searchParams = useSearchParams();
  const githubSignInMutation = useMutation({
    mutationFn: () =>
      signIn('github', {
        callbackUrl: searchParams?.get('callbackUrl') ?? undefined,
      }),
  });

  console.log({ providers });

  return (
    <div className="flex flex-col gap-4">
      {providers.email ? (
        <>
          <Typography variant="large">Use your email</Typography>
          <EmailForm />
          <Divider>or</Divider>
          <Typography variant="large">Use a provider</Typography>
        </>
      ) : null}

      <div className="flex flex-col gap-2">
        {providers.github ? (
          <Button
            className="bg-black border-gray-500 text-white hover:bg-gray-950"
            size="lg"
            onClick={() => {
              githubSignInMutation.mutate();
            }}
          >
            {githubSignInMutation.isPending ? (
              <Loader size={24} className="mr-2" />
            ) : (
              <Github size={24} className="mr-2" />
            )}
            <span className="text-lg">Sign in with Github</span>
          </Button>
        ) : null}
      </div>
    </div>
  );
};

const FormSchema = z.object({
  email: z.string(),
});

const EmailForm = () => {
  const form = useZodForm({
    schema: FormSchema,
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const emailSignInMutation = useMutation({
    mutationFn: async (email: string) => {
      await signIn('email', {
        callbackUrl: searchParams?.get('callbackUrl') ?? `${getServerUrl()}/`,
        redirect: true,
        email,
      });
    },
  });

  return (
    <>
      <Form
        form={form}
        onSubmit={async (values) => {
          await emailSignInMutation.mutateAsync(values.email);
        }}
        className="flex items-center gap-2 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl className="w-full">
                <Input className="w-full" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm">
          Sign in
        </Button>
      </Form>
    </>
  );
};
