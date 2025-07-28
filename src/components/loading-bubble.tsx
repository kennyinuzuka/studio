import { Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function LoadingBubble() {
  return (
    <div className="flex items-start gap-4 justify-start">
      <Avatar className="h-9 w-9 border">
        <AvatarFallback className="bg-accent text-accent-foreground">
          <Bot className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
      <div className="bg-card border rounded-xl p-3 px-4 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-pulse" style={{ animationDelay: '0ms' }} />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-pulse" style={{ animationDelay: '200ms' }} />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </div>
  );
}
