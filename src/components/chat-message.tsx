import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatMessageProps = {
  role: "user" | "model";
  content: string;
};

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";
  return (
    <div className={cn("flex items-start gap-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-9 w-9 border">
          <AvatarFallback className="bg-accent text-accent-foreground">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-md rounded-xl p-3 px-4 shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card border"
        )}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
      </div>
      {isUser && (
        <Avatar className="h-9 w-9 border">
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
