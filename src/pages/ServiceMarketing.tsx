import { ServicePageLayout } from "@/components/ServicePageLayout";

const ServiceMarketing = () => (
  <ServicePageLayout
    title="Certification Marketing"
    subtitle="Services / Marketing"
    seoTitle="Certification Marketing Services"
    seoDescription="Fill your candidate pipeline, build brand authority, and grow your certification program. Marketing strategy, lead generation, and content for certification bodies."
    path="/services/marketing"
    description="Your certification deserves a bigger platform. We help certification brands clarify their value, accelerate adoption, and grow trusted networks of certified professionals. Whether you're launching a new credential or scaling an established program, we build the marketing infrastructure that turns awareness into enrollments."
    stats={[
      { value: "182K", label: "Webpage views for IWBI campaign" },
      { value: "148K", label: "Social engagements" },
      { value: "3.95M", label: "Ad impressions for WELL Equity" },
      { value: "63%", label: "Reduction in cost-per-lead" },
    ]}
    sections={[
      {
        heading: "Candidate Pipeline & Lead Generation",
        body: "Most certification programs struggle to consistently attract qualified candidates. We build multi-channel campaigns that reach the right audiences and convert interest into enrollments. Our approach combines paid media, organic content, and email nurture to create a pipeline that delivers month after month — not just during launch windows. We've managed six-figure media budgets for programs like WELL and LEED, and we apply the same rigor to programs at every stage of growth.",
        items: [
          "Paid media campaigns targeted to your ideal candidate profiles",
          "Landing pages and funnels optimized for certification sign-ups",
          "Email nurture sequences that move prospects through your pipeline",
          "Retargeting and lookalike audience strategies",
          "Conversion tracking tied to actual enrollment metrics",
        ],
      },
      {
        heading: "Brand Positioning & Messaging",
        body: "In a crowded credential market, your brand needs to stand out. We help certification bodies articulate what makes their program different and why it matters. This starts with competitive research — understanding where your certification sits relative to alternatives — and ends with messaging frameworks your entire team can use. We've repositioned certification brands from technical jargon to clear, compelling narratives that resonate with candidates, employers, and stakeholders alike.",
        items: [
          "Competitive positioning and messaging frameworks",
          "Value proposition development for multiple stakeholder audiences",
          "Visual identity refinement that reflects your authority",
          "Consistent brand voice across all touchpoints",
          "Market research and candidate persona development",
        ],
      },
      {
        heading: "Content That Compounds Trust",
        body: "Turn your certification outcomes, case studies, and expert knowledge into content that builds authority over time. We create content strategies that make your certified community your best marketing channel. From weekly dispatches to long-form thought leadership, our content programs are designed to rank in search, earn links, and give your audience a reason to share your brand with their networks.",
        items: [
          "Thought leadership articles and industry dispatches",
          "Case studies and success stories from certified professionals",
          "Social media strategy and content calendars",
          "Inbound content that ranks and converts",
          "Newsletter programs that keep your community engaged",
        ],
      },
      {
        heading: "Campaign Strategy & Execution",
        body: "From awareness to enrollment, we design and run full campaigns for certification launches, renewal pushes, and market expansion. Our team has executed campaigns for IWBI, USGBC, Delos, and other leaders in the certification space. We handle everything from campaign planning and creative development to media buying and performance optimization — so you can focus on delivering a great certification experience.",
        items: [
          "Campaign planning, creative, and media buying",
          "Multi-region and multi-language campaign support",
          "Performance tracking and optimization",
          "ROI reporting tied to enrollment metrics",
          "Launch strategy for new certifications and credential lines",
        ],
      },
    ]}
    methodology={{
      heading: "How we work with certification brands",
      body: "Every engagement starts with understanding your program — its competitive position, growth goals, and the audiences that matter most. We don't do cookie-cutter marketing. Here's our typical process:",
      steps: [
        "Discovery and audit: We review your current marketing, messaging, analytics, and competitive landscape to identify gaps and opportunities.",
        "Strategy development: We build a marketing plan tailored to your certification's stage of growth, target audiences, and budget.",
        "Creative and content production: Our team produces everything from ad creative and landing pages to blog content and email sequences.",
        "Launch and optimize: We execute the plan, monitor performance daily, and optimize based on real enrollment data — not vanity metrics.",
        "Report and iterate: Monthly reporting with clear ROI metrics. We adjust strategy based on what's working and what the market is telling us.",
      ],
    }}
    caseStudy={{
      client: "IWBI — WELL Equity Rating Launch",
      challenge: "IWBI needed to launch the WELL Equity Rating to a new audience segment — HR leaders, DEI professionals, and corporate real estate teams — while maintaining momentum for its flagship WELL Building Standard.",
      approach: "We developed a multi-channel campaign spanning LinkedIn, programmatic display, email, and organic content. The campaign targeted decision-makers in corporate wellness and DEI with messaging that connected health equity to the built environment. We built dedicated landing pages, produced a library of social content, and managed the full media buy.",
      results: [
        "3.95 million ad impressions across LinkedIn and programmatic channels",
        "Over 400 qualified leads generated for the WELL Equity Rating",
        "63% reduction in cost-per-lead compared to previous campaigns",
        "182,000 webpage views driven to IWBI properties",
        "148,000 social engagements across organic and paid channels",
      ],
    }}
    faq={[
      {
        question: "What makes certification marketing different from regular B2B marketing?",
        answer: "Certification marketing targets multiple audiences simultaneously — candidates who need to see career value, employers who need to see ROI, and industry stakeholders who need to see credibility. The buyer journey is longer and more research-driven than typical B2B purchases, and trust signals like accreditation status, pass rates, and certified community size play a much bigger role in conversion. We specialize in this niche because we've lived it — our team includes former IWBI and USGBC marketing staff.",
      },
      {
        question: "How long does it take to see results from certification marketing?",
        answer: "Paid media campaigns typically start generating qualified leads within the first 30 days. Content marketing and SEO take longer — usually 3 to 6 months to build meaningful organic traffic. Most of our clients see measurable pipeline growth within the first quarter and significant ROI by month six. We set realistic expectations upfront and report against agreed-upon KPIs monthly.",
      },
      {
        question: "Do you work with certification bodies at all stages, or only established programs?",
        answer: "We work with certification organizations at every stage — from pre-launch programs that need positioning and go-to-market strategy, to established programs with thousands of certified professionals that need to scale efficiently. Our services are modular, so you can engage us for a single campaign or an ongoing retainer depending on your needs and budget.",
      },
      {
        question: "What does a typical engagement look like?",
        answer: "Most clients start with a 90-day engagement that includes a marketing audit, strategy development, and initial campaign execution. From there, we move to a monthly retainer that covers ongoing campaign management, content production, and performance optimization. Retainers typically range from focused single-channel support to full-service marketing partnerships.",
      },
      {
        question: "Can you help with marketing for international certification programs?",
        answer: "Yes. We've managed multi-region campaigns for global certification programs including WELL (active in over 100 countries). We handle multi-language content, region-specific ad targeting, and localized messaging. Our experience with international certification marketing is one of our key differentiators.",
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
