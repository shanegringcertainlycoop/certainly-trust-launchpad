import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";

// Load .env.production if env vars aren't already set (e.g. Lovable build)
function loadEnvFile() {
  const envPath = resolve(process.cwd(), ".env.production");
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const match = line.match(/^(\w+)=["']?(.+?)["']?\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2];
    }
  }
}
loadEnvFile();

const SITE_URL = "https://certainly.coop";

// Mirror dispatch-images.ts logic for build-time OG tags
const DISPATCH_CARDS = [
  "/images/dispatch-card-1.jpg",
  "/images/dispatch-card-2.jpg",
  "/images/dispatch-card-3.jpg",
];

function getDispatchImage(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return DISPATCH_CARDS[Math.abs(hash) % DISPATCH_CARDS.length];
}

function isDispatch(tags: string[] | null): boolean {
  return tags?.includes("Certification Dispatch") ?? false;
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY — skipping prerender"
  );
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMeta(
  template: string,
  opts: {
    title: string;
    description: string;
    url: string;
    image?: string;
    type: string;
    jsonLd?: object;
  }
): string {
  const t = escapeHtml(opts.title);
  const d = escapeHtml(opts.description);
  const u = opts.url;

  let result = template
    .replace(
      /<title>[^<]*<\/title>/,
      `<title>${t} | Certainly</title>`
    )
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${d}$2`
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${t}$2`
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${d}$2`
    )
    .replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      `$1${u}$2`
    )
    .replace(
      /(<meta\s+property="og:type"\s+content=")[^"]*(")/,
      `$1${opts.type}$2`
    );

  if (opts.image) {
    result = result
      .replace(
        /(<meta\s+property="og:image"\s+content=")[^"]*(")/,
        `$1${opts.image}$2`
      )
      .replace(
        /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,
        `$1${opts.image}$2`
      );
  } else {
    // Remove image meta tags entirely when no image is set
    result = result
      .replace(/\s*<meta\s+property="og:image"\s+content="[^"]*"\s*\/?\s*>\s*/g, "\n")
      .replace(/\s*<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?\s*>\s*/g, "\n");
  }

  // Replace existing canonical or inject new one
  if (result.includes('rel="canonical"')) {
    result = result.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${u}" />`
    );
  } else {
    result = result.replace(
      /<\/head>/,
      `    <link rel="canonical" href="${u}" />\n  </head>`
    );
  }

  // Inject JSON-LD structured data
  if (opts.jsonLd) {
    result = result.replace(
      /<\/head>/,
      `    <script type="application/ld+json">${JSON.stringify(opts.jsonLd)}</script>\n  </head>`
    );
  }

  return result;
}

async function prerenderMeta() {
  const distDir = resolve(process.cwd(), "dist");
  const template = readFileSync(resolve(distDir, "index.html"), "utf-8");

  // Fetch published blog posts
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("title, slug, excerpt, featured_image, tags")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch blog posts:", error.message);
    process.exit(1);
  }

  if (!posts || posts.length === 0) {
    console.log("No published posts — nothing to prerender");
    return;
  }

  // Generate per-post HTML files
  let count = 0;
  for (const post of posts) {
    const ogImage = post.featured_image
      || (isDispatch(post.tags) ? `${SITE_URL}${getDispatchImage(post.slug)}` : undefined);
    const description = post.excerpt || "";
    const blogPostSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      author: { "@type": "Organization", name: "Certainly Cooperative" },
      publisher: {
        "@type": "Organization",
        name: "Certainly Cooperative",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` },
      },
      ...(ogImage && { image: { "@type": "ImageObject", url: ogImage } }),
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    };
    const html = injectMeta(template, {
      title: post.title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      image: ogImage,
      type: "article",
      jsonLd: blogPostSchema,
    });

    const dir = resolve(distDir, "blog", post.slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, "index.html"), html, "utf-8");
    count++;
  }

  // Generate blog listing page
  const blogHtml = injectMeta(template, {
    title: "Blog",
    description:
      "Industry intelligence, certification strategy, and weekly dispatches from Certainly Cooperative.",
    url: `${SITE_URL}/blog`,
    type: "website",
  });

  const blogDir = resolve(distDir, "blog");
  mkdirSync(blogDir, { recursive: true });
  writeFileSync(resolve(blogDir, "index.html"), blogHtml, "utf-8");

  // Organization schema (reused across pages)
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Certainly Cooperative",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    description: "A cooperative of builders, writers, and strategists helping mission-driven brands scale their credibility through credentials, digital branding, and content.",
    sameAs: ["https://www.linkedin.com/company/certainly-cooperative"],
    contactPoint: { "@type": "ContactPoint", contactType: "sales", url: SITE_URL },
  };

  function serviceSchema(name: string, desc: string, url: string) {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      description: desc,
      url,
      provider: { "@type": "Organization", name: "Certainly Cooperative", url: SITE_URL },
    };
  }

  // Generate static pages
  const staticPages = [
    {
      path: "services",
      title: "Services",
      description: "Marketing, operations, and technology services for certification brands. We help certification bodies grow their programs and modernize their digital presence.",
      jsonLd: orgSchema,
    },
    {
      path: "services/marketing",
      title: "Certification Marketing Services",
      description: "Fill your candidate pipeline, build brand authority, and grow your certification program. Marketing strategy, lead generation, and content for certification bodies.",
      jsonLd: serviceSchema("Certification Marketing", "Marketing strategy, lead generation, and content for certification bodies.", `${SITE_URL}/services/marketing`),
    },
    {
      path: "services/operations",
      title: "Certification Operations & Program Management",
      description: "Streamline your certification program management, prepare for NCCA or ISO 17024 accreditation, and build governance systems that scale.",
      jsonLd: serviceSchema("Certification Operations", "Program management, accreditation preparation, and governance systems for certification bodies.", `${SITE_URL}/services/operations`),
    },
    {
      path: "services/technology",
      title: "Certification Technology & Website Design",
      description: "Build websites, digital ecosystems, and automation for your certification program. Technology strategy, website design, and digital credential solutions.",
      jsonLd: serviceSchema("Certification Technology", "Website design, digital credential strategy, and automation for certification bodies.", `${SITE_URL}/services/technology`),
    },
    {
      path: "about",
      title: "About",
      description: "Certainly Cooperative is a team of marketing, technology, and certification specialists. Built by former IWBI and USGBC staff, we help certification brands grow.",
      jsonLd: orgSchema,
    },
    {
      path: "contact",
      title: "Contact",
      description: "Connect with Certainly Cooperative. Tell us about your certification program and we'll share how we can help with marketing, operations, or technology.",
      jsonLd: orgSchema,
    },
    {
      path: "privacy",
      title: "Privacy Policy",
      description: "Privacy policy for Certainly Cooperative. How we collect, use, and protect your personal information.",
      jsonLd: orgSchema,
    },
    {
      path: "terms",
      title: "Terms of Use",
      description: "Terms of use for the Certainly Cooperative website. Rules governing your use of certainly.coop.",
      jsonLd: orgSchema,
    },
  ];

  let staticCount = 0;
  for (const page of staticPages) {
    const html = injectMeta(template, {
      title: page.title,
      description: page.description,
      url: `${SITE_URL}/${page.path}`,
      type: "website",
      jsonLd: page.jsonLd,
    });

    const dir = resolve(distDir, page.path);
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, "index.html"), html, "utf-8");
    staticCount++;
  }

  console.log(
    `Prerendered meta tags for ${count} blog posts + blog listing + ${staticCount} static pages → ${distDir}/`
  );
}

prerenderMeta();
