'use server';

/**
 * @fileOverview AI chat integration for asset-related queries.
 *
 * - chatWithAI - A function that interacts with an AI chat for asset-related questions.
 * - ChatWithAIInput - The input type for the chatWithAI function.
 * - ChatWithAIOutput - The return type for the chatWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithAIInputSchema = z.object({
  query: z.string().describe('The user query about assets, dashboards, or system functionalities.'),
});
export type ChatWithAIInput = z.infer<typeof ChatWithAIInputSchema>;

const ChatWithAIOutputSchema = z.object({
  response: z.string().describe('The AI chat response to the user query.'),
});
export type ChatWithAIOutput = z.infer<typeof ChatWithAIOutputSchema>;

export async function chatWithAI(input: ChatWithAIInput): Promise<ChatWithAIOutput> {
  return chatWithAIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatWithAIPrompt',
  input: {schema: ChatWithAIInputSchema},
  output: {schema: ChatWithAIOutputSchema},
  prompt: `You are an AI assistant embedded within an asset management application.
Respond to the following user query clearly and concisely.

Query: {{{query}}}`,
});

const chatWithAIFlow = ai.defineFlow(
  {
    name: 'chatWithAIFlow',
    inputSchema: ChatWithAIInputSchema,
    outputSchema: ChatWithAIOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
