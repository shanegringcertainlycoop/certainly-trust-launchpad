/// <reference types="@cloudflare/workers-types" />

/**
 * Cloudflare Pages middleware that rewrites OG meta tags for social media
 * crawlers. LinkedIn, Facebook, and Twitter don't execute JavaScript, so
 * they only see the static fallback tags in index.html. This middleware
 * detects crawler user-agents, fetches the blog post data from Supabase,
 * and injects the correct og:title, og:description, and og:image into the
 * HTML before returning it.
 */

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

interface BlogPostRow {
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  author_name: string;
  tags: string[] | null;
}

const SOCIAL_BOT_UA =
  /linkedinbot|facebookexternalhit|facebookcatalog|twitterbot|slackbot|whatsapp|telegrambot|discordbot|pinterestbot/i;

const SITE_URL = "https://certainly.coop";

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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function fetchPost(
  env: Env,
  slug: string
): Promise<BlogPostRow | null> {
  const url = `${env.SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}&select=title,slug,excerpt,featured_image,author_name,tags&status=eq.published&limit=1`;

  const res = await fetch(url, {
    headers: {
      apikey: env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) return null;

  const rows = (await res.json()) as BlogPostRow[];
  return rows.length > 0 ? rows[0] : null;
}

function rewriteMetaTags(
  html: string,
  meta: { title: string; description: string; image: string; url: string; type: string }
): string {
  const t = escapeHtml(meta.title);
  const d = escapeHtml(meta.description);
  const img = escapeHtml(meta.image);
  const u = escapeHtml(meta.url);

  // Replace existing OG tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${t}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${d}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${img}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${u}" />`
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${escapeHtml(meta.type)}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${img}" />`
  );

  // Replace <title> and description
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${t}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${d}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${u}" />`
  );

  return html;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, next, env } = context;
  const ua = request.headers.get("user-agent") || "";

  // Only intercept for social crawlers
  if (!SOCIAL_BOT_UA.test(ua)) {
    return next();
  }

  const url = new URL(request.url);
  const blogMatch = url.pathname.match(/^\/blog\/([^/]+)\/?$/);

  if (!blogMatch) {
    // Not a blog post URL — let the static fallback tags handle it
    return next();
  }

  const slug = blogMatch[1];

  // Fetch post data from Supabase
  const post = await fetchPost(env, slug);

  if (!post) {
    return next();
  }

  // Get the original HTML response
  const response = await next();
  const html = await response.text();

  // Determine OG image
  let ogImage: string;
  if (post.featured_image) {
    ogImage = post.featured_image;
  } else if (isDispatch(post.tags)) {
    ogImage = `${SITE_URL}${getDispatchImage(post.slug)}`;
  } else {
    ogImage = `${SITE_URL}/images/dispatch-og.jpg`;
  }

  const description =
    post.excerpt ||
    `Read "${post.title}" by ${post.author_name} on the Certainly Cooperative blog.`;

  const rewritten = rewriteMetaTags(html, {
    title: `${post.title} | Certainly`,
    description,
    image: ogImage,
    url: `${SITE_URL}/blog/${post.slug}`,
    type: "article",
  });

  return new Response(rewritten, {
    status: response.status,
    headers: response.headers,
  });
};
