import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { format } from 'date-fns';
import { SEO } from '@/components/SEO';
import { getDispatchImage, isDispatch } from '@/lib/dispatch-images';

const Blog = () => {
  const { data: posts, isLoading } = useBlogPosts(true);

  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="Blog"
        description="Insights and perspectives on building trust, credentials, digital branding, and content strategy from Certainly Cooperative."
        path="/blog"
      />
      {/* Header */}
      <header className="py-6 border-b border-border">
        <div className="container mx-auto px-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-forest-green text-primary-foreground">
        <div className="container mx-auto px-6">
          <p className="text-primary-foreground/70 font-sans text-sm uppercase tracking-widest mb-4">
            Insights & Perspectives
          </p>
          <h1 className="text-4xl md:text-6xl font-serif max-w-3xl">
            Ideas that build trust and drive growth
          </h1>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-muted rounded-lg mb-4" />
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.slug}`}
                  className="group"
                >
                  {(post.featured_image || isDispatch(post.tags)) && (
                    <div className="aspect-video overflow-hidden rounded-lg mb-4">
                      <img 
                        src={post.featured_image || getDispatchImage(post.slug)} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag}
                          className="text-xs font-sans uppercase tracking-wider text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="text-xl font-serif text-foreground group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{post.author_name}</span>
                    <span>·</span>
                    {post.published_at && (
                      <span>{format(new Date(post.published_at), 'MMM d, yyyy')}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No posts published yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
