import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Github, Menu, X } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when clicking on a link
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const NavLink = ({ children, id }: { children: React.ReactNode; id: string }) => (
    <Button
      variant="link"
      onClick={() => scrollToSection(id)}
      className="text-foreground hover:no-underline hover:opacity-80 transition-opacity"
    >
      {children}
    </Button>
  );

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 glassmorphism backdrop-blur-lg transition-all duration-300 ${
        scrolled ? 'bg-background/90 dark:bg-background/80 shadow-md' : 'bg-background/70 dark:bg-background/40'
      }`}
    >
      <div className="container flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-accent">PDF Zenith</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="link" asChild className="text-foreground hover:no-underline">
            <a href="https://github.com/yourusername/pdf-zenith" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              <span>GitHub</span>
            </a>
          </Button>
          <NavLink id="features">Features</NavLink>
          <NavLink id="faq">FAQ</NavLink>
          
          <div className="flex items-center gap-2 ml-2">
            <ThemeToggle />
            <SignedOut>
              <SignInButton>
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  Get Started
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative z-60"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '4rem' }}
      >
        <div className="container px-6 py-8 flex flex-col items-center space-y-6 bg-white dark:bg-[#080c16]">
          <Button 
            variant="ghost" 
            asChild 
            className="w-full justify-center text-lg py-6"
            onClick={() => scrollToSection('features')}
          >
            <span>Features</span>
          </Button>
          <Button 
            variant="ghost" 
            asChild 
            className="w-full justify-center text-lg py-6"
            onClick={() => scrollToSection('faq')}
          >
            <span>FAQ</span>
          </Button>
          <Button 
            variant="ghost" 
            asChild 
            className="w-full justify-center text-lg py-6"
          >
            <a href="https://github.com/yourusername/pdf-zenith" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
          <div className="w-full pt-4 border-t border-border mt-4">
            <SignedOut>
              <SignInButton>
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90 h-12 text-base">
                  Get Started
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
