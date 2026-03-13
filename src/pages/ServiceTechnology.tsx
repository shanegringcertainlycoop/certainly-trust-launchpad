import { ServicePageLayout } from "@/components/ServicePageLayout";

const ServiceTechnology = () => (
  <ServicePageLayout
    title="Certification Technology"
    subtitle="Services / Technology"
    seoTitle="Certification Technology & Website Design"
    seoDescription="Build websites, digital ecosystems, and automation for your certification program. Technology strategy, website design, and digital credential solutions for certification bodies."
    path="/services/technology"
    description="Your site should earn leads — not overwhelm them. We build sales-focused websites and digital ecosystems that reflect your credibility and close more deals."
    stats={[
      { value: "25", label: "Days to launch (CodeGreen)" },
      { value: "50%", label: "Less than competing quotes" },
      { value: "6+", label: "Years with Delos" },
      { value: "14+", label: "Marketing pages for Delos ecosystem" },
    ]}
    sections={[
      {
        heading: "Website Design & Development",
        body: "Broken pages. Mismatched messaging. Unclear calls to action. Your website can cost you more than just hosting fees through missed opportunities and lost revenue. We build sites that match your brand and exceed expectations.",
        items: [
          "Sales-focused website design and development",
          "Multi-region, multi-stakeholder web ecosystems",
          "Content management systems your team can actually use",
          "Mobile-first, accessible, and fast by default",
        ],
      },
      {
        heading: "Digital Credential Strategy",
        body: "Digital badges and credentials are more than a technology decision — they're a brand and distribution strategy. We help you choose the right approach and execute it without vendor lock-in.",
        items: [
          "Digital badge program design and strategy",
          "Platform evaluation (vendor-neutral)",
          "Credential display and sharing optimization",
          "Integration with your existing certification systems",
        ],
      },
      {
        heading: "Automation & Systems",
        body: "Eliminate the manual work that slows your team down. We build automation that connects your marketing, operations, and technology into a single digital ecosystem.",
        items: [
          "Marketing automation and email workflows",
          "CRM and lead management setup",
          "Application and enrollment automation",
          "Reporting dashboards and analytics",
        ],
      },
      {
        heading: "On-Demand Technical Support",
        body: "Need ongoing help without the overhead of hiring? Our digital services subscription gives you a dedicated team of specialists for website updates, campaign execution, and technical projects.",
        items: [
          "Website maintenance and content updates",
          "SEO audits and optimization",
          "E-commerce and payment integration",
          "AI planning and implementation",
        ],
      },
    ]}
    testimonial={{
      quote:
        "The Certainly process is unbeatable. In less than a month, and for half the price of other quotes — we launched a beautiful, easy to edit website — on time. It's a great value.",
      name: "Andrew Dimitriou",
      title: "Sr. Director, CodeGreen",
    }}
    relatedServices={[
      { label: "Certification Marketing", href: "/services/marketing" },
      { label: "Certification Operations", href: "/services/operations" },
    ]}
  />
);

export default ServiceTechnology;
