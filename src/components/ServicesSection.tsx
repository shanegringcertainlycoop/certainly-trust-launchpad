import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const services = [{
  title: "Create Your Own Credential™",
  summary: "Transform your method into a market-recognized standard.",
  description: "We help you codify your expertise into a structured, professional credential — complete with governance, assessment, and renewal cycles.",
  outcomes: ["Recurring revenue stream", "IP protection and credibility", "Certified community of advocates"],
  trustedBy: [{
    name: "DRVN",
    logo: "/logos/drvn.png"
  }, {
    name: "IWBI",
    logo: "/logos/iwbi.png"
  }, {
    name: "USGBC",
    logo: "/logos/usgbc.png"
  }],
  url: "https://cyoc.certainly.coop"
}, {
  title: "Digital Brand Build™",
  summary: "Your message deserves a platform that inspires confidence.",
  description: "We design and build digital ecosystems that reflect your authority — from your website to your messaging to your visual identity.",
  outcomes: ["Cohesive brand presence", "Increased inbound opportunities", "Elevated perceived value"],
  trustedBy: [{
    name: "IWBI",
    logo: "/logos/iwbi.png"
  }, {
    name: "Longevity",
    logo: "/logos/longevity.png"
  }, {
    name: "CodeGreen",
    logo: "/logos/codegreen.png"
  }],
  url: "https://30dayweb.certainly.coop"
}, {
  title: "Trust-Multiplying Content™",
  summary: "Turn proof into persuasion.",
  description: "We turn your certification, case studies, and outcomes into powerful content that compounds trust over time.",
  outcomes: ["Expanded audience reach", "Stronger social proof ecosystem", "Community-driven reputation"],
  trustedBy: [{
    name: "IWBI",
    logo: "/logos/iwbi.png"
  }, {
    name: "CRI",
    logo: "/logos/cri.png"
  }, {
    name: "ITSco",
    logo: "/logos/itsco.png"
  }],
  url: "https://catalyst.certainly.coop/"
}];
export const ServicesSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleServiceClick = (serviceName: string) => {
    scrollToContact();
  };
  return <section id="services" className="py-24 bg-light-gray px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-near-black mb-4">
            Our Services
          </h2>
          <p className="text-xl text-foreground/70">
            Built to create credibility that compounds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 space-y-4">
                {service.url ? <a href={service.url} target="_blank" rel="noopener noreferrer" className="block space-y-4 cursor-pointer">
                    <p className="font-serif text-near-black leading-relaxed text-4xl">
                      {service.summary}
                    </p>
                    
                    <h3 className="text-base font-sans font-semibold text-near-black">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {service.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-near-black mb-2 text-sm">Outcomes:</h4>
                      <ul className="space-y-1">
                        {service.outcomes.map((item, i) => <li key={i} className="flex items-start text-sm">
                            <span className="text-forest-green mr-2">•</span>
                            <span className="text-foreground/70">{item}</span>
                          </li>)}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-xs text-foreground/60 font-medium mb-2">Trusted by:</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        {service.trustedBy.map((client, idx) => <div key={idx} className="h-8 flex items-center">
                            <img src={client.logo} alt={client.name} className="h-full w-auto object-contain opacity-60 hover:opacity-100 transition-opacity" />
                          </div>)}
                      </div>
                    </div>
                  </a> : <>
                    <p className="text-xl font-serif text-near-black leading-relaxed">
                      {service.summary}
                    </p>
                    
                    <h3 className="text-base font-sans font-semibold text-near-black">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {service.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-near-black mb-2 text-sm">Outcomes:</h4>
                      <ul className="space-y-1">
                        {service.outcomes.map((item, i) => <li key={i} className="flex items-start text-sm">
                            <span className="text-forest-green mr-2">•</span>
                            <span className="text-foreground/70">{item}</span>
                          </li>)}
                      </ul>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-xs text-foreground/60 font-medium mb-2">Trusted by:</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        {service.trustedBy.map((client, idx) => <div key={idx} className="h-8 flex items-center">
                            <img src={client.logo} alt={client.name} className="h-full w-auto object-contain opacity-60 hover:opacity-100 transition-opacity" />
                          </div>)}
                      </div>
                    </div>

                    <Button variant="cta" className="w-full" onClick={() => handleServiceClick(service.title)}>
                      Learn More
                    </Button>
                  </>}
                {service.url && <div className="pt-2 text-sm text-primary font-medium">
                    Visit Site →
                  </div>}
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};