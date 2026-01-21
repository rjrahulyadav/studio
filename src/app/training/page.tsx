"use client";

import { useEffect, useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import AnimatedSection from '@/components/animated-section';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth, useFirestore, useUser } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';

const trainingModules = [
  {
    id: 'full-stack-bootcamp',
    title: 'Full-Stack Web Development Bootcamp',
    description: 'An intensive 12-week program covering everything from front-end frameworks like React to back-end development with Node.js and databases.',
  },
  {
    id: 'ml-ai-specialization',
    title: 'Machine Learning & AI Specialization',
    description: 'A deep dive into machine learning algorithms, neural networks, and computer vision. Work on real-world datasets and build intelligent models.',
  },
  {
    id: 'iot-embedded-workshop',
    title: 'IoT and Embedded Systems Workshop',
    description: 'Learn to build and program IoT devices using platforms like Arduino and Raspberry Pi. Covers sensor integration, data communication, and cloud connectivity.',
  },
  {
    id: 'advanced-mobile-dev',
    title: 'Advanced Mobile App Development',
    description: 'Master native and cross-platform mobile app development for iOS and Android, focusing on performance, UI/UX, and modern development practices.',
  },
];

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  module: z.string(),
  moduleId: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function TrainingPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<{id: string, title: string} | null>(null);
  
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    if (auth && !isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      module: "",
      moduleId: "",
    },
  });

  const handleRegisterClick = (module: {id: string, title: string}) => {
    setSelectedModule(module);
    form.setValue("module", module.title);
    form.setValue("moduleId", module.id);
    setIsDialogOpen(true);
  };
  
  const onSubmit = (data: FormData) => {
    if (!firestore) return;

    addDocumentNonBlocking(collection(firestore, 'trainingModules', data.moduleId, 'applicants'), {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      trainingModuleId: data.moduleId,
      applicationDate: new Date().toISOString(),
    });

    toast({
      title: "Registration Successful!",
      description: `Thank you for registering for the ${data.module} module. We will be in touch shortly.`,
    });
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <div>
      <section className="relative py-24 md:py-32 animated-gradient">
        <div className="absolute inset-0 bg-background/60" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-glow-primary">
              Careers & Training
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Invest in your future with our industry-leading training programs and internship opportunities.
            </p>
          </AnimatedSection>
        </div>
      </section>
      
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-center font-headline text-3xl md:text-4xl font-bold tracking-tight">Training Modules</h2>
            <p className="mt-4 text-center max-w-2xl mx-auto text-lg text-muted-foreground">
              Our training modules are designed to provide practical, hands-on experience and prepare you for a successful career in tech.
            </p>
          </AnimatedSection>
          
          <div className="mt-12 space-y-8">
            {trainingModules.map((module, index) => (
              <AnimatedSection key={module.title} className={`delay-${index * 100}`}>
                <div className="p-6 rounded-lg bg-card/50 border border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h3 className="font-headline text-xl font-bold">{module.title}</h3>
                    <p className="mt-2 text-muted-foreground">{module.description}</p>
                  </div>
                  <Button 
                    onClick={() => handleRegisterClick(module)} 
                    className="button-glow-accent bg-accent text-accent-foreground hover:bg-accent/90 shrink-0"
                  >
                    Register Now
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card/80 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="font-headline text-primary">Register for Training</DialogTitle>
            <DialogDescription>
              Complete the form to register for the "{selectedModule?.title}" module.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
               <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Submit Registration
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
