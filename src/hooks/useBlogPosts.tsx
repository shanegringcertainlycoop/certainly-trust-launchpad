import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author_name: string;
  tags: string[] | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type BlogPostInsert = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>;
export type BlogPostUpdate = Partial<BlogPostInsert>;

export const useBlogPosts = (publishedOnly = true) => {
  return useQuery({
    queryKey: ['blog-posts', publishedOnly],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false, nullsFirst: false });
      
      if (publishedOnly) {
        query = query.eq('status', 'published');
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as BlogPost[];
    },
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) throw error;
      return data as BlogPost | null;
    },
    enabled: !!slug,
  });
};

export const useRelatedPosts = (currentSlug: string, tags: string[] | null, limit = 3) => {
  return useQuery({
    queryKey: ['related-posts', currentSlug, tags],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, featured_image, tags, published_at, author_name')
        .eq('status', 'published')
        .neq('slug', currentSlug)
        .order('published_at', { ascending: false, nullsFirst: false });

      if (error) throw error;

      const posts = data as Pick<BlogPost, 'id' | 'title' | 'slug' | 'excerpt' | 'featured_image' | 'tags' | 'published_at' | 'author_name'>[];

      if (!tags || tags.length === 0) return posts.slice(0, limit);

      // Score by number of shared tags, then sort by score desc + recency
      const scored = posts.map((p) => {
        const shared = (p.tags || []).filter((t) => tags.includes(t)).length;
        return { ...p, score: shared };
      });
      scored.sort((a, b) => b.score - a.score || new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime());

      return scored.slice(0, limit);
    },
    enabled: !!currentSlug,
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (post: BlogPostInsert) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(post)
        .select()
        .single();
      
      if (error) throw error;
      return data as BlogPost;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: BlogPostUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as BlogPost;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-post', data.slug] });
    },
  });
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });
};
