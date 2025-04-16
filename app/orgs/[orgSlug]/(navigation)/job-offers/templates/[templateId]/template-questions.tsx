"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessagesSquare, PlusCircle } from "lucide-react";
import { useState } from "react";
import { NewQuestionForm } from "./new-question-form";
import { QuestionItem } from "./question-item";

type TemplateQuestionsProps = {
  questions: {
    id: string;
    question: string;
    order: number;
  }[];
  canEdit: boolean;
  templateId: string;
  orgSlug: string;
};

export function TemplateQuestions({
  questions,
  canEdit,
  templateId,
  orgSlug,
}: TemplateQuestionsProps) {
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  if (questions.length === 0 && !isAddingQuestion) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <MessagesSquare className="text-muted-foreground mb-4 h-10 w-10" />
          <h3 className="mb-2 text-lg font-medium">No Questions Yet</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            This template doesn't have any interview questions yet.
          </p>
          {canEdit && (
            <Button onClick={() => setIsAddingQuestion(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add First Question
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          canEdit={canEdit}
          templateId={templateId}
          orgSlug={orgSlug}
        />
      ))}

      {isAddingQuestion ? (
        <NewQuestionForm
          templateId={templateId}
          onCancel={() => setIsAddingQuestion(false)}
          orgSlug={orgSlug}
        />
      ) : (
        canEdit && (
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setIsAddingQuestion(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Question
          </Button>
        )
      )}
    </div>
  );
}
