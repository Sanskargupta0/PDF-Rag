
import React, { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Particle properties
    const particleCount = 70;
    const particleMaxSize = 3;
    const particleMinSize = 1;
    const particleMaxSpeed = 0.5;
    const lineMaxDistance = 150;
    
    // Create particles
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (particleMaxSize - particleMinSize) + particleMinSize,
        speedX: (Math.random() - 0.5) * particleMaxSpeed,
        speedY: (Math.random() - 0.5) * particleMaxSpeed,
      });
    }

    // Mouse position for parallax effect
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animation loop
    function animate() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        // Add parallax effect
        const parallaxX = (mouseX - window.innerWidth / 2) * 0.01;
        const parallaxY = (mouseY - window.innerHeight / 2) * 0.01;

        // Update position with boundaries
        particle.x += particle.speedX + parallaxX * (particle.size / particleMaxSize);
        particle.y += particle.speedY + parallaxY * (particle.size / particleMaxSize);

        // Boundary check
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Get theme from document
        const isDarkMode = document.documentElement.classList.contains("dark");
        
        // Draw with gradient based on theme
        if (isDarkMode) {
          ctx.fillStyle = `rgba(99, 179, 237, ${0.5 + particle.size / particleMaxSize * 0.5})`;
        } else {
          ctx.fillStyle = `rgba(66, 153, 225, ${0.3 + particle.size / particleMaxSize * 0.3})`;
        }
        
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const particle2 = particles[j];
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < lineMaxDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            
            if (isDarkMode) {
              ctx.strokeStyle = `rgba(99, 179, 237, ${1 - distance / lineMaxDistance})`;
            } else {
              ctx.strokeStyle = `rgba(66, 153, 225, ${0.8 - distance / lineMaxDistance})`;
            }
            
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[-1] w-full h-full opacity-50"
    />
  );
}
