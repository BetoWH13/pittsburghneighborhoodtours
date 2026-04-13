"use client";

import { useState, useMemo, useEffect } from "react";

interface SearchEntry {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  url: string;
  searchText: string;
}

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "neighborhoods", label: "Neighborhoods" },
  { value: "food-culture", label: "Food & Culture" },
  { value: "activities", label: "Activities" },
  { value: "guides", label: "Guides" },
];

const CATEGORY_COLORS: Record<string, string> = {
  neighborhoods: "bg-blue-100 text-blue-700",
  "food-culture": "bg-orange-100 text-orange-700",
  activities: "bg-green-100 text-green-700",
  guides: "bg-purple-100 text-purple-700",
};

export default function SearchPage() {
  const [index, setIndex] = useState<SearchEntry[]>([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then(setIndex)
      .catch(() => {});
  }, []);

  // Read ?q= from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) setQuery(q);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return index.filter((entry) => {
      const matchesQuery = q === "" || entry.searchText.includes(q);
      const matchesCategory =
        activeCategory === "all" || entry.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory, index]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-heading font-bold text-primary mb-3">
          Search Pittsburgh
        </h1>
        <p className="text-gray-500">
          Search across neighborhoods, food, activities, and travel guides.
        </p>
      </div>

      {/* Search input */}
      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search neighborhoods, food, activities…"
          className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-accent transition-colors"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border ${
              activeCategory === cat.value
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      {index.length > 0 && (
        <p className="text-sm text-gray-400 mb-6">
          {query || activeCategory !== "all" ? (
            <>
              <span className="font-semibold text-gray-700">{results.length}</span>{" "}
              result{results.length !== 1 ? "s" : ""}
              {query && (
                <>
                  {" "}for <span className="font-semibold text-accent">"{query}"</span>
                </>
              )}
            </>
          ) : (
            <>Showing all <span className="font-semibold text-gray-700">{results.length}</span> articles</>
          )}
        </p>
      )}

      {/* Results grid */}
      {index.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-4">🔍</div>
          <p>Loading articles…</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-4">😕</div>
          <p className="text-lg font-semibold text-gray-600 mb-2">No results found</p>
          <p>Try a different search term or browse by category.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {results.map((entry) => (
            <a
              key={entry.url}
              href={entry.url}
              className="group block bg-white border border-gray-200 rounded-xl p-5 hover:border-accent hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        CATEGORY_COLORS[entry.category] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {entry.category.replace("-", " & ")}
                    </span>
                    {entry.date && (
                      <span className="text-xs text-gray-400">{entry.date}</span>
                    )}
                  </div>
                  <h2 className="text-lg font-heading font-bold text-primary group-hover:text-accent transition-colors leading-snug mb-1">
                    {entry.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {entry.description}
                  </p>
                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {entry.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-gray-300 group-hover:text-accent text-xl transition-colors shrink-0">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
