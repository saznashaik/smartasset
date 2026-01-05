"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, HardHat, ShieldAlert, Tractor, TrendingUp, Wrench, CalendarClock } from "lucide-react";
import { dashboardData } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
    const stats = [
        {
            title: "Total Assets",
            value: dashboardData.totalAssets.toLocaleString(),
            icon: Tractor,
            color: "text-green-500",
        },
        {
            title: "High-Risk Assets",
            value: dashboardData.highRiskAssets.toLocaleString(),
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
            value: dashboardData.assetsInRepair.toLocaleString(),
            icon: Wrench,
            color: "text-yellow-500",
        },
        {
            title: "Expiring in 2025-2027",
            value: dashboardData.warrantiesExpiring.toLocaleString(),
            icon: CalendarClock,
            color: "text-primary",
        }
    ]
    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={cn("h-4 w-4", stat.color)} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <iframe
                width="100%"
                height="720"
                src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/430248170338/dashboards/f9ae3294-c908-483f-91ef-8469921e94e7?directory_alias=Keerthisri"
                style={{ border: 'none' }}
                >
            </iframe>
        </div>
    );
}
