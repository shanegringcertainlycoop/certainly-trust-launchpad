import { ServicePageLayout } from "@/components/ServicePageLayout";

const ServiceMarketing = () => (
  <ServicePageLayout
    title="Certification Marketing"
    subtitle="Services / Marketing"
    seoTitle="Certification Marketing Services"
    seoDescription="Fill your candidate pipeline, build brand authority, and grow your certification program. Marketing strategy, lead generation, and content for certification bodies."
    path="/services/marketing"
    description="Your certification deserves a bigger platform. We help certification brands clarify their value, accelerate adoption, and grow trusted networks of certified professionals."
    stats={[
      { value: "182K", label: "Webpage views for IWBI campaign" },
      { value: "148K", label: "Social engagements" },
      { value: "3.95M", label: "Ad impressions for WELL Equity" },
      { value: "63%", label: "Reduction in cost-per-lead" },
    ]}
    sections={[
      {
        heading: "Candidate Pipeline & Lead Generation",
        body: "Most certification programs struggle to consistently attract qualified candidates. We build multi-channel campaigns that reach the right audiences and convert interest into enrollments.",
        items: [
          "Paid media campaigns targeted to your ideal candidate profiles",
          "Landing pages and funnels optimized for certification sign-ups",
          "Email nurture sequences that move prospects through your pipeline",
          "Retargeting and lookalike audience strategies",
        ],
      },
      {
        heading: "Brand Positioning & Messaging",
        body: "In a crowded credential market, your brand needs to stand out. We help certification bodies articulate what makes their program different and why it matters.",
        items: [
          "Competitive positioning and messaging frameworks",
          "Value proposition development for multiple stakeholder audiences",
          "Visual identity refinement that reflects your authority",
          "Consistent brand voice across all touchpoints",
        ],
      },
      {
        heading: "Content That Compounds Trust",
        body: "Turn your certification outcomes, case studies, and expert knowledge into content that builds authority over time. We create content strategies that make your certified community your best marketing channel.",
        items: [
          "Thought leadership articles and industry dispatches",
          "Case studies and success stories from certified professionals",
          "Social media strategy and content calendars",
          "Inbound content that ranks and converts",
        ],
      },
      {
        heading: "Campaign Strategy & Execution",
        body: "From awareness to enrollment, we design and run full campaigns for certification launches, renewal pushes, and market expansion. Our team has executed campaigns for IWBI, USGBC, Delos, and other leaders in the certification space.",
        items: [
          "Campaign planning, creative, and media buying",
          "Multi-region and multi-language campaign support",
          "Performance tracking and optimization",
          "ROI reporting tied to enrollment metrics",
        ],
      },
    ]}
    testimonial={{
      quote:
        "We've worked with the team at Certainly for over 6 years, and they're integral in the scale of our digital strategy. From a single clunky WordPress website, to now a beautiful multi-region, digital strategy spanning multiple, integrated web properties.",
      name: "Logan Cohen",
      title: "EVP Marketing, Delos",
    }}
    relatedServices={[
      { label: "Certification Operations", href: "/services/operations" },
      { label: "Certification Technology", href: "/services/technology" },
    ]}
  />
);

export default ServiceMarketing;
