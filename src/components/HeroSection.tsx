import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ContactSection";
import certainlyLogo from "@/assets/certainly-logo.png";

export const HeroSection = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <ContactModal open={isContactOpen} onOpenChange={setIsContactOpen} />
    <section className="min-h-screen bg-cream flex items-center py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto w-full text-center">
        <div className="space-y-6">
          <div className="mb-12">
            <img 
              src={certainlyLogo} 
              alt="Certainly" 
              className="h-12 md:h-16 w-auto mx-auto"
            />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-near-black leading-tight text-balance">
            We help brands earn trust in an uncertain world.
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80 font-medium">
            In a noisy market, trust is the only currency that compounds.
          </p>
          
          <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            We help experts, educators, and organizations formalize their expertise into credentials, 
            build digital brands that stand out, and create content that multiplies credibility.
          </p>
          
          <div className="pt-6">
            <Button 
              variant="cta" 
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="text-base"
            >
              Explore a Partnership
            </Button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};
