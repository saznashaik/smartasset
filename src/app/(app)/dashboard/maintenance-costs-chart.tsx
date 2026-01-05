"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { maintenanceCostsData } from "@/lib/data"

const chartConfig = {
    cost: {
        label: "Cost",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function MaintenanceCostsChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Maintenance Costs</CardTitle>
                <CardDescription>Monthly costs for the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart accessibilityLayer data={maintenanceCostsData}>
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                        />
                        <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent
                                labelKey="month"
                                formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value as number)}
                            />}
                        />
                        <Bar dataKey="cost" fill="var(--color-cost)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
