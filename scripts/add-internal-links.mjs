/**
 * add-internal-links.mjs
 *
 * Scans all published blog posts and injects contextual internal links
 * (to other blog posts and site pages) where natural anchor text appears.
 *
 * Usage:
 *   node scripts/add-internal-links.mjs              # dry-run (preview changes)
 *   node scripts/add-internal-links.mjs --commit     # write changes to Supabase
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mgjhcfimddvtvsfenjry.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1namhjZmltZGR2dHZzZmVuanJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzQ5MzgyNiwiZXhwIjoyMDg5MDY5ODI2fQ.OyNiGFRX2OLNttJJIh0KIXdk2UEJ12UG6951UIOeQwY";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const COMMIT = process.argv.includes("--commit");

// ---------------------------------------------------------------------------
// 1. Site-page link rules  (phrase → URL)
//    Only the FIRST match per post is linked.
// ---------------------------------------------------------------------------
const SITE_LINKS = [
  // Service pages
  { phrases: ["certification marketing services", "our marketing services", "marketing services"], url: "/services/marketing" },
  { phrases: ["certification technology services", "our technology services", "technology services"], url: "/services/technology" },
  { phrases: ["certification operations services", "our operations services", "operations services"], url: "/services/operations" },
  // Programs
  { phrases: ["create your own credential", "build your own credential", "launch a credential"], url: "/programs" },
  { phrases: ["digital brand build", "30-day website"], url: "/programs" },
  // Audience pages
  { phrases: ["certification organizations", "certification bodies", "credentialing organizations"], url: "/for/certification-orgs" },
  { phrases: ["launching a new certification", "start a new certification", "new certification program"], url: "/for/new-certification" },
  // About
  { phrases: ["about certainly", "our team at certainly", "certainly cooperative"], url: "/about" },
];

// ---------------------------------------------------------------------------
// 2. Blog-to-blog link rules
//    Built dynamically from post titles/topics. Each rule maps anchor phrases
//    to a blog post URL. A post never links to itself.
// ---------------------------------------------------------------------------
function buildBlogLinks(posts) {
  const rules = [];

  for (const p of posts) {
    const entry = { slug: p.slug, url: `/blog/${p.slug}`, phrases: [] };

    // Use recognisable short phrases from titles
    const titlePhrases = extractTitlePhrases(p.title);
    entry.phrases.push(...titlePhrases);

    // Add topic-specific keyword phrases
    const topicPhrases = getTopicPhrases(p.slug, p.title, p.tags);
    entry.phrases.push(...topicPhrases);

    if (entry.phrases.length > 0) rules.push(entry);
  }

  return rules;
}

function extractTitlePhrases(title) {
  // Normalize title for matching
  const clean = title
    .replace(/[""'']/g, '"')
    .replace(/\s*[|–—:]\s*/g, ": ")
    .replace(/\s+/g, " ")
    .trim();

  const phrases = [];

  // If the title has a colon, use the part after the colon as a phrase (if short enough)
  const colonIdx = clean.indexOf(": ");
  if (colonIdx > 0) {
    const before = clean.slice(0, colonIdx).trim();
    const after = clean.slice(colonIdx + 2).trim();
    if (before.split(" ").length <= 6) phrases.push(before);
    if (after.split(" ").length <= 8) phrases.push(after);
  }

  return phrases;
}

