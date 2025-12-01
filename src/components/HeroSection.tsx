import { Button } from "@/components/ui/button";
import heroVisual from "@/assets/hero-visual.jpg";

export const HeroSection = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-cream flex items-center py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-near-black leading-tight text-balance">
              We help brands earn trust in an uncertain world.
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/80 font-medium">
              In a noisy market, trust is the only currency that compounds.
            </p>
            
            <p className="text-lg text-foreground/70 leading-relaxed max-w-xl">
              We help experts, educators, and organizations formalize their expertise into credentials, 
              build digital brands that stand out, and create content that multiplies credibility.
            </p>
            
            <div className="pt-6">
              <Button 
                variant="cta" 
                size="lg"
                onClick={scrollToServices}
                className="text-base"
              >
                Explore a Partnership
              </Button>
            </div>
          </div>

          {/* Right: Visual Element */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroVisual} 
                alt="Trust and collaboration visualization"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
