"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { generateExecutiveSummary } from "@/ai/flows/generate-executive-summary";
import { executiveSummaryData } from "@/lib/data";
import { Bot } from "lucide-react";

export function ExecutiveSummary() {
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getSummary() {
            try {
                setLoading(true);
                const result = await generateExecutiveSummary(executiveSummaryData);
                setSummary(result.summary);
            } catch (error) {
                console.error("Failed to generate summary:", error);
                setSummary("Could not generate AI summary at this time.");
            } finally {
                setLoading(false);
            }
        }
        getSummary();
    }, []);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-primary"/>
                    <CardTitle className="font-headline">AI Executive Summary</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">{summary}</p>
                )}
            </CardContent>
        </Card>
    );
}
