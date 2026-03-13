import { Helmet } from "react-helmet-async";

const SITE_URL = "https://certainly.coop";

export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Certainly Cooperative",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    description:
      "A cooperative of builders, writers, and strategists helping mission-driven brands scale their credibility through credentials, digital branding, and content.",
    sameAs: ["https://www.linkedin.com/company/certainly-cooperative"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: `${SITE_URL}`,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const WebSiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Certainly Cooperative",
    url: SITE_URL,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

interface BlogPostSchemaProps {
  title: string;
  description: string;
  slug: string;
  authorName: string;
  publishedAt: string | null;
  updatedAt: string;
  featuredImage?: string | null;
}

export const BlogPostSchema = ({
  title,
  description,
  slug,
  authorName,
  publishedAt,
  updatedAt,
  featuredImage,
}: BlogPostSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `${SITE_URL}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Certainly Cooperative",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.png`,
      },
    },
    datePublished: publishedAt,
    dateModified: updatedAt,
    ...(featuredImage && {
      image: {
        "@type": "ImageObject",
        url: featuredImage,
      },
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
