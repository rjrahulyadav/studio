import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Our Projects' },
  { href: '/training', label: 'Careers' },
];

const socialLinks = [
  {
    href: '#',
    icon: <Linkedin className="h-5 w-5" />,
    label: 'LinkedIn',
  },
  {
    href: '#',
    icon: <Twitter className="h-5 w-5" />,
    label: 'Twitter',
  },
  {
    href: '#',
    icon: <Github className="h-5 w-5" />,
    label: 'GitHub',
  },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <h3 className="font-headline text-xl font-bold text-primary">
              Dhanihya Solutions Pvt Ltd
            </h3>
            <p className="mt-2 text-muted-foreground max-w-xs">
              Empowering the future with cutting-edge solutions in AI, IoT, and software development. Innovation is our DNA.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold tracking-wide text-foreground">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold tracking-wide text-foreground">Contact</h4>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  Junction Main Rd, Salem, Tamil Nadu 636005
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+919600516927" className="text-muted-foreground hover:text-primary">
                  +91 9600516927
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:director@dhanihyasolutions.com" className="text-muted-foreground hover:text-primary break-all">
                  director@dhanihyasolutions.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold tracking-wide text-foreground">Connect</h4>
            <div className="mt-4 flex space-x-2">
              {socialLinks.map((social) => (
                <Button key={social.label} variant="ghost" size="icon" asChild>
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Dhanihya Solutions Pvt Ltd. All
            rights reserved.
          </p>
           <p className="mt-2">
            <Link href="/admin/login" className="hover:text-primary">Admin Login</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
