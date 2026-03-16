import { AudiencePageLayout } from "@/components/AudiencePageLayout";

const ForNewCertification = () => (
  <AudiencePageLayout
    label="For Organizations Launching a Certification"
    title="Turn your expertise into a credential the market trusts."
    description="You have a method, a framework, or deep domain knowledge that others want to learn. We help you formalize it into a structured, professional certification — with the governance, technology, and go-to-market strategy to make it succeed."
    seoTitle="Launch a Certification Program | Certainly"
    seoDescription="Planning to introduce a certification or credential to your offerings? We help organizations design, build, and launch certification programs from scratch."
    path="/for/new-certification"
    challenges={{
      heading: "Where most new certifications get stuck",
      body: "The idea is clear — your method works and people want to be certified in it. But the path from expertise to credible credential is full of decisions that are hard to get right the first time:",
      items: [
        "You're not sure how to structure the certification — levels, prerequisites, renewal, assessment",
        "You need governance and standards that make the credential defensible, not just decorative",
        "Building the technology to manage applications, exams, and credential verification feels overwhelming",
        "You don't know how to price, position, or market a certification program",
        "You're worried about launching something that looks underbaked or that nobody enrolls in",
        "You've seen other organizations try this and fail — you want to get it right",
      ],
    }}
    solutions={{
      heading: "How we help you launch",
      body: "We've helped organizations go from a blank page to a live, enrolling certification program. Our process is designed to reduce risk, build credibility from day one, and create something that scales.",
      items: [
        {
          title: "Credential Architecture",
          description:
            "We help you design the structure of your certification — competency frameworks, assessment methods, levels, prerequisites, and renewal cycles — grounded in what works in the market.",
        },
        {
          title: "Governance & Standards",
          description:
            "We build the governance model that gives your certification legitimacy — advisory boards, conflict-of-interest policies, appeals processes, and quality assurance mechanisms.",
        },
        {
          title: "Technology & Platform",
          description:
            "From applicant management to exam delivery to public credential verification, we build or configure the platform your program needs to operate professionally.",
        },
        {
          title: "Go-to-Market Strategy",
          description:
            "Positioning, pricing, launch campaigns, and a candidate pipeline strategy so your certification doesn't just exist — it enrolls. We help you build momentum before you launch.",
        },
      ],
    }}
    relevantServices={[
      {
        title: "Create Your Own Credential",
        description:
          "Our flagship program for turning methods and expertise into market-recognized certifications.",
        href: "/services/operations",
      },
      {
        title: "Certification Technology",
        description:
          "Platform design and builds for new certification programs launching from scratch.",
        href: "/services/technology",
      },
      {
        title: "Certification Marketing",
        description:
          "Launch campaigns and candidate pipeline strategy to drive enrollments from day one.",
        href: "/services/marketing",
      },
    ]}
    cta={{
      heading: "Ready to build your certification?",
      body: "Let's talk about your expertise, your audience, and what a credible credential looks like for your organization.",
      buttonLabel: "Start the Conversation",
    }}
    otherAudiences={[
      {
        label: "Existing Certification Organizations",
        href: "/for/certification-orgs",
      },
      {
        label: "Service Providers to Certifications",
        href: "/for/service-providers",
      },
    ]}
  />
);

export default ForNewCertification;
