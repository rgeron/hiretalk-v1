"use client";

import { LoadingButton } from "@/components/form/SubmitButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle } from "lucide-react";
import { addEmailAction } from "./email.action";
import type { EmailActionSchemaType } from "./email.schema";
import { EmailActionSchema } from "./email.schema";

export type EmailFormProps = {
  submitButtonLabel?: string;
  successMessage?: string;
};

export const EmailForm = ({
  submitButtonLabel = "Subscribe",
  successMessage = "You have subscribed to our newsletter.",
}: EmailFormProps) => {
  const form = useZodForm({
    schema: EmailActionSchema,
  });

  const submit = useMutation({
    mutationFn: async ({ email }: EmailActionSchemaType) => {
      const { serverError, data } = await addEmailAction({ email });

      if (data) {
        return data;
      } else {
        throw new Error(serverError);
      }
    },
  });

  return (
    <AnimatePresence mode="wait">
      {submit.isSuccess ? (
        <motion.div
          key="success"
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: "auto",
            opacity: 1,
          }}
        >
          <Alert variant="success">
            <CheckCircle size={20} />
            <AlertTitle>{successMessage}</AlertTitle>
          </Alert>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          animate={{
            height: "auto",
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
        >
          <Form
            form={form}
            onSubmit={async (v) => submit.mutate(v)}
            className="flex flex-col gap-4"
            disabled={submit.isPending}
          >
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
            <LoadingButton loading={submit.isPending}>
              {submitButtonLabel}
            </LoadingButton>
            {submit.isError && (
              <Alert variant="destructive">
                <AlertCircle size={20} />
                <AlertTitle>{submit.error?.message}</AlertTitle>
                <AlertDescription>
                  Try another email address or contact us.
                </AlertDescription>
              </Alert>
            )}
          </Form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
