import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { PartnershipDialog } from "@/components/PartnershipDialog";
import { BreadcrumbSchema } from "@/components/StructuredData";

interface RelevantService {
  title: string;
  description: string;
  href: string;
}

interface AudiencePageProps {
  /** Short label shown above the headline */
  label: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  path: string;
  /** Empathy-driven pain points the audience faces */
  challenges: {
    heading: string;
    body: string;
    items: string[];
  };
  /** How Certainly addresses those challenges */
  solutions: {
    heading: string;
    body: string;
    items: { title: string; description: string }[];
  };
  /** Services most relevant to this audience */
  relevantServices: RelevantService[];
  /** CTA section */
  cta: {
    heading: string;
    body: string;
    buttonLabel?: string;
  };
  /** Links to other audience verticals */
  otherAudiences: { label: string; href: string }[];
}

export const AudiencePageLayout = ({
  label,
  title,
  description,
  seoTitle,
  seoDescription,
  path,
  challenges,
  solutions,
  relevantServices,
  cta,
  otherAudiences,
}: AudiencePageProps) => {
  const [partnershipOpen, setPartnershipOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream">
      <SEO title={seoTitle} description={seoDescription} path={path} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://certainly.coop" },
          { name: label, url: `https://certainly.coop${path}` },
        ]}
      />
      <PartnershipDialog
        open={partnershipOpen}
        onOpenChange={setPartnershipOpen}
      />
      <Header />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-near-black text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-white/50 font-sans text-sm uppercase tracking-widest mb-4">
            {label}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif max-w-4xl mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
            {description}
          </p>
          <div className="mt-8">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setPartnershipOpen(true)}
            >
              Let's Talk
            </Button>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-near-black mb-4">
              {challenges.heading}
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-6">
              {challenges.body}
            </p>
            <ul className="space-y-3">
              {challenges.items.map((item, i) => (
                <li key={i} className="flex items-start text-foreground/70">
                  <span className="text-accent-burgundy mr-3 mt-1 text-lg leading-none">
                    &mdash;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-near-black mb-4">
              {solutions.heading}
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              {solutions.body}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
            {solutions.items.map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-near-black mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/65 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relevant Services */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-near-black mb-8">
            Services for you
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relevantServices.map((svc) => (
              <Link
                key={svc.href}
                to={svc.href}
                className="group block bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-border/50"
              >
                <h3 className="text-lg font-semibold text-near-black mb-2 group-hover:text-forest-green transition-colors">
                  {svc.title}
                </h3>
                <p className="text-sm text-foreground/65 leading-relaxed">
                  {svc.description}
                </p>
                <span className="inline-block mt-4 text-sm font-medium text-primary">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-forest-green text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {cta.heading}
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            {cta.body}
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setPartnershipOpen(true)}
          >
            {cta.buttonLabel ?? "Explore a Partnership"}
          </Button>
        </div>
      </section>

      {/* Other Audiences */}
      <section className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-sm text-foreground/60 mb-4">
            Also serving:
          </p>
          <div className="flex flex-wrap gap-4">
            {otherAudiences.map((aud) => (
              <Link
                key={aud.href}
                to={aud.href}
                className="text-sm font-medium text-primary hover:underline"
              >
                {aud.label} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
