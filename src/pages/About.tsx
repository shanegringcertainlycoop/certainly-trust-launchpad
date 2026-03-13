import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const team = [
  { name: "Shane Gring", role: "Strategy" },
  { name: "Chris Pirschel", role: "Content" },
  { name: "Jesse Kornhardt", role: "Design" },
  { name: "David Lee", role: "Technical Lead" },
  { name: "Nick Zaremba", role: "Development" },
  { name: "Robert Grassl", role: "Paid Media" },
  { name: "Nikole Sparks", role: "Design" },
];

const values = [
  {
    name: "Truth-telling",
    description:
      "We prioritize clarity and transparency across all communications and client relationships.",
  },
  {
    name: "People-centric",
    description:
      "Human experience defines our efforts. We prioritize the people we serve with empathy.",
  },
  {
    name: "Service-minded",
    description:
      "We give more than we take, delivering value to our communities and clients.",
  },
  {
    name: "Adventure-seeking",
    description:
      "We challenge the status quo and explore innovative solutions rather than accepting what's always been done.",
  },
  {
    name: "Responsibility-driven",
    description:
      "We own our work. Outcome-focused, solution-oriented, and committed to delivering what we promise.",
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
                  Built and led by former IWBI and USGBC staff, Certainly was born from the need for specialized services tailored to the world of standard bearers and certification providers.
                </p>
                <p>
                  We believe standards and certifications should be easy to understand, trust, and use. Too often, they feel complicated, disconnected, and out of reach of the people who would most benefit from them.
                </p>
                <p>
                  So we set out to change that — by helping certification brands show up clearly, run efficiently, and connect with the audiences that matter most.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-near-black">
                Why a cooperative?
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  Certainly operates as a cooperative — a democratic workplace where ownership and voice are shared among contributors.
                </p>
                <p>
                  We believe creative businesses should model the same transparency and fairness they help others communicate. Our cooperative structure means member ownership, flexible work arrangements, transparent decision-making, and mission-driven purpose.
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
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-near-black mb-12">
            The team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name}>
                <div className="w-16 h-16 rounded-full bg-forest-green/10 flex items-center justify-center mb-3">
                  <span className="text-lg font-serif font-bold text-forest-green">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <p className="font-semibold text-near-black">{member.name}</p>
                <p className="text-sm text-foreground/60">{member.role}</p>
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
