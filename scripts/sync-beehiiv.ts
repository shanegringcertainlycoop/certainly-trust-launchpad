import { createClient } from "@supabase/supabase-js";
import { resolve } from "path";
import { readFileSync } from "fs";

// Load .env file
const envPath = resolve(process.cwd(), ".env");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^(\w+)="?([^"]*)"?$/);
    if (match) process.env[match[1]] = match[2];
  }
} catch {}

// --- Config ---
const BEEHIIV_PUBLICATION_ID = "pub_032815a3-09de-4fe3-8ddd-29887c80a61d";
const BEEHIIV_API_BASE = "https://api.beehiiv.com/v2";

const beehiivApiKey = process.env.BEEHIIV_API_KEY;
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!beehiivApiKey) {
  console.error("Missing BEEHIIV_API_KEY in .env");
  process.exit(1);
}
if (!supabaseUrl || !supabaseKey) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- CLI args ---
const args = process.argv.slice(2);
const doPublish = args.includes("--publish");
const syncAll = args.includes("--all");
const dumpHtml = args.includes("--dump");
const postSlug = args.find((a) => !a.startsWith("--"));

// --- HTML cleaning ---
function cleanBeehiivHtml(html: string): string {
  let cleaned = html;

  // Beehiiv sends a full HTML document — extract just the content blocks
  const contentMatch = cleaned.match(/<div id=['"]content-blocks['"][^>]*>([\s\S]*)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/body>/i);
  if (contentMatch) {
    cleaned = contentMatch[1];
  } else {
    // Fallback: strip head/body wrappers
    cleaned = cleaned.replace(/^<!DOCTYPE[^>]*>/, "");
    cleaned = cleaned.replace(/<html[^>]*>/, "").replace(/<\/html>/, "");
    cleaned = cleaned.replace(/<head>[\s\S]*?<\/head>/i, "");
    cleaned = cleaned.replace(/<\/?body[^>]*>/gi, "");
  }

  // Remove all <style> blocks
  cleaned = cleaned.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");

  // Remove all <script> blocks
  cleaned = cleaned.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");

  // Remove the header block (title, byline, social share icons)
  cleaned = cleaned.replace(/<div id=['"]web-header['"][^>]*>[\s\S]*?<div id=['"]content-blocks['"][^>]*>/i, "");

  // Remove social share SVG blocks
  cleaned = cleaned.replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, "");

  // Remove tracking pixels (1x1 images)
  cleaned = cleaned.replace(/<img[^>]*(?:width|height)\s*=\s*["']1["'][^>]*>/gi, "");

  // Remove the Certainly logo image at the top (self-referential)
  cleaned = cleaned.replace(/<div[^>]*>\s*<a[^>]*certainly\.coop[^>]*>\s*<img[^>]*becertainly_logo[^>]*\/?\s*>\s*<\/a>\s*<\/div>/gi, "");

  // Remove inline styles
  cleaned = cleaned.replace(/\s*style="[^"]*"/gi, "");

  // Remove class attributes
  cleaned = cleaned.replace(/\s*class="[^"]*"/gi, "");

  // Remove data attributes
  cleaned = cleaned.replace(/\s*data-[a-z-]+="[^"]*"/gi, "");

  // Remove id attributes
  cleaned = cleaned.replace(/\s*id="[^"]*"/gi, "");

  // Remove beehiiv tracking params from links
  cleaned = cleaned.replace(/\?utm_source=seeking-certainty\.beehiiv\.com[^"']*/gi, "");

  // Remove target/rel attributes from links (site handles these)
  cleaned = cleaned.replace(/\s*target="[^"]*"/gi, "");
  cleaned = cleaned.replace(/\s*rel="[^"]*"/gi, "");

  // Unwrap unnecessary wrapper divs — keep semantic content
  // Remove empty divs
  cleaned = cleaned.replace(/<div>\s*<\/div>/gi, "");
  // Unwrap single-child divs around paragraphs, headings, lists
  cleaned = cleaned.replace(/<div>\s*(<(?:p|h[1-6]|ol|ul|blockquote|hr)[^>]*>[\s\S]*?<\/(?:p|h[1-6]|ol|ul|blockquote)>|<hr\s*\/?>)\s*<\/div>/gi, "$1");
  // Run again for nested wrappers
  cleaned = cleaned.replace(/<div>\s*(<(?:p|h[1-6]|ol|ul|blockquote|hr)[^>]*>[\s\S]*?<\/(?:p|h[1-6]|ol|ul|blockquote)>|<hr\s*\/?>)\s*<\/div>/gi, "$1");

  // Remove empty paragraphs
  cleaned = cleaned.replace(/<p>\s*<\/p>/gi, "");

  // Remove any remaining empty divs
  cleaned = cleaned.replace(/<div>\s*<\/div>/gi, "");
  // Unwrap remaining single-child divs
  cleaned = cleaned.replace(/<div>([\s\S]*?)<\/div>/gi, "$1");

  // Remove alt="" (empty alt) attributes
  cleaned = cleaned.replace(/\s*alt=""/gi, "");

  // Collapse multiple newlines/whitespace
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");
  cleaned = cleaned.replace(/^\s+/gm, "");

  return cleaned.trim();
}

// --- Fetch posts from Beehiiv ---
async function fetchBeehiivPosts(limit = 1): Promise<any[]> {
  const url = `${BEEHIIV_API_BASE}/publications/${BEEHIIV_PUBLICATION_ID}/posts?status=confirmed&limit=${limit}&expand[]=free_web_content&order_by=publish_date&direction=desc`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${beehiivApiKey}` },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Beehiiv API error ${res.status}: ${body}`);
  }

  const json = await res.json();
  return json.data || [];
}

async function fetchBeehiivPostBySlug(slug: string): Promise<any | null> {
  // Beehiiv doesn't have a get-by-slug endpoint, so fetch recent and filter
  const posts = await fetchBeehiivPosts(50);
  return posts.find((p: any) => p.slug === slug) || null;
}

// --- Main ---
async function main() {
  console.log(doPublish ? "Mode: PUBLISH" : "Mode: PREVIEW (use --publish to save)");
  console.log();

  let posts: any[];

  if (postSlug) {
    const post = await fetchBeehiivPostBySlug(postSlug);
    if (!post) {
      console.error(`No Beehiiv post found with slug: ${postSlug}`);
      process.exit(1);
    }
    posts = [post];
  } else if (syncAll) {
    posts = await fetchBeehiivPosts(50);
  } else {
    posts = await fetchBeehiivPosts(1);
  }

  console.log(`Found ${posts.length} post(s) from Beehiiv\n`);

  for (const post of posts) {
    const title = post.title;
    const slug = post.slug;
    const excerpt = post.subtitle || post.preview_text || null;
    const thumbnail = post.thumbnail_url || null;
    const publishDate = post.publish_date
      ? new Date(post.publish_date * 1000).toISOString()
      : new Date().toISOString();
    const webUrl = post.web_url;

    const rawHtml = post.content?.free?.web || post.content?.free?.rss || "";
    const content = cleanBeehiivHtml(rawHtml);

    console.log(`--- ${title} ---`);
    console.log(`  Slug:      ${slug}`);
    console.log(`  Excerpt:   ${excerpt?.slice(0, 80)}${(excerpt?.length || 0) > 80 ? "..." : ""}`);
    console.log(`  Published: ${publishDate}`);
    console.log(`  Thumbnail: ${thumbnail ? "yes" : "none"}`);
    console.log(`  Content:   ${content.length} chars`);
    console.log(`  Beehiiv:   ${webUrl}`);
    console.log();

    if (dumpHtml) {
      console.log("--- CLEANED HTML ---");
      console.log(content);
      console.log("--- END ---");
    }

    if (!content) {
      console.warn(`  ⚠ No content found — skipping`);
      continue;
    }

    if (doPublish) {
      const row = {
        p_slug: slug,
        p_title: title,
        p_excerpt: excerpt,
        p_content: content,
        p_published_at: publishDate,
        p_tags: ["Seeking Certainty"],
        p_author_name: "Certainly Cooperative",
      };

      const { data, error } = await supabase.rpc("publish_dispatch", row);

      if (error) {
        console.error(`  ✗ Failed: ${error.message}`);
      } else {
        console.log(`  ✓ Published → https://certainly.coop/blog/${slug}`);
      }
    }
  }

  if (!doPublish) {
    console.log("Run with --publish to save to certainly.coop");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
