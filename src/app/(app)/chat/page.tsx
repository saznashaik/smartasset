"use client";

import { Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ChatPage() {
    return (
        <Card className="h-[calc(100vh-10rem)] flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Bot /> AI Chat Assistant</CardTitle>
                <CardDescription>Ask me anything about your assets.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <iframe
                    src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/430248170338/chatagents/15dcd6d3-12e0-4bcc-b0bb-999a4a3de9c3?directory_alias=Keerthisri"
                    style={{ border: 'none', width: '100%', height: '100%' }}>
                </iframe>
            </CardContent>
        </Card>
    );
}
