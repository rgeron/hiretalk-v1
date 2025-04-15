"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { createJobOfferAction } from "./job-offer.action";
import type { CreateJobOfferSchemaType } from "./job-offer.schema";
import { CreateJobOfferSchema } from "./job-offer.schema";

const DEFAULT_QUESTIONS = [
  "Tell me about your relevant experience for this position.",
  "Why are you interested in this role?",
  "What are your salary expectations?",
  "When would you be available to start?",
  "Do you have any questions about the position or company?",
];

const INTERVIEW_TYPES = [
  { value: "motivation", label: "Motivation" },
  { value: "technical", label: "Technical" },
  { value: "scenario", label: "Scenario Simulation" },
];

const INTERVIEWER_STYLES = [
  { value: "friendly", label: "Friendly" },
  { value: "formal", label: "Formal" },
  { value: "direct", label: "Direct" },
  { value: "humorous", label: "Humorous" },
];

export function JobOfferForm({ orgSlug }: { orgSlug: string }) {
  const [customQuestions, setCustomQuestions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [selectedDefaultQuestions, setSelectedDefaultQuestions] = useState<
    string[]
  >([]);

  const router = useRouter();

  const form = useZodForm({
    schema: CreateJobOfferSchema,
    defaultValues: {
      name: "",
      description: "",
      durationMin: 5,
      durationMax: 15,
      interviewType: "motivation",
      interviewerStyle: "friendly",
      questions: [],
    },
  });

  const createJobOfferMutation = useMutation({
    mutationFn: async (data: CreateJobOfferSchemaType) => {
      // Combine default and custom questions
      const allQuestions = [...selectedDefaultQuestions, ...customQuestions];

      return resolveActionResult(
        createJobOfferAction({
          ...data,
          questions: allQuestions,
        }),
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Job offer created successfully");
      router.push(`/orgs/${orgSlug}/job-offers`);
    },
  });

  const handleSubmit = (data: CreateJobOfferSchemaType) => {
    createJobOfferMutation.mutate(data);
  };

  const addCustomQuestion = () => {
    if (newQuestion.trim()) {
      setCustomQuestions([...customQuestions, newQuestion.trim()]);
      setNewQuestion("");
    }
  };

  const removeCustomQuestion = (index: number) => {
    setCustomQuestions(customQuestions.filter((_, i) => i !== index));
  };

  const toggleDefaultQuestion = (question: string) => {
    if (selectedDefaultQuestions.includes(question)) {
      setSelectedDefaultQuestions(
        selectedDefaultQuestions.filter((q) => q !== question),
      );
    } else {
      setSelectedDefaultQuestions([...selectedDefaultQuestions, question]);
    }
  };

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <div className="space-y-8">
        {/* Section 1: General Information */}
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">General Information</h2>

          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Frontend Developer" {...field} />
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
                      placeholder="Job description"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section 2: Interview Configuration */}
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Interview Setup</h2>

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="durationMin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Duration (min)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
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
                  <FormLabel>Max Duration (min)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                      {INTERVIEW_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
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
                  <FormLabel>AI Style</FormLabel>
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
                      {INTERVIEWER_STYLES.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section 3: Questions */}
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Interview Questions</h2>

          <div className="space-y-6">
            {/* Standard Questions */}
            <div>
              <h3 className="font-medium">Standard Questions</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                Select common questions
              </p>

              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {DEFAULT_QUESTIONS.map((question, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Checkbox
                      id={`question-${index}`}
                      checked={selectedDefaultQuestions.includes(question)}
                      onCheckedChange={() => toggleDefaultQuestion(question)}
                    />
                    <label
                      htmlFor={`question-${index}`}
                      className="text-sm leading-tight"
                    >
                      {question}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Questions */}
            <div>
              <h3 className="font-medium">Custom Questions</h3>
              <p className="text-muted-foreground mb-2 text-sm">
                Add role-specific questions
              </p>

              {customQuestions.length > 0 && (
                <div className="mb-4 space-y-2">
                  {customQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="flex-1">{question}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeCustomQuestion(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Input
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Add a custom question"
                  />
                </div>
                <Button
                  type="button"
                  onClick={addCustomQuestion}
                  disabled={!newQuestion.trim()}
                  size="sm"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <LoadingButton
            type="submit"
            loading={createJobOfferMutation.isPending}
          >
            Create Job Offer
          </LoadingButton>
        </div>
      </div>
    </Form>
  );
}
