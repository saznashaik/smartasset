"use client"

import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import { assetStatusData } from "@/lib/data"

const chartConfig = {
    assets: {
        label: "Assets",
    },
    Operational: {
        label: "Operational",
        color: "hsl(var(--chart-1))",
    },
    'Under Maintenance': {
        label: "Under Maintenance",
        color: "hsl(var(--chart-4))",
    },
    'At Risk': {
        label: "At Risk",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

export function AssetStatusChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Asset Status Distribution</CardTitle>
                <CardDescription>A breakdown of assets by their current operational status.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                        <Pie data={assetStatusData} dataKey="value" nameKey="name" />
                        <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
