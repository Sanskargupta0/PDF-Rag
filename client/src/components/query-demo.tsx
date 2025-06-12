
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function QueryDemo() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const demoAnswers = [
    "The document indicates that the quarterly revenue increased by 12% compared to the previous year, exceeding market expectations.",
    "According to page 15, the project timeline has been extended by 3 months due to regulatory approval delays.",
    "The main conclusions from the research suggest that the new methodology improves efficiency by approximately 27% while reducing costs by 18%.",
    "Section 3.2 outlines the five key recommendations, with the most significant being the implementation of an automated monitoring system.",
    "The author argues that climate policies need to be more aggressive, citing the data on page 42 showing accelerating environmental impact."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const randomAnswer = demoAnswers[Math.floor(Math.random() * demoAnswers.length)];
      setAnswer(randomAnswer);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about your document..."
            className="pr-24 bg-background/50 border-accent/30 focus-visible:ring-accent"
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-1 top-1 bg-accent hover:bg-accent/90"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? "Thinking..." : "Ask"}
          </Button>
        </div>
      </form>
      
      {answer && (
        <div className="mt-6 p-4 rounded-lg glassmorphism animate-fade-in">
          <p className="text-sm font-medium mb-1 text-muted-foreground">Answer</p>
          <p className="leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}
