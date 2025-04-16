import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

type TemplateInfoCardProps = {
  template: {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    questions: {
      id: string;
      question: string;
      order: number;
    }[];
  };
};

export function TemplateInfoCard({ template }: TemplateInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Template Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <h3 className="mb-1 text-sm font-medium">Name</h3>
          <p>{template.name}</p>
        </div>

        <div>
          <h3 className="mb-1 text-sm font-medium">Description</h3>
          <p className="text-muted-foreground">
            {template.description || "No description provided"}
          </p>
        </div>

        <div>
          <h3 className="mb-1 text-sm font-medium">Created On</h3>
          <p className="text-muted-foreground">
            {format(new Date(template.createdAt), "MMMM d, yyyy 'at' h:mm a")}
          </p>
        </div>

        <div>
          <h3 className="mb-1 text-sm font-medium">Number of Questions</h3>
          <p className="text-muted-foreground">
            {template.questions.length} question
            {template.questions.length !== 1 ? "s" : ""}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
