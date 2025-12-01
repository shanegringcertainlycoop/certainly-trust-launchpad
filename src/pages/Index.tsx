import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { FeaturedWorkSection } from "@/components/FeaturedWorkSection";
import { AboutSection } from "@/components/AboutSection";
import { SubscribeSection } from "@/components/SubscribeSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="smooth-scroll">
      <HeroSection />
      <ServicesSection />
      <FeaturedWorkSection />
      <AboutSection />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default Index;
