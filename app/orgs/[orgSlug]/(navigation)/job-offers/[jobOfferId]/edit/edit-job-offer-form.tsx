"use client";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/features/form/submit-button";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { updateJobOfferAction } from "./edit-job-offer.action";
import {
  UpdateJobOfferSchema,
  UpdateJobOfferSchemaType,
} from "./edit-job-offer.schema";

type Question = {
  text: string;
  order?: number;
};

type JobOfferData = {
  id: string;
  name: string;
  description: string;
  interviewType: string;
  durationMin: number;
  durationMax: number;
  interviewerStyle: string;
  status: string;
  questions: any;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
  applicationCount?: number;
};

type EditJobOfferFormProps = {
  jobOffer: JobOfferData;
  orgSlug: string;
};

export function EditJobOfferForm({ jobOffer, orgSlug }: EditJobOfferFormProps) {
  const router = useRouter();

  // Parse questions from jobOffer
  const parseQuestions = (): string[] => {
    const questions: string[] = [];
    if (jobOffer.questions) {
      if (Array.isArray(jobOffer.questions)) {
        jobOffer.questions.forEach((q) => {
          if (typeof q === "string") {
            questions.push(q);
          } else if (q && typeof q === "object" && "text" in q) {
            questions.push(q.text);
          }
        });
      } else if (typeof jobOffer.questions === "object") {
        Object.values(jobOffer.questions).forEach((q) => {
          if (typeof q === "string") {
            questions.push(q);
          } else if (q && typeof q === "object" && "text" in q) {
            questions.push(q.text);
          }
        });
      }
    }
    return questions;
  };

  const [questions, setQuestions] = useState<string[]>(parseQuestions());

  const form = useZodForm({
    schema: UpdateJobOfferSchema,
    defaultValues: {
      jobOfferId: jobOffer.id,
      name: jobOffer.name,
      description: jobOffer.description,
      interviewType: jobOffer.interviewType,
      durationMin: jobOffer.durationMin,
      durationMax: jobOffer.durationMax,
      interviewerStyle: jobOffer.interviewerStyle,
      questions: parseQuestions(),
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (values: UpdateJobOfferSchemaType) => {
      return resolveActionResult(updateJobOfferAction(values));
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Job offer updated successfully");
      router.push(`/orgs/${orgSlug}/job-offers/${jobOffer.id}`);
      router.refresh();
    },
  });

  const onSubmit = (values: UpdateJobOfferSchemaType) => {
    // Update the questions array with the current state
    values.questions = questions;
    updateMutation.mutate(values);
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
    form.setValue("questions", [...questions, ""]);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
    form.setValue("questions", newQuestions);
  };

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
    form.setValue("questions", newQuestions);
  };

  const interviewTypes = ["motivation", "technical", "scenario"];
  const interviewerStyles = ["friendly", "formal", "direct", "humorous"];

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="space-y-6">
        {/* Basic information card */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter job title" />
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
                      placeholder="Enter job description"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Interview settings card */}
        <Card>
          <CardHeader>
            <CardTitle>Interview Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="interviewType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {interviewTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interviewerStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interviewer Style</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {interviewerStyles.map((style) => (
                          <SelectItem key={style} value={style}>
                            {style.charAt(0).toUpperCase() + style.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="durationMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={1} placeholder="5" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="durationMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={1}
                        placeholder="15"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Questions card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Interview Questions</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addQuestion}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.length === 0 ? (
                <div className="text-muted-foreground rounded-md border p-4 text-center">
                  No questions added yet. Click "Add Question" to begin.
                </div>
              ) : (
                questions.map((question, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 rounded-md border p-3"
                  >
                    <div className="flex-grow">
                      <Input
                        value={question}
                        onChange={(e) => updateQuestion(index, e.target.value)}
                        placeholder="Enter interview question"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeQuestion(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit button */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.push(`/orgs/${orgSlug}/job-offers/${jobOffer.id}`)
            }
          >
            Cancel
          </Button>
          <LoadingButton loading={updateMutation.isPending}>
            Save Changes
          </LoadingButton>
        </div>
      </div>
    </Form>
  );
}
