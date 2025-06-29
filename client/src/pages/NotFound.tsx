import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AnimatedBackground } from "@/components/animated-background";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <AnimatedBackground />
      <section className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-8xl md:text-9xl font-bold mb-6 gradient-heading animate-pulse">
            404
          </h1>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-heading">
            Oops! Page Not Found
          </h2>
          
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => navigate(-1)}
              variant="outline"
              size="lg"
              className="group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Button>
            
            <Button 
              onClick={() => navigate('/')}
              size="lg"
              className="group"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
