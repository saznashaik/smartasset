'use server';

/**
 * @fileOverview Predicts potential asset failures based on historical data and real-time metrics.
 *
 * - predictAssetFailures - A function that predicts potential asset failures.
 * - PredictAssetFailuresInput - The input type for the predictAssetFailures function.
 * - PredictAssetFailuresOutput - The return type for the predictAssetFailures function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictAssetFailuresInputSchema = z.object({
  assetId: z.string().describe('The ID of the asset to predict failure for.'),
  historicalData: z.string().describe('Historical data for the asset, including maintenance logs and performance metrics.'),
  realtimeMetrics: z.string().describe('Real-time metrics for the asset, such as temperature, pressure, and vibration.'),
});
export type PredictAssetFailuresInput = z.infer<typeof PredictAssetFailuresInputSchema>;

const PredictAssetFailuresOutputSchema = z.object({
  predictedFailure: z.boolean().describe('Whether the asset is predicted to fail.'),
  failureProbability: z.number().describe('The probability of the asset failing, between 0 and 1.'),
  failureReason: z.string().describe('The predicted reason for the asset failure.'),
  recommendedActions: z.string().describe('Recommended actions to prevent the asset failure.'),
});
export type PredictAssetFailuresOutput = z.infer<typeof PredictAssetFailuresOutputSchema>;

export async function predictAssetFailures(input: PredictAssetFailuresInput): Promise<PredictAssetFailuresOutput> {
  return predictAssetFailuresFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictAssetFailuresPrompt',
  input: {schema: PredictAssetFailuresInputSchema},
  output: {schema: PredictAssetFailuresOutputSchema},
  prompt: `You are an expert asset failure prediction system.

You will use the historical data and real-time metrics to predict whether an asset will fail.

Asset ID: {{{assetId}}}
Historical Data: {{{historicalData}}}
Real-time Metrics: {{{realtimeMetrics}}}

Based on this information, predict whether the asset will fail, the probability of failure, the reason for failure, and recommend actions to prevent the failure.
`,
});

const predictAssetFailuresFlow = ai.defineFlow(
  {
    name: 'predictAssetFailuresFlow',
    inputSchema: PredictAssetFailuresInputSchema,
    outputSchema: PredictAssetFailuresOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
