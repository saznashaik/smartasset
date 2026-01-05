"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { predictAssetFailures, type PredictAssetFailuresOutput } from "@/ai/flows/predict-asset-failures";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
    assetId: z.string().min(1, "Asset ID is required."),
    historicalData: z.string().min(1, "Historical data is required."),
    realtimeMetrics: z.string().min(1, "Real-time metrics are required."),
});

type FormData = z.infer<typeof formSchema>;

export default function PredictPage() {
    const [prediction, setPrediction] = useState<PredictAssetFailuresOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            assetId: "PMP-00123",
            historicalData: "Last maintenance: 6 months ago. Replaced bearing. Minor corrosion noted on housing.",
            realtimeMetrics: "Temperature: 75°C, Vibration: 3.5mm/s, Pressure: 150 PSI",
        },
    });

    async function onSubmit(data: FormData) {
        setIsLoading(true);
        setPrediction(null);
        setError(null);
        try {
            const result = await predictAssetFailures(data);
            setPrediction(result);
        } catch (e) {
            setError("Failed to get prediction. Please try again.");
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Predictive Analysis</CardTitle>
                    <CardDescription>Use AI to predict potential asset failures based on historical and real-time data.</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="assetId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Asset ID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., PMP-00123" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="historicalData"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Historical Data</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="e.g., Maintenance logs, past performance..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="realtimeMetrics"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Real-time Metrics</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="e.g., Temperature, pressure, vibration..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Predict Failure
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Prediction Result</CardTitle>
                    <CardDescription>AI-powered analysis of failure probability and recommended actions.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading && (
                         <div className="space-y-4">
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                         </div>
                    )}
                    {error && <p className="text-destructive">{error}</p>}
                    {prediction && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <AlertTriangle className={`h-5 w-5 ${prediction.predictedFailure ? 'text-destructive' : 'text-green-600'}`} />
                                    Failure Prediction
                                </h3>
                                <p className="text-2xl font-bold font-headline" style={{ color: prediction.predictedFailure ? 'hsl(var(--destructive))' : 'hsl(var(--chart-1))' }}>
                                    {prediction.predictedFailure ? "Failure Likely" : "Failure Unlikely"}
                                </p>
                            </div>
                             <div>
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-muted-foreground"/>
                                    Probability
                                </h3>
                                <p className="text-muted-foreground">{(prediction.failureProbability * 100).toFixed(1)}% chance of failure.</p>
                                <p className="text-sm">{prediction.failureReason}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Lightbulb className="h-5 w-5 text-muted-foreground"/>
                                    Recommended Actions
                                </h3>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{prediction.recommendedActions}</p>
                            </div>
                        </div>
                    )}
                    {!isLoading && !prediction && !error && (
                        <p className="text-muted-foreground">Enter asset data and click "Predict Failure" to see results.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
