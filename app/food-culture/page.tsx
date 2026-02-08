import { getPostsByCategory } from "@/lib/posts";

export default function FoodCulturePage() {
  const posts = getPostsByCategory("food-culture");
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-primary mb-4">
        Food &amp; Culture
      </h1>
      <p className="text-gray-600 mb-10 max-w-2xl">
        Discover Pittsburgh&apos;s incredible food scene and rich cultural
        heritage, from iconic desserts to historic bars and everything in between.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/food-culture/${post.slug}`}
            className="block bg-white rounded-xl shadow-md overflow-hidden card-hover"
          >
            <div className="bg-gradient-to-r from-accent to-red-400 h-2" />
            <div className="p-6">
              <h2 className="text-xl font-heading font-bold text-primary mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-3">
                {post.description}
              </p>
              {post.date && (
                <p className="text-gray-400 text-xs mt-3">{post.date}</p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
