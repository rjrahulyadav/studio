import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BrainCircuit,
  Briefcase,
  Cpu,
  FlaskConical,
  Router,
  Smartphone,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AnimatedSection from '@/components/animated-section';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const services = [
  {
    icon: <Cpu className="h-10 w-10 text-primary" />,
    title: 'Artificial Intelligence',
    description:
      'Developing intelligent systems to automate processes and derive insights from data.',
  },
  {
    icon: <Router className="h-10 w-10 text-primary" />,
    title: 'IoT Solutions',
    description:
      'Connecting physical devices to the internet for smart monitoring and control.',
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: 'Web & Mobile Apps',
    description:
      'Building responsive and performant applications for all platforms.',
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: 'Real-Time Projects',
    description:
      'Gain hands-on experience with industry-level projects and training.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Technical Mentorship',
    description:
      'Expert guidance and problem-solving support to accelerate your growth.',
  },
  {
    icon: <FlaskConical className="h-10 w-10 text-primary" />,
    title: 'Research & Innovation',
    description: 'Supporting R&D initiatives with cutting-edge technology and expertise.',
  },
];

const trustIndicators = [
  { value: '50+', label: 'Projects Completed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '100+', label: 'Students Trained' },
  { value: '10+', label: 'Years of Experience' },
];

export default function Home() {
  const aboutUsImage = PlaceHolderImages.find(img => img.id === 'about-us-image');

  return (
    <div className="flex flex-col">
      <section className="relative h-[90svh] w-full flex items-center justify-center animated-gradient">
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative z-10 text-center px-4">
          <AnimatedSection>
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-glow-primary">
              Engineering the Future.
            </h1>
          </AnimatedSection>
          <AnimatedSection className="delay-200">
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
              DhaniHya Solutions: Your partner in navigating the complexities of
              technology with innovative AI, IoT, and custom software solutions.
            </p>
          </AnimatedSection>
          <AnimatedSection className="delay-400">
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="button-glow-accent bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/services">
                  Our Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="services" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
              Our Expertise
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              We provide a wide range of IT services to empower your business and
              foster innovation.
            </p>
          </AnimatedSection>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} className={`delay-${(index % 3) * 100}`}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:-translate-y-2">
                  <CardHeader className="flex flex-col items-center text-center">
                    {service.icon}
                    <CardTitle className="mt-4 font-headline">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              {aboutUsImage && (
                <Image
                  src={aboutUsImage.imageUrl}
                  alt={aboutUsImage.description}
                  data-ai-hint={aboutUsImage.imageHint}
                  width={800}
                  height={600}
                  className="rounded-lg shadow-2xl"
                />
              )}
            </AnimatedSection>
            <AnimatedSection className="lg:delay-200">
              <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
                About DhaniHya Solutions
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Founded with a passion for technology and a vision for the
                future, DhaniHya Solutions is dedicated to delivering excellence
                and innovation. Led by Dr. K.C Rajheshwari, our team of experts
                is committed to solving complex problems and driving digital
                transformation.
              </p>
              <div className="mt-8 flex justify-start">
                <Button asChild size="lg" variant="link" className="px-0 text-lg text-accent">
                  <Link href="/about">
                    Learn More <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

       <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {trustIndicators.map((indicator, index) => (
               <AnimatedSection key={indicator.label} className={`delay-${index * 100}`}>
                 <div className="p-4 rounded-lg">
                    <h3 className="font-headline text-4xl md:text-5xl font-bold text-primary text-glow-primary">{indicator.value}</h3>
                    <p className="mt-2 text-muted-foreground">{indicator.label}</p>
                 </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
