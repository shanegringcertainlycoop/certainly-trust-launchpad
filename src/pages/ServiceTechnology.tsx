import { ServicePageLayout } from "@/components/ServicePageLayout";

const ServiceTechnology = () => (
  <ServicePageLayout
    title="Certification Technology"
    subtitle="Services / Technology"
    seoTitle="Certification Technology & Website Design"
    seoDescription="Build websites, digital ecosystems, and automation for your certification program. Technology strategy, website design, and digital credential solutions for certification bodies."
    path="/services/technology"
    description="Your site should earn leads — not overwhelm them. We build sales-focused websites and digital ecosystems that reflect your credibility and close more deals. From single-page marketing sites to multi-region web properties with integrated credential systems, we design technology solutions that match the ambition of your certification program."
    stats={[
      { value: "25", label: "Days to launch (CodeGreen)" },
      { value: "50%", label: "Less than competing quotes" },
      { value: "6+", label: "Years with Delos" },
      { value: "14+", label: "Marketing pages for Delos ecosystem" },
    ]}
    sections={[
      {
        heading: "Website Design & Development",
        body: "Broken pages. Mismatched messaging. Unclear calls to action. Your website can cost you more than just hosting fees through missed opportunities and lost revenue. We build sites that match your brand and exceed expectations. Our websites are designed for conversion — every page has a job, every section earns its place, and every call to action is backed by data. We've built web properties for certification leaders like Delos, CodeGreen, and DRVN, and we bring that same standard to every project.",
        items: [
          "Sales-focused website design and development",
          "Multi-region, multi-stakeholder web ecosystems",
          "Content management systems your team can actually use",
          "Mobile-first, accessible, and fast by default",
          "SEO-optimized architecture and content structure",
        ],
      },
      {
        heading: "Digital Credential Strategy",
        body: "Digital badges and credentials are more than a technology decision — they're a brand and distribution strategy. We help you choose the right approach and execute it without vendor lock-in. The digital credential landscape is crowded with platforms making big promises. We take a vendor-neutral approach, evaluating options based on your program's specific needs: integration requirements, display preferences, verification workflows, and long-term cost.",
        items: [
          "Digital badge program design and strategy",
          "Platform evaluation (vendor-neutral)",
          "Credential display and sharing optimization",
          "Integration with your existing certification systems",
          "Badge analytics and engagement tracking",
        ],
      },
      {
        heading: "Automation & Systems Integration",
        body: "Eliminate the manual work that slows your team down. We build automation that connects your marketing, operations, and technology into a single digital ecosystem. Most certification organizations run on disconnected tools — a CRM here, an email platform there, a spreadsheet tracking renewals somewhere else. We connect these systems so data flows automatically, your team works from a single source of truth, and candidates get a seamless experience.",
        items: [
          "Marketing automation and email workflows",
          "CRM and lead management setup",
          "Application and enrollment automation",
          "Reporting dashboards and analytics",
          "API integrations between certification platforms",
        ],
      },
      {
        heading: "On-Demand Technical Support",
        body: "Need ongoing help without the overhead of hiring? Our digital services subscription gives you a dedicated team of specialists for website updates, campaign execution, and technical projects. Think of it as a fractional technology team — designers, developers, and strategists available when you need them, without the cost of full-time hires. Most of our subscription clients use between 20 and 40 hours per month.",
        items: [
          "Website maintenance and content updates",
          "SEO audits and optimization",
          "E-commerce and payment integration",
          "AI planning and implementation",
          "Ongoing technical consulting and support",
        ],
      },
    ]}
    methodology={{
      heading: "How we build certification websites",
      body: "We've refined our process over six years and dozens of certification web properties. Speed matters, but so does getting it right. Here's how we work:",
      steps: [
        "Discovery workshop: A focused session to understand your brand, audiences, conversion goals, and technical requirements.",
        "Sitemap and wireframes: We map out every page, define the content hierarchy, and plan the user journey before any design work begins.",
        "Design and content: Visual design and copywriting happen in parallel. You review and approve before we write a single line of code.",
        "Development and QA: We build with modern frameworks that are fast, accessible, and easy for your team to manage. Every site is tested across devices and browsers.",
        "Launch and handoff: We deploy, configure analytics, and train your team on the CMS. Post-launch support is included for the first 30 days.",
      ],
    }}
    caseStudy={{
      client: "CodeGreen — Website Launch in 25 Days",
      challenge: "CodeGreen, a sustainability consulting firm, needed a professional website that could generate leads and establish credibility in the green building space. They had received quotes from other agencies that were expensive and slow, with timelines stretching to 3-4 months.",
      approach: "We ran an accelerated discovery-to-launch process, delivering a complete website in 25 days at half the cost of competing quotes. The site was designed for lead generation with clear calls to action, service pages optimized for SEO, and a content management system the CodeGreen team could update independently.",
      results: [
        "Website launched in 25 days from kickoff",
        "50% less expensive than competing agency quotes",
        "Immediate lead generation from organic search traffic",
        "Client team fully trained on CMS within first week",
        "Ongoing relationship for content updates and SEO optimization",
      ],
    }}
    faq={[
      {
        question: "How long does a typical certification website take to build?",
        answer: "Most certification websites take 4 to 8 weeks from kickoff to launch. Simple marketing sites can be delivered faster — our fastest launch was 25 days for CodeGreen. Multi-region web ecosystems with complex integrations typically take 8 to 12 weeks. We set a firm timeline during discovery and stick to it.",
      },
      {
        question: "What technology stack do you use?",
        answer: "We choose the stack based on your needs, not our preferences. For most certification websites, we use modern JavaScript frameworks (React, Next.js) with headless CMS platforms that give your team full content control. For organizations that need WordPress, we build custom WordPress solutions. We also work with Webflow for teams that want visual editing. The right answer depends on your team's technical comfort, integration requirements, and long-term maintenance plans.",
      },
      {
        question: "Do you build custom certification platforms or just marketing websites?",
        answer: "We focus on marketing websites, digital ecosystems, and front-end experiences for certification organizations. For custom certification platforms (exam delivery, candidate management, credentialing databases), we partner with specialized platform providers and can manage that integration. Our strength is the digital experience that surrounds your certification — the website, content, and automation that drive awareness, leads, and engagement.",
      },
      {
        question: "What does the digital services subscription include?",
        answer: "The subscription gives you access to our full team — designers, developers, content specialists, and strategists — on a monthly retainer basis. Clients typically use it for website updates, new page development, SEO optimization, email campaign execution, and ad hoc technical projects. Hours roll over month to month, and you get a dedicated project manager as your point of contact.",
      },
      {
        question: "How do you approach digital badge and credential strategy?",
        answer: "We start by understanding your program goals — are you using badges for marketing and visibility, for verification and compliance, or both? From there, we evaluate platforms (Credly, Accredible, Badgr, and others) based on your integration needs, cost structure, and long-term flexibility. We're vendor-neutral, which means we recommend what's best for your program, not what earns us a referral fee.",
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
