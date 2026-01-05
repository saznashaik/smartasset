import type { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <div className="h-screen w-screen -m-4 sm:-m-6">
            {children}
        </div>
    );
}
