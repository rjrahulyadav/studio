import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import AnimatedSection from "@/components/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ContactPage() {
    const mapImage = PlaceHolderImages.find(img => img.id === 'contact-map');

  return (
    <div>
      <section className="relative py-24 md:py-32 animated-gradient">
        <div className="absolute inset-0 bg-background/60" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <AnimatedSection>
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-glow-primary">
              Contact Us
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              We're here to help. Reach out to us for project inquiries, training information, or any other questions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <h2 className="font-headline text-3xl font-bold tracking-tight">Get in Touch</h2>
              <p className="mt-4 text-muted-foreground">
                Fill out the form below, and a member of our team will get back to you as soon as possible.
              </p>
              <form className="mt-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input type="text" placeholder="Your Name" required />
                  <Input type="email" placeholder="Your Email" required />
                </div>
                <Input type="text" placeholder="Subject" required />
                <Textarea placeholder="Your Message" rows={5} required />
                <Button type="submit" className="w-full button-glow-accent bg-accent text-accent-foreground hover:bg-accent/90">
                  Send Message
                </Button>
              </form>
            </AnimatedSection>

            <AnimatedSection className="lg:delay-200">
              <h2 className="font-headline text-3xl font-bold tracking-tight">Contact Information</h2>
              <p className="mt-4 text-muted-foreground">
                Alternatively, you can reach us through the following channels:
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:contact@dhaniyasolutions.com" className="text-muted-foreground hover:text-primary">
                      contact@dhaniyasolutions.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">(+91) 123-456-7890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-muted-foreground">123 Tech Park, Innovation Hub, Bangalore, India</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <AnimatedSection className="w-full">
        {mapImage && (
             <Image
              src={mapImage.imageUrl}
              alt={mapImage.description}
              data-ai-hint={mapImage.imageHint}
              width={1600}
              height={400}
              className="w-full h-80 object-cover"
            />
        )}
      </AnimatedSection>
    </div>
  );
}
