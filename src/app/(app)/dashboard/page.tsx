import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, HardHat, ShieldAlert } from "lucide-react";
import { executiveSummaryData } from "@/lib/data";
import { ExecutiveSummary } from "./executive-summary";
import { AssetStatusChart } from "./asset-status-chart";
import { MaintenanceCostsChart } from "./maintenance-costs-chart";

export default function DashboardPage() {
    return (
        <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
                        <HardHat className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-headline">{executiveSummaryData.totalAssets}</div>
                        <p className="text-xs text-muted-foreground">+5 since last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">High-Risk Items</CardTitle>
                        <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-headline">{executiveSummaryData.highRiskItems}</div>
                        <p className="text-xs text-muted-foreground">-3 since last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Repair Costs</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-headline">${executiveSummaryData.repairCosts.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>
            </div>
            
            <ExecutiveSummary />

            <div className="grid gap-6 lg:grid-cols-2">
                <AssetStatusChart />
                <MaintenanceCostsChart />
            </div>
        </div>
    );
}
