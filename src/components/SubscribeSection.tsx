export const SubscribeSection = () => {
  return (
    <section id="contact" className="py-24 bg-cream px-6 md:px-12">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-near-black mb-4">
          Subscribe to Seeking Certainty
        </h2>
        <p className="text-lg text-foreground/70 mb-8">
          Periodic insights on credential strategy, trust marketing, and the future of authority online.
        </p>

        <div className="max-w-md mx-auto">
          <iframe 
            src="https://embeds.beehiiv.com/032815a3-09de-4fe3-8ddd-29887c80a61d?slim=true" 
            data-test-id="beehiiv-embed" 
            width="100%" 
            height="320" 
            frameBorder="0" 
            scrolling="no"
            className="rounded-md"
            style={{ margin: 0, borderRadius: '8px', backgroundColor: 'transparent' }}
          />
        </div>

        <p className="text-sm text-foreground/60 mt-8">
          Built by creators. Owned by contributors. Scaled through trust.
        </p>
      </div>
    </section>
  );
};
