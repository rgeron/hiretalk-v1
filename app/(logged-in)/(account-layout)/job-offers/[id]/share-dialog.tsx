"use client";

import { Copy, Link2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type JobOffer = {
  id: string;
  name: string;
};

export function ShareInterviewDialog({ jobOffer }: { jobOffer: JobOffer }) {
  const [open, setOpen] = useState(false);

  // Generate the interview link
  const interviewLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/interview/${jobOffer.id}`
      : `/interview/${jobOffer.id}`;

  // Email template
  const emailSubject = `Complete your interview for ${jobOffer.name}`;
  const emailBody = `
Hello,

Thank you for your interest in our position. Instead of a traditional cover letter, we'd like to invite you to complete a brief AI-powered interview.

Please click the link below to start your interview:
${interviewLink}

This interview should take approximately 5-10 minutes and will help us better understand your background and qualifications.

Best regards,
The Hiring Team
`.trim();

  const emailLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  // Copy functions
  function copyLink() {
    navigator.clipboard.writeText(interviewLink);
    toast.success("Interview link copied to clipboard");
  }

  function copyEmailTemplate() {
    navigator.clipboard.writeText(emailBody);
    toast.success("Email template copied to clipboard");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Link2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Interview Link</DialogTitle>
          <DialogDescription>
            Send this link to candidates to have them complete the interview
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link">Direct Link</TabsTrigger>
            <TabsTrigger value="email">Email Template</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="mt-4">
            <div className="flex items-center space-x-2">
              <Input value={interviewLink} readOnly className="flex-1" />
              <Button size="icon" onClick={copyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">
              Share this link directly with candidates
            </p>
          </TabsContent>

          <TabsContent value="email" className="mt-4">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Subject
                </label>
                <Input value={emailSubject} readOnly />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Body</label>
                <Textarea
                  value={emailBody}
                  readOnly
                  rows={8}
                  className="resize-none"
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={copyEmailTemplate}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Template
                </Button>

                <Button asChild>
                  <a href={emailLink} target="_blank" rel="noopener noreferrer">
                    <Mail className="mr-2 h-4 w-4" />
                    Open in Email Client
                  </a>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
