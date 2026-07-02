import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const contentDirectory = path.join(process.cwd(), "content");
const INTERNAL_HOSTS = new Set([
  "pittsburghneighborhoodtours.com",
  "www.pittsburghneighborhoodtours.com",
]);

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

function addExternalLinkAttrs(contentHtml: string): string {
  return contentHtml.replace(/<a\b[^>]*href="([^"]+)"[^>]*>/gi, (anchorTag, href) => {
    if (!/^https?:\/\//i.test(href)) return anchorTag;

    try {
      const { hostname } = new URL(href);
      if (INTERNAL_HOSTS.has(hostname)) return anchorTag;
    } catch {
      return anchorTag;
    }

    let nextAnchorTag = anchorTag;

    if (!/\btarget\s*=/i.test(nextAnchorTag)) {
      nextAnchorTag = nextAnchorTag.replace(/<a\b/i, '<a target="_blank"');
    }

    if (/\brel\s*=\s*(['"])(.*?)\1/i.test(nextAnchorTag)) {
      nextAnchorTag = nextAnchorTag.replace(/\brel\s*=\s*(['"])(.*?)\1/i, (_, quote, value) => {
        const relTokens = new Set(String(value).split(/\s+/).filter(Boolean));
        relTokens.add("noopener");
        relTokens.add("noreferrer");
        return `rel=${quote}${Array.from(relTokens).join(" ")}${quote}`;
      });
    } else {
      nextAnchorTag = nextAnchorTag.replace(/<a\b/i, '<a rel="noopener noreferrer"');
    }

    return nextAnchorTag;
  });
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
  const processedContent = await remark().use(remarkGfm).use(html, { sanitize: false }).process(content);
  const contentHtml = addExternalLinkAttrs(processedContent.toString());
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
