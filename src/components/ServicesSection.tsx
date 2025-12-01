import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Create Your Own Credential™",
    subtitle: "Transform your method into a market-recognized standard.",
    description: "We help you codify your expertise into a structured, professional credential — complete with governance, assessment, and renewal cycles.",
    deliverables: [
      "Credential Strategy Sprint™",
      "Framework + Assessment Architecture",
      "Pilot Credential Launch Plan"
    ],
    outcomes: [
      "Recurring revenue stream",
      "IP protection and credibility",
      "Certified community of advocates"
    ],
    trustedBy: ["DRVN", "IWBI", "USGBC"]
  },
  {
    title: "Digital Brand Build™",
    subtitle: "Your message deserves a platform that inspires confidence.",
    description: "We design and build digital ecosystems that reflect your authority — from your website to your messaging to your visual identity.",
    deliverables: [
      "Brand Positioning + Story Architecture",
      "Conversion-Optimized Site (Lovable Framework)",
      "SEO & Analytics Setup"
    ],
    outcomes: [
      "Cohesive brand presence",
      "Increased inbound opportunities",
      "Elevated perceived value"
    ],
    timeline: "6–10 weeks",
    trustedBy: ["IWBI", "Longevity", "CodeGreen"]
  },
  {
    title: "Trust-Multiplying Content™",
    subtitle: "Turn proof into persuasion.",
    description: "We turn your certification, case studies, and outcomes into powerful content that compounds trust over time.",
    deliverables: [
      "Proof-Point Builder™",
      "Certification Story Campaign",
      "Video + Email Asset Suite"
    ],
    outcomes: [
      "Expanded audience reach",
      "Stronger social proof ecosystem",
      "Community-driven reputation"
    ],
    timeline: "every 4 weeks",
    trustedBy: ["IWBI", "CRI", "ITSco"]
  }
];

export const ServicesSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 bg-light-gray px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-near-black mb-4">
            Our Services
          </h2>
          <p className="text-xl text-foreground/70">
            Built to create credibility that compounds.
          </p>
        </div>

        <div className="space-y-8">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-3xl font-serif text-near-black mb-2">
                  {service.title}
                </CardTitle>
                <p className="text-lg text-foreground/80 font-medium">
                  {service.subtitle}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-base text-foreground/70 leading-relaxed">
                  {service.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-near-black mb-3">Deliverables:</h4>
                    <ul className="space-y-2">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-forest-green mr-2">•</span>
                          <span className="text-foreground/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-near-black mb-3">Outcomes:</h4>
                    <ul className="space-y-2">
                      {service.outcomes.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-forest-green mr-2">•</span>
                          <span className="text-foreground/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t">
                  {service.timeline && (
                    <span className="text-sm text-foreground/60">
                      <span className="font-medium">Timeline:</span> {service.timeline}
                    </span>
                  )}
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm text-foreground/60 font-medium">Trusted by:</span>
                    <span className="text-sm text-forest-green font-medium">
                      {service.trustedBy.join(", ")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="cta" size="lg" onClick={scrollToContact}>
            Explore Our Services
          </Button>
        </div>
      </div>
    </section>
  );
};
