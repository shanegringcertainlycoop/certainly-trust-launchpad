import { useScrollReveal } from "@/hooks/useScrollReveal";

export const AboutSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      className="py-24 bg-near-black px-6 md:px-12 relative grain overflow-hidden"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 fade-in-up">
          <span className="section-label section-label-light">About us</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 stagger-children">
          {/* Left Column */}
          <div className="space-y-6 fade-in-up">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-snug">
              Who <em className="text-cream/80">are</em> we?
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Certainly Cooperative is a small, tight-knit collective of
                builders, writers, and strategists helping mission-driven brands
                scale their credibility.
              </p>
              <p>
                We've worked behind the scenes on certification programs,
                digital ecosystems, and content strategies for some of the
                world's most trusted brands.
              </p>
              <p>
                Our team spans design, data, and strategy — united by one goal:
                helping ideas that matter earn the trust they deserve.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 fade-in-up">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-snug">
              What is a <em className="text-cream/80">co-op?</em>
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Certainly operates as a cooperative — a democratic workplace
                where ownership and voice are shared among contributors.
              </p>
              <p>
                We believe creative businesses should model the same
                transparency and fairness they help others communicate.
              </p>
              <p>
                <a
                  href="https://ica.coop/en/cooperatives/cooperative-identity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cream/90 hover:text-cream font-medium transition-colors group"
                >
                  Learn about the seven cooperative principles
                  <span className="inline-block group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
