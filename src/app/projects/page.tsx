"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AnimatedSection from '@/components/animated-section';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projects = [
  {
    id: 1,
    title: 'AI-Powered Predictive Analytics Platform',
    category: 'AI',
    description:
      'A comprehensive platform that uses machine learning to forecast sales trends and optimize inventory for e-commerce businesses.',
    image: PlaceHolderImages.find(img => img.id === 'project-1'),
  },
  {
    id: 2,
    title: 'Smart Home IoT Ecosystem',
    category: 'IoT',
    description:
      'An integrated system of smart devices for home automation, controllable via a central mobile application.',
    image: PlaceHolderImages.find(img => img.id === 'project-2'),
  },
  {
    id: 3,
    title: 'On-Demand Service Marketplace App',
    category: 'Mobile',
    description:
      'A mobile application connecting users with local service providers, featuring real-time booking and payments.',
    image: PlaceHolderImages.find(img => img.id === 'project-3'),
  },
  {
    id: 4,
    title: 'Cloud-Based ERP System for SMEs',
    category: 'Web',
    description:
      'A scalable and customizable Enterprise Resource Planning system designed to streamline business operations for small to medium enterprises.',
    image: PlaceHolderImages.find(img => img.id === 'project-4'),
  },
  {
    id: 5,
    title: 'Computer Vision for Quality Control',
    category: 'AI',
    description: 'An AI system that uses computer vision to detect defects in manufacturing, improving quality and efficiency.',
    image: PlaceHolderImages.find(img => img.id === 'project-1'),
  },
  {
    id: 6,
    title: 'Agricultural IoT Monitoring System',
    category: 'IoT',
    description: 'A network of sensors to monitor soil moisture, temperature, and crop health, providing farmers with actionable data.',
    image: PlaceHolderImages.find(img => img.id === 'project-2'),
  }
];

const filters = ['All', 'AI', 'IoT', 'Web', 'Mobile'];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div>
      <section className="relative py-24 md:py-32 animated-gradient">
        <div className="absolute inset-0 bg-background/60" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-glow-primary">
              Our Portfolio
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Explore a selection of our projects that demonstrate our expertise and commitment to innovation.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="flex justify-center flex-wrap gap-2 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                onClick={() => setActiveFilter(filter)}
                className={activeFilter === filter ? "bg-primary text-primary-foreground" : ""}
              >
                {filter}
              </Button>
            ))}
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <AnimatedSection key={project.id} className={`delay-${(index % 3) * 100}`}>
                <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:-translate-y-2">
                  {project.image &&
                    <Image
                      src={project.image.imageUrl}
                      alt={project.title}
                      data-ai-hint={project.image.imageHint}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                  }
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit bg-primary/20 text-primary">
                      {project.category}
                    </Badge>
                    <CardTitle className="mt-2 font-headline">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{project.description}</CardDescription>
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
