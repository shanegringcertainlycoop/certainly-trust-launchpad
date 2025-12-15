import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBlogPost } from '@/hooks/useBlogPosts';
import { format } from 'date-fns';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPost(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream">
        <header className="py-6 border-b border-border">
          <div className="container mx-auto px-6">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to blog
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-6 py-16 animate-pulse">
          <div className="max-w-3xl mx-auto">
            <div className="h-10 bg-muted rounded w-3/4 mb-4" />
            <div className="h-6 bg-muted rounded w-1/2 mb-8" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-muted rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-cream">
        <header className="py-6 border-b border-border">
          <div className="container mx-auto px-6">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to blog
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-serif text-foreground mb-4">Post not found</h1>
          <p className="text-muted-foreground">
            The post you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="py-6 border-b border-border">
        <div className="container mx-auto px-6">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
        </div>
      </header>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="container mx-auto px-6 pt-8">
          <div className="max-w-3xl mx-auto">
            <img 
              src={post.featured_image} 
              alt={post.title}
              className="w-full h-auto rounded-lg object-contain"
            />
          </div>
        </div>
      )}

      {/* Article */}
      <article className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <div className="mb-8">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs font-sans uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="font-medium">{post.author_name}</span>
                <span>·</span>
                {post.published_at && (
                  <span>{format(new Date(post.published_at), 'MMMM d, yyyy')}</span>
                )}
              </div>
            </div>

            {/* Content */}
            <div 
className="prose prose-xl max-w-2xl mx-auto
                prose-headings:font-serif prose-headings:text-foreground prose-headings:mt-8 prose-headings:mb-4
                prose-p:text-foreground prose-p:leading-relaxed prose-p:tracking-wide prose-p:my-6
                prose-a:text-primary hover:prose-a:text-accent prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-foreground/70
                prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6
                prose-li:text-foreground prose-li:leading-relaxed
                prose-img:rounded-lg prose-img:my-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
