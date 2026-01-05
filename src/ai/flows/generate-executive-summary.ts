'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating an executive summary of key asset insights.
 *
 * It includes functions for:
 * - generateExecutiveSummary: Generates the executive summary.
 * - ExecutiveSummaryInput: Input type for the function.
 * - ExecutiveSummaryOutput: Output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExecutiveSummaryInputSchema = z.object({
  totalAssets: z.number().describe('The total number of assets.'),
  highRiskItems: z.number().describe('The number of high-risk assets.'),
  repairCosts: z.number().describe('The total repair costs for all assets.'),
});
export type ExecutiveSummaryInput = z.infer<typeof ExecutiveSummaryInputSchema>;

const ExecutiveSummaryOutputSchema = z.object({
  summary: z.string().describe('A brief summary of key asset insights.'),
});
export type ExecutiveSummaryOutput = z.infer<typeof ExecutiveSummaryOutputSchema>;

export async function generateExecutiveSummary(input: ExecutiveSummaryInput): Promise<ExecutiveSummaryOutput> {
  return generateExecutiveSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExecutiveSummaryPrompt',
  input: {schema: ExecutiveSummaryInputSchema},
  output: {schema: ExecutiveSummaryOutputSchema},
  prompt: `As an executive, I need a brief summary of our key asset insights. Provide a concise overview including the total number of assets, the number of high-risk items, and the total repair costs.

Total Assets: {{{totalAssets}}}
High-Risk Items: {{{highRiskItems}}}
Total Repair Costs: {{{repairCosts}}}`,
});

const generateExecutiveSummaryFlow = ai.defineFlow(
  {
    name: 'generateExecutiveSummaryFlow',
    inputSchema: ExecutiveSummaryInputSchema,
    outputSchema: ExecutiveSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
