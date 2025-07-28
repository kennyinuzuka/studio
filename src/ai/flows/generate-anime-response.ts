'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating engaging responses based on anime-related topics.
 *
 * - generateAnimeResponse - A function that generates anime-related responses.
 * - GenerateAnimeResponseInput - The input type for the generateAnimeResponse function.
 * - GenerateAnimeResponseOutput - The return type for the generateAnimeResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAnimeResponseInputSchema = z.object({
  query: z.string().describe('The anime-related query or topic.'),
  tone: z.string().optional().describe('The desired tone of the response (e.g., funny, serious, informative).'),
  userAnimeUrl: z.string().optional().describe('URL to the users favorite anime.'),
});
export type GenerateAnimeResponseInput = z.infer<typeof GenerateAnimeResponseInputSchema>;

const GenerateAnimeResponseOutputSchema = z.object({
  response: z.string().describe('The generated anime-related response.'),
});
export type GenerateAnimeResponseOutput = z.infer<typeof GenerateAnimeResponseOutputSchema>;

export async function generateAnimeResponse(input: GenerateAnimeResponseInput): Promise<GenerateAnimeResponseOutput> {
  return generateAnimeResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAnimeResponsePrompt',
  input: {schema: GenerateAnimeResponseInputSchema},
  output: {schema: GenerateAnimeResponseOutputSchema},
  prompt: `You are an AI assistant specializing in anime-related discussions. Generate engaging responses based on the following query, considering the user's preferred tone.

Query: {{{query}}}

Tone: {{tone}}

User anime URL: {{userAnimeUrl}}

Response:`,  
});

const generateAnimeResponseFlow = ai.defineFlow(
  {
    name: 'generateAnimeResponseFlow',
    inputSchema: GenerateAnimeResponseInputSchema,
    outputSchema: GenerateAnimeResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
