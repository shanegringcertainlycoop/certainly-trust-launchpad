export const AboutSection = () => {
  return (
    <section className="py-24 bg-near-black px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Who are we?
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Certainly is a small, tight-knit collective of builders, writers, and strategists 
                helping mission-driven experts scale their credibility.
              </p>
              <p>
                We've worked behind the scenes on certification programs, digital ecosystems, 
                and content strategies for some of the world's most trusted brands.
              </p>
              <p>
                Our team spans design, data, and strategy — united by one goal: helping ideas 
                that matter earn the trust they deserve.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              What is a co-op?
            </h2>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                Certainly operates as a cooperative — a democratic workplace where ownership 
                and voice are shared among contributors.
              </p>
              <p>
                We believe creative businesses should model the same transparency and fairness 
                they help others communicate.
              </p>
              <p>
                <a 
                  href="https://www.ica.coop/en/cooperatives/cooperative-identity" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent-burgundy hover:underline font-medium"
                >
                  Learn about the seven cooperative principles →
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
