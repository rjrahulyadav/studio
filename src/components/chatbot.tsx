"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { MessageCircle, Send, ChevronLeft, Bot, User, Mic } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

type Message = {
  role: "user" | "bot";
  content: string;
};

// For cross-browser compatibility
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

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
  const [isListening, setIsListening] = useState(false);
  const [speechSupport, setSpeechSupport] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

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
  
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupport(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        // Automatically submit after voice input
        handleSubmit(new (window.Event as any)('submit'), transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        toast({
          variant: "destructive",
          title: "Voice Error",
          description: "Something went wrong with voice recognition.",
        });
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupport(false);
    }
  }, [toast]);

  const handleListen = () => {
    if (!speechSupport) {
        toast({
            variant: "destructive",
            title: "Browser Not Supported",
            description: "Your browser does not support voice commands.",
        });
        return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSubmit = async (e: FormEvent | Event, voiceInput?: string) => {
    e.preventDefault();
    const currentInput = voiceInput || input;
    if (!currentInput.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: currentInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await supportChatbot({ query: currentInput });
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
          <CardHeader className="flex flex-row items-center justify-between bg-destructive p-4 text-destructive-foreground">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-destructive-foreground" />
              </div>
              <div>
                <p className="font-semibold">Dr. K.C Rajheshwari</p>
                <p className="text-xs text-white/80">Director</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} aria-label="Close chat" className="hover:bg-white/20">
                <ChevronLeft className="h-6 w-6" />
            </Button>
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
                placeholder={isListening ? "Listening..." : "Ask a question..."}
                disabled={isLoading}
                className="bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button type="button" size="icon" onClick={handleListen} disabled={!speechSupport || isLoading} className={cn("shrink-0", isListening ? "bg-destructive hover:bg-destructive/90" : "bg-accent hover:bg-accent/90")}>
                <Mic className="h-5 w-5 text-accent-foreground" />
              </Button>
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="bg-accent hover:bg-accent/90 shrink-0">
                <Send className="h-5 w-5 text-accent-foreground" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
