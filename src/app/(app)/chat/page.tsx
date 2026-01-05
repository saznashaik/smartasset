"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatWithAI } from "@/ai/flows/integrate-ai-chat";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Bot, Loader2, Send, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Message {
    role: "user" | "ai";
    content: string;
}

const chatSchema = z.object({
    query: z.string().min(1, "Message cannot be empty."),
});

type ChatFormData = z.infer<typeof chatSchema>;

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ChatFormData>({
        resolver: zodResolver(chatSchema),
        defaultValues: { query: "" },
    });

    const onSubmit = async (data: ChatFormData) => {
        setIsLoading(true);
        const userMessage: Message = { role: "user", content: data.query };
        setMessages((prev) => [...prev, userMessage]);
        form.reset();

        try {
            const response = await chatWithAI({ query: data.query });
            const aiMessage: Message = { role: "ai", content: response.response };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = {
                role: "ai",
                content: "Sorry, I couldn't process that. Please try again.",
            };
            setMessages((prev) => [...prev, errorMessage]);
            console.error("Chat error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="h-[calc(100vh-8rem)] flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Bot /> AI Chat Assistant</CardTitle>
                <CardDescription>Ask me anything about assets, dashboards, or system functionalities.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                    <div className="space-y-4">
                        {messages.length === 0 && !isLoading && (
                            <div className="text-center text-muted-foreground pt-16">
                                <p>No messages yet. Start the conversation!</p>
                            </div>
                        )}
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "flex items-start gap-4",
                                    message.role === "user" && "justify-end"
                                )}
                            >
                                {message.role === "ai" && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20} /></AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={cn(
                                        "max-w-md rounded-lg p-3 text-sm",
                                        message.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted"
                                    )}
                                >
                                    {message.content}
                                </div>
                                {message.role === "user" && (
                                     <Avatar className="h-8 w-8">
                                        <AvatarFallback><User size={20} /></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-start gap-4">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={20} /></AvatarFallback>
                                </Avatar>
                                <div className="max-w-md rounded-lg p-3 bg-muted flex items-center">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
            <div className="p-4 border-t">
                 <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
                    <Input
                        {...form.register("query")}
                        placeholder="Type your message..."
                        autoComplete="off"
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </Card>
    );
}
