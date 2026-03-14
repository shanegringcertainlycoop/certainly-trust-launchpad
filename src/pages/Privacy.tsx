import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="Privacy Policy"
        description="Privacy policy for Certainly Cooperative. How we collect, use, and protect your personal information."
        path="/privacy"
      />
      <Header />

      <article className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-near-black mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-foreground/50 mb-12">Last updated: March 14, 2026</p>

          <div className="space-y-8 text-foreground/70 leading-relaxed">
            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Who we are</h2>
              <p>
                Certainly Cooperative ("Certainly," "we," "our," or "us") operates the website certainly.coop. This privacy policy explains how we collect, use, and protect information when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Information we collect</h2>
              <p className="mb-3">We collect information you voluntarily provide to us, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name and email address when you submit a contact or partnership inquiry form</li>
                <li>Company name and message content when you reach out through our contact form</li>
                <li>Email address when you subscribe to our newsletter, Seeking Certainty</li>
              </ul>
              <p className="mt-3">
                We also collect standard web analytics data through Google Analytics, including page views, referral sources, device type, and approximate geographic location. This data is aggregated and does not personally identify you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">How we use your information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To respond to your inquiries and partnership requests</li>
                <li>To send you our newsletter if you have subscribed</li>
                <li>To improve our website and understand how visitors use it</li>
                <li>To comply with legal obligations</li>
              </ul>
              <p className="mt-3">
                We do not sell, rent, or share your personal information with third parties for their marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Data storage and security</h2>
              <p>
                Form submissions and newsletter subscriptions are stored securely using Supabase, a cloud database platform with encryption at rest and in transit. Our website is served over HTTPS with modern security headers. We retain your data only as long as necessary to fulfill the purposes described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Cookies and tracking</h2>
              <p>
                Our website uses Google Analytics to collect anonymous usage data. Google Analytics uses cookies to distinguish unique users and track sessions. You can opt out of Google Analytics by installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                . We do not use cookies for advertising or retargeting on our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Your rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Request access to the personal data we hold about you</li>
                <li>Request correction or deletion of your personal data</li>
                <li>Unsubscribe from our newsletter at any time</li>
                <li>Request that we stop processing your data</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:hello@certainly.coop" className="text-primary hover:underline">
                  hello@certainly.coop
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Third-party services</h2>
              <p>We use the following third-party services that may process your data:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Supabase — database and form submission storage</li>
                <li>Cloudflare — website hosting, CDN, and DDoS protection</li>
                <li>Google Analytics — website usage analytics</li>
              </ul>
              <p className="mt-3">Each of these services has its own privacy policy governing how they handle data.</p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Changes to this policy</h2>
              <p>
                We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Contact us</h2>
              <p>
                If you have questions about this privacy policy or how we handle your data, contact us at{" "}
                <a href="mailto:hello@certainly.coop" className="text-primary hover:underline">
                  hello@certainly.coop
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default Privacy;
