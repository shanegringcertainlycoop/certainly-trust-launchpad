import { AudiencePageLayout } from "@/components/AudiencePageLayout";

const ForCertificationOrgs = () => (
  <AudiencePageLayout
    label="For Certification Organizations"
    title="Grow your certification program with a team that's been inside one."
    description="We've spent years inside organizations like IWBI, USGBC, and Delos. We know the operational complexity, the stakeholder dynamics, and the marketing challenges that come with running a credential at scale. We're here to help you do it better."
    seoTitle="For Certification Organizations | Certainly"
    seoDescription="Marketing, operations, and technology services built specifically for certification bodies. From candidate pipeline to platform infrastructure, we help established programs grow."
    path="/for/certification-orgs"
    challenges={{
      heading: "The challenges you're navigating",
      body: "Running a certification program means balancing credibility with growth, governance with speed, and stakeholder trust with market demand. These are some of the issues we hear most often:",
      items: [
        "Candidate pipeline has plateaued and traditional marketing isn't moving the needle",
        "Your certification platform is dated, fragile, or held together by workarounds",
        "Renewal rates are declining and you're not sure why",
        "Stakeholders are asking for data and reporting you can't easily produce",
        "You're expanding into new markets but don't have the infrastructure to support it",
        "Your brand doesn't reflect the authority your certification has earned",
      ],
    }}
    solutions={{
      heading: "How we help",
      body: "We work with certification organizations as an embedded partner — not an outside agency checking boxes. Every engagement is tailored to where your program is today and where you need it to go.",
      items: [
        {
          title: "Pipeline & Growth Marketing",
          description:
            "Multi-channel campaigns that reach your ideal candidates and convert awareness into enrollments. We've managed six-figure media budgets for programs like WELL and LEED.",
        },
        {
          title: "Platform Modernization",
          description:
            "We audit, redesign, and rebuild certification platforms — from applicant portals to exam delivery to credential verification — so your technology matches your ambition.",
        },
        {
          title: "Operational Strategy",
          description:
            "Governance frameworks, renewal optimization, and process design that reduce friction for your team and your certified community.",
        },
        {
          title: "Brand & Content",
          description:
            "Positioning, messaging, and content programs that turn your certification outcomes into compelling proof — and your certified professionals into advocates.",
        },
      ],
    }}
    relevantServices={[
      {
        title: "Certification Marketing",
        description:
          "Candidate pipeline, brand positioning, and campaigns designed for certification programs.",
        href: "/services/marketing",
      },
      {
        title: "Certification Operations",
        description:
          "Governance, renewal optimization, and process design for certification bodies.",
        href: "/services/operations",
      },
      {
        title: "Certification Technology",
        description:
          "Platform audits, system design, and custom builds for certification infrastructure.",
        href: "/services/technology",
      },
    ]}
    cta={{
      heading: "Ready to scale your program?",
      body: "Talk to an advisor who understands the certification business from the inside out.",
    }}
    otherAudiences={[
      {
        label: "Organizations Launching a Certification",
        href: "/for/new-certification",
      },
      {
        label: "Service Providers to Certifications",
        href: "/for/service-providers",
      },
    ]}
  />
);

export default ForCertificationOrgs;
