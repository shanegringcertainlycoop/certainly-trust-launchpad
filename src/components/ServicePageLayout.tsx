import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { PartnershipDialog } from "@/components/PartnershipDialog";

interface Stat {
  value: string;
  label: string;
}

interface ServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  path: string;
  sections: {
    heading: string;
    body: string;
    items?: string[];
  }[];
  stats?: Stat[];
  testimonial?: {
    quote: string;
    name: string;
    title: string;
  };
  relatedServices: {
    label: string;
    href: string;
  }[];
}

export const ServicePageLayout = ({
  title,
  subtitle,
  description,
  seoTitle,
  seoDescription,
  path,
  sections,
  stats,
  testimonial,
  relatedServices,
}: ServicePageProps) => {
  const [partnershipOpen, setPartnershipOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream">
      <SEO title={seoTitle} description={seoDescription} path={path} />
      <PartnershipDialog
        open={partnershipOpen}
        onOpenChange={setPartnershipOpen}
        serviceName={title}
      />
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-forest-green text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-primary-foreground/70 font-sans text-sm uppercase tracking-widest mb-4">
            {subtitle}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif max-w-4xl mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
            {description}
          </p>
          <div className="mt-8">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setPartnershipOpen(true)}
            >
              Talk to Us About This
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <section className="py-12 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-4xl font-serif font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-foreground/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content Sections */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl space-y-16">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-near-black mb-4">
                  {section.heading}
                </h2>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  {section.body}
                </p>
                {section.items && (
                  <ul className="space-y-2 mt-4">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start text-foreground/70">
                        <span className="text-forest-green mr-3 mt-1">&#x2022;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {testimonial && (
        <section className="py-16 md:py-24 bg-light-gray">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <blockquote className="text-2xl md:text-3xl font-serif text-near-black leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-semibold text-near-black">{testimonial.name}</p>
                <p className="text-sm text-foreground/60">{testimonial.title}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 bg-near-black text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Ready to strengthen your certification brand?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Connect with a Certainly advisor to learn how we can support your goals.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setPartnershipOpen(true)}
          >
            Explore a Partnership
          </Button>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-sm text-foreground/60 mb-4">Other services:</p>
          <div className="flex flex-wrap gap-4">
            {relatedServices.map((svc) => (
              <Link
                key={svc.href}
                to={svc.href}
                className="text-sm font-medium text-primary hover:underline"
              >
                {svc.label} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
