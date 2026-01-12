 "use client";

import { usePathname } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

const pageTitles: { [key: string]: string } = {
    "/dashboard": "Smart Asset Management - Executive Dashboard",
    "/asset-inventory": "Asset Inventory",
    "/chat": "Chat with Smart Asset Bot",
};

export function AppHeader() {
    const pathname = usePathname();
    const [title, setTitle] = useState("");

    useEffect(() => {
        for (const path in pageTitles) {
            if (pathname.startsWith(path)) {
                setTitle(pageTitles[path]);
                return;
            }
        }
        setTitle("");
    }, [pathname]);

    return (
        <h1 className="text-xl font-semibold hidden md:block">{title}</h1>
    );
}
