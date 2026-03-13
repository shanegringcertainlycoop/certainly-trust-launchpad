import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PartnershipDialog } from "@/components/PartnershipDialog";

const services = [
  {
    title: "Certification Marketing",
    description:
      "Fill your candidate pipeline, build brand authority, and turn certified professionals into your best advocates.",
    href: "/services/marketing",
    outcomes: [
      "Lead generation campaigns that convert",
      "Brand positioning that commands trust",
      "Content that compounds credibility",
    ],
  },
  {
    title: "Certification Operations",
    description:
      "Streamline program management, prepare for accreditation, and build governance systems that scale.",
    href: "/services/operations",
    outcomes: [
      "Accreditation-ready program design",
      "Renewal and recertification systems",
      "Governance and policy frameworks",
    ],
  },
  {
    title: "Certification Technology",
    description:
      "Build websites, digital ecosystems, and automation that reflect your credibility and close more deals.",
    href: "/services/technology",
    outcomes: [
      "Sales-focused websites that earn leads",
      "Digital credential and badge strategy",
      "Marketing and operations automation",
    ],
  },
];

const Services = () => {
  const [partnershipOpen, setPartnershipOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="Services"
        description="Marketing, operations, and technology services for certification brands. We help certification bodies grow their programs and modernize their digital presence."
        path="/services"
      />
      <PartnershipDialog open={partnershipOpen} onOpenChange={setPartnershipOpen} />
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-forest-green text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-primary-foreground/70 font-sans text-sm uppercase tracking-widest mb-4">
            What We Do
          </p>
          <h1 className="text-4xl md:text-6xl font-serif max-w-4xl mb-6">
            Marketing, operations, and technology for certification brands
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
            We help certification organizations and their networks do more business online. Built and led by former IWBI and USGBC staff, we understand every stage of your growth.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card
                key={service.href}
                className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8 space-y-6 flex flex-col h-full">
                  <h2 className="text-2xl font-serif font-bold text-near-black">
                    {service.title}
                  </h2>
                  <p className="text-foreground/70 leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start text-sm text-foreground/70">
                        <span className="text-forest-green mr-2">&#x2022;</span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                  <Link to={service.href}>
                    <Button variant="cta" className="w-full">
                      Learn More &rarr;
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Work CTA */}
      <section className="py-16 md:py-24 bg-near-black text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Need something custom?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            We also do custom projects, consulting, and 1:1 advising for certification organizations. Tell us what you're working on.
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

      <Footer />
    </div>
  );
};

export default Services;
