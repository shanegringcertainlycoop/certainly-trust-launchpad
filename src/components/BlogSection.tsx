import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { format } from "date-fns";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const BlogSection = () => {
  const { data: posts, isLoading } = useBlogPosts(true);
  const sectionRef = useScrollReveal();

  const latestPosts = posts?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-muted rounded w-1/3" />
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-light-gray rounded-xl h-80" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (latestPosts.length === 0) return null;

  return (
    <section className="py-24 bg-cream" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-12 fade-in-up">
          <div>
            <span className="section-label mb-4 inline-block">Insights</span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mt-4">
              Latest <em className="text-forest-green">thinking</em>
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden md:flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium text-sm"
          >
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 stagger-children">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="fade-in-up group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {post.featured_image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.6875rem] font-sans font-medium uppercase tracking-wider text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className="text-xl font-serif text-foreground group-hover:text-primary transition-colors duration-200 mb-2 leading-snug">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t border-border/50">
                  <span className="font-medium">{post.author_name}</span>
                  {post.published_at && (
                    <span>
                      {format(new Date(post.published_at), "MMM d, yyyy")}
                    </span>
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
