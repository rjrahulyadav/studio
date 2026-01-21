
import Image from 'next/image';
import { Target, Eye, Heart, Award } from 'lucide-react';
import AnimatedSection from '@/components/animated-section';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const values = [
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'Innovation',
    description: 'We constantly push the boundaries of technology to create novel solutions.',
  },
  {
    icon: <Eye className="h-8 w-8 text-primary" />,
    title: 'Integrity',
    description: 'We operate with transparency and honesty in all our engagements.',
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: 'Client-Centric',
    description: 'Our clients are at the heart of everything we do. Their success is our success.',
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: 'Excellence',
    description: 'We are committed to delivering the highest quality of work and service.',
  },
];

export default function AboutPage() {
  const directorImage = PlaceHolderImages.find(img => img.id === 'director-profile');
  
  return (
    <div>
      <section className="relative py-24 md:py-32 animated-gradient">
        <div className="absolute inset-0 bg-background/60" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-glow-primary">
              About DhaniHya Solutions
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Discover our mission, vision, and the values that drive our commitment to technological excellence.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="font-headline text-3xl font-bold tracking-tight">Our Mission</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                To empower businesses and individuals through innovative technology solutions, fostering a culture of continuous learning and growth. We aim to bridge the gap between industry demands and academic knowledge by providing real-world project experience and mentorship.
              </p>
            </AnimatedSection>
            <AnimatedSection className="md:delay-200">
              <h2 className="font-headline text-3xl font-bold tracking-tight">Our Vision</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                To be a global leader in IT services and technical education, recognized for our commitment to quality, innovation, and social responsibility. We envision a future where technology is accessible and beneficial for everyone.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <AnimatedSection className="flex-shrink-0">
              {directorImage && (
                 <Image
                  src={directorImage.imageUrl}
                  alt={directorImage.description}
                  data-ai-hint={directorImage.imageHint}
                  width={250}
                  height={250}
                  className="rounded-full object-cover border-4 border-primary shadow-2xl"
                />
              )}
            </AnimatedSection>
            <AnimatedSection className="md:delay-200">
              <h2 className="font-headline text-3xl font-bold tracking-tight">
                Meet Our Director
              </h2>
              <h3 className="text-xl font-semibold text-primary mt-1">Dr. K.C Rajheshwari</h3>
              <p className="mt-4 text-lg text-muted-foreground">
                Dr. K.C Rajheshwari, the director of DhaniHya Solutions, is a visionary leader with extensive experience in both academia and the IT industry. Her passion for innovation and dedication to mentorship are the driving forces behind our company's success. She believes in nurturing talent and providing opportunities for aspiring tech professionals to thrive in a real-time environment.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 text-center">
           <AnimatedSection>
             <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Our Core Values</h2>
             <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                The principles that guide our work and define our culture.
              </p>
           </AnimatedSection>
           <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <AnimatedSection key={value.title} className={`delay-${index * 100}`}>
                  <div className="p-6 h-full rounded-lg bg-card/50 border border-border/50">
                    <div className="flex justify-center">{value.icon}</div>
                    <h3 className="mt-4 font-headline text-xl font-bold">{value.title}</h3>
                    <p className="mt-2 text-muted-foreground">{value.description}</p>
                  </div>
                </AnimatedSection>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
