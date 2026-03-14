import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { PartnershipDialog } from "@/components/PartnershipDialog";
import { ServiceSchema, BreadcrumbSchema, FAQSchema } from "@/components/StructuredData";

interface Stat {
  value: string;
  label: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface CaseStudy {
  client: string;
  challenge: string;
  approach: string;
  results: string[];
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
  methodology?: {
    heading: string;
    body: string;
    steps: string[];
  };
  caseStudy?: CaseStudy;
  faq?: FAQItem[];
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
  methodology,
  caseStudy,
  faq,
  testimonial,
  relatedServices,
}: ServicePageProps) => {
  const [partnershipOpen, setPartnershipOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream">
      <SEO title={seoTitle} description={seoDescription} path={path} />
      <ServiceSchema
        name={title}
        description={seoDescription}
        url={`https://certainly.coop${path}`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://certainly.coop" },
          { name: "Services", url: "https://certainly.coop/services" },
          { name: title, url: `https://certainly.coop${path}` },
        ]}
      />
      {faq && faq.length > 0 && <FAQSchema items={faq} />}
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

      {/* Methodology */}
      {methodology && (
        <section className="py-16 md:py-24 bg-light-gray">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-near-black mb-4">
                {methodology.heading}
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-6">
                {methodology.body}
              </p>
              <ol className="space-y-4">
                {methodology.steps.map((step, i) => (
                  <li key={i} className="flex items-start text-foreground/70">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-forest-green text-white text-sm font-semibold flex items-center justify-center mr-3 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* Case Study */}
      {caseStudy && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-widest text-foreground/50 mb-2">
                Case Study
              </p>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-near-black mb-6">
                {caseStudy.client}
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  <span className="font-semibold text-near-black">Challenge: </span>
                  {caseStudy.challenge}
                </p>
                <p>
                  <span className="font-semibold text-near-black">Approach: </span>
                  {caseStudy.approach}
                </p>
                <div>
                  <span className="font-semibold text-near-black">Results:</span>
                  <ul className="mt-2 space-y-1">
                    {caseStudy.results.map((result, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-forest-green mr-2">&#x2713;</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-near-black mb-8">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                {faq.map((item, i) => (
                  <div key={i} className="border-b border-border pb-6">
                    <h3 className="text-lg font-semibold text-near-black mb-2">
                      {item.question}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
