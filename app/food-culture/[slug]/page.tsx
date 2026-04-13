import { getPostData, getAllPostSlugs, getAllPosts } from "@/lib/posts";
import { Metadata } from "next";
import RelatedArticles from "@/components/RelatedArticles";

const BASE_URL = "https://pittsburghneighborhoodtours.com";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostData("food-culture", params.slug);
  const url = `${BASE_URL}/food-culture/${params.slug}`;
  return {
    title: `${post.title} | Pittsburgh Neighborhood Tours`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "Pittsburgh Neighborhood Tours",
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs("food-culture");
  return slugs.map((slug) => ({ slug }));
}

export default async function FoodCulturePost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostData("food-culture", params.slug);
  const allPosts = getAllPosts();
  const url = `${BASE_URL}/food-culture/${params.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url,
    publisher: {
      "@type": "Organization",
      name: "Pittsburgh Neighborhood Tours",
      url: BASE_URL,
    },
    keywords: post.tags.join(", "),
  };
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-8">
        <a href="/food-culture" className="text-accent hover:underline text-sm">
          ← Back to Food &amp; Culture
        </a>
      </div>
      <h1 className="text-4xl font-heading font-bold text-primary mb-4">
        {post.title}
      </h1>
      {post.date && (
        <p className="text-gray-400 text-sm mb-8">{post.date}</p>
      )}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      {post.tags.length > 0 && (
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      <RelatedArticles
        currentSlug={params.slug}
        currentCategory="food-culture"
        currentTags={post.tags}
        allPosts={allPosts}
      />
    </article>
  );
}
