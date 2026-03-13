import { ServicePageLayout } from "@/components/ServicePageLayout";

const ServiceOperations = () => (
  <ServicePageLayout
    title="Certification Operations"
    subtitle="Services / Operations"
    seoTitle="Certification Operations & Program Management"
    seoDescription="Streamline your certification program management, prepare for NCCA or ISO 17024 accreditation, and build governance systems that scale. Operations support for certification bodies."
    path="/services/operations"
    description="Running a certification program is complex. We help certification bodies streamline their operations, prepare for accreditation, and build systems that scale without breaking."
    sections={[
      {
        heading: "Program Management & Optimization",
        body: "From application workflows to renewal cycles, we help you build efficient, reliable systems for managing your certification program end-to-end. No more bottlenecks, manual workarounds, or lost candidates.",
        items: [
          "Application and candidate management workflows",
          "Renewal and recertification cycle design",
          "Process documentation and standard operating procedures",
          "Certification systems optimization and management",
        ],
      },
      {
        heading: "Accreditation Preparation",
        body: "Whether you're pursuing NCCA accreditation, ISO 17024 compliance, or another standard, we help you build the documentation, governance structures, and processes that accreditors require.",
        items: [
          "NCCA accreditation readiness assessment and preparation",
          "ISO 17024 compliance planning",
          "Policy manual and governance document development",
          "Mock audit and self-assessment facilitation",
        ],
      },
      {
        heading: "Governance & Board Development",
        body: "Strong governance is the foundation of a credible certification. We help you design governance structures, board policies, and decision-making frameworks that protect program integrity.",
        items: [
          "Board structure and committee design",
          "Conflict of interest and independence policies",
          "Psychometric defensibility and assessment governance",
          "Stakeholder engagement frameworks",
        ],
      },
      {
        heading: "Scaling Without Breaking",
        body: "As your program grows, your operations need to keep up. We help certification bodies transition from manual processes to scalable systems — without losing the quality that built your reputation.",
        items: [
          "Growth readiness assessment",
          "Technology platform evaluation and migration",
          "Staff training and knowledge transfer",
          "Multi-region and international expansion planning",
        ],
      },
    ]}
    relatedServices={[
      { label: "Certification Marketing", href: "/services/marketing" },
      { label: "Certification Technology", href: "/services/technology" },
    ]}
  />
);

export default ServiceOperations;
