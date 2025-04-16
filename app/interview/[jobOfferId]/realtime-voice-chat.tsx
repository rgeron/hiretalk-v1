"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bot, DownloadIcon, Loader2, Mic } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

export function RealtimeVoiceChat({
  threadId,
  candidateName,
  jobInfo,
}: {
  threadId: string;
  candidateName: string;
  jobInfo: {
    jobTitle: string;
    companyName: string;
    jobDescription: string;
    durationMin: number;
    durationMax: number;
  };
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingData, setRecordingData] = useState<Blob[]>([]);
  const [ephemeralKey, setEphemeralKey] = useState<string | null>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioRecorderRef = useRef<MediaRecorder | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      // Clean up connections when component unmounts
      if (pcRef.current) {
        pcRef.current.close();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (
        audioRecorderRef.current &&
        audioRecorderRef.current.state !== "inactive"
      ) {
        audioRecorderRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startRealTimeInterview = async () => {
    setIsConnecting(true);

    try {
      console.log("Starting microphone access...");
      // Get audio permissions first
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaStreamRef.current = mediaStream;
      console.log("Microphone access granted");

      // 1. Get ephemeral key from server
      console.log("Getting ephemeral key from server...");
      const response = await fetch("/api/interview/realtime/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadId,
          candidateName,
          jobTitle: jobInfo.jobTitle,
          companyName: jobInfo.companyName,
        }),
      });

      console.log("Response status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(
          `Failed to initialize WebRTC connection: ${response.status} ${errorText}`,
        );
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);
      const { ephemeralKey: key, sessionId } = responseData;
      setEphemeralKey(key);

      // 2. Create WebRTC peer connection
      console.log("Creating WebRTC peer connection...");
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
      pcRef.current = pc;

      // 3. Set up data channel for signaling
      console.log("Creating data channel...");
      const dataChannel = pc.createDataChannel("oai-events");
      dataChannelRef.current = dataChannel;

      // 4. Add audio track from microphone
      console.log("Adding audio track to peer connection...");
      mediaStream.getAudioTracks().forEach((track) => {
        pc.addTrack(track, mediaStream);
      });

      // 5. Set up to play remote audio from the model
      pc.ontrack = (event) => {
        console.log("Received remote track:", event);
        if (audioRef.current) {
          audioRef.current.srcObject = event.streams[0];
        }
      };

      // Listen for ICE candidates
      pc.onicecandidate = (event) => {
        console.log("ICE candidate:", event.candidate);
      };

      // Log connection state changes
      pc.onconnectionstatechange = () => {
        console.log("Connection state changed:", pc.connectionState);
      };

      pc.onicegatheringstatechange = () => {
        console.log("ICE gathering state:", pc.iceGatheringState);
      };

      pc.oniceconnectionstatechange = () => {
        console.log("ICE connection state:", pc.iceConnectionState);
      };

      // 6. Set up data channel handlers
      dataChannel.onopen = () => {
        console.log("Data channel opened");
        setIsConnecting(false);
        setIsConnected(true);
        setIsRecording(true);

        // Start recording the entire conversation
        startRecording();

        // Initialize the session
        const sessionConfig = {
          type: "session.update",
          session: {
            instructions: `You are conducting an interview for a ${jobInfo.jobTitle} position at ${jobInfo.companyName}. 
            Ask relevant questions about the candidate's experience, skills, and motivation for this role. 
            The job description is: ${jobInfo.jobDescription}.
            This interview should take between ${jobInfo.durationMin}-${jobInfo.durationMax} minutes.
            Be conversational and professional. Proceed step by step through different aspects of the job requirements.
            Introduce yourself as the AI interviewer for ${jobInfo.companyName}.
            The candidate's name is ${candidateName}.`,
          },
        };

        console.log("Sending session config:", sessionConfig);
        dataChannel.send(JSON.stringify(sessionConfig));
      };

      dataChannel.onmessage = (event) => {
        console.log("Received data channel message:", event.data);
        handleServerEvent(JSON.parse(event.data));
      };

      dataChannel.onerror = (error) => {
        console.error("Data channel error:", error);
      };

      dataChannel.onclose = () => {
        console.log("Data channel closed");
      };

      // 7. Create an offer and set as local description
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // 8. Connect to OpenAI's Realtime API with the ephemeral key
      console.log("Connecting to OpenAI's Realtime API with ephemeral key...");
      const model = "gpt-4o-realtime-preview-2024-12-17";
      const sdpResponse = await fetch(
        `https://api.openai.com/v1/realtime?model=${model}`,
        {
          method: "POST",
          body: offer.sdp,
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/sdp",
          },
        },
      );

      if (!sdpResponse.ok) {
        const errorText = await sdpResponse.text();
        console.error("SDP error response:", errorText);
        throw new Error(
          `Failed to get SDP answer: ${sdpResponse.status} ${errorText}`,
        );
      }

      // 9. Set remote description (OpenAI's SDP answer)
      const remoteSdp = await sdpResponse.text();
      console.log("Setting remote description...");
      await pc.setRemoteDescription(
        new RTCSessionDescription({
          type: "answer",
          sdp: remoteSdp,
        }),
      );

      // After setting the remote description
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      // Send the answer to OpenAI via your server
      await fetch("/api/interview/realtime/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadId,
          sdp: answer.sdp,
        }),
      });

      console.log("WebRTC connection established");
    } catch (error) {
      console.error("Error starting real-time interview:", error);
      toast.error(
        `Failed to start interview: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      setIsConnecting(false);
    }
  };

  const handleServerEvent = (serverEvent: any) => {
    console.log("Server event:", serverEvent.type);

    // Handle different event types from the server
    switch (serverEvent.type) {
      case "session.created":
      case "session.updated":
        console.log("Session ready");
        break;

      case "response.text.delta":
        if (serverEvent.delta?.text) {
          // Add or update assistant message
          setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1];

            // If last message is from assistant, update it
            if (lastMessage && lastMessage.role === "assistant") {
              const updatedMessages = [...prevMessages];
              updatedMessages[updatedMessages.length - 1] = {
                ...lastMessage,
                content: lastMessage.content + serverEvent.delta.text,
              };
              return updatedMessages;
            } else {
              // Otherwise add new assistant message
              return [
                ...prevMessages,
                {
                  role: "assistant",
                  content: serverEvent.delta.text,
                  timestamp: Date.now(),
                },
              ];
            }
          });
        }
        break;

      case "input_audio_buffer.speech_started":
        // Add user message placeholder when user starts speaking
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (
            lastMessage &&
            lastMessage.role === "user" &&
            lastMessage.content === ""
          ) {
            return prevMessages; // Already have a placeholder
          }
          return [
            ...prevMessages,
            {
              role: "user",
              content: "",
              timestamp: Date.now(),
            },
          ];
        });
        break;

      case "input_audio_buffer.speech_stopped":
        // When user stops speaking, we'll get a transcript later
        break;

      case "response.audio_transcript.delta":
        if (serverEvent.delta?.text) {
          // Update the last user message with transcribed text
          setMessages((prevMessages) => {
            const lastUserMessageIndex = [...prevMessages]
              .reverse()
              .findIndex((m) => m.role === "user");

            if (lastUserMessageIndex >= 0) {
              const actualIndex =
                prevMessages.length - 1 - lastUserMessageIndex;
              const updatedMessages = [...prevMessages];
              updatedMessages[actualIndex] = {
                ...updatedMessages[actualIndex],
                content: serverEvent.delta.text,
              };
              return updatedMessages;
            }

            return prevMessages;
          });
        }
        break;

      case "error":
        console.error("Error from server:", serverEvent);
        toast.error(`Server error: ${serverEvent.message}`);
        break;
    }
  };

  const completeInterview = async () => {
    if (
      !dataChannelRef.current ||
      dataChannelRef.current.readyState !== "open"
    ) {
      toast.error("Connection to interview server lost.");
      return;
    }

    try {
      // Stop the recording
      if (
        audioRecorderRef.current &&
        audioRecorderRef.current.state !== "inactive"
      ) {
        audioRecorderRef.current.stop();
      }

      // Close the WebRTC connection
      if (pcRef.current) {
        pcRef.current.close();
      }

      // Stop media tracks
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      // Save the conversation to the server
      const completeResponse = await fetch("/api/interview/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadId,
          transcript: messages,
        }),
      });

      if (!completeResponse.ok) {
        throw new Error("Failed to complete interview");
      }

      setIsCompleted(true);
      setIsConnected(false);
      toast.success("Interview completed successfully!");
    } catch (error) {
      console.error("Error completing interview:", error);
      toast.error(
        "Failed to complete the interview. Your responses have been saved.",
      );
    }
  };

  const startRecording = () => {
    // Set up recording of the entire conversation
    if (!mediaStreamRef.current) return;

    try {
      // Create a new audio context
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      // Create a MediaStream with both local and remote audio
      const combinedStream = new MediaStream();

      // Add local audio tracks
      mediaStreamRef.current.getAudioTracks().forEach((track) => {
        combinedStream.addTrack(track);
      });

      // Add remote audio (if available)
      if (
        audioRef.current &&
        audioRef.current.srcObject instanceof MediaStream
      ) {
        audioRef.current.srcObject.getAudioTracks().forEach((track) => {
          combinedStream.addTrack(track);
        });
      }

      // Create a recorder for the combined stream
      const recorder = new MediaRecorder(combinedStream);
      audioRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordingData((prev) => [...prev, event.data]);
        }
      };

      recorder.start(1000); // Collect data in 1-second chunks
    } catch (error) {
      console.error("Error setting up recording:", error);
      toast.error("Failed to start recording the interview.");
    }
  };

  const downloadRecording = () => {
    if (recordingData.length === 0) {
      toast.error("No recording available to download.");
      return;
    }

    try {
      // Combine all chunks into a single blob
      const recordingBlob = new Blob(recordingData, { type: "audio/webm" });

      // Create a URL for the blob
      const url = URL.createObjectURL(recordingBlob);

      // Create a download link
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `interview-${threadId}-${Date.now()}.webm`;

      // Add to document, trigger click, and clean up
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading recording:", error);
      toast.error("Failed to download recording.");
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
        {recordingData.length > 0 && (
          <Button
            onClick={downloadRecording}
            className="mt-4 flex items-center gap-2"
          >
            <DownloadIcon size={16} />
            Download Recording
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-[500px] flex-col rounded-lg border">
      {/* Hidden audio element for playing AI responses */}
      <audio ref={audioRef} autoPlay />

      <div className="flex-grow overflow-y-auto p-4">
        {!isConnected && !isConnecting ? (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-muted-foreground mb-4 text-center">
              Click the button below to start your real-time voice interview.
              <br />
              Make sure your microphone is enabled in your browser.
            </p>
            <Button onClick={startRealTimeInterview}>
              Start Voice Interview
            </Button>
          </div>
        ) : isConnecting ? (
          <div className="flex h-full items-center justify-center">
            <div className="animate-pulse text-center">
              <p className="text-muted-foreground">
                Connecting to interview...
              </p>
              <Loader2 className="mx-auto mt-4 h-6 w-6 animate-spin" />
            </div>
          </div>
        ) : (
          <>
            <div className="bg-muted mb-4 rounded-lg p-3 text-sm">
              <p>
                <span className="font-semibold">
                  Voice Interview in Progress
                </span>
                <br />
                Speak naturally and the AI interviewer will respond. Your entire
                conversation is being recorded.
              </p>
            </div>
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
                      </>
                    ) : (
                      <>
                        <span className="text-xs font-medium">Interviewer</span>
                        <Bot size={14} />
                      </>
                    )}
                  </div>
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content || "..."}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {isConnected && (
        <div className="flex flex-col items-center space-y-4 border-t p-4">
          <div className="flex items-center justify-center">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full",
                isRecording ? "animate-pulse bg-red-500" : "bg-muted",
              )}
            >
              <Mic className="h-6 w-6 text-white" />
            </div>
          </div>

          <Button
            variant="outline"
            onClick={completeInterview}
            className="mt-2"
          >
            Complete Interview
          </Button>
        </div>
      )}
    </div>
  );
}
