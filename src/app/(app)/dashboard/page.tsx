import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, ShieldHalf, DollarSign, Wrench, ShieldCheck } from "lucide-react";
import { dashboardData } from "@/lib/data";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">Asset Management Executive Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
                        <Layers className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-headline">{dashboardData.totalAssets.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">High Risk & Critical Risks</CardTitle>
                        <ShieldHalf className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-headline">{dashboardData.highRiskAssets.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Replacement Cost</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-headline">${dashboardData.replacementCost.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Assets Currently in Repair</CardTitle>
                        <Wrench className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-headline">{dashboardData.assetsInRepair.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">({(dashboardData.assetsInRepair / dashboardData.totalAssets * 100).toFixed(1)}%)</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Warranties Expiring (2025-2027)</CardTitle>
                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-headline">{dashboardData.warrantiesExpiring.toLocaleString()}</div>
                    </CardContent>
                </Card>
            </div>
             <div className="grid gap-6">
                <Card className="h-[400px] flex items-center justify-center">
                    <CardContent>
                        <div className="flex flex-col items-center text-muted-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 h-12 w-12"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                            <p>Chart data not available</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
