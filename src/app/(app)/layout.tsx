import type { PropsWithChildren } from "react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppLogo } from "@/components/app-logo";
import { SidebarNav } from "@/components/sidebar-nav";
import { User } from "lucide-react";

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <AppLogo />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarNav />
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
                    <div className="md:hidden">
                        <SidebarTrigger />
                    </div>
                    <div className="flex items-center gap-4 ml-auto">
                        {/* User menu can be added here */}
                    </div>
                </header>
                <main className="flex-1 p-4 sm:p-6">
                    {children}
                </main>
                 <footer className="p-4 text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} AssetAI. All Rights Reserved.
                </footer>
            </SidebarInset>
        </SidebarProvider>
    );
}
