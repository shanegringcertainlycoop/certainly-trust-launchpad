import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesOverview } from "@/components/ServicesOverview";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { BlogSection } from "@/components/BlogSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { OrganizationSchema, WebSiteSchema } from "@/components/StructuredData";

const Index = () => {
  return (
    <div className="smooth-scroll">
      <SEO
        title="Certainly | Building Trust Through Credentials & Content"
        description="We help brands earn trust through certification programs, digital brand building, and trust-multiplying content. A cooperative of builders, writers, and strategists."
        path="/"
      />
      <OrganizationSchema />
      <WebSiteSchema />
      <Header />
      <HeroSection />
      <ServicesOverview />
      <TestimonialsSlider />
      <BlogSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
