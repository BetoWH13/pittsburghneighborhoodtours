import { getAllPosts } from "./posts";

export interface SearchEntry {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  url: string;
  searchText: string; // pre-built lowercase string for fast matching
}

export function buildSearchIndex(): SearchEntry[] {
  return getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    category: post.category,
    tags: post.tags,
    date: post.date,
    url: `/${post.category}/${post.slug}`,
    searchText: [post.title, post.description, ...(post.tags || [])]
      .join(" ")
      .toLowerCase(),
  }));
}
