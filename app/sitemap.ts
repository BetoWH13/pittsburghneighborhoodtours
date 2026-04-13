import { getAllPostSlugs } from "@/lib/posts";
import { MetadataRoute } from "next";

const BASE_URL = "https://pittsburghneighborhoodtours.com";

const categories = ["neighborhoods", "food-culture", "activities", "guides"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...categories.map((cat) => ({
      url: `${BASE_URL}/${cat}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/affiliate-disclosure`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = categories.flatMap((cat) =>
    getAllPostSlugs(cat).map((slug) => ({
      url: `${BASE_URL}/${cat}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...postRoutes];
}
