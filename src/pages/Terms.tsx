import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Terms = () => {
  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="Terms of Use"
        description="Terms of use for the Certainly Cooperative website. Rules governing your use of certainly.coop."
        path="/terms"
      />
      <Header />

      <article className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-near-black mb-4">
            Terms of Use
          </h1>
          <p className="text-sm text-foreground/50 mb-12">Last updated: March 14, 2026</p>

          <div className="space-y-8 text-foreground/70 leading-relaxed">
            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Agreement to terms</h2>
              <p>
                By accessing or using the Certainly Cooperative website at certainly.coop ("the Site"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Use of the site</h2>
              <p>
                The Site is provided for informational purposes and to facilitate inquiries about our services. You may use the Site for lawful purposes only. You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Use the Site in any way that violates applicable laws or regulations</li>
                <li>Submit false, misleading, or fraudulent information through our forms</li>
                <li>Attempt to interfere with the Site's operation or security</li>
                <li>Use automated tools to scrape or collect data from the Site without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Intellectual property</h2>
              <p>
                All content on the Site — including text, graphics, logos, images, and software — is the property of Certainly Cooperative or its content suppliers and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Blog and newsletter content</h2>
              <p>
                Articles, dispatches, and other content published on the Site are provided for informational and educational purposes. While we strive for accuracy, we make no warranties about the completeness, reliability, or suitability of this content. Content should not be considered professional advice — always consult with qualified professionals for decisions specific to your organization.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Third-party links</h2>
              <p>
                The Site may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of third-party sites. Inclusion of a link does not imply endorsement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Disclaimer of warranties</h2>
              <p>
                The Site is provided "as is" and "as available" without warranties of any kind, either express or implied. Certainly Cooperative does not warrant that the Site will be uninterrupted, error-free, or free of harmful components.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Limitation of liability</h2>
              <p>
                To the fullest extent permitted by law, Certainly Cooperative shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use the Site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Changes to these terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Your continued use of the Site after changes are posted constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold text-near-black mb-3">Contact</h2>
              <p>
                Questions about these terms? Contact us at{" "}
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

export default Terms;
