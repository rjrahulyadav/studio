import {
  Cpu,
  Router,
  Smartphone,
  Briefcase,
  Users,
  FlaskConical,
  BookOpen,
  Mic,
} from 'lucide-react';
import AnimatedSection from '@/components/animated-section';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const services = [
  {
    icon: <Cpu className="h-10 w-10 text-primary" />,
    title: 'Artificial Intelligence Development',
    description: 'We build intelligent systems that learn, adapt, and perform. From machine learning models to natural language processing, we turn complex data into actionable insights.',
  },
  {
    icon: <Router className="h-10 w-10 text-primary" />,
    title: 'Internet of Things (IoT) Solutions',
    description: 'Our IoT solutions connect your devices, sensors, and platforms to create a seamless network of information, enabling real-time monitoring, automation, and control.',
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: 'Web & Mobile App Development',
    description: 'We design and develop high-performance, user-centric web and mobile applications that are scalable, secure, and deliver an exceptional user experience across all devices.',
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: 'Real-Time Projects & Industrial Training',
    description: 'Gain practical, hands-on experience by working on live industry projects. Our training programs are designed to bridge the gap between theory and real-world application.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Problem Solving & Technical Mentorship',
    description: 'Our team of experts provides dedicated mentorship and guidance to help you navigate technical challenges and accelerate your professional and personal growth.',
  },
  {
    icon: <FlaskConical className="h-10 w-10 text-primary" />,
    title: 'Research & Innovation Support',
    description: 'We collaborate with academic institutions and R&D departments to provide the technical expertise and resources needed to drive groundbreaking research and innovation.',
  },
  {
    icon: <Mic className="h-10 w-10 text-primary" />,
    title: 'Software Consulting',
    description: 'Leverage our expertise to optimize your software architecture, improve development processes, and make informed technology decisions that align with your business goals.',
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: 'Training Modules',
    description: 'Upskill your team with our specialized training modules covering the latest technologies in AI, IoT, and software development, tailored to your organization\'s needs.',
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="relative py-24 md:py-32 animated-gradient">
        <div className="absolute inset-0 bg-background/60" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-glow-primary">
              Our Services
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              A comprehensive suite of IT services designed to drive growth, efficiency, and innovation.
            </p>
          </AnimatedSection>
        </div>
      </section>
      
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} className={`delay-${(index % 3) * 100}`}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:-translate-y-2 flex flex-col">
                  <CardHeader>
                    {service.icon}
                    <CardTitle className="mt-4 font-headline">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
