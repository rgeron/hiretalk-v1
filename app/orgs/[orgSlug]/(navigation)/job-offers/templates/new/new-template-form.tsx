"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { Textarea } from "@/components/ui/textarea";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { createTemplateAction } from "./template-create.action";

type NewTemplateFormProps = {
  orgSlug: string;
};

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable(),
});

export function NewTemplateForm({ orgSlug }: NewTemplateFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useZodForm({
    schema: formSchema,
    defaultValues: {
      name: "",
      description: null,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return resolveActionResult(
        createTemplateAction({
          name: values.name,
          description: values.description,
        }),
      );
    },
    onError: (error) => {
      setIsSubmitting(false);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success("Template created successfully");
      router.push(`/orgs/${orgSlug}/job-offers/templates/${data.id}`);
      router.refresh();
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    createMutation.mutate(values);
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Template Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Template name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                    placeholder="Enter a description for this template"
                    className="min-h-24 resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Template"
            )}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
