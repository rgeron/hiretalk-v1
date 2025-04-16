"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { applyToJob } from "./actions";
import { RealtimeVoiceChat } from "./realtime-voice-chat";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function InterviewForm({ jobOfferId }: { jobOfferId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [interviewData, setInterviewData] = useState<{
    threadId: string;
    candidateName: string;
    jobInfo: {
      jobTitle: string;
      companyName: string;
      jobDescription: string;
      durationMin: number;
      durationMax: number;
    };
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    try {
      const result = await applyToJob({
        jobOfferId,
        candidateName: values.name,
        candidateEmail: values.email,
      });

      if (result.success && result.interviewData) {
        toast.success(result.message);

        setInterviewData({
          threadId: result.interviewData.threadId,
          candidateName: values.name,
          jobInfo: {
            jobTitle: result.interviewData.jobTitle ?? "Position",
            companyName: result.interviewData.companyName ?? "Company",
            jobDescription: result.interviewData.jobDescription ?? "",
            durationMin: result.interviewData.durationMin ?? 5,
            durationMax: result.interviewData.durationMax ?? 20,
          },
        });
      } else {
        toast.error(
          result.error ?? "Failed to submit application. Please try again.",
        );
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (interviewData) {
    return (
      <div className="space-y-6">
        <div className="bg-muted/20 rounded-lg p-4 text-center">
          <h3 className="mb-2 text-lg font-semibold">
            Your Voice Interview Is Ready
          </h3>
          <p className="text-muted-foreground">
            You'll now have a real-time voice conversation with our AI
            interviewer. Make sure your microphone is enabled in your browser.
          </p>
        </div>

        <RealtimeVoiceChat
          threadId={interviewData.threadId}
          candidateName={interviewData.candidateName}
          jobInfo={interviewData.jobInfo}
        />
      </div>
    );
  }

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your full name" {...field} />
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
              <Input
                type="email"
                placeholder="your.email@example.com"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Starting Interview..." : "Start Voice Interview"}
      </Button>
    </Form>
  );
}
