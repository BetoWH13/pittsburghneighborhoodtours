import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");

export interface PostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  contentHtml: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
}

function getPostsFromDir(dir: string): PostMeta[] {
  const fullDir = path.join(contentDirectory, dir);
  if (!fs.existsSync(fullDir)) return [];
  const fileNames = fs.readdirSync(fullDir).filter((f) => f.endsWith(".md"));
  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(fullDir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || "",
      category: data.category || dir,
      tags: data.tags || [],
    };
  });
}

export function getAllPosts(): PostMeta[] {
  const dirs = ["neighborhoods", "food-culture", "activities", "guides"];
  const allPosts = dirs.flatMap((dir) => getPostsFromDir(dir));
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getPostsFromDir(category);
}

export async function getPostData(
  category: string,
  slug: string
): Promise<PostData> {
  const fullPath = path.join(contentDirectory, category, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    category: data.category || category,
    tags: data.tags || [],
    contentHtml,
  };
}

export function getAllPostSlugs(category: string): string[] {
  const fullDir = path.join(contentDirectory, category);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
