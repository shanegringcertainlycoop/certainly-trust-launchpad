import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="smooth-scroll">
      <HeroSection />
      <ServicesSection />
      <TestimonialsSlider />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
