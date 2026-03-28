-- SECURITY DEFINER function to upsert blog posts from CLI scripts
-- Bypasses RLS so anon key can publish without admin auth
CREATE OR REPLACE FUNCTION public.publish_dispatch(
  p_slug TEXT,
  p_title TEXT,
  p_excerpt TEXT,
  p_content TEXT,
  p_published_at TIMESTAMPTZ,
  p_tags TEXT[],
  p_author_name TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result_id UUID;
BEGIN
  INSERT INTO public.blog_posts (slug, title, excerpt, content, published_at, tags, author_name, status)
  VALUES (p_slug, p_title, p_excerpt, p_content, p_published_at, p_tags, p_author_name, 'published')
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    published_at = EXCLUDED.published_at,
    tags = EXCLUDED.tags,
    author_name = EXCLUDED.author_name,
    status = 'published',
    updated_at = now()
  RETURNING id INTO result_id;

  RETURN json_build_object('id', result_id, 'slug', p_slug);
END;
$$;
