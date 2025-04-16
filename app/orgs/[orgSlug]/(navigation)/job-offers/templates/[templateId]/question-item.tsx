"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { dialogManager } from "@/features/dialog-manager/dialog-manager-store";
import { resolveActionResult } from "@/lib/actions/actions-utils";
import { useMutation } from "@tanstack/react-query";
import { Edit2, Save, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deleteQuestionAction, updateQuestionAction } from "./actions";

type QuestionItemProps = {
  question: {
    id: string;
    question: string;
    order: number;
  };
  canEdit: boolean;
  templateId: string;
  orgSlug: string;
};

export function QuestionItem({ question, canEdit }: QuestionItemProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question.question);

  const updateMutation = useMutation({
    mutationFn: async ({
      questionId,
      text,
    }: {
      questionId: string;
      text: string;
    }) => {
      return resolveActionResult(
        updateQuestionAction({
          questionId,
          question: text,
        }),
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Question updated");
      setIsEditing(false);
      router.refresh();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (questionId: string) => {
      return resolveActionResult(
        deleteQuestionAction({
          questionId,
        }),
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Question deleted");
      router.refresh();
    },
  });

  const handleSave = () => {
    if (!editedQuestion.trim()) {
      toast.error("Question cannot be empty");
      return;
    }

    updateMutation.mutate({
      questionId: question.id,
      text: editedQuestion,
    });
  };

  const handleDelete = () => {
    dialogManager.add({
      title: "Delete Question",
      description:
        "Are you sure you want to delete this question? This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteMutation.mutate(question.id);
        },
      },
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editedQuestion}
              onChange={(e) => setEditedQuestion(e.target.value)}
              rows={3}
              placeholder="Enter question text"
              className="resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  setEditedQuestion(question.question);
                }}
                disabled={updateMutation.isPending}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={updateMutation.isPending}
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="mb-1 text-sm font-medium">
                Question {question.order}
              </p>
              <p>{question.question}</p>
            </div>
            {canEdit && (
              <div className="flex shrink-0 gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="text-destructive h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
