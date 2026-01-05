import type { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-1 flex-col h-[calc(100vh-4rem)]">
            {children}
        </div>
    );
}
