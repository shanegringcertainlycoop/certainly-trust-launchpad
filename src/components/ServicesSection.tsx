import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PartnershipDialog } from "@/components/PartnershipDialog";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    title: "Create Your Own Credential\u2122",
    summary: "Transform your method into a market-recognized standard.",
    description:
      "We help you codify your expertise into a structured, professional credential \u2014 complete with governance, assessment, and renewal cycles.",
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

export const ServicesSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const sectionRef = useScrollReveal();

  const handleExplorePartnership = (serviceName?: string) => {
    setSelectedService(serviceName);
    setIsDialogOpen(true);
  };

  return (
    <>
      <PartnershipDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        serviceName={selectedService}
      />

      <section
        id="services"
        className="py-24 bg-light-gray px-6 md:px-12 relative"
        ref={sectionRef}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <span className="section-label mb-4 inline-block">Our services</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-near-black mt-4">
              Current <em className="text-forest-green">offers</em>
            </h2>
            <p className="text-lg text-foreground/60 mt-3 max-w-xl mx-auto">
              Industry-tested programs and services to advance your brand.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 stagger-children">
            {services.map((service, index) => (
              <Card
                key={index}
                className="fade-in-up border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Accent bar */}
                <div className={`h-1 ${service.accent} w-full`} />
                <CardContent className="p-6 pt-5 space-y-4">
                  <p className="font-serif text-near-black leading-tight text-3xl lg:text-4xl group-hover:text-forest-green transition-colors duration-300">
                    {service.summary}
                  </p>

                  <h3 className="text-sm font-sans font-semibold text-near-black tracking-wide uppercase">
                    {service.title}
                  </h3>

                  <p className="text-sm text-foreground/65 leading-relaxed">
                    {service.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-near-black mb-2 text-xs uppercase tracking-wider">
                      Outcomes
                    </h4>
                    <ul className="space-y-1.5">
                      {service.outcomes.map((item, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <span className="text-forest-green mr-2.5 mt-0.5 text-xs">&#9679;</span>
                          <span className="text-foreground/65">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border/60">
                    <p className="text-xs text-foreground/50 font-medium mb-2.5 uppercase tracking-wider">
                      Trusted by
                    </p>
                    <div className="flex items-center gap-3 flex-wrap my-2">
                      {service.trustedBy.map((client, idx) => (
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

                  {service.url ? (
                    <Button
                      variant="cta"
                      className="w-full"
                      onClick={() =>
                        window.open(service.url, "_blank", "noopener,noreferrer")
                      }
                    >
                      Visit Site &rarr;
                    </Button>
                  ) : (
                    <Button
                      variant="cta"
                      className="w-full"
                      onClick={() => handleExplorePartnership(service.title)}
                    >
                      Explore a Partnership
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 fade-in-up">
            <p className="text-base text-foreground/60">
              We also do custom projects, consulting, and 1:1 advising for
              organizations.{" "}
              <button
                onClick={() => handleExplorePartnership()}
                className="text-primary font-medium hover:underline"
              >
                Contact us
              </button>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
