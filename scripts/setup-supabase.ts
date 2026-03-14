/**
 * Sets up the new Supabase project with tables, RLS policies, and migrates data.
 *
 * Usage: SUPABASE_SERVICE_KEY=xxx npx tsx scripts/setup-supabase.ts
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

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

// Old Supabase (Lovable-managed) — read-only
const OLD_URL = "https://mbhxcoqrkbnifipftynx.supabase.co";
const OLD_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iaHhjb3Fya2JuaWZpcGZ0eW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MzMwOTYsImV4cCI6MjA4MDIwOTA5Nn0.GB0GsKeBywxU0boGJXBpOIJmrKBgnGwzm0kb4Uk3xr8";

// New Supabase (self-managed)
const NEW_URL = "https://mgjhcfimddvtvsfenjry.supabase.co";
const NEW_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;
const NEW_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1namhjZmltZGR2dHZzZmVuanJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTM4MjYsImV4cCI6MjA4OTA2OTgyNn0.NDEtoKfqNkgWNdnL2lFo_qWxV4TXphqbOiHMcYpiQzY";

if (!NEW_SERVICE_KEY) {
  console.error("Set SUPABASE_SERVICE_KEY env var");
  process.exit(1);
}

const oldDb = createClient(OLD_URL, OLD_KEY);
const newDb = createClient(NEW_URL, NEW_SERVICE_KEY);

async function runSQL(sql: string) {
  // Use the Supabase SQL API via fetch
  const res = await fetch(`${NEW_URL}/rest/v1/rpc`, {
    method: "POST",
    headers: {
      "apikey": NEW_SERVICE_KEY,
      "Authorization": `Bearer ${NEW_SERVICE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "exec_sql", args: { sql } }),
  });
  return res;
}

async function setup() {
  console.log("=== Setting up new Supabase project ===\n");

  // Step 1: Create tables using the SQL endpoint
  console.log("Creating tables...");

  // We need to use the Supabase Dashboard SQL editor for DDL.
  // Instead, let's output the SQL and try an alternative approach.

  const createSQL = `
-- Blog posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  author_name text NOT NULL,
  excerpt text,
  featured_image text,
  content text NOT NULL,
  tags text[],
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Partnership inquiries
CREATE TABLE IF NOT EXISTS public.partnership_inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text,
  service_interest text,
  created_at timestamptz DEFAULT now()
);

-- RLS policies
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partnership_inquiries ENABLE ROW LEVEL SECURITY;

-- Blog posts: anyone can read published posts
CREATE POLICY "Published posts are viewable by everyone"
  ON public.blog_posts FOR SELECT
  USING (status = 'published');

-- Blog posts: authenticated users can do everything
CREATE POLICY "Authenticated users can manage posts"
  ON public.blog_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Newsletter: anyone can insert
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscriptions FOR INSERT
  TO anon
  WITH CHECK (true);

-- Newsletter: authenticated users can read
CREATE POLICY "Authenticated users can read subscriptions"
  ON public.newsletter_subscriptions FOR SELECT
  TO authenticated
  USING (true);

-- Partnership inquiries: anyone can insert
CREATE POLICY "Anyone can submit partnership inquiry"
  ON public.partnership_inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

-- Partnership inquiries: authenticated users can read
CREATE POLICY "Authenticated users can read inquiries"
  ON public.partnership_inquiries FOR SELECT
  TO authenticated
  USING (true);
`;

  console.log("\n========================================");
  console.log("COPY THE SQL BELOW INTO YOUR SUPABASE SQL EDITOR:");
  console.log(`https://supabase.com/dashboard/project/mgjhcfimddvtvsfenjry/sql/new`);
  console.log("========================================\n");
  console.log(createSQL);
  console.log("\n========================================");
  console.log("After running the SQL above, run this script again with --migrate flag");
  console.log("========================================\n");
}

async function migrate() {
  console.log("=== Migrating data ===\n");

  // Migrate blog posts
  console.log("Fetching blog posts from old Supabase...");
  const { data: posts, error: postsErr } = await oldDb
    .from("blog_posts")
    .select("*")
    .eq("status", "published");

  if (postsErr) {
    console.error("Failed to fetch posts:", postsErr.message);
  } else if (posts && posts.length > 0) {
    console.log(`Found ${posts.length} posts. Inserting...`);
    for (const post of posts) {
      const { id, ...postData } = post;
      const { error } = await newDb.from("blog_posts").upsert(postData, { onConflict: "slug" });
      if (error) {
        console.error(`  Failed: ${post.title} — ${error.message}`);
      } else {
        console.log(`  Migrated: ${post.title}`);
      }
    }
  } else {
    console.log("No posts found to migrate.");
  }

  // Migrate newsletter subscriptions
  console.log("\nFetching newsletter subscriptions...");
  const { data: subs, error: subsErr } = await oldDb
    .from("newsletter_subscriptions")
    .select("*");

  if (subsErr) {
    console.log("Could not fetch subscriptions (may be RLS-protected):", subsErr.message);
  } else if (subs && subs.length > 0) {
    console.log(`Found ${subs.length} subscriptions. Inserting...`);
    for (const sub of subs) {
      const { id, ...subData } = sub;
      const { error } = await newDb.from("newsletter_subscriptions").upsert(subData, { onConflict: "email" });
      if (error) {
        console.error(`  Failed: ${sub.email} — ${error.message}`);
      } else {
        console.log(`  Migrated: ${sub.email}`);
      }
    }
  } else {
    console.log("No subscriptions found (or RLS-protected).");
  }

  console.log("\nMigration complete!");
}

const args = process.argv.slice(2);
if (args.includes("--migrate")) {
  migrate();
} else {
  setup();
}
