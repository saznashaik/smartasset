import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, HardHat, ShieldAlert, Tractor, TrendingUp } from "lucide-react";
import { dashboardData } from "@/lib/data";

export default function DashboardPage() {
    const stats = [
        {
            title: "Total Assets",
            value: dashboardData.totalAssets.toLocaleString(),
            icon: Tractor,
        },
        {
            title: "High-Risk Assets",
            value: dashboardData.highRiskAssets.toLocaleString(),
            icon: ShieldAlert,
        },
        {
            title: "Replacement Cost",
            value: `$${dashboardData.replacementCost.toLocaleString()}`,
            icon: DollarSign,
        },
        {
            title: "Assets In Repair",
            value: dashboardData.assetsInRepair.toLocaleString(),
            icon: HardHat,
        },
        {
            title: "Warranties Expiring",
            value: dashboardData.warrantiesExpiring.toLocaleString(),
            icon: TrendingUp,
        }
    ]
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">Asset Management Executive Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
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
