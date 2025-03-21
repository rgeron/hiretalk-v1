"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/features/form/submit-button";
import { authClient } from "@/lib/auth-client";
import { logger } from "@/lib/logger";
import { unwrapSafePromise } from "@/lib/promises";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

const CANCEL_REASONS = {
  too_expensive: "Too expensive",
  not_using: "Not using the product enough",
  missing_features: "Missing features",
  bugs: "Too many bugs/issues",
  competitor: "Switching to a competitor",
  other: "Other",
} as const;

const CancelSchema = z.object({
  reasonType: z.enum([
    "too_expensive",
    "not_using",
    "missing_features",
    "bugs",
    "competitor",
    "other",
  ] as const),
  details: z
    .string()
    .min(10, "Please provide more details (minimum 10 characters)"),
});

export function CancelSubscriptionForm({
  orgId,
  orgSlug,
}: {
  orgId: string;
  orgSlug: string;
}) {
  const router = useRouter();
  const form = useZodForm({
    schema: CancelSchema,
    defaultValues: {
      details: "",
    },
  });

  const cancelSubscriptionMutation = useMutation({
    mutationFn: async (data: z.infer<typeof CancelSchema>) => {
      logger.info("Cancelling subscription", {
        orgId,
        orgSlug,
        data,
      });
      return unwrapSafePromise(
        authClient.subscription.cancel({
          referenceId: orgId,
          returnUrl: `/orgs/${orgSlug}/settings/billing`,
        }),
      );
    },
    onSuccess: () => {
      toast.success(
        "You will be redirected to the billing page where you can cancel your subscription.",
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cancel Subscription</CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          form={form}
          onSubmit={async (data) => {
            cancelSubscriptionMutation.mutate(data);
          }}
        >
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="reasonType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>What's your main reason for cancelling?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-2"
                    >
                      {Object.entries(CANCEL_REASONS).map(([value, label]) => (
                        <FormItem
                          key={value}
                          className="flex items-center space-y-0 space-x-3"
                        >
                          <FormControl>
                            <RadioGroupItem value={value} />
                          </FormControl>
                          <FormLabel className="cursor-pointer font-normal">
                            {label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide more details to help us improve..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <LoadingButton
                type="submit"
                variant="destructive"
                loading={cancelSubscriptionMutation.isPending}
              >
                Confirm Cancellation
              </LoadingButton>
              <LoadingButton
                type="button"
                variant="outline"
                onClick={() => router.push(`/orgs/${orgSlug}/settings/billing`)}
              >
                Go Back
              </LoadingButton>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
