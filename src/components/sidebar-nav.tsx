"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BotMessageSquare, BrainCircuit } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/predict", label: "Predictive Analysis", icon: BrainCircuit },
    { href: "/chat", label: "AI Chat", icon: BotMessageSquare },
];

export function SidebarNav() {
    const pathname = usePathname();

    return (
        <SidebarMenu>
            {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                        <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)}>
                            <a>
                                <item.icon />
                                <span>{item.label}</span>
                            </a>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}
