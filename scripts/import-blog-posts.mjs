import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const SUPABASE_URL = "https://mgjhcfimddvtvsfenjry.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1namhjZmltZGR2dHZzZmVuanJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzQ5MzgyNiwiZXhwIjoyMDg5MDY5ODI2fQ.OyNiGFRX2OLNttJJIh0KIXdk2UEJ12UG6951UIOeQwY";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const EXISTING_SLUGS = new Set([
  "certification-dispatch-2026-03-13",
  "certification-dispatch-2026-03-06",
  "how-to-prepare-for-ncca-accreditation",
  "well-equity-rating-launch-case-study",
  "codegreen-website-launch-case-study",
  "iso-17024-vs-ncca-accreditation-comparison",
  "certification-website-losing-leads",
  "certification-marketing-stack-tools",
  "micro-credentials-stackable-certifications-guide",
  "digital-badge-strategy-certification-programs",
  "building-candidate-pipeline-certification-program",
  "the-essential-walkthrough-video-guide-for-certification-credential-orgs",
  "what-is-certification-marketing",
]);

const CATEGORY_MAP = {
  stories: "Case Study",
  content: "Content Strategy",
  "industry-intelligence": "Industry Intelligence",
  guides: "Guide",
};

// Parse CSV handling quoted fields with commas and escaped double quotes
function parseCSV(text) {
  const rows = [];
  let i = 0;
  const len = text.length;

  function parseField() {
    if (i >= len || text[i] === "\n" || text[i] === "\r") return "";

    if (text[i] === '"') {
      // Quoted field
      i++; // skip opening quote
      let field = "";
      while (i < len) {
        if (text[i] === '"') {
          if (i + 1 < len && text[i + 1] === '"') {
            field += '"';
            i += 2;
          } else {
            i++; // skip closing quote
            break;
          }
        } else {
          field += text[i];
          i++;
        }
      }
      return field;
    } else {
      // Unquoted field
      let field = "";
      while (i < len && text[i] !== "," && text[i] !== "\n" && text[i] !== "\r") {
        field += text[i];
        i++;
      }
      return field;
    }
  }

  while (i < len) {
    const row = [];
    while (true) {
      row.push(parseField());
      if (i < len && text[i] === ",") {
        i++; // skip comma
        continue;
      }
      break;
    }
    // Skip line endings
    if (i < len && text[i] === "\r") i++;
    if (i < len && text[i] === "\n") i++;
    rows.push(row);
  }

  return rows;
}

function slugToName(slug) {
  if (!slug) return "Certainly Cooperative";
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function cleanHTML(html) {
  if (!html) return "";
  // Strip id="" and id="..." attributes (including escaped double quotes)
  let cleaned = html.replace(/\s*id="[^"]*"/g, "");
  // Strip empty paragraphs with zero-width spaces
  cleaned = cleaned.replace(/<p>\s*\u200d?\s*<\/p>/g, "");
  return cleaned;
}

function parseTags(category) {
  if (!category || !category.trim()) return null;
  const mapped = CATEGORY_MAP[category.trim()];
  return mapped ? [mapped] : [category.trim()];
}

function parseDate(dateStr) {
  if (!dateStr || !dateStr.trim()) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

async function main() {
  const csvText = readFileSync(
    "/Users/shanegring/Desktop/Certainly - Blog Posts.csv",
    "utf-8"
  );

  const rows = parseCSV(csvText);
  const headers = rows[0];
  console.log("Headers:", headers);
  console.log(`Total rows (including header): ${rows.length}`);

  // Map header indices
  const idx = {};
  headers.forEach((h, i) => (idx[h.trim()] = i));

  const toInsert = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (row.length < 2) continue; // skip empty rows

    const draft = row[idx["Draft"]]?.trim();
    const slug = row[idx["Slug"]]?.trim();

    // Only published posts
    if (draft !== "false") {
      console.log(`Skipping draft: ${slug}`);
      continue;
    }

    // Skip existing
    if (EXISTING_SLUGS.has(slug)) {
      console.log(`Skipping existing: ${slug}`);
      continue;
    }

    const title = row[idx["Post Title"]]?.trim();
    const content = cleanHTML(row[idx["Post Body"]]);
    const excerpt = row[idx["Meta Description"]]?.trim() || null;
    const featuredImage = row[idx["Main Image"]]?.trim() || null;
    const authorSlug = row[idx["Author"]]?.trim();
    const authorName = slugToName(authorSlug);
    const tags = parseTags(row[idx["Category"]]);
    const publishedAt = parseDate(row[idx["Published Date"]]);

    toInsert.push({
      title,
      slug,
      excerpt,
      content,
      featured_image: featuredImage,
      author_name: authorName,
      tags,
      status: "published",
      published_at: publishedAt,
    });
  }

  console.log(`\nPosts to insert: ${toInsert.length}`);

  if (toInsert.length === 0) {
    console.log("Nothing to insert.");
    return;
  }

  // Insert in batches
  const batchSize = 10;
  let inserted = 0;
  for (let i = 0; i < toInsert.length; i += batchSize) {
    const batch = toInsert.slice(i, i + batchSize);
    const { data, error } = await supabase
      .from("blog_posts")
      .insert(batch)
      .select("slug");

    if (error) {
      console.error(`Error inserting batch starting at ${i}:`, error.message);
      // Try one by one
      for (const post of batch) {
        const { error: singleErr } = await supabase
          .from("blog_posts")
          .insert(post)
          .select("slug");
        if (singleErr) {
          console.error(`  Failed: ${post.slug} — ${singleErr.message}`);
        } else {
          console.log(`  Inserted: ${post.slug}`);
          inserted++;
        }
      }
    } else {
      inserted += data.length;
      data.forEach((d) => console.log(`Inserted: ${d.slug}`));
    }
  }

  console.log(`\nDone. ${inserted} posts imported.`);
}

main().catch(console.error);
