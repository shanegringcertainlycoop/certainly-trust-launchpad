import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBlogPost, useUpdateBlogPost, useBlogPosts } from "@/hooks/useBlogPosts";
import { useToast } from "@/hooks/use-toast";
import { Upload, Eye, Check } from "lucide-react";

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

function humanizeDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function extractSource(text: string): { body: string; url: string | null; label: string | null } {
  const sourcePattern = /\s*Source:\s*(https?:\/\/\S+)\s*$/;
  const match = text.match(sourcePattern);
  if (match) {
    const url = match[1];
    const label = humanizeDomain(url);
    const body = text.slice(0, match.index);
    return { body, url, label };
  }
  return { body: text, url: null, label: null };
}

function sectionsToHtml(sections: DispatchSection[]): string {
  return sections
    .map((section) => {
      switch (section.type) {
        case "callout":
          return `<blockquote>${section.content}</blockquote>`;
        case "h2":
          return `<h2>${section.content}</h2>`;
        case "h3":
          return `<h3>${section.content}</h3>`;
        case "paragraph": {
          const { body, url, label } = extractSource(section.content || "");
          if (url) {
            return `<p>${body}</p>\n<p class="source-link"><a href="${url}" target="_blank" rel="noopener noreferrer">${label} \u2192</a></p>`;
          }
          return `<p>${body}</p>`;
        }
        case "divider":
          return `<hr />`;
        default:
          return "";
      }
    })
    .join("\n");
}

function parseDispatch(raw: string): Dispatch | null {
  try {
    // Try parsing as JSON first
    const parsed = JSON.parse(raw);
    if (parsed.slug && parsed.sections) return parsed;
  } catch {
    // Try extracting the object from TS export format
    // Match: export const/default ... = { ... }
    const objectMatch = raw.match(/=\s*(\{[\s\S]*\})\s*;?\s*$/);
    if (objectMatch) {
      try {
        // Use Function constructor to eval the object literal safely
        const obj = new Function(`return (${objectMatch[1]})`)();
        if (obj.slug && obj.sections) return obj;
      } catch {
        // fall through
      }
    }
  }
  return null;
}

export const DispatchImporter = () => {
  const [raw, setRaw] = useState("");
  const [parsed, setParsed] = useState<Dispatch | null>(null);
  const [html, setHtml] = useState("");
  const [previewing, setPreviewing] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const { data: existingPosts } = useBlogPosts(false);
  const { toast } = useToast();

  const handlePreview = () => {
    const dispatch = parseDispatch(raw);
    if (!dispatch) {
      toast({
        title: "Parse Error",
        description: "Could not parse dispatch. Paste the full TypeScript export or JSON object.",
        variant: "destructive",
      });
      return;
    }
    setParsed(dispatch);
    setHtml(sectionsToHtml(dispatch.sections));
    setPreviewing(true);
  };

  const handlePublish = async () => {
    if (!parsed) return;
    setPublishing(true);

    const row = {
      slug: parsed.slug,
      title: parsed.title,
      excerpt: parsed.excerpt,
      content: html,
      published_at: new Date(parsed.publishedAt).toISOString(),
      tags: ["Certification Dispatch"],
      status: "published" as const,
      author_name: "Certainly Cooperative",
      featured_image: null,
    };

    try {
      // Check if slug already exists
      const existing = existingPosts?.find((p) => p.slug === parsed.slug);
      if (existing) {
        await updatePost.mutateAsync({ id: existing.id, ...row });
        toast({ title: "Dispatch updated", description: `Updated: ${parsed.title}` });
      } else {
        await createPost.mutateAsync(row);
        toast({ title: "Dispatch published", description: `Published: ${parsed.title}` });
      }

      setRaw("");
      setParsed(null);
      setHtml("");
      setPreviewing(false);
    } catch (error: any) {
      toast({
        title: "Publish failed",
        description: error.message || "Unknown error",
        variant: "destructive",
      });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-serif text-foreground mb-4">Import Dispatch</h2>

      {!previewing ? (
        <div className="space-y-4">
          <Textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder="Paste the dispatch TypeScript export or JSON here..."
            className="min-h-[200px] font-mono text-sm"
          />
          <Button onClick={handlePreview} disabled={!raw.trim()}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Title</p>
            <p className="font-medium">{parsed?.title}</p>
            <p className="text-sm text-muted-foreground mt-2 mb-1">Slug</p>
            <p className="font-mono text-sm">/blog/{parsed?.slug}</p>
            <p className="text-sm text-muted-foreground mt-2 mb-1">Sections</p>
            <p>{parsed?.sections.length} sections</p>
          </div>

          <div className="border border-border rounded-lg p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">HTML Preview</p>
            <div
              className="prose prose-xl max-w-none
                prose-headings:font-serif prose-headings:text-foreground
                prose-p:text-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setPreviewing(false)}>
              Back to Edit
            </Button>
            <Button onClick={handlePublish} disabled={publishing}>
              {publishing ? (
                "Publishing..."
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Publish Dispatch
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
