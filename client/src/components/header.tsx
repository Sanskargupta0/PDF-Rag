
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glassmorphism bg-background/70 dark:bg-background/40 backdrop-blur-lg">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-accent">
            PDF Zenith
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-4">
            <Button variant="link" className="text-foreground">Features</Button>
            <Button variant="link" className="text-foreground">FAQ</Button>
            <Button variant="link" className="text-foreground">About</Button>
          </nav>
          
          <ThemeToggle />
          
          <Button size="sm" className="bg-accent hover:bg-accent/90">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
