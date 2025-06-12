
import { cn } from "@/lib/utils";

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

export function FeatureCard({ 
  title, 
  description, 
  icon, 
  className,
  index,
  ...props 
}: FeatureCardProps) {
  return (
    <div 
      className={cn(
        "relative p-6 rounded-2xl glassmorphism transition-all hover:shadow-lg",
        className
      )}
      style={{ 
        animationDelay: `${index * 150}ms` 
      }}
      {...props}
    >
      <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-accent/20 text-accent">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
