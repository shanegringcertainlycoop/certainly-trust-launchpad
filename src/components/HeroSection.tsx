import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PartnershipDialog } from "@/components/PartnershipDialog";
import certainlyLogo from "@/assets/certainly-logo.png";

export const HeroSection = () => {
  const [isPartnershipOpen, setIsPartnershipOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger staggered reveal on mount
    const timer = setTimeout(() => {
      heroRef.current?.classList.add("visible");
      heroRef.current
        ?.querySelectorAll(".fade-in-up")
        .forEach((el) => el.classList.add("visible"));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PartnershipDialog open={isPartnershipOpen} onOpenChange={setIsPartnershipOpen} />
      <section className="min-h-[90vh] bg-cream flex items-center py-20 px-6 md:px-12 relative grain overflow-hidden">
        <div ref={heroRef} className="max-w-4xl mx-auto w-full text-center hero-stagger">
          <div className="fade-in-up mb-10">
            <img
              src={certainlyLogo}
              alt="Certainly"
              width={200}
              height={64}
              className="h-12 md:h-16 w-auto mx-auto"
            />
          </div>

          <div className="fade-in-up mb-4">
            <span className="section-label">
              Building trust through credentials & content
            </span>
          </div>

          <h1 className="fade-in-up text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-near-black leading-[1.08] text-balance mb-6">
            We help brands earn trust
            <br />
            in an <em className="text-forest-green">uncertain</em> world.
          </h1>

          <p className="fade-in-up text-lg md:text-xl text-foreground/65 leading-relaxed max-w-2xl mx-auto mb-10">
            We help experts, educators, and organizations formalize their expertise into credentials,
            build digital brands that stand out, and create content that multiplies credibility.
          </p>

          <div className="fade-in-up flex items-center justify-center gap-4">
            <Button
              variant="cta"
              size="lg"
              onClick={() => setIsPartnershipOpen(true)}
              className="text-base px-8"
            >
              Explore a Partnership
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
