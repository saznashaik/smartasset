import { config } from 'dotenv';
config();

import '@/ai/flows/integrate-ai-chat.ts';
import '@/ai/flows/predict-asset-failures.ts';
import '@/ai/flows/generate-executive-summary.ts';