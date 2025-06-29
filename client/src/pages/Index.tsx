
import { useEffect, useRef } from "react";
import { AnimatedBackground } from "@/components/animated-background";
import { PDFUpload } from "@/components/pdf-upload";
import { QueryDemo } from "@/components/query-demo";
import { FAQSection } from "@/components/faq-section";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/feature-card";
import { Book, CloudUpload, Eye } from "lucide-react";

const Index = () => {
  const featureSectionRef = useRef<HTMLDivElement>(null);

  // Parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const hero = document.querySelector('.hero-content');
      const featuresTitle = document.querySelector('.features-title');
      
      if (hero) {
        (hero as HTMLElement).style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      
      if (featuresTitle) {
        (featuresTitle as HTMLElement).style.transform = `translateY(${scrollY * 0.1}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeatures = () => {
    featureSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 pt-16">
        <div className="container max-w-4xl mx-auto text-center hero-content">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-heading animate-slide-down">
            Unlock Insights from Your PDF Documents
          </h1>
          
          <p className="text-xl mb-12 text-muted-foreground max-w-2xl mx-auto animate-slide-down" 
             style={{ animationDelay: "150ms" }}>
            Upload your PDF and ask questions in natural language. 
            Get accurate answers instantly, powered by advanced AI.
          </p>
          
          <div className="flex flex-col gap-4 items-center animate-slide-up" 
               style={{ animationDelay: "300ms" }}>
            <PDFUpload />
            
            <div className="mt-6">
              <QueryDemo />
            </div>
          </div>
          
          <div className="mt-14 animate-fade-in" style={{ animationDelay: "450ms" }}>
            <Button 
              onClick={scrollToFeatures}
              variant="secondary" 
              size="lg"
              className="group"
            >
              Discover Features
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-2 transition-transform group-hover:translate-y-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featureSectionRef}
        className="py-24 px-4"
        id="features"
      >
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-40 gradient-heading features-title">
            Powerful Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Intelligent Document Analysis"
              description="Our AI technology reads and understands your PDFs, extracting key information and relationships between concepts."
              icon={<Eye className="h-6 w-6" />}
              index={0}
              className="animate-slide-up"
            />
            
            <FeatureCard
              title="Seamless PDF Upload"
              description="Drag and drop your PDFs or select them from your device. We support documents of any size or complexity."
              icon={<CloudUpload className="h-6 w-6" />}
              index={1}
              className="animate-slide-up"
            />
            
            <FeatureCard
              title="Natural Language Queries"
              description="Ask questions in plain English and get concise, accurate answers directly from your document content."
              icon={<Book className="h-6 w-6" />}
              index={2}
              className="animate-slide-up"
            />
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24 px-4 bg-secondary/30 dark:bg-secondary/10">
        <div className="container">
          <FAQSection />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading">
            Ready to Get Started?
          </h2>
          
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Upload your first PDF and experience the power of intelligent document querying.
          </p>
          
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Try PDF Zenith Now
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
