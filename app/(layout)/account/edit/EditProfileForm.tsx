"use client";

import { SubmitButton } from "@/components/form/SubmitButton";
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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateProfileAction } from "./edit-profile.action";
import type { ProfileFormType } from "./edit-profile.schema";
import { ProfileFormSchema } from "./edit-profile.schema";

type SchoolFormProps = {
  defaultValues: ProfileFormType;
};

export const EditProfileForm = ({ defaultValues }: SchoolFormProps) => {
  const form = useZodForm({
    schema: ProfileFormSchema,
    defaultValues: defaultValues ?? {},
  });
  const router = useRouter();

  const onSubmit = async (values: ProfileFormType) => {
    const { data, serverError } = await updateProfileAction(values);

    if (values.email !== defaultValues.email) {
      await signIn("email", { email: values.email });
      toast.success(
        "You have updated your email. We have sent you a new email verification link."
      );
      router.push("/");
      return;
    }

    if (!data) {
      toast.error(serverError);
      return;
    }

    router.push(`/account`);
  };

  return (
    <Form
      form={form}
      onSubmit={async (v) => onSubmit(v)}
      className="flex flex-col gap-4"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} value={field.value ?? ""} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <SubmitButton>Save</SubmitButton>
    </Form>
  );
};
