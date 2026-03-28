# Site Architecture — Certainly Cooperative

## URL Hierarchy

```
certainly.coop/
│
├── /                                    HOME
│   Hero + services overview + testimonials + latest dispatches
│
├── /services/                           SERVICES HUB
│   Overview of all three service lines
│   Internal links to each service page
│   │
│   ├── /services/marketing/             CERTIFICATION MARKETING
│   │   Candidate pipeline, brand positioning, content, campaigns
│   │   Keywords: "certification marketing", "certification brand strategy"
│   │
│   ├── /services/operations/            CERTIFICATION OPERATIONS
│   │   Program management, governance, accreditation prep, renewals
│   │   Keywords: "certification program management", "certification operations"
│   │
│   └── /services/technology/            CERTIFICATION TECHNOLOGY
│   │   Platforms, websites, digital credentials, automation
│       Keywords: "certification technology", "digital credential strategy"
│
├── /work/                               CASE STUDIES HUB
│   Portfolio of client engagements
│   │
│   ├── /work/iwbi/                      IWBI case study
│   ├── /work/codegreen/                 CodeGreen case study
│   ├── /work/1-percent-planet/          1% for the Planet case study
│   └── /work/{future-clients}/          Additional case studies over time
│
├── /blog/                               BLOG / CONTENT HUB
│   All content: dispatches + guides
│   │
│   ├── /blog/{dispatch-slug}/           WEEKLY DISPATCHES
│   │   Certification Industry Dispatch (weekly, Friday)
│   │   Schema: NewsArticle
│   │
│   └── /blog/{guide-slug}/             LONG-FORM GUIDES
│       Strategic guides on marketing, ops, tech
│       Schema: BlogPosting or HowTo
│
├── /resources/                          RESOURCES HUB
│   Downloadable guides, frameworks, tools
│   Lead generation via gated content
│
├── /about/                              ABOUT PAGE
│   Cooperative story, team bios, values, E-E-A-T signals
│   Partner logos, credentials, experience signals
│
└── /contact/                            CONTACT PAGE
    Partnership inquiry form
    Replaces current dialog-only approach
```

## Internal Linking Strategy

### Hub-and-Spoke Model
Each service page is a **hub**. Blog guides and case studies are **spokes** that link back to their hub:

```
/services/marketing/ ←── /blog/certification-marketing-playbook/
                     ←── /blog/certification-vs-certificate-guide/
                     ←── /work/iwbi/

/services/operations/ ←── /blog/ncca-accreditation-guide/
                      ←── /blog/certification-governance/
                      ←── /blog/certification-renewal-design/

/services/technology/ ←── /blog/digital-badges-done-right/
                      ←── /blog/certification-website-checklist/
                      ←── /work/codegreen/
```

### Cross-Linking Rules
1. Every guide links to its parent service page
2. Every guide links to 1-2 related guides
3. Every case study links to relevant service page(s)
4. Service pages link to their best 2-3 guides + case studies
5. Dispatches link to relevant guides when topics overlap
6. Home page features latest 3 dispatches + top case study

### Sister Brand Cross-Links
Where relevant, guides can reference "Create Your Own Credential" (offer.certainly.coop) for organizations starting from scratch — clearly positioned as a separate offering:
- "Should Your Association Start a Certification Program?" → CTA to sister brand
- "Certification Program Feasibility Framework" → CTA to sister brand

---

## Navigation Structure

### Primary Nav
```
Home | Services ▾ | Work | Blog | About | Contact
                │
                ├── Marketing
                ├── Operations
                └── Technology
```

### Footer Nav
```
Services          Content           Company
├── Marketing     ├── Dispatches    ├── About
├── Operations    ├── Guides        ├── Contact
└── Technology    └── Resources     └── Privacy / Terms

Newsletter signup: "Seeking Certainty"
LinkedIn link
```

---

## Page Priority for Build

| Priority | Page | Why |
|----------|------|-----|
| P0 | /services/ | Conversion + keyword targeting |
| P0 | /services/marketing/ | Highest search demand pillar |
| P0 | /services/operations/ | Second pillar |
| P0 | /services/technology/ | Third pillar |
| P0 | /about/ | E-E-A-T signals |
| P1 | /contact/ | Dedicated conversion page |
| P1 | /work/ | Social proof hub |
| P1 | /work/iwbi/ | Strongest case study |
| P2 | /resources/ | Lead gen + authority |
| P2 | Additional case studies | Build over time |

---

## Technical Requirements

### New Routes Needed
```typescript
// Add to App.tsx
<Route path="/services" element={<Services />} />
<Route path="/services/marketing" element={<ServiceMarketing />} />
<Route path="/services/operations" element={<ServiceOperations />} />
<Route path="/services/technology" element={<ServiceTechnology />} />
<Route path="/work" element={<Work />} />
<Route path="/work/:slug" element={<CaseStudy />} />
<Route path="/resources" element={<Resources />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
```

### Prerender Updates
Add all new static pages to `prerender-meta.ts` and `generate-sitemap.ts` so they have proper OG tags and appear in the sitemap.

### Breadcrumb Implementation
Add BreadcrumbList schema to all pages:
```
Home > Services > Marketing
Home > Blog > [Post Title]
Home > Work > [Client Name]
```
