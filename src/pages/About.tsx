import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/StructuredData";

const team = [
  {
    name: "Shane Gring",
    role: "Strategy",
    bio: "Former VP of Marketing at IWBI, where he led digital strategy for the WELL Building Standard and managed multi-million-dollar campaigns across 100+ countries. Shane founded Certainly to bring that same level of strategic rigor to certification organizations of all sizes.",
    linkedin: "https://www.linkedin.com/in/shanegring/",
  },
  {
    name: "Chris Pirschel",
    role: "Content",
    bio: "Content strategist and writer with deep experience in the certification and green building space. Chris crafts thought leadership, case studies, and dispatches that position certification brands as trusted authorities in their markets.",
    linkedin: "https://www.linkedin.com/in/chris-pirschel/",
  },
  {
    name: "Jesse Kornhardt",
    role: "Design",
    bio: "Visual designer and brand strategist who translates complex certification narratives into clean, compelling design systems. Jesse has designed brand identities and marketing collateral for certification programs across sustainability, health, and professional development.",
  },
  {
    name: "David Lee",
    role: "Technical Lead",
    bio: "Full-stack developer and technical architect with experience building web properties for certification organizations. David leads development on multi-region web ecosystems and digital credential integrations.",
  },
  {
    name: "Nick Zaremba",
    role: "Development",
    bio: "Front-end developer specializing in fast, accessible, and conversion-optimized websites for certification brands. Nick builds the sites that earn leads and make content teams self-sufficient.",
  },
  {
    name: "Robert Grassl",
    role: "Paid Media",
    bio: "Performance marketing specialist who has managed six-figure ad budgets for certification programs including WELL and LEED. Robert builds and optimizes campaigns across LinkedIn, Google, and programmatic channels.",
  },
  {
    name: "Nikole Sparks",
    role: "Design",
    bio: "Designer focused on user experience and digital marketing materials for certification organizations. Nikole creates landing pages, social media assets, and presentation materials that convert.",
  },
];

const values = [
  {
    name: "Truth-telling",
    description:
      "We prioritize clarity and transparency across all communications and client relationships. We tell you what's working, what isn't, and what we'd do differently — even when it's not what you want to hear.",
  },
  {
    name: "People-centric",
    description:
      "Human experience defines our efforts. Behind every certification program are real people trying to advance their careers, protect their communities, or improve their organizations. We design for them.",
  },
  {
    name: "Service-minded",
    description:
      "We give more than we take. Our cooperative structure exists because we believe business should create value for communities, not just shareholders.",
  },
  {
    name: "Adventure-seeking",
    description:
      "We challenge the status quo and explore solutions that haven't been tried yet. The certification industry is evolving fast — digital badges, AI-powered assessment, micro-credentials — and we help our clients lead that change rather than react to it.",
  },
  {
    name: "Responsibility-driven",
    description:
      "We own our work. Every deliverable has a name on it, every deadline has a commitment behind it. Outcome-focused, solution-oriented, and accountable for what we promise.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="About"
        description="Certainly Cooperative is a team of marketing, technology, and certification specialists. Built by former IWBI and USGBC staff, we help certification brands grow."
        path="/about"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://certainly.coop" },
          { name: "About", url: "https://certainly.coop/about" },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-forest-green text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-primary-foreground/70 font-sans text-sm uppercase tracking-widest mb-4">
            About Us
          </p>
          <h1 className="text-4xl md:text-6xl font-serif max-w-4xl mb-6">
            Delivering certainty to the certification industry
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
            We connect experts from marketing, technology, and certification backgrounds to streamline and amplify how organizations build and market their certification offerings.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-near-black">
                Our story
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  Built and led by former IWBI and USGBC staff, Certainly was born from the need for specialized services tailored to the world of standard bearers and certification providers. We spent years inside these organizations — managing marketing campaigns, building digital platforms, and navigating the complexity of certification operations — before realizing that most agencies couldn't serve this market well because they didn't understand it.
                </p>
                <p>
                  We believe standards and certifications should be easy to understand, trust, and use. Too often, they feel complicated, disconnected, and out of reach of the people who would most benefit from them. That gap between a certification's value and the market's understanding of it is exactly where we work.
                </p>
                <p>
                  So we set out to change that — by helping certification brands show up clearly, run efficiently, and connect with the audiences that matter most. Since then, we've worked with organizations like Delos, CodeGreen, DRVN, ECA, Pinchin, and 1% for the Planet to build their certification programs and digital presence.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-near-black">
                Why a cooperative?
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  Certainly operates as a cooperative — a democratic workplace where ownership and voice are shared among contributors. We chose this structure deliberately because we believe the businesses that help others build trust should model it themselves.
                </p>
                <p>
                  Our cooperative structure means member ownership, flexible work arrangements, transparent decision-making, and mission-driven purpose. We don't have outside investors, we don't chase growth for growth's sake, and every member has an equal say in how the business operates. This keeps us focused on doing great work for our clients rather than maximizing billable hours.
                </p>
                <p>
                  Cooperatives are one of the oldest and most resilient business models in the world. From credit unions to agricultural co-ops to worker-owned firms, cooperative businesses generate over $3 trillion in revenue globally.
                </p>
                <p>
                  <a
                    href="https://ica.coop/en/cooperatives/cooperative-identity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline"
                  >
                    Learn about the seven cooperative principles &rarr;
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-light-gray">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-near-black mb-12">
            Our values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.name}>
                <h3 className="text-lg font-semibold text-near-black mb-2">
                  {value.name}
                </h3>
                <p className="text-foreground/70 leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-near-black mb-4">
            The team
          </h2>
          <p className="text-foreground/70 leading-relaxed mb-12 max-w-2xl">
            Seven specialists across marketing, design, technology, and content — with decades of combined experience in the certification industry.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((member) => (
              <div key={member.name} className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-forest-green/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-base font-serif font-bold text-forest-green">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-near-black">{member.name}</p>
                    <p className="text-sm text-foreground/60">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {member.bio}
                </p>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary font-medium hover:underline inline-block"
                  >
                    LinkedIn &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-sm text-foreground/60 mb-6 text-center">
            Trusted by certification leaders
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {["iwbi", "usgbc", "codegreen", "pinchin", "drvn", "eca"].map(
              (logo) => (
                <div key={logo} className="h-8 flex items-center">
                  <img
                    src={`/logos/${logo}.png`}
                    alt={logo.toUpperCase()}
                    className="h-full w-auto object-contain opacity-50"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
