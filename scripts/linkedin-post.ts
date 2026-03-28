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

import { resolve, join, dirname } from "path";
import { pathToFileURL, fileURLToPath } from "url";
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

  // Pull all paragraphs (strip source citations)
  const paragraphs = dispatch.sections
    .filter((s) => s.type === "paragraph" && s.content)
    .map((s) => s.content!.replace(/\s*Source:.*$/, "").trim());

  // Find the sharpest stat across all paragraphs — prefer percentages and dollar figures
  let hookSentence = "";
  for (const para of paragraphs) {
    const sentences = para.split(/\.\s+/);
    for (const sentence of sentences) {
      const hasPercent = /\d+(\.\d+)?%/.test(sentence);
      const hasDollar = /\$[\d.,]+\s*(billion|million|B|M)/i.test(sentence);
      if ((hasPercent || hasDollar) && sentence.length < 200) {
        hookSentence = sentence.trim();
        break;
      }
    }
    if (hookSentence) break;
  }

  // Build opinionated post in Shane's voice:
  // - Find the two most contrasting/interesting data points
  // - Write an observation, not a summary
  // - Clean close with link

  // Look for the ROC/organic growth stat specifically (strong contrast story)
  const rocPara = paragraphs.find(
    (p) => p.includes("Regenerative Organic") && p.includes("%")
  );
  const csrdPara = paragraphs.find(
    (p) => p.includes("CSRD") || p.includes("Omnibus") || p.includes("90%")
  );
  const farmBillPara = paragraphs.find(
    (p) => p.includes("Farm Bill") || p.includes("cost-share")
  );

  let postBody = "";

  if (csrdPara && rocPara) {
    // Contrast: regulatory retreat vs. voluntary label growth
    const csrdHook = csrdPara.split(/\.\s+/)[0].trim();
    const rocNum = rocPara.match(/(\d+)%\s+increase in buyers/)?.[1] || "22";

    postBody = `The EU just cut CSRD scope by roughly 90%.

Not a small trim. A near-complete rollback of the sustainability reporting mandate that was going to cover 50,000 companies.

Meanwhile, Regenerative Organic Certified grew ${rocNum}% in buyers last year. USDA Organic grew 6.6%.

Two signals moving in opposite directions. One says the regulatory pressure for sustainability disclosure is retreating. The other says voluntary, rigorous certification is gaining ground without it.

I don't think those two things are unrelated.

This week's Certification Dispatch covers both — plus B Corp's new V2.1 assurance requirements, LEED v5, and why farms across the U.S. still haven't seen their 2025 USDA cost-share reimbursements.

${blogUrl}`;
  } else if (farmBillPara) {
    // Farm Bill angle
    const hook = farmBillPara.split(/\.\s+/)[0].trim();
    postBody = `${hook}.

Farms that certified organic in 2025 still haven't been reimbursed by USDA. Typically that money arrives in July. It's now March.

The House Farm Bill extends the cost-share program — but at $8M flat, the same level since certification costs rose 85%.

The signals in certification this week were mixed. This week's dispatch has the full breakdown.

${blogUrl}`;
  } else {
    // Fallback: clean observation-style post
    postBody = `${hookSentence || dispatch.excerpt.split(".")[0]}.

This week in certifications: ${dispatch.sections
      .filter((s) => s.type === "h3")
      .slice(0, 3)
      .map((s) => s.content)
      .join(", ")}.

Full breakdown at the link.

${blogUrl}`;
  }

  return postBody;
}

// --- Upload image to LinkedIn ---
async function uploadImage(userId: string, imagePath: string): Promise<string> {
  // Step 1: Initialize upload
  const initRes = await fetch(
    "https://api.linkedin.com/rest/images?action=initializeUpload",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "LinkedIn-Version": "202504",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify({
        initializeUploadRequest: {
          owner: `urn:li:person:${userId}`,
        },
      }),
    }
  );

  if (!initRes.ok) {
    const err = await initRes.text();
    throw new Error(`Image upload init failed (${initRes.status}): ${err}`);
  }

  const initData = (await initRes.json()) as {
    value: { uploadUrl: string; image: string };
  };
  const { uploadUrl, image: imageUrn } = initData.value;

  // Step 2: Upload the binary
  const imageBytes = readFileSync(imagePath);
  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "image/jpeg",
    },
    body: imageBytes,
  });

  if (!uploadRes.ok) {
    const err = await uploadRes.text();
    throw new Error(`Image binary upload failed (${uploadRes.status}): ${err}`);
  }

  console.log(`Image uploaded: ${imageUrn}`);
  return imageUrn;
}

// --- Post to LinkedIn ---
async function postToLinkedIn(
  userId: string,
  text: string,
  imageUrn?: string
): Promise<void> {
  const payload: Record<string, unknown> = {
    author: `urn:li:person:${userId}`,
    commentary: text,
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    lifecycleState: "PUBLISHED",
  };

  if (imageUrn) {
    payload.content = { media: { id: imageUrn } };
  }

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

  if (dryRun) {
    console.log("\n--- LinkedIn Post Preview (dry run) ---\n");
    console.log(postText);
    console.log("\n--- End Preview ---");
    return;
  }

  // Upload the dispatch OG image
  const imagePath = resolve(process.cwd(), "public/images/dispatch-og.jpg");
  let imageUrn: string | undefined;
  try {
    console.log("Uploading image...");
    imageUrn = await uploadImage(personId!, imagePath);
  } catch (err) {
    console.warn(`Image upload failed, posting without image: ${err}`);
  }

  console.log(`Posting to LinkedIn as member ${personId}...`);
  await postToLinkedIn(personId!, postText, imageUrn);
  console.log(`\nLinkedIn post published for: ${dispatch.title}`);
}

main();
