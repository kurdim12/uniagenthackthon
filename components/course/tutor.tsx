"use client";

import { useState } from "react";
import { useCourse } from "@/components/course-context";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AgentChip } from "@/components/agent-chip";
import { aiAsk } from "@/lib/ai";
import { logLearningEvent, awardXP } from "@/lib/hooks/xp";
import { Loader2, Send } from "lucide-react";
import type { AIResponse } from "@/lib/types";
import { WorkflowVisualization } from "@/components/workflow-visualization";
import { VoiceInput } from "@/components/voice-input";

export function CourseTutor() {
  const { courseId } = useCourse();
  const [messages, setMessages] = useState<Array<{ 
    role: "user" | "assistant"; 
    content: string; 
    agent?: AIResponse["agent"]; 
    citations?: AIResponse["citations"];
    workflow?: any;
    reasoning?: string;
    agentCalls?: any[];
    toolsUsed?: any[];
  }>>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useStore((state) => state.getCurrentUser());

  const materials = useStore((state) =>
    state.materials.filter((m) => m.courseId === courseId)
  );
  const notes = useStore((state) =>
    state.notes.filter((n) => n.courseId === courseId)
  );

  const handleSend = async () => {
    if (!input.trim() || loading || !user || !courseId) return;

    const startTime = Date.now();
    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    const question = input;
    setInput("");
    setLoading(true);

    try {
      const response = await aiAsk(question, { courseId, materials, notes, userId: user.id });
      const duration = Math.round((Date.now() - startTime) / 1000);
      
      // Ensure response has required fields
      if (!response || !response.answer) {
        throw new Error("Invalid response from AI");
      }
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.answer,
          agent: response.agent,
          citations: response.citations || [],
          workflow: response.workflow,
          reasoning: response.reasoning,
          agentCalls: response.agentCalls,
          toolsUsed: response.toolsUsed,
        },
      ]);

      // Log learning event and award XP
      if (user && courseId) {
        await logLearningEvent(
          user.id,
          courseId,
          "tutor",
          {
            question,
            materialRefs: (response.citations || []).map((c: any) => c.sourceId).filter(Boolean),
          },
          duration,
          "completed"
        );

        await awardXP(user.id, courseId, "tutor_session", 15, {
          qLen: question.length,
          agent: response.agent,
        });
      }
    } catch (error) {
      console.error("Failed to get response:", error);
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
          citations: []
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Tutor Card - Modern Design */}
      <Card className="border-2 border-primary/20 shadow-xl">
        <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-purple-500/5">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <span className="text-3xl">🧠</span>
                AI Course Tutor
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Powered by GPT-4 • Search your materials • Get instant answers
              </p>
            </div>
            {messages.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessages([])}
              >
                Clear Chat
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Chat Messages */}
          <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-6xl mb-4">✨</div>
                <p className="text-xl font-semibold mb-2">Ask me anything about this course!</p>
                <p className="text-sm text-muted-foreground max-w-md">
                  I can explain concepts, help with assignments, search your materials, and more.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 max-w-2xl">
                  <button
                    onClick={() => setInput("Explain the main concepts covered in this course")}
                    className="p-3 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-all text-left hover:bg-primary/5"
                  >
                    <p className="text-sm font-medium">📚 Explain key concepts</p>
                  </button>
                  <button
                    onClick={() => setInput("What topics should I focus on for the next exam?")}
                    className="p-3 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-all text-left hover:bg-primary/5"
                  >
                    <p className="text-sm font-medium">🎯 Study guidance</p>
                  </button>
                  <button
                    onClick={() => setInput("Create a quiz to test my understanding")}
                    className="p-3 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-all text-left hover:bg-primary/5"
                  >
                    <p className="text-sm font-medium">❓ Generate quiz</p>
                  </button>
                  <button
                    onClick={() => setInput("Summarize my course materials")}
                    className="p-3 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-all text-left hover:bg-primary/5"
                  >
                    <p className="text-sm font-medium">📝 Summarize materials</p>
                  </button>
                </div>
              </div>
            ) : (
              messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg"
                        : "bg-gradient-to-r from-accent/50 to-accent border-2 border-accent"
                    }`}
                  >
                    {message.agent && (
                      <div className="mb-3">
                        <AgentChip agent={message.agent} />
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    {message.citations && message.citations.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-muted-foreground/20">
                        <p className="text-xs font-semibold mb-2 flex items-center gap-1">
                          📚 Sources:
                        </p>
                        <div className="space-y-1">
                          {message.citations.map((citation, i) => (
                            <div key={i} className="text-xs bg-background/50 p-2 rounded">
                              <span className="font-mono font-semibold">{citation.label}</span>{" "}
                              {citation.snippet && (
                                <span className="italic text-muted-foreground">
                                  {citation.snippet.substring(0, 100)}...
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {message.workflow && (
                      <div className="mt-4">
                        <WorkflowVisualization
                          workflow={message.workflow}
                          agentCalls={message.agentCalls}
                          toolsUsed={message.toolsUsed}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-5 py-4 bg-accent/50 border-2 border-accent flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="space-y-3">
            <Textarea
              placeholder="Ask a question about this course... (Cmd/Ctrl + Enter to send)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  handleSend();
                }
              }}
              className="min-h-[100px] resize-none text-base"
            />
            <div className="flex items-center gap-3">
              <VoiceInput
                onTranscript={(text) => setInput(text)}
                disabled={loading}
              />
              <Button 
                onClick={handleSend} 
                disabled={!input.trim() || loading} 
                className="flex-1 h-12 text-base font-semibold"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

