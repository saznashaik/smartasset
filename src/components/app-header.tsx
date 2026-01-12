 "use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

const pageTitles: { [key: string]: string } = {
    "/dashboard": "SmartAsset Management - Executive Dashboard",
    "/asset-inventory": "Asset Inventory",
    "/chat": "Chat with AssetAI",
};

export function AppHeader() {
    const pathname = usePathname();
    const title = useMemo(() => {
        for (const path in pageTitles) {
            if (pathname.startsWith(path)) {
                return pageTitles[path];
            }
        }
        return "";
    }, [pathname]);

    return (
        <h1 className="text-xl font-semibold hidden md:block">{title}</h1>
    );
}