function getTopicPhrases(slug, title, tags) {
  const phrases = [];
  const t = (title || "").toLowerCase();
  const s = slug || "";

  // Map specific posts to contextual anchor phrases
  const map = {
    "micro-credentials-stackable-certifications-guide": ["micro-credentials", "stackable certifications"],
    "certification-marketing-stack-tools": ["certification marketing stack", "marketing stack"],
    "certification-website-losing-leads": ["certification website", "losing leads"],
    "iso-17024-vs-ncca-accreditation-comparison": ["ISO 17024", "NCCA accreditation", "ISO 17024 vs NCCA"],
    "codegreen-website-launch-case-study": ["CodeGreen"],
    "well-equity-rating-launch-case-study": ["WELL Equity Rating"],
    "what-is-certification-marketing": ["certification marketing"],
    "how-to-prepare-for-ncca-accreditation": ["NCCA accreditation", "prepare for NCCA"],
    "digital-badge-strategy-certification-programs": ["digital badges", "digital badge strategy", "digital credentialing"],
    "building-candidate-pipeline-certification-program": ["candidate pipeline", "certification pipeline"],
    "the-essential-walkthrough-video-guide-for-certification-credential-orgs": ["walkthrough video", "video guide"],
    "less-technology-more-purpose-how-smart-building-certification-is-getting-smarter": ["smart building certification"],
    "a-free-media-toolkit-to-sharpen-and-share-your-certification-story": ["media toolkit", "certification story"],
    "case-study-honing-content-to-reach-high-intent-customers": ["high-intent customers"],
    "case-study-a-custom-cost-efficient-website-redesign-for-codegreen": ["website redesign"],
    "why-squarespace-might-be-the-best-website-platform-for-early-stage-certification-programs": ["Squarespace", "website platform"],
    "embracing-overlap-collaboration-between-certifications-can-deliver-strong-benefits": ["collaboration between certifications"],
    "how-we-helped-usgbc-build-a-digital-home-for-1-000-sustainability-education-courses": ["USGBC"],
    "leaving-the-pdf-paradigm-why-iwbi-decided-that-standard-shouldnt-mean-one-size-fits-all": ["IWBI"],
    "1-for-the-planet": ["1% for the Planet", "customer segmentation"],
    "how-we-transitioned-5-000-forms-to-save-usgbc-time-and-resources": ["form migration", "USGBC forms"],
    "how-to-earn-more-leads-for-your-credential-programs-digital-marketing-campaign": ["digital marketing campaign", "earn more leads"],
    "building-a-certification-brand-consistency-is-your-most-powerful-tool-2": ["certification brand", "brand consistency"],
    "email-marketing-tactics-for-your-certification-event": ["email marketing", "certification event"],
    "activating-accessibility-bringing-people-first-design-practices-to-digital-spaces": ["accessibility", "people-first design"],
    "making-breaking-news-using-press-releases-to-show-your-certifications-impact": ["press releases"],
    "make-digital-the-standard-for-your-certification-standard": ["digital standard"],
    "visual-asset-kit": ["visual asset kit", "brand assets"],
    "communication-plan": ["communication plan"],
    "why-an-seo-audit-is-core-to-the-foundation-of-your-business": ["SEO audit"],
    "fxnction-rebrands-as-certainly": [],
    "how-does-a-digital-services-subscription-work": ["digital services subscription"],
    "social-sustainability-matters-more-than-ever": ["social sustainability"],
    "from-invisible-to-invaluable-are-building-operations-the-pathway-to-better-bottom-lines": ["building operations"],
    "waste-not-want-not-is-inefficiency-plaguing-scientific-research": [],
    "the-road-is-long-but-the-path-is-certain": [],
    "boosting-gantry-kids-teens-online-presence-with-local-seo-best-practices": ["local SEO"],
  };

  if (map[s]) phrases.push(...map[s]);

  return phrases;
}

// ---------------------------------------------------------------------------
// 3. Link injection engine
// ---------------------------------------------------------------------------

/**
 * Inject internal links into HTML content.
 * Rules:
 *  - Only link the first occurrence of each phrase per post.
 *  - Never link text that's already inside an <a> tag.
 *  - Never link text inside headings (h1-h6).
 *  - A post never links to itself.
 *  - Max 5 new links per post to avoid over-optimization.
 */
function injectLinks(html, postSlug, siteLinks, blogLinks) {
  let modified = html;
  let linksAdded = 0;
  const MAX_LINKS = 5;
  const linkedUrls = new Set();

  // Collect all link rules (site pages first, then blog posts)
  const allRules = [];

  for (const rule of siteLinks) {
    for (const phrase of rule.phrases) {
      allRules.push({ phrase, url: rule.url, type: "site" });
    }
  }

  for (const rule of blogLinks) {
    if (rule.slug === postSlug) continue; // never self-link
    for (const phrase of rule.phrases) {
      allRules.push({ phrase, url: rule.url, type: "blog" });
    }
  }

  // Sort by phrase length descending (match longer phrases first)
  allRules.sort((a, b) => b.phrase.length - a.phrase.length);

  for (const rule of allRules) {
    if (linksAdded >= MAX_LINKS) break;
    if (linkedUrls.has(rule.url)) continue; // one link per target URL

    // Check if this URL is already linked in the content
    if (modified.includes(`href="${rule.url}"`)) {
      linkedUrls.add(rule.url);
      continue;
    }

    const result = linkFirstOccurrence(modified, rule.phrase, rule.url);
    if (result.changed) {
      modified = result.html;
      linksAdded++;
      linkedUrls.add(rule.url);
    }
  }

  return { html: modified, linksAdded };
}

