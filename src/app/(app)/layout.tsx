'use client';

import type { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppLogo } from "@/components/app-logo";
import { SidebarNav } from "@/components/sidebar-nav";
import { AppHeader } from "@/components/app-header";
import { useUser } from "@/firebase";
import { UserNav } from "@/components/user-nav";

export default function AppLayout({ children }: PropsWithChildren) {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/login');
        }
    }, [user, isUserLoading, router]);

    if (isUserLoading || !user) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                 <div className="flex items-center text-sm text-muted-foreground">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading...</span>
                </div>
            </div>
        );
    }
    
    return (
        <SidebarProvider defaultOpen={false}>
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
                    <div className="flex items-center gap-4">
                        <SidebarTrigger className="text-primary" />
                        <AppHeader />
                    </div>
                    <div className="flex items-center gap-4 ml-auto">
                        <UserNav />
                    </div>
                </header>
                <main className="flex-1">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
