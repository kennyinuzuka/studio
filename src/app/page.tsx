"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot } from "lucide-react";
import { generateAnimeResponseAction } from "./actions";
import { SettingsSheet } from "@/components/settings-sheet";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "@/components/chat-message";
import { LoadingBubble } from "@/components/loading-bubble";

type Message = {
  role: "user" | "model";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "Hey there! I'm AnimeTalk. What's your favorite anime, or what do you want to talk about?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tone, setTone] = useState("default");
  const [userAnimeUrl, setUserAnimeUrl] = useState("");

  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await generateAnimeResponseAction({
        query: input,
        tone: tone === "default" ? "" : tone,
        userAnimeUrl: userAnimeUrl,
      });
  
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
        setMessages(prev => prev.slice(0, prev.length - 1));
      } else {
        const aiMessage: Message = { role: "model", content: result.response };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
      setMessages(prev => prev.slice(0, prev.length - 1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-3xl h-[95vh] flex flex-col shadow-2xl rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent rounded-full">
                <Bot className="h-6 w-6 text-accent-foreground" />
            </div>
            <CardTitle className="font-headline text-2xl">AnimeTalk</CardTitle>
          </div>
          <SettingsSheet 
            tone={tone}
            setTone={setTone}
            userAnimeUrl={userAnimeUrl}
            setUserAnimeUrl={setUserAnimeUrl}
          />
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full">
            <div className="space-y-6 p-6">
              {messages.map((msg, index) => (
                <ChatMessage key={index} role={msg.role} content={msg.content} />
              ))}
              {isLoading && <LoadingBubble />}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex w-full items-center gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your favorite scene..."
              disabled={isLoading}
              className="text-base"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  );
}