/**
 * Find the first occurrence of `phrase` in paragraph text (not inside tags,
 * headings, or existing links) and wrap it in an <a> tag.
 */
function linkFirstOccurrence(html, phrase, url) {
  // Split HTML into segments: tags vs text
  // We'll process only text that's NOT inside <a>, <h1>-<h6>, or other tags
  const tagStack = [];
  const SKIP_TAGS = new Set(["a", "h1", "h2", "h3", "h4", "h5", "h6", "button", "script", "style"]);

  // Use a regex to split into tags and text segments
  const parts = html.split(/(<[^>]+>)/);
  const phraseRegex = new RegExp(
    `(${escapeRegex(phrase)})`,
    "i"
  );

  let found = false;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (part.startsWith("<")) {
      // It's a tag
      const closingMatch = part.match(/^<\/(\w+)/);
      const openingMatch = part.match(/^<(\w+)/);

      if (closingMatch) {
        const tagName = closingMatch[1].toLowerCase();
        // Pop from stack
        const idx = tagStack.lastIndexOf(tagName);
        if (idx >= 0) tagStack.splice(idx, 1);
      } else if (openingMatch) {
        const tagName = openingMatch[1].toLowerCase();
        // Self-closing tags don't get pushed
        if (!part.endsWith("/>") && !["br", "hr", "img", "input", "meta", "link"].includes(tagName)) {
          tagStack.push(tagName);
        }
      }
      continue;
    }

    // It's a text segment — check if we're inside a skip tag
    const insideSkip = tagStack.some((t) => SKIP_TAGS.has(t));
    if (insideSkip) continue;

    // Try to match the phrase
    const match = part.match(phraseRegex);
    if (match) {
      const idx = match.index;
      const matchedText = match[1];
      parts[i] =
        part.slice(0, idx) +
        `<a href="${url}">${matchedText}</a>` +
        part.slice(idx + matchedText.length);
      found = true;
      break;
    }
  }

  return { html: parts.join(""), changed: found };
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ---------------------------------------------------------------------------
// 4. Main
// ---------------------------------------------------------------------------
async function main() {
  console.log(COMMIT ? "🚀 COMMIT mode — will update Supabase\n" : "👀 DRY-RUN mode — preview only (use --commit to save)\n");

  // Fetch all published posts
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, tags, content")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("Failed to fetch posts:", error.message);
    process.exit(1);
  }

  console.log(`📄 Found ${posts.length} published posts\n`);

  // Build link rules
  const blogLinks = buildBlogLinks(posts);
  console.log(`🔗 ${blogLinks.length} blog link rules, ${SITE_LINKS.length} site link rules\n`);

  let totalLinksAdded = 0;
  let postsModified = 0;

  for (const post of posts) {
    const { html, linksAdded } = injectLinks(post.content, post.slug, SITE_LINKS, blogLinks);

    if (linksAdded === 0) continue;

    postsModified++;
    totalLinksAdded += linksAdded;
    console.log(`  ✏️  ${post.slug}: +${linksAdded} links`);

    if (COMMIT) {
      const { error: updateErr } = await supabase
        .from("blog_posts")
        .update({ content: html })
        .eq("id", post.id);

      if (updateErr) {
        console.error(`    ❌ Failed to update: ${updateErr.message}`);
      } else {
        console.log(`    ✅ Saved`);
      }
    }
  }

  console.log(`\n📊 Summary: ${totalLinksAdded} links added across ${postsModified} posts`);
  if (!COMMIT && postsModified > 0) {
    console.log("   Run with --commit to save changes to Supabase");
  }
}

main().catch(console.error);
