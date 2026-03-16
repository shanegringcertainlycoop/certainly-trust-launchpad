import { AudiencePageLayout } from "@/components/AudiencePageLayout";

const ForServiceProviders = () => (
  <AudiencePageLayout
    label="For Service Providers to Certifications"
    title="Grow your business by becoming the go-to partner for certification programs."
    description="You're a verifier, education provider, exam proctor, or consulting firm that serves the certification ecosystem. We help you position your services, reach the right programs, and build the partnerships that drive recurring revenue."
    seoTitle="For Certification Service Providers | Certainly"
    seoDescription="Marketing and brand strategy for verifiers, education providers, and service providers in the certification ecosystem. Reach more programs, win more contracts."
    path="/for/service-providers"
    challenges={{
      heading: "The challenges you're facing",
      body: "The certification ecosystem is growing, but winning business as a service provider means navigating a complex, relationship-driven market. These are the patterns we see:",
      items: [
        "Certification bodies don't know you exist — or don't understand how you're different from competitors",
        "Your pipeline depends on a few key relationships and you need to diversify",
        "You're competing on price when you should be competing on trust and expertise",
        "Your digital presence doesn't reflect the quality of your work",
        "You're not sure how to market to certification programs specifically",
        "RFP responses take enormous effort and you're not winning enough of them",
      ],
    }}
    solutions={{
      heading: "How we help",
      body: "We understand the certification ecosystem from the inside — which means we know what certification bodies actually look for in their service providers. We help you become the obvious choice.",
      items: [
        {
          title: "Market Positioning",
          description:
            "We help you articulate what makes you different in the certification ecosystem — not just 'we do verifications,' but a clear, compelling narrative about why programs should choose you.",
        },
        {
          title: "Digital Brand Build",
          description:
            "A professional digital presence that signals credibility to certification decision-makers — from your website to your case studies to your LinkedIn presence.",
        },
        {
          title: "Content & Thought Leadership",
          description:
            "Content programs that position you as an expert in your niche — whether that's third-party verification, continuing education, exam development, or consulting.",
        },
        {
          title: "Partnership Development",
          description:
            "We help you identify, approach, and build relationships with certification organizations that are the right fit for your services — leveraging our network and industry knowledge.",
        },
      ],
    }}
    relevantServices={[
      {
        title: "Digital Brand Build",
        description:
          "A cohesive digital presence that reflects your authority and wins trust with certification decision-makers.",
        href: "/services/marketing",
      },
      {
        title: "Trust-Multiplying Content",
        description:
          "Thought leadership and case studies that position you as the expert in your certification niche.",
        href: "/services/marketing",
      },
      {
        title: "Certification Marketing",
        description:
          "Targeted campaigns and pipeline strategy to reach the certification organizations you want to serve.",
        href: "/services/marketing",
      },
    ]}
    cta={{
      heading: "Ready to grow in the certification space?",
      body: "We know the ecosystem. Let's figure out how to make your services impossible for certification programs to overlook.",
      buttonLabel: "Let's Talk Strategy",
    }}
    otherAudiences={[
      {
        label: "Existing Certification Organizations",
        href: "/for/certification-orgs",
      },
      {
        label: "Organizations Launching a Certification",
        href: "/for/new-certification",
      },
    ]}
  />
);

export default ForServiceProviders;
