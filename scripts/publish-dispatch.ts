import { createClient } from "@supabase/supabase-js";
import { resolve } from "path";
import { pathToFileURL } from "url";
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


// --- Supabase setup ---
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- CLI args ---
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const filePath = args.find((a) => !a.startsWith("--"));

if (!filePath) {
  console.error("Usage: npx tsx scripts/publish-dispatch.ts <path-to-dispatch.ts> [--dry-run]");
  process.exit(1);
}

// --- Types ---
interface DispatchSection {
  type: "callout" | "h2" | "h3" | "paragraph" | "divider";
  content?: string;
}

interface Dispatch {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  publishedAt: string;
  readTime?: number;
  category?: string;
  excerpt: string;
  sections: DispatchSection[];
}

// --- Source URL processing ---
function humanizeDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function extractSource(text: string): { body: string; url: string | null; label: string | null } {
  const sourcePattern = /\s*Source:\s*(https?:\/\/\S+)\s*$/;
  const match = text.match(sourcePattern);

  if (match) {
    const url = match[1];
    const label = humanizeDomain(url);
    const body = text.slice(0, match.index);
    return { body, url, label };
  }

  return { body: text, url: null, label: null };
}

// --- Sections to HTML ---
function sectionsToHtml(sections: DispatchSection[]): string {
  return sections
    .map((section) => {
      switch (section.type) {
        case "callout":
          return `<blockquote>${section.content}</blockquote>`;
        case "h2":
          return `<h2>${section.content}</h2>`;
        case "h3":
          return `<h3>${section.content}</h3>`;
        case "paragraph": {
          const { body, url, label } = extractSource(section.content || "");
          if (url) {
            return `<p>${body}</p>\n<p class="source-link"><a href="${url}" target="_blank" rel="noopener noreferrer">${label} \u2192</a></p>`;
          }
          return `<p>${body}</p>`;
        }
        case "divider":
          return `<hr />`;
        default:
          return "";
      }
    })
    .join("\n");
}

// --- Main ---
async function main() {
  const absPath = resolve(process.cwd(), filePath!);
  const fileUrl = pathToFileURL(absPath).href;

  console.log(`Loading dispatch from: ${absPath}`);

  const mod = await import(fileUrl);
  const dispatch: Dispatch =
    mod.default || Object.values(mod).find((v: any) => v?.slug && v?.sections);

  if (!dispatch?.slug || !dispatch?.sections) {
    console.error("Could not find a valid dispatch export in the file.");
    console.error("Expected an object with slug, title, excerpt, and sections.");
    process.exit(1);
  }

  console.log(`Dispatch: "${dispatch.title}" (${dispatch.slug})`);
  console.log(`Sections: ${dispatch.sections.length}`);

  const html = sectionsToHtml(dispatch.sections);

  if (dryRun) {
    console.log("\n--- Generated HTML (dry run) ---\n");
    console.log(html);
    console.log("\n--- End HTML ---");
    return;
  }

  // Call the SECURITY DEFINER function to bypass RLS
  const { data, error } = await supabase.rpc("publish_dispatch", {
    p_slug: dispatch.slug,
    p_title: dispatch.title,
    p_excerpt: dispatch.excerpt,
    p_content: html,
    p_published_at: new Date(dispatch.publishedAt).toISOString(),
    p_tags: ["Certification Dispatch"],
    p_author_name: "Certainly Cooperative",
  });

  if (error) {
    console.error("Publish failed:", error.message);
    process.exit(1);
  }

  console.log(`Published: https://certainly.coop/blog/${dispatch.slug}`);
  if (data) console.log("Result:", JSON.stringify(data));
}

main();
