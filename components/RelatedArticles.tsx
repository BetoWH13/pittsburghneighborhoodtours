import { PostMeta } from "@/lib/posts";

const CATEGORY_COLORS: Record<string, string> = {
  neighborhoods: "bg-blue-100 text-blue-700",
  "food-culture": "bg-orange-100 text-orange-700",
  activities: "bg-green-100 text-green-700",
  guides: "bg-purple-100 text-purple-700",
};

interface Props {
  currentSlug: string;
  currentCategory: string;
  currentTags: string[];
  allPosts: PostMeta[];
}

function scoreRelevance(post: PostMeta, currentCategory: string, currentTags: string[]): number {
  let score = 0;
  if (post.category === currentCategory) score += 2;
  const sharedTags = post.tags.filter((t) => currentTags.includes(t));
  score += sharedTags.length;
  return score;
}

export default function RelatedArticles({ currentSlug, currentCategory, currentTags, allPosts }: Props) {
  const related = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({ ...p, score: scoreRelevance(p, currentCategory, currentTags) }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-heading font-bold text-primary mb-5">
        Related Articles
      </h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {related.map((post) => (
          <a
            key={post.slug}
            href={`/${post.category}/${post.slug}`}
            className="group block bg-white border border-gray-200 rounded-xl p-4 hover:border-accent hover:shadow-md transition-all"
          >
            <div className="bg-gradient-to-r from-primary to-secondary h-1 rounded-full mb-3" />
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                CATEGORY_COLORS[post.category] ?? "bg-gray-100 text-gray-600"
              }`}
            >
              {post.category.replace("-", " & ")}
            </span>
            <h3 className="text-sm font-heading font-bold text-primary group-hover:text-accent transition-colors mt-2 mb-1 leading-snug line-clamp-2">
              {post.title}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2">{post.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
