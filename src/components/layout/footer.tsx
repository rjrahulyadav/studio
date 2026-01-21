import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/training', label: 'Training' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
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
  {
    href: '#',
    icon: <Linkedin className="h-5 w-5" />,
    label: 'LinkedIn',
  },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <h3 className="font-headline text-xl font-bold text-primary">
              DhaniHya Solutions
            </h3>
            <p className="mt-2 text-muted-foreground max-w-xs">
              Pioneering the future of technology through innovation and excellence.
            </p>
          </div>
          <div className="md:mx-auto">
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
          <div className="md:ml-auto">
            <h4 className="font-semibold tracking-wide text-foreground">Connect With Us</h4>
            <p className="mt-4 text-muted-foreground">
              contact@dhaniyasolutions.com
            </p>
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
            &copy; {new Date().getFullYear()} DhaniHya Solutions Pvt Ltd. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
