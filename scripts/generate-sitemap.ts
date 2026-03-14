import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync, existsSync } from "fs";
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

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY env vars — skipping sitemap generation");
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateSitemap() {
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch blog posts:", error.message);
    process.exit(1);
  }

  const today = new Date().toISOString().split("T")[0];
  const staticPages = [
    { loc: "/", lastmod: today, changefreq: "weekly", priority: "1.0" },
    { loc: "/services", lastmod: today, changefreq: "monthly", priority: "0.9" },
    { loc: "/services/marketing", lastmod: today, changefreq: "monthly", priority: "0.8" },
    { loc: "/services/operations", lastmod: today, changefreq: "monthly", priority: "0.8" },
    { loc: "/services/technology", lastmod: today, changefreq: "monthly", priority: "0.8" },
    { loc: "/about", lastmod: today, changefreq: "monthly", priority: "0.7" },
    { loc: "/contact", lastmod: today, changefreq: "monthly", priority: "0.7" },
    { loc: "/blog", lastmod: today, changefreq: "daily", priority: "0.8" },
  ];

  const blogPages = (posts || []).map((post) => ({
    loc: `/blog/${post.slug}`,
    lastmod: post.updated_at?.split("T")[0],
    changefreq: "monthly" as const,
    priority: "0.6",
  }));

  const allPages = [...staticPages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.loc}</loc>${
      "lastmod" in page && page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ""
    }
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  // Write to both public/ (for dev server) and dist/ (for deploy)
  const publicPath = resolve(process.cwd(), "public/sitemap.xml");
  writeFileSync(publicPath, xml, "utf-8");

  const distPath = resolve(process.cwd(), "dist/sitemap.xml");
  if (existsSync(resolve(process.cwd(), "dist"))) {
    writeFileSync(distPath, xml, "utf-8");
  }

  console.log(`Sitemap generated with ${allPages.length} URLs`);
}

generateSitemap();
