import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";

type SettingsSheetProps = {
  tone: string;
  setTone: (tone: string) => void;
  userAnimeUrl: string;
  setUserAnimeUrl: (url: string) => void;
};

export function SettingsSheet({ tone, setTone, userAnimeUrl, setUserAnimeUrl }: SettingsSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Customize Conversation</SheetTitle>
          <SheetDescription>
            Adjust the AI's personality and provide context for a better chat experience.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="grid gap-3">
            <Label htmlFor="tone">Response Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger id="tone" className="w-full">
                <SelectValue placeholder="Select a tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="funny">Funny</SelectItem>
                <SelectItem value="serious">Serious</SelectItem>
                <SelectItem value="informative">Informative</SelectItem>
                <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="anime-url">Favorite Anime URL (Optional)</Label>
            <Input
              id="anime-url"
              value={userAnimeUrl}
              onChange={(e) => setUserAnimeUrl(e.target.value)}
              placeholder="https://myanimelist.net/..."
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
