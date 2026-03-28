import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.86.0";

const BEEHIIV_PUBLICATION_ID = "pub_032815a3-09de-4fe3-8ddd-29887c80a61d";
const BEEHIIV_API_BASE = "https://api.beehiiv.com/v2";

/**
 * Receives a Beehiiv "post.sent" webhook, fetches the full post content
 * via the Beehiiv API, cleans the HTML, and upserts it into the blog_posts table.
 */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cleanBeehiivHtml(html: string): string {
  // Strip Beehiiv wrapper divs, tracking pixels, and email-specific markup
  let cleaned = html;

  // Remove tracking pixels (1x1 images)
  cleaned = cleaned.replace(/<img[^>]*(?:width|height)\s*=\s*["']1["'][^>]*>/gi, "");

  // Remove empty divs/spans with only whitespace
  cleaned = cleaned.replace(/<(div|span)[^>]*>\s*<\/\1>/gi, "");

  // Remove inline styles (Beehiiv emails are heavily inline-styled)
  cleaned = cleaned.replace(/\s*style="[^"]*"/gi, "");

  // Remove class attributes (Beehiiv-specific classes)
  cleaned = cleaned.replace(/\s*class="[^"]*"/gi, "");

  // Remove data attributes
  cleaned = cleaned.replace(/\s*data-[a-z-]+="[^"]*"/gi, "");

  // Remove Beehiiv tracking links that wrap actual links
  // Keep the inner content
  cleaned = cleaned.replace(
    /<a[^>]*href="https?:\/\/[^"]*beehiiv\.com\/[^"]*redirect[^"]*"[^>]*>([\s\S]*?)<\/a>/gi,
    "$1"
  );

  // Collapse multiple newlines
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

  return cleaned.trim();
}

const handler = async (req: Request): Promise<Response> => {
  // Only accept POST
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Verify the webhook secret if configured
  const webhookSecret = Deno.env.get("BEEHIIV_WEBHOOK_SECRET");
  if (webhookSecret) {
    const providedSecret = req.headers.get("x-beehiiv-secret") ||
      req.headers.get("authorization")?.replace("Bearer ", "");
    if (providedSecret !== webhookSecret) {
      console.error("Webhook secret mismatch");
      return new Response("Unauthorized", { status: 401 });
    }
  }

  try {
    const payload = await req.json();
    console.log("Received webhook event:", payload.event_type);

    // Only handle post.sent events
    if (payload.event_type !== "post.sent") {
      console.log("Ignoring event type:", payload.event_type);
      return new Response(JSON.stringify({ skipped: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const postData = payload.data;
    if (!postData?.id) {
      throw new Error("No post ID in webhook payload");
    }

    // Fetch full post content from Beehiiv API
    const apiKey = Deno.env.get("BEEHIIV_API_KEY");
    if (!apiKey) {
      throw new Error("BEEHIIV_API_KEY not configured");
    }

    const postUrl =
      `${BEEHIIV_API_BASE}/publications/${BEEHIIV_PUBLICATION_ID}/posts/${postData.id}?expand[]=free_web_content`;
    console.log("Fetching post content from:", postUrl);

    const postRes = await fetch(postUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!postRes.ok) {
      const errBody = await postRes.text();
      throw new Error(`Beehiiv API error ${postRes.status}: ${errBody}`);
    }

    const { data: fullPost } = await postRes.json();

    const title = fullPost.title || postData.title;
    const slug = fullPost.slug || slugify(title);
    const excerpt = fullPost.subtitle || fullPost.preview_text || null;
    const thumbnail = fullPost.thumbnail_url || null;
    const publishDate = fullPost.publish_date
      ? new Date(fullPost.publish_date * 1000).toISOString()
      : new Date().toISOString();

    // Get HTML content — prefer free_web_content
    const rawHtml =
      fullPost.content?.free?.web || fullPost.content?.free?.rss || "";
    if (!rawHtml) {
      console.warn("No HTML content found in post, using empty content");
    }

    const content = cleanBeehiivHtml(rawHtml);

    // Upsert into blog_posts using service role (bypasses RLS)
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const row = {
      slug,
      title,
      excerpt,
      content,
      featured_image: thumbnail,
      published_at: publishDate,
      tags: ["Seeking Certainty"],
      status: "published",
      author_name: "Certainly Cooperative",
    };

    // Check if slug already exists → update; otherwise insert
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from("blog_posts")
        .update(row)
        .eq("id", existing.id);
      if (error) throw error;
      console.log(`Updated existing post: ${slug}`);
    } else {
      const { error } = await supabase.from("blog_posts").insert(row);
      if (error) throw error;
      console.log(`Created new post: ${slug}`);
    }

    return new Response(
      JSON.stringify({ success: true, slug, action: existing ? "updated" : "created" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
