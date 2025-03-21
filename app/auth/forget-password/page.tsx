"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/features/form/submit-button";
import { authClient } from "@/lib/auth-client";
import { unwrapSafePromise } from "@/lib/promises";
import { useMutation } from "@tanstack/react-query";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

const EmailFormSchema = z.object({
  email: z.string().email(),
});

export default function ForgetPasswordPage() {
  const router = useRouter();

  const emailForm = useZodForm({
    schema: EmailFormSchema,
  });

  const forgetPasswordMutation = useMutation({
    mutationFn: async (values: { email: string }) => {
      return unwrapSafePromise(
        authClient.forgetPassword({
          email: values.email,
          redirectTo: "/auth/reset-password",
        }),
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      router.push("/auth/verify");
    },
  });

  function onSubmitEmail(values: z.infer<typeof EmailFormSchema>) {
    forgetPasswordMutation.mutate(values);
  }

  return (
    <Card className="mx-auto w-full max-w-md lg:max-w-lg lg:p-6">
      <CardHeader>
        <div className="flex justify-center">
          <Avatar className="size-16">
            <AvatarFallback>
              <Lock />
            </AvatarFallback>
          </Avatar>
        </div>
        <CardHeader className="text-center">Forget password</CardHeader>

        <CardDescription className="text-center">
          Enter your email to reset your password
        </CardDescription>
      </CardHeader>

      <CardContent className="border-t pt-6">
        <Form form={emailForm} onSubmit={onSubmitEmail} className="space-y-4">
          <FormField
            control={emailForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            loading={forgetPasswordMutation.isPending}
            type="submit"
            className="w-full"
          >
            Send Reset Link
          </LoadingButton>
        </Form>
      </CardContent>
    </Card>
  );
}
