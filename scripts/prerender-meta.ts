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
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/dispatch-og.jpg`;

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
    image: string;
    type: string;
  }
): string {
  const t = escapeHtml(opts.title);
  const d = escapeHtml(opts.description);
  const u = opts.url;
  const img = opts.image;

  return template
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
      /(<meta\s+property="og:image"\s+content=")[^"]*(")/,
      `$1${img}$2`
    )
    .replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      `$1${u}$2`
    )
    .replace(
      /(<meta\s+property="og:type"\s+content=")[^"]*(")/,
      `$1${opts.type}$2`
    )
    .replace(
      /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,
      `$1${img}$2`
    );
}

async function prerenderMeta() {
  const distDir = resolve(process.cwd(), "dist");
  const template = readFileSync(resolve(distDir, "index.html"), "utf-8");

  // Fetch published blog posts
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("title, slug, excerpt, featured_image")
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
    const ogImage = post.featured_image || DEFAULT_OG_IMAGE;
    const description = post.excerpt || "";
    const html = injectMeta(template, {
      title: post.title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      image: ogImage,
      type: "article",
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
    image: DEFAULT_OG_IMAGE,
    type: "website",
  });

  const blogDir = resolve(distDir, "blog");
  mkdirSync(blogDir, { recursive: true });
  writeFileSync(resolve(blogDir, "index.html"), blogHtml, "utf-8");

  console.log(
    `Prerendered meta tags for ${count} blog posts + blog listing → ${distDir}/blog/`
  );
}

prerenderMeta();
