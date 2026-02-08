# Pittsburgh Neighborhood Tours 🏙️

A modern static website built with Next.js, featuring curated neighborhood tours and guides for Pittsburgh, PA. Originally a WordPress site at [pittsburghneighborhoodtours.com](https://pittsburghneighborhoodtours.com), now converted to a fast, static Next.js application.

## Features

- **Neighborhood Guides** — Detailed guides for Bloomfield, Oakland, North Side, Mount Washington, and more
- **Food & Culture** — Historic bars, pizza evolution, coffee culture, iconic desserts, and vegan dining
- **Activities** — Family-friendly activities, self-guided walking tours, and hidden gems
- **Travel Guides** — Local's guide to neighborhoods with hotel recommendations
- **Responsive Design** — Beautiful on desktop, tablet, and mobile
- **Static Export** — Fast loading, SEO-friendly static HTML

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Content:** Markdown with gray-matter frontmatter
- **Rendering:** remark + remark-html for Markdown → HTML
- **Language:** TypeScript
- **Deployment:** Static export (works on Netlify, Vercel, GitHub Pages, etc.)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

The static site will be exported to the `out/` directory.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Homepage
│   ├── neighborhoods/      # Neighborhood listing + detail pages
│   ├── food-culture/       # Food & culture listing + detail pages
│   ├── activities/         # Activities listing + detail pages
│   └── guides/             # Guides listing + detail pages
├── content/                # Markdown content files
│   ├── neighborhoods/      # Neighborhood articles
│   ├── food-culture/       # Food & culture articles
│   ├── activities/         # Activity articles
│   └── guides/             # Guide articles
├── lib/                    # Utility functions
│   └── posts.ts            # Markdown parsing and content loading
├── tailwind.config.ts      # Tailwind CSS configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies
```

## Adding New Content

Create a new `.md` file in the appropriate `content/` subdirectory with frontmatter:

```markdown
---
title: "Your Post Title"
description: "A brief description"
date: "January 1, 2025"
category: "neighborhoods"
tags: ["tag1", "tag2"]
---

Your content here in Markdown format.
```

## Deployment

This project is configured for static export. Deploy the `out/` directory to any static hosting provider:

- **Netlify:** Connect your GitHub repo and set build command to `npm run build`
- **Vercel:** Import your GitHub repo (auto-detected)
- **GitHub Pages:** Push the `out/` directory to a `gh-pages` branch

## License

All content is property of Pittsburgh Neighborhood Tours.
