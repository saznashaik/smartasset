"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardData } from "@/lib/data";
import {
    Package,
    ShieldAlert,
    DollarSign,
    Wrench,
    CalendarClock,
} from "lucide-react";

const stats = [
    {
        title: "Total Assets",
        value: dashboardData.totalAssets,
        icon: Package,
        color: "text-green-500",
    },
    {
        title: "High-Risk Assets",
        value: dashboardData.highRiskAssets,
        icon: ShieldAlert,
        color: "text-red-500",
    },
    {
        title: "Replacement Cost",
        value: `$${dashboardData.replacementCost.toLocaleString()}`,
        icon: DollarSign,
        color: "text-blue-500",
    },
    {
        title: "Assets In Repair",
        value: dashboardData.assetsInRepair,
        icon: Wrench,
        color: "text-yellow-500",
    },
    {
        title: "Expiring in 2025-2027",
        value: dashboardData.warrantiesExpiring,
        icon: CalendarClock,
        color: "text-primary",
    },
];

export default function DashboardPage() {
    return (
        <div className="flex flex-1 flex-col p-4 sm:p-6 h-full">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-4">
                {stats.map((stat) => (
                    <Card
                        key={stat.title}
                        className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                    >
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 text-muted-foreground ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="flex-1 rounded-lg overflow-hidden h-[2000vh]">
                <iframe
                    width="100%"
                    height="100%"
                    src="https://us-west-2.quicksight.aws.amazon.com/sn/embed/share/accounts/577638367293/dashboards/9cf557a1-72a7-417e-b2c9-75d7974af453?directory_alias=SouthlandInd-SmartAsset"
                    style={{ border: 'none' }}
                >
                </iframe>
            </div>
        </div>
    );
}
