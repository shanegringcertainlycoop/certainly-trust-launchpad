import { ServicePageLayout } from "@/components/ServicePageLayout";

const ServiceOperations = () => (
  <ServicePageLayout
    title="Certification Operations"
    subtitle="Services / Operations"
    seoTitle="Certification Operations & Program Management"
    seoDescription="Streamline your certification program management, prepare for NCCA or ISO 17024 accreditation, and build governance systems that scale. Operations support for certification bodies."
    path="/services/operations"
    description="Running a certification program is complex. From application workflows to accreditation prep to governance design, the operational side of certification demands precision and expertise. We help certification bodies build systems that are reliable, defensible, and ready to scale — because a credential is only as strong as the program behind it."
    stats={[
      { value: "NCCA", label: "Accreditation preparation" },
      { value: "ISO 17024", label: "Compliance planning" },
      { value: "7+", label: "Certification programs supported" },
      { value: "100%", label: "Client accreditation success rate" },
    ]}
    sections={[
      {
        heading: "Program Management & Optimization",
        body: "From application workflows to renewal cycles, we help you build efficient, reliable systems for managing your certification program end-to-end. No more bottlenecks, manual workarounds, or lost candidates. We audit your existing processes, identify friction points, and redesign workflows so your team spends less time on administration and more time on program quality. Whether you're running a 200-person credential or a 20,000-person program, we build operations that match your scale.",
        items: [
          "Application and candidate management workflows",
          "Renewal and recertification cycle design",
          "Process documentation and standard operating procedures",
          "Certification systems optimization and management",
          "Candidate communication and support frameworks",
        ],
      },
      {
        heading: "Accreditation Preparation",
        body: "Whether you're pursuing NCCA accreditation, ISO 17024 compliance, or another standard, we help you build the documentation, governance structures, and processes that accreditors require. Our team has direct experience preparing certification programs for accreditation reviews, and we know what evaluators look for. We'll help you avoid common pitfalls — like insufficient psychometric documentation or unclear conflict-of-interest policies — that can delay or derail your application.",
        items: [
          "NCCA accreditation readiness assessment and preparation",
          "ISO 17024 compliance planning and gap analysis",
          "Policy manual and governance document development",
          "Mock audit and self-assessment facilitation",
          "Psychometric documentation and exam defensibility review",
        ],
      },
      {
        heading: "Governance & Board Development",
        body: "Strong governance is the foundation of a credible certification. We help you design governance structures, board policies, and decision-making frameworks that protect program integrity and meet accreditation standards. This includes everything from board composition and committee design to conflict-of-interest policies and stakeholder engagement strategies. Good governance isn't just about compliance — it builds the trust that makes your credential valuable.",
        items: [
          "Board structure and committee design",
          "Conflict of interest and independence policies",
          "Psychometric defensibility and assessment governance",
          "Stakeholder engagement frameworks",
          "Annual review and continuous improvement processes",
        ],
      },
      {
        heading: "Scaling Without Breaking",
        body: "As your program grows, your operations need to keep up. We help certification bodies transition from manual processes to scalable systems — without losing the quality that built your reputation. Growth introduces complexity: more candidates, more regions, more compliance requirements. We help you plan for that growth, evaluate technology platforms, train your team, and build the operational infrastructure that makes scaling possible.",
        items: [
          "Growth readiness assessment and planning",
          "Technology platform evaluation and migration",
          "Staff training and knowledge transfer",
          "Multi-region and international expansion planning",
          "Operational risk assessment and mitigation",
        ],
      },
    ]}
    methodology={{
      heading: "Our approach to certification operations",
      body: "We treat certification operations as a system — not a collection of tasks. Every engagement starts with understanding how your program actually works today, then designing improvements that are practical, defensible, and sustainable.",
      steps: [
        "Operational audit: We map your current workflows, documentation, governance structures, and technology stack to identify gaps and inefficiencies.",
        "Gap analysis: We compare your current state against accreditation requirements (NCCA, ISO 17024) and industry best practices to prioritize improvements.",
        "System design: We redesign workflows, draft governance documents, and build the operational playbooks your team needs to run the program consistently.",
        "Implementation support: We work alongside your team to implement changes, train staff, and troubleshoot issues during the transition.",
        "Ongoing advisory: For clients pursuing accreditation, we provide ongoing support through the application and review process.",
      ],
    }}
    faq={[
      {
        question: "What is NCCA accreditation and why does it matter?",
        answer: "NCCA (National Commission for Certifying Agencies) accreditation is the gold standard for personnel certification programs in the United States. It validates that your certification program meets rigorous standards for governance, exam development, psychometric defensibility, and operational integrity. NCCA accreditation signals to employers, regulators, and candidates that your credential is credible and well-managed. Many government agencies and employers specifically require or prefer NCCA-accredited certifications.",
      },
      {
        question: "How long does it take to prepare for NCCA accreditation?",
        answer: "Preparation timelines vary depending on your program's current state. Programs with established governance and documented processes may be ready in 6 to 9 months. Programs building from scratch typically need 12 to 18 months to develop the required documentation, governance structures, psychometric evidence, and operational history. We help you create a realistic timeline and work backward from your target submission date.",
      },
      {
        question: "What's the difference between NCCA accreditation and ISO 17024?",
        answer: "NCCA is a U.S.-focused accreditation standard for personnel certification programs, administered by the Institute for Credentialing Excellence (ICE). ISO 17024 is an international standard for conformity assessment of persons, recognized globally. If your certification operates primarily in the U.S., NCCA is typically the priority. If you operate internationally or need global recognition, ISO 17024 may be more relevant. Some programs pursue both. We can help you determine which standard fits your program's goals and market.",
      },
      {
        question: "Do you replace our existing operations team?",
        answer: "No. We work alongside your team to strengthen systems and build capacity. Our goal is to transfer knowledge and create documentation that your staff can maintain independently. For smaller organizations without dedicated operations staff, we can serve as a fractional operations partner — handling day-to-day program management while you build your internal team.",
      },
      {
        question: "Can you help with exam development and psychometrics?",
        answer: "We provide guidance on psychometric governance, documentation requirements, and exam defensibility as part of our accreditation preparation services. For technical psychometric work like item writing, job task analysis, and standard setting studies, we partner with specialized psychometric firms and can coordinate that relationship on your behalf.",
      },
    ]}
    relatedServices={[
      { label: "Certification Marketing", href: "/services/marketing" },
      { label: "Certification Technology", href: "/services/technology" },
    ]}
  />
);

export default ServiceOperations;
