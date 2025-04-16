"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { addQuestionAction } from "./actions";

type NewQuestionFormProps = {
  templateId: string;
  onCancel: () => void;
  orgSlug: string;
};

export function NewQuestionForm({
  templateId,
  onCancel,
  orgSlug,
}: NewQuestionFormProps) {
  const router = useRouter();
  const [question, setQuestion] = useState("");

  const addMutation = useMutation({
    mutationFn: async (text: string) => {
      return resolveActionResult(
        addQuestionAction({
          templateId,
          question: text,
        }),
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Question added");
      onCancel();
      router.refresh();
    },
  });

  const handleSubmit = () => {
    if (!question.trim()) {
      toast.error("Question cannot be empty");
      return;
    }

    addMutation.mutate(question);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <p className="mb-2 text-sm font-medium">New Question</p>
        <div className="space-y-3">
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            placeholder="Enter your question here..."
            className="resize-none"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              disabled={addMutation.isPending}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={addMutation.isPending}
            >
              {addMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
