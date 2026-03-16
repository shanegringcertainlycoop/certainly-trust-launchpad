import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { PartnershipDialog } from "@/components/PartnershipDialog";
import { BreadcrumbSchema } from "@/components/StructuredData";

const programs = [
  {
    title: "Create Your Own Credential\u2122",
    summary: "Transform your method into a market-recognized standard.",
    description:
      "We help you codify your expertise into a structured, professional credential \u2014 complete with governance, assessment, and renewal cycles.",
    longDescription:
      "Whether you're an industry association, a consulting firm with a proprietary method, or an educator with deep domain expertise \u2014 we've built the playbook for turning knowledge into a credential the market trusts. Our team has designed and launched certification programs for organizations like IWBI and DRVN, and we bring that same rigor to every engagement.",
    outcomes: [
      "Recurring revenue stream",
      "IP protection and credibility",
      "Certified community of advocates",
    ],
    trustedBy: [
      { name: "IWBI", logo: "/logos/iwbi.png" },
      { name: "USGBC", logo: "/logos/usgbc.png" },
      { name: "DRVN", logo: "/logos/drvn.png" },
    ],
    url: "https://offer.certainly.coop/",
    accent: "bg-forest-green",
  },
  {
    title: "Digital Brand Build\u2122",
    summary: "Your message deserves a platform that inspires confidence.",
    description:
      "We design and build digital ecosystems that reflect your authority \u2014 from your website to your messaging to your visual identity.",
    longDescription:
      "Your brand is your trust signal. We build cohesive digital experiences \u2014 websites, messaging frameworks, and visual identities \u2014 that make certification bodies and mission-driven organizations look as credible as they are. Every build is designed for conversion, clarity, and long-term brand equity.",
    outcomes: [
      "Cohesive brand presence",
      "Increased inbound opportunities",
      "Elevated perceived value",
    ],
    trustedBy: [
      { name: "IWBI", logo: "/logos/iwbi.png" },
      { name: "Pinchin", logo: "/logos/pinchin.png" },
      { name: "CodeGreen", logo: "/logos/codegreen.png" },
    ],
    url: "https://30dayweb.certainly.coop",
    accent: "bg-accent-burgundy",
  },
  {
    title: "Trust-Multiplying Content\u2122",
    summary: "Turn proof into persuasion with consistent content.",
    description:
      "We turn your certification, case studies, and outcomes into powerful content that compounds trust over time.",
    longDescription:
      "Content is how trust scales. We create editorial programs, case studies, and social content that turn your certified community into your best marketing channel. From weekly dispatches to long-form thought leadership, our content compounds credibility and drives inbound growth.",
    outcomes: [
      "Expanded audience reach",
      "Stronger social proof ecosystem",
      "Community-driven reputation",
    ],
    trustedBy: [
      { name: "IWBI", logo: "/logos/iwbi.png" },
      { name: "ECA", logo: "/logos/eca.png" },
      { name: "ITSCO", logo: "/logos/itsco.png" },
    ],
    url: "https://catalyst.certainly.coop/",
    accent: "bg-near-black",
  },
];

const Programs = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();

  const handleExplorePartnership = (serviceName?: string) => {
    setSelectedService(serviceName);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="Programs | Certainly"
        description="Industry-tested programs for certification bodies and trust-driven brands. Create your own credential, build your digital brand, or scale trust through content."
        path="/programs"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://certainly.coop" },
          { name: "Programs", url: "https://certainly.coop/programs" },
        ]}
      />
      <PartnershipDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        serviceName={selectedService}
      />
      <Header />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-forest-green text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-primary-foreground/50 font-sans text-sm uppercase tracking-widest mb-4">
            Programs
          </p>
          <h1 className="text-4xl md:text-6xl font-serif max-w-4xl mb-6 leading-tight">
            Structured programs to build, launch, and grow trust.
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl leading-relaxed">
            Each program is a proven, repeatable engagement designed around a specific outcome. They're different from our consulting services — these are productized, with clear deliverables and timelines.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className={`h-1.5 ${program.accent} w-full`} />
              <div className="p-8 md:p-10 grid md:grid-cols-5 gap-8">
                {/* Left: content */}
                <div className="md:col-span-3 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-near-black leading-tight">
                    {program.summary}
                  </h2>
                  <p className="text-sm font-sans font-semibold text-near-black tracking-wide uppercase">
                    {program.title}
                  </p>
                  <p className="text-foreground/65 leading-relaxed">
                    {program.longDescription}
                  </p>
                  <div className="pt-4">
                    {program.url ? (
                      <Button
                        variant="cta"
                        onClick={() =>
                          window.open(
                            program.url,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                      >
                        Visit Program Site &rarr;
                      </Button>
                    ) : (
                      <Button
                        variant="cta"
                        onClick={() =>
                          handleExplorePartnership(program.title)
                        }
                      >
                        Learn More
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right: outcomes + trusted by */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="font-semibold text-near-black mb-3 text-xs uppercase tracking-wider">
                      Outcomes
                    </h3>
                    <ul className="space-y-2">
                      {program.outcomes.map((item, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <span className="text-forest-green mr-2.5 mt-0.5 text-xs">
                            &#9679;
                          </span>
                          <span className="text-foreground/65">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-border/60">
                    <p className="text-xs text-foreground/50 font-medium mb-3 uppercase tracking-wider">
                      Trusted by
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      {program.trustedBy.map((client, idx) => (
                        <div key={idx} className="h-7 flex items-center">
                          <img
                            src={client.logo}
                            alt={client.name}
                            width={80}
                            height={32}
                            loading="lazy"
                            className="h-full w-auto object-contain opacity-50 hover:opacity-80 transition-opacity"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-near-black text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Not sure which program fits?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            We also do custom projects, consulting, and 1:1 advising.
            Let's figure out the right path together.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => handleExplorePartnership()}
          >
            Explore a Partnership
          </Button>
        </div>
      </section>

      {/* Related links */}
      <section className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-sm text-foreground/60 mb-4">Related:</p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/services"
              className="text-sm font-medium text-primary hover:underline"
            >
              Consulting Services &rarr;
            </Link>
            <Link
              to="/for/certification-orgs"
              className="text-sm font-medium text-primary hover:underline"
            >
              For Certification Organizations &rarr;
            </Link>
            <Link
              to="/for/new-certification"
              className="text-sm font-medium text-primary hover:underline"
            >
              Launching a Certification &rarr;
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;
