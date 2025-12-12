import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { BlogSection } from "@/components/BlogSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="smooth-scroll">
      <HeroSection />
      <ServicesSection />
      <TestimonialsSlider />
      <BlogSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
