"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import Image from "next/image";
import { MessageCircle, Send, ChevronLeft, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { supportChatbot } from "@/ai/flows/support-chatbot";
import { PlaceHolderImages } from "@/lib/placeholder-images";

type Message = {
  role: "user" | "bot";
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Welcome to Dhanihya Solutions! I'm your AI assistant. How can I help you today? You can ask about our services, projects, or training programs.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const directorImage = PlaceHolderImages.find(img => img.id === 'director-profile');

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (scrollAreaRef.current) {
      setTimeout(() => {
        scrollAreaRef.current?.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await supportChatbot({ query: input });
      const botMessage: Message = { role: "bot", content: response.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      let content = "Sorry, I encountered an error. Please try again.";
      if (error.message && /api key/i.test(error.message)) {
          content = "It seems the Gemini API key is missing or invalid. Please add your `GEMINI_API_KEY` to the .env file to enable the chatbot.";
      }
      const errorMessage: Message = {
        role: "bot",
        content,
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Chatbot error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={cn("fixed bottom-6 right-6 z-50 transition-transform duration-300", isOpen ? "scale-0" : "scale-100")}>
        <Button
          onClick={toggleChat}
          className="rounded-full w-16 h-16 button-glow-accent bg-accent hover:bg-accent/90"
          aria-label="Open chat"
        >
          <MessageCircle className="w-8 h-8 text-accent-foreground" />
        </Button>
      </div>

      <div className={cn("fixed bottom-6 right-6 z-50 w-full max-w-sm transition-all duration-300", isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none")}>
        <Card className="flex flex-col h-[70vh] max-h-[700px] bg-card/80 backdrop-blur-xl border-border/60 shadow-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-3 bg-destructive text-destructive-foreground p-3">
            <Button variant="ghost" size="icon" onClick={toggleChat} aria-label="Close chat" className="-ml-1 hover:bg-black/20">
                <ChevronLeft className="h-6 w-6" />
            </Button>
            {directorImage && (
                <Image
                    src={directorImage.imageUrl}
                    alt="Dr. K.C Rajheshwari"
                    width={32}
                    height={32}
                    className="rounded-full"
                />
            )}
            <div>
                <p className="font-semibold text-sm">Dr. K.C Rajheshwari</p>
                <p className="text-xs text-destructive-foreground/80">Director</p>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
              <div className="space-y-6 p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start gap-3",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "px-4 py-3 rounded-lg max-w-[80%] shadow-md",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-t-2xl rounded-bl-2xl"
                          : "bg-secondary text-secondary-foreground rounded-t-2xl rounded-br-2xl"
                      )}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                     {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                   <div className="flex items-start gap-3 justify-start">
                     <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                      <div className="p-3 rounded-lg bg-secondary flex items-center space-x-1.5">
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                   </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t border-border/60">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={isLoading}
                className="bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button type="submit" size="icon" disabled={isLoading} className="bg-accent hover:bg-accent/90 shrink-0">
                <Send className="h-5 w-5 text-accent-foreground" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
