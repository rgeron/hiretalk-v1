"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Bot, Mic, SendHorizonal, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function InterviewChat({
  threadId,
  runId,
  candidateName,
}: {
  threadId: string;
  runId: string;
  candidateName: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch initial message and scroll to bottom whenever messages change
  useEffect(() => {
    if (threadId && runId) {
      fetchInitialResponse();
    }
  }, [threadId, runId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchInitialResponse = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/interview/stream?threadId=${threadId}&runId=${runId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch initial response");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Response reader not available");

      // Process the streamed response
      let done = false;
      let responseText = "";

      while (!done) {
        const { done: streamDone, value } = await reader.read();
        done = streamDone;

        if (value) {
          const chunk = new TextDecoder().decode(value);
          try {
            const data = JSON.parse(chunk);
            if (data.content) {
              responseText = data.content;
            }
          } catch (e) {
            console.error("Error parsing chunk:", e);
          }
        }
      }

      if (responseText) {
        setMessages([{ role: "assistant", content: responseText }]);
      }
    } catch (error) {
      console.error("Error fetching initial response:", error);
      toast.error("Failed to start interview. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();
    setInput("");
    setIsProcessing(true);

    // Add user message to the chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      // Send the message to the API
      const response = await fetch("/api/interview/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId, message: userMessage }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const { runId: newRunId } = await response.json();

      // Start streaming the response
      const streamResponse = await fetch(
        `/api/interview/stream?threadId=${threadId}&runId=${newRunId}`,
      );

      if (!streamResponse.ok) throw new Error("Failed to stream response");

      const reader = streamResponse.body?.getReader();
      if (!reader) throw new Error("Response reader not available");

      // Process the streamed response
      let done = false;
      let responseText = "";

      while (!done) {
        const { done: streamDone, value } = await reader.read();
        done = streamDone;

        if (value) {
          const chunk = new TextDecoder().decode(value);
          try {
            const data = JSON.parse(chunk);
            if (data.content) {
              responseText = data.content;
            }
          } catch (e) {
            console.error("Error parsing chunk:", e);
          }
        }
      }

      if (responseText) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: responseText },
        ]);
      }
    } catch (error) {
      console.error("Error in message exchange:", error);
      toast.error("Failed to process your response. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const completeInterview = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/interview/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId }),
      });

      if (!response.ok) throw new Error("Failed to complete interview");

      const data = await response.json();
      if (data.success) {
        setIsCompleted(true);
        toast.success("Interview completed successfully!");
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error completing interview:", error);
      toast.error("Failed to complete the interview. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-4 p-4 text-center">
        <h2 className="text-2xl font-bold">Interview Completed</h2>
        <p className="text-muted-foreground">
          Thank you for completing your interview. Your responses have been
          recorded and will be reviewed by the hiring team.
        </p>
        <p className="text-muted-foreground">
          We'll be in touch soon regarding next steps.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[500px] flex-col rounded-lg border">
      <div className="flex-grow overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="animate-pulse text-center">
              <p className="text-muted-foreground">Starting interview...</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "mb-4 flex",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted",
                  )}
                >
                  <div className="mb-1 flex items-center gap-2">
                    {message.role === "user" ? (
                      <>
                        <span className="text-xs font-medium">
                          {candidateName}
                        </span>
                        <User size={14} />
                      </>
                    ) : (
                      <>
                        <span className="text-xs font-medium">Interviewer</span>
                        <Bot size={14} />
                      </>
                    )}
                  </div>
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your response..."
            disabled={isLoading || isProcessing}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={isLoading || isProcessing || !input.trim()}
          >
            <SendHorizonal size={18} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            type="button"
            onClick={completeInterview}
            disabled={isLoading || isProcessing || messages.length < 2}
          >
            <Mic size={18} />
          </Button>
        </div>
        <p className="text-muted-foreground mt-2 text-center text-xs">
          {messages.length < 2
            ? "Answer the interviewer's questions to proceed"
            : "Click the microphone icon when you're ready to end the interview"}
        </p>
      </div>
    </div>
  );
}
