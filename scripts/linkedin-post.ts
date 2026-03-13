/**
 * Post a dispatch summary to LinkedIn.
 *
 * Usage:
 *   npx tsx scripts/linkedin-post.ts <path-to-dispatch.ts> [--dry-run]
 *
 * Reads the dispatch file, generates a LinkedIn post with:
 *   - Brief intro text summarizing the week's highlights
 *   - Link to the blog post on certainly.coop
 *   - Relevant hashtags
 */

import { resolve } from "path";
import { pathToFileURL } from "url";
import { readFileSync } from "fs";

// Load .env
const envPath = resolve(process.cwd(), ".env");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^(\w+)="?([^"]*)"?$/);
    if (match) process.env[match[1]] = match[2];
  }
} catch {}

const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
const personId = process.env.LINKEDIN_PERSON_ID;

if (!accessToken) {
  console.error("Missing LINKEDIN_ACCESS_TOKEN in .env");
  console.error("Run: npx tsx scripts/linkedin-auth.ts");
  process.exit(1);
}

if (!personId) {
  console.error("Missing LINKEDIN_PERSON_ID in .env");
  process.exit(1);
}

// --- CLI args ---
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const filePath = args.find((a) => !a.startsWith("--"));

if (!filePath) {
  console.error(
    "Usage: npx tsx scripts/linkedin-post.ts <path-to-dispatch.ts> [--dry-run]"
  );
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
  excerpt: string;
  publishedAt: string;
  sections: DispatchSection[];
}

// --- Build LinkedIn post text ---
function buildPostText(dispatch: Dispatch): string {
  const blogUrl = `https://certainly.coop/blog/${dispatch.slug}`;

  // Extract h3 headlines for bullet points
  const headlines = dispatch.sections
    .filter((s) => s.type === "h3")
    .map((s) => s.content || "")
    .slice(0, 4); // Top 4 stories

  const bulletPoints = headlines.map((h) => `\u2022 ${h}`).join("\n");

  return `${dispatch.title}

${dispatch.excerpt}

This week's highlights:
${bulletPoints}

Read the full dispatch \u2192 ${blogUrl}

#Certifications #Sustainability #Compliance #TrustBuilding #CertainlyCooperative`;
}

// --- Post to LinkedIn ---
async function postToLinkedIn(
  userId: string,
  text: string,
  articleUrl: string,
  articleTitle: string
): Promise<void> {
  const payload = {
    author: `urn:li:person:${userId}`,
    commentary: text,
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    content: {
      article: {
        source: articleUrl,
        title: articleTitle,
      },
    },
    lifecycleState: "PUBLISHED",
  };

  const res = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "LinkedIn-Version": "202504",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LinkedIn post failed (${res.status}): ${err}`);
  }

  const postId = res.headers.get("x-restli-id") || "unknown";
  console.log(`Posted successfully (ID: ${postId})`);
}

// --- Main ---
async function main() {
  const absPath = resolve(process.cwd(), filePath!);
  const fileUrl = pathToFileURL(absPath).href;

  const mod = await import(fileUrl);
  const dispatch: Dispatch =
    mod.default || Object.values(mod).find((v: any) => v?.slug && v?.sections);

  if (!dispatch?.slug || !dispatch?.sections) {
    console.error("Could not find a valid dispatch export in the file.");
    process.exit(1);
  }

  const postText = buildPostText(dispatch);
  const blogUrl = `https://certainly.coop/blog/${dispatch.slug}`;

  if (dryRun) {
    console.log("\n--- LinkedIn Post Preview (dry run) ---\n");
    console.log(postText);
    console.log("\n--- End Preview ---");
    return;
  }

  console.log(`Posting to LinkedIn as member ${personId}...`);
  await postToLinkedIn(personId!, postText, blogUrl, dispatch.title);
  console.log(`\nLinkedIn post published for: ${dispatch.title}`);
}

main();
