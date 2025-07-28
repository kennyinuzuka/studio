'use server';

/**
 * @fileOverview A flow that summarizes an anime from a given URL.
 *
 * - summarizeAnimeUrl - A function that handles the anime summarization process.
 * - SummarizeAnimeUrlInput - The input type for the summarizeAnimeUrl function.
 * - SummarizeAnimeUrlOutput - The return type for the summarizeAnimeUrl function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAnimeUrlInputSchema = z.object({
  url: z.string().url().describe('The URL of the anime to summarize.'),
  tone: z.string().optional().describe('The preferred tone of the summary.'),
});
export type SummarizeAnimeUrlInput = z.infer<typeof SummarizeAnimeUrlInputSchema>;

const SummarizeAnimeUrlOutputSchema = z.object({
  summary: z.string().describe('The summary of the anime from the URL.'),
});
export type SummarizeAnimeUrlOutput = z.infer<typeof SummarizeAnimeUrlOutputSchema>;

export async function summarizeAnimeUrl(input: SummarizeAnimeUrlInput): Promise<SummarizeAnimeUrlOutput> {
  return summarizeAnimeUrlFlow(input);
}

const summarizeAnimeUrlPrompt = ai.definePrompt({
  name: 'summarizeAnimeUrlPrompt',
  input: {schema: SummarizeAnimeUrlInputSchema},
  output: {schema: SummarizeAnimeUrlOutputSchema},
  prompt: `You are an AI assistant specializing in providing summaries of anime from URLs. The user will provide a URL, and you will provide a summary of the anime.

URL: {{{url}}}

Tone: {{tone}}

Summary:`, // Handlebars template
});

const summarizeAnimeUrlFlow = ai.defineFlow(
  {
    name: 'summarizeAnimeUrlFlow',
    inputSchema: SummarizeAnimeUrlInputSchema,
    outputSchema: SummarizeAnimeUrlOutputSchema,
  },
  async input => {
    const {output} = await summarizeAnimeUrlPrompt(input);
    return output!;
  }
);
