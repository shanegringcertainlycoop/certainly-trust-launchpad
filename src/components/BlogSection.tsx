import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { format } from 'date-fns';

export const BlogSection = () => {
  const { data: posts, isLoading } = useBlogPosts(true);
  
  const latestPosts = posts?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <section className="py-24 bg-light-gray">
        <div className="container mx-auto px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-muted rounded w-1/3" />
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-lg h-80" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-light-gray">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-muted-foreground font-sans text-sm uppercase tracking-widest mb-2">
              Insights
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">
              Latest Thinking
            </h2>
          </div>
          <Link 
            to="/blog" 
            className="hidden md:flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {post.featured_image && (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.featured_image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs font-sans uppercase tracking-wider text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className="text-xl font-serif text-foreground group-hover:text-primary transition-colors mb-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{post.author_name}</span>
                  {post.published_at && (
                    <span>{format(new Date(post.published_at), 'MMM d, yyyy')}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link 
          to="/blog" 
          className="md:hidden flex items-center justify-center gap-2 mt-8 text-primary hover:text-accent transition-colors font-medium"
        >
          View all posts
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
