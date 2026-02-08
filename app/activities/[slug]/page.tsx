import { getPostData, getAllPostSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs("activities");
  return slugs.map((slug) => ({ slug }));
}

export default async function ActivityPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostData("activities", params.slug);
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <a href="/activities" className="text-accent hover:underline text-sm">
          ← Back to Activities
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
    </article>
  );
}
