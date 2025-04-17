"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
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
import { cn } from "@/lib/utils";
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
  const [uploadAttempts, setUploadAttempts] = useState(0);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: number;
  } | null>(null);
  const uploadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  // Handle upload timeouts
  const handleUploadTimeout = () => {
    if (isUploading) {
      setIsUploading(false);
      setUploadError("Upload timed out. Please try again.");
      toast.error("Upload timed out", {
        description: "The server took too long to respond. Please try again.",
      });
    }
  };

  // Reset upload state for retry
  const resetUpload = () => {
    setCvUrl(null);
    setUploadError(null);
    setIsUploading(false);
    if (uploadingTimeoutRef.current) {
      clearTimeout(uploadingTimeoutRef.current);
    }
  };

  // Format file size to human readable format
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} bytes`;
    else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    else return `${(bytes / 1048576).toFixed(1)} MB`;
  };

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
                  {selectedFile
                    ? selectedFile.name
                    : "CV Uploaded Successfully"}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetUpload}
              >
                Remove
              </Button>
            </div>
          </div>
        ) : isUploading ? (
          <div className="flex h-32 flex-col items-center justify-center rounded-md border-8 p-4">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
            <p className="text-muted-foreground mt-2 text-sm">
              Uploading {selectedFile?.name} (
              {formatFileSize(selectedFile?.size ?? 0)})...
            </p>
            <div className="mt-2 h-2.5 w-full max-w-xs rounded-full bg-gray-200">
              <div className="bg-primary h-2.5 w-full animate-pulse rounded-full"></div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={() => {
                if (uploadingTimeoutRef.current) {
                  clearTimeout(uploadingTimeoutRef.current);
                }
                setIsUploading(false);
                setUploadError("Upload cancelled");
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              "border-amber-200",
              uploadError
                ? "border-red-300"
                : "hover:border-primary/50 border-gray-200",
              "rounded-md",
            )}
          >
            <UploadDropzone
              endpoint="resumeUploader"
              onBeforeUploadBegin={(files) => {
                try {
                  // Reset errors
                  setUploadError(null);

                  if (files.length === 0) {
                    throw new Error("No file selected");
                  }

                  // Check file size manually as a backup to server validation
                  const file = files[0];
                  console.log("Processing file:", {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                  });
                  setSelectedFile({ name: file.name, size: file.size });

                  if (file.size > 8 * 1024 * 1024) {
                    toast.error("File too large", {
                      description: "Maximum file size is 8MB",
                    });
                    throw new Error("File too large (max 8MB)");
                  }

                  // Verify it's a PDF
                  if (file.type !== "application/pdf") {
                    toast.error("Invalid file type", {
                      description: "Only PDF files are accepted",
                    });
                    throw new Error("Invalid file type (only PDF accepted)");
                  }

                  setIsUploading(true);
                  setUploadAttempts((prev) => prev + 1);

                  // Set a shorter timeout for small files (10 seconds)
                  if (uploadingTimeoutRef.current) {
                    clearTimeout(uploadingTimeoutRef.current);
                  }
                  // Calculate timeout based on file size:
                  // Base 10s + 1s per 100KB up to 2 minutes max
                  const baseTimeout = 10000; // 10 seconds base
                  const sizeTimeout = Math.min(file.size / 100000, 110) * 1000; // 1s per 100KB up to 110s
                  const timeoutPeriod = Math.min(
                    baseTimeout + sizeTimeout,
                    120000,
                  ); // Max 2 minutes

                  uploadingTimeoutRef.current = setTimeout(
                    handleUploadTimeout,
                    timeoutPeriod,
                  );

                  // Toast notification when upload starts
                  toast.info(`Uploading ${file.name}`, {
                    description: `Size: ${formatFileSize(file.size)}`,
                  });

                  return files;
                } catch (error) {
                  if (error instanceof Error) {
                    setUploadError(error.message);
                  } else {
                    setUploadError("Unknown error occurred");
                  }
                  throw error;
                }
              }}
              onClientUploadComplete={(res) => {
                if (uploadingTimeoutRef.current) {
                  clearTimeout(uploadingTimeoutRef.current);
                  uploadingTimeoutRef.current = null;
                }

                setIsUploading(false);
                if (res.length > 0 && res[0].ufsUrl) {
                  setCvUrl(res[0].ufsUrl);
                  toast.success(`${selectedFile?.name} uploaded successfully`, {
                    description: `Size: ${formatFileSize(selectedFile?.size ?? 0)}`,
                  });
                } else if (res.length > 0 && res[0].url) {
                  // Fallback to url for compatibility
                  setCvUrl(res[0].url);
                  toast.success(`${selectedFile?.name} uploaded successfully`, {
                    description: `Size: ${formatFileSize(selectedFile?.size ?? 0)}`,
                  });
                } else {
                  console.error("Upload response:", res);
                  setUploadError("Upload completed but no URL was returned");
                  toast.error("Error getting file URL", {
                    description:
                      "Please try again or contact support if the problem persists.",
                  });
                }
              }}
              onUploadError={(error) => {
                console.error("Upload error:", error);

                if (uploadingTimeoutRef.current) {
                  clearTimeout(uploadingTimeoutRef.current);
                  uploadingTimeoutRef.current = null;
                }

                setIsUploading(false);
                const errorMessage = error.message || "Unknown upload error";
                setUploadError(errorMessage);
                toast.error(`Error uploading CV`, {
                  description: errorMessage,
                });
              }}
              className="ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300 ut-button:bg-primary ut-button:hover:bg-primary/90 w-full"
              config={{ mode: "auto" }}
              content={{
                allowedContent({ ready, isUploading }) {
                  if (isUploading) return "Uploading...";
                  if (ready) return "Release to upload";
                  return "PDF files only, up to 8MB";
                },
              }}
            />
          </div>
        )}

        {uploadError && (
          <div className="flex flex-col gap-1 rounded-md bg-red-50 p-2 text-sm text-red-500">
            <p className="font-semibold">Error: {uploadError}</p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={resetUpload}
                className="h-7 text-xs"
              >
                Try Again
              </Button>
              {uploadAttempts >= 2 && (
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => {
                    toast.info("Proceeding without CV", {
                      description:
                        "You can continue without uploading a CV if you're having technical issues.",
                    });
                  }}
                >
                  Continue Without CV
                </Button>
              )}
            </div>
          </div>
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
