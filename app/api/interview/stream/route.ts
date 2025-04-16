import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper function to wait for a specific duration
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * This endpoint streams the assistant's responses during an interview
 */
export async function GET(req: NextRequest) {
  const threadId = req.nextUrl.searchParams.get("threadId");
  const runId = req.nextUrl.searchParams.get("runId");

  if (!threadId || !runId) {
    return new Response(
      JSON.stringify({ error: "Thread ID and Run ID are required" }),
      { status: 400 },
    );
  }

  // Create a new ReadableStream
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Poll the run until it completes
        let run = await openai.beta.threads.runs.retrieve(threadId, runId);

        while (run.status === "queued" || run.status === "in_progress") {
          // Wait a bit before checking again
          await sleep(1000);
          run = await openai.beta.threads.runs.retrieve(threadId, runId);
        }

        if (run.status === "completed") {
          // Get the latest messages from the thread
          const messages = await openai.beta.threads.messages.list(threadId, {
            limit: 1,
            order: "desc",
          });

          const latestMessage = messages.data[0];

          if (latestMessage && latestMessage.role === "assistant") {
            // Convert text content to string
            const content = latestMessage.content
              .filter((item) => item.type === "text")
              .map((item) => (item.type === "text" ? item.text.value : ""))
              .join("");

            controller.enqueue(
              JSON.stringify({ content, status: "completed" }),
            );
          }
        } else if (run.status === "failed") {
          controller.enqueue(
            JSON.stringify({
              error: "The interview run failed",
              status: "failed",
            }),
          );
        } else {
          controller.enqueue(
            JSON.stringify({
              error: `Unexpected run status: ${run.status}`,
              status: run.status,
            }),
          );
        }

        controller.close();
      } catch (error) {
        console.error("Error streaming response:", error);
        controller.enqueue(
          JSON.stringify({
            error: "Failed to stream response",
            status: "error",
          }),
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
