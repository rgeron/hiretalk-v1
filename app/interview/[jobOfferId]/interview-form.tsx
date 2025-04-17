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
import { FileIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { applyToJob } from "./actions";
import { RealtimeVoiceChat } from "./realtime-voice-chat";

// Import the correctly generated UploadDropzone
import { UploadDropzone } from "@/utils/uploadthing";

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
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
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
        cvUrl: cvUrl ?? undefined,
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

      <div className="space-y-2">
        <FormLabel htmlFor="cv">Resume/CV (PDF)</FormLabel>

        {cvUrl ? (
          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileIcon className="text-primary h-5 w-5" />
                <span className="text-sm font-medium">
                  CV Uploaded Successfully
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCvUrl(null);
                  setUploadError(null);
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        ) : isUploading ? (
          <div className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed p-4">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
            <p className="text-muted-foreground mt-2 text-sm">
              Uploading CV...
            </p>
          </div>
        ) : (
          <div className="rounded-md border border-dashed">
            <UploadDropzone
              endpoint="resumeUploader"
              onBeforeUploadBegin={(files) => {
                // Check file size manually as a backup to server validation
                const file = files[0];
                if (file.size > 8 * 1024 * 1024) {
                  toast.error("File too large", {
                    description: "Maximum file size is 8MB",
                  });
                  throw new Error("File too large");
                }

                // Verify it's a PDF
                if (file.type !== "application/pdf") {
                  toast.error("Invalid file type", {
                    description: "Only PDF files are accepted",
                  });
                  throw new Error("Invalid file type");
                }

                setIsUploading(true);
                setUploadError(null);
                return files;
              }}
              onClientUploadComplete={(res) => {
                setIsUploading(false);
                if (res.length > 0 && res[0].url) {
                  setCvUrl(res[0].url);
                  toast.success("CV uploaded successfully");
                } else {
                  setUploadError("Upload completed but no URL was returned");
                  toast.error("Error getting file URL");
                }
              }}
              onUploadError={(error) => {
                setIsUploading(false);
                setUploadError(error.message);
                toast.error(`Error uploading CV: ${error.message}`);
              }}
              className="ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300"
            />
          </div>
        )}

        {uploadError && (
          <p className="text-xs text-red-500">
            Error: {uploadError}. Please try again.
          </p>
        )}

        <p className="text-muted-foreground text-xs">
          Upload your resume to help our AI interviewer better understand your
          background. Accepted format: PDF (max 8MB).
        </p>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || isUploading}
      >
        {isSubmitting ? "Starting Interview..." : "Start Voice Interview"}
      </Button>
    </Form>
  );
}
