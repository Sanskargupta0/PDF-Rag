
import { Button } from "@/components/ui/button";

export function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 mt-16 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              &copy; {year} PDF Zenith. All rights reserved.
            </p>
          </div>
          
          <nav className="flex gap-6">
            <Button variant="link" className="text-sm text-muted-foreground p-0 h-auto">Privacy</Button>
            <Button variant="link" className="text-sm text-muted-foreground p-0 h-auto">Terms</Button>
            <Button variant="link" className="text-sm text-muted-foreground p-0 h-auto">Contact</Button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
