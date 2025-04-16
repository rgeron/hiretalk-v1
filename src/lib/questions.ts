import fs from "fs/promises";
import path from "path";

export type QuestionCategory = {
  id: string;
  name: string;
  questions: string[];
};

export async function getInterviewQuestions(): Promise<QuestionCategory[]> {
  try {
    const filePath = path.join(
      process.cwd(),
      "content/default-interview-questions.json",
    );
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);

    return Object.entries(data).map(([key, questions]) => ({
      id: key,
      name: formatCategoryName(key),
      questions: questions as string[],
    }));
  } catch {
    return [];
  }
}

function formatCategoryName(categoryId: string): string {
  return categoryId
    .replace(/([A-Z])/g, " $1") // Insert space before capital letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
    .replace(/([a-z])([A-Z])/g, "$1 $2"); // Add space between words
}
