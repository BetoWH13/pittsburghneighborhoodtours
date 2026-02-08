import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const neighborhoods = posts.filter((p) => p.category === "neighborhoods");
  const foodCulture = posts.filter((p) => p.category === "food-culture");
  const activities = posts.filter((p) => p.category === "activities");
  const guides = posts.filter((p) => p.category === "guides");

  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Welcome to Discover Pittsburgh
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Planning a visit to the Steel City? Let Pittsburgh Neighborhood Tours
            be your guide to the city&apos;s rich tapestry of history, culture, and
            modern-day charm. Our carefully curated itineraries are designed to
            immerse you in the essence of Pittsburgh.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/neighborhoods"
              className="bg-accent hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore Neighborhoods
            </a>
            <a
              href="https://hotellook.tp.st/tlaA5A3h"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-primary px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Book Your Stay
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-primary mb-12">
            Experience the Heart of Pittsburgh
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Uncover the Quirky and Quaint"
              description="Delight in authentic pierogies, legendary Primanti Brothers sandwiches, hidden 'paper streets,' and storied city steps that have connected hillsides for generations."
              icon="🏘️"
            />
            <FeatureCard
              title="Blend Nostalgia with the New"
              description="Stroll through shopping districts with Victorian-era storefronts, locally crafted pottery, fresh pasta, and beautifully restored historic homes."
              icon="🏛️"
            />
            <FeatureCard
              title="Live Like a Local"
              description="Discover the spots where locals love to shop, dine, relax, and celebrate. Each neighborhood is a story waiting to be told."
              icon="🎭"
            />
          </div>
        </div>
      </section>

      {/* Neighborhoods Preview */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-heading font-bold text-primary">
              Neighborhoods
            </h2>
            <a href="/neighborhoods" className="text-accent hover:underline font-semibold">
              View All →
            </a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoods.slice(0, 6).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Food & Culture Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-heading font-bold text-primary">
              Food &amp; Culture
            </h2>
            <a href="/food-culture" className="text-accent hover:underline font-semibold">
              View All →
            </a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodCulture.slice(0, 6).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Activities Preview */}
      {activities.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-heading font-bold text-primary">
                Activities
              </h2>
              <a href="/activities" className="text-accent hover:underline font-semibold">
                View All →
              </a>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.slice(0, 3).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Guides Preview */}
      {guides.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-heading font-bold text-primary">
                Guides
              </h2>
              <a href="/guides" className="text-accent hover:underline font-semibold">
                View All →
              </a>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.slice(0, 3).map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 card-hover text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-heading font-bold text-primary mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function PostCard({ post }: { post: { slug: string; title: string; description: string; category: string; date: string } }) {
  return (
    <a
      href={`/${post.category}/${post.slug}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden card-hover"
    >
      <div className="bg-gradient-to-r from-primary to-secondary h-2" />
      <div className="p-6">
        <span className="text-xs font-semibold text-accent uppercase tracking-wider">
          {post.category.replace("-", " & ")}
        </span>
        <h3 className="text-lg font-heading font-bold text-primary mt-2 mb-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">{post.description}</p>
        {post.date && (
          <p className="text-gray-400 text-xs mt-3">{post.date}</p>
        )}
      </div>
    </a>
  );
}
