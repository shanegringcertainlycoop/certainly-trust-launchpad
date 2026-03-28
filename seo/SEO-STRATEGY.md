# Certainly Cooperative — SEO Strategy

## Business Context

**What Certainly does:** Supports certification brands — via marketing, operations, and technology.

**Target audience:** Certification bodies, credentialing organizations, and standards-setting organizations that need help with:
- Marketing their certification programs (candidate pipelines, brand, content)
- Operations (program management, governance, accreditation prep)
- Technology (digital platforms, badge delivery, websites, automation)

**Current site state:**
- 5 indexed URLs (home, blog listing, 3 blog posts)
- No service pages, no case study pages, no resource pages
- Blog has 2 weekly dispatches + 1 guide article
- Schema: Organization, WebSite, BlogPosting
- Hosting: Cloudflare Pages with prerendered OG tags
- Analytics: GTM + Valley Intent

**Key differentiator:** Cooperative model. Vendor-neutral. Works *behind the scenes* for certification brands. Combines strategy + execution (not just advice).

---

## Competitive Positioning

The certification consulting space is fragmented:
- **Psychometric firms** (Alpine Testing, Assessment Systems, Prometric) — focus on exam development
- **Platform vendors** (Credly, Certifier, Accredible) — push their own tech stack
- **Industry bodies** (I.C.E., ANSI, Credential Engine) — paywalled, policy-oriented
- **Traditional consultants** (Knapp & Associates, CPS HR) — minimal content marketing

**Certainly's open lane:** No one produces accessible, strategic content about *marketing, growing, and operating* certification programs from a vendor-neutral perspective. This is a wide-open SEO opportunity.

---

## Content Pillars

### Pillar 1: Certification Marketing
*How certification bodies attract, convert, and retain candidates*

Target keywords:
- "how to market a certification program"
- "certification program marketing strategy"
- "certification candidate pipeline"
- "certification brand strategy"
- "growing certification program enrollment"

### Pillar 2: Certification Operations
*How certification programs run — governance, renewals, accreditation, compliance*

Target keywords:
- "certification program management"
- "certification program governance"
- "NCCA accreditation guide"
- "ISO 17024 certification body requirements"
- "certification renewal process design"

### Pillar 3: Certification Technology
*Platforms, digital credentials, automation, websites for cert bodies*

Target keywords:
- "digital credential strategy"
- "certification management software"
- "certification body website design"
- "digital badge strategy"
- "certification program automation"

### Pillar 4: Industry Intelligence (Dispatch)
*Weekly news, trends, regulatory changes — already underway*

Target keywords:
- "certification industry news"
- "certification industry trends 2026"
- "organic certification news"
- "sustainability certification updates"
- "credentialing industry trends"

---

## Site Architecture (Target State)

```
certainly.coop/
├── /                          (home — hero, services, social proof)
├── /services/                 (services overview)
│   ├── /services/marketing/   (certification marketing)
│   ├── /services/operations/  (certification operations)
│   └── /services/technology/  (certification technology)
├── /work/                     (case studies / portfolio)
│   ├── /work/iwbi/
│   ├── /work/codegreen/
│   └── /work/1-percent-planet/
├── /blog/                     (all content)
│   ├── /blog/{dispatch-slug}/ (weekly dispatches)
│   └── /blog/{guide-slug}/    (long-form guides)
├── /resources/                (downloadable guides, frameworks, tools)
├── /about/                    (co-op story, team, values)
└── /contact/                  (partnership inquiry)
```

**New pages needed:** ~12-15 core pages + ongoing blog content

---

## Schema Markup Plan

| Page Type | Schema Types |
|-----------|-------------|
| Home | Organization, WebSite |
| Services (each) | Service, BreadcrumbList |
| Case Studies | Article (or CreativeWork), BreadcrumbList |
| Blog Posts | BlogPosting, BreadcrumbList |
| Dispatches | NewsArticle, BreadcrumbList |
| Resources | HowTo or Article, BreadcrumbList |
| About | AboutPage, Organization |
| Contact | ContactPage |

**Add across all pages:** BreadcrumbList for navigation hierarchy.

---

## KPI Targets

| Metric | Baseline (Now) | 3 Month | 6 Month | 12 Month |
|--------|---------------|---------|---------|----------|
| Indexed Pages | 5 | 25 | 50 | 80+ |
| Organic Traffic | ~0 | 200/mo | 800/mo | 2,500/mo |
| Keyword Rankings (top 50) | ~0 | 20 | 60 | 150 |
| Referring Domains | ~0 | 5 | 15 | 40 |
| Blog Posts Published | 3 | 15 | 30 | 55+ |
| Core Web Vitals | Pass | Pass | Pass | Pass |
