import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { SubscribeSection } from "@/components/SubscribeSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="smooth-scroll">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default Index;
