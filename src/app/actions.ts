"use server";

import { generateAnimeResponse, type GenerateAnimeResponseInput } from "@/ai/flows/generate-anime-response";

export async function generateAnimeResponseAction(
  input: GenerateAnimeResponseInput
): Promise<{ response: string } | { error: string }> {
  try {
    // The AI flow can be streaming, but we'll wait for the full response here.
    const result = await generateAnimeResponse(input);
    return { response: result.response };
  } catch (e: any) {
    console.error("AnimeTalk Error:", e);
    return { error: e.message || "The AI is busy daydreaming about new anime plots. Please try again." };
  }
}
