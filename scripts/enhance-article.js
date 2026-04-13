#!/usr/bin/env node
/**
 * enhance-article.js
 *
 * Enhances a Pittsburgh Neighborhood Tours markdown article with:
 *   1. A "Quick Summary" table at the top (derived from frontmatter + content)
 *   2. Blockquote callouts injected after the first paragraph of long sections
 *   3. An FAQ section at the bottom (generated from h2/h3 headings)
 *
 * Usage:
 *   node scripts/enhance-article.js <path-to-markdown-file>
 *   node scripts/enhance-article.js content/neighborhoods/bloomfield.md
 *
 *   # Dry run (preview without writing):
 *   node scripts/enhance-article.js content/neighborhoods/bloomfield.md --dry-run
 *
 *   # Process all articles in a category:
 *   node scripts/enhance-article.js content/neighborhoods/
 *
 * Options:
 *   --dry-run   Print the result to stdout instead of overwriting the file
 *   --force     Re-process even if the file already has a summary box
 */

const fs = require("fs");
const path = require("path");

// ─── Config ──────────────────────────────────────────────────────────────────

const AFFILIATE_LINK = "https://trip.tpo.mx/j6OajJW1";

// Category-specific summary row labels
const CATEGORY_FIELDS = {
  neighborhoods: [
    { key: "location", label: "📍 Location" },
    { key: "best_for", label: "🎯 Best For" },
    { key: "vibe", label: "✨ Vibe" },
    { key: "getting_there", label: "🚌 Getting There" },
    { key: "dont_miss", label: "⭐ Don't Miss" },
  ],
  "food-culture": [
    { key: "type", label: "🍽️ Type" },
    { key: "best_for", label: "🎯 Best For" },
    { key: "price_range", label: "💰 Price Range" },
    { key: "location", label: "📍 Where to Find It" },
    { key: "dont_miss", label: "⭐ Must Try" },
  ],
  activities: [
    { key: "duration", label: "⏱️ Duration" },
    { key: "best_for", label: "🎯 Best For" },
    { key: "cost", label: "💰 Cost" },
    { key: "location", label: "📍 Starting Point" },
    { key: "dont_miss", label: "⭐ Highlight" },
  ],
  guides: [
    { key: "budget", label: "💰 Budget" },
    { key: "best_for", label: "🎯 Best For" },
    { key: "location", label: "📍 Area" },
    { key: "booking", label: "🏨 Booking" },
    { key: "tip", label: "💡 Pro Tip" },
  ],
};

// Category-specific FAQ templates
// Keys are lowercased section keywords found in h2/h3 headings
const FAQ_TEMPLATES = {
  neighborhoods: [
    {
      trigger: /.*/,
      q: (title) => `Is ${extractNeighborhood(title)} worth visiting?`,
      a: (title) =>
        `Absolutely. ${extractNeighborhood(title)} is one of Pittsburgh's most distinctive neighborhoods, offering a combination of history, dining, and local character that rewards visitors who take time to explore beyond the main streets.`,
    },
    {
      trigger: /histor|heritage|past/i,
      q: (title) => `What is the history of ${extractNeighborhood(title)}?`,
      a: () =>
        `The neighborhood has deep roots in Pittsburgh's industrial and immigrant heritage. See the historical section above for a full overview.`,
    },
    {
      trigger: /food|dining|eat|culinar|restaurant|bar|drink/i,
      q: (title) =>
        `What are the best places to eat in ${extractNeighborhood(title)}?`,
      a: () =>
        `The neighborhood has a strong independent dining scene. The food and dining sections above highlight the most essential stops — from long-standing institutions to newer favorites.`,
    },
    {
      trigger: /park|trail|outdoor|green|nature/i,
      q: () => `Are there outdoor activities nearby?`,
      a: () =>
        `Yes — Pittsburgh's neighborhoods are generally well connected to the city's extensive park system. See the parks section above for specific recommendations.`,
    },
    {
      trigger: /.*/,
      q: () => `How do I get around Pittsburgh without a car?`,
      a: () =>
        `Pittsburgh Port Authority (PAT) buses connect all major neighborhoods. The free **T** light rail covers Downtown and the South Hills. Many East End neighborhoods — Oakland, Squirrel Hill, Lawrenceville — are walkable once you arrive.`,
    },
    {
      trigger: /.*/,
      q: () => `Where should I stay when visiting Pittsburgh?`,
      a: () =>
        `Downtown and the North Shore put you within walking distance of the stadiums and major attractions. For a more neighborhood feel, look for accommodation in the East End near Oakland or Shadyside. [Browse Pittsburgh hotel options here](${AFFILIATE_LINK}).`,
    },
  ],
  "food-culture": [
    {
      trigger: /.*/,
      q: (title) => `Is this a Pittsburgh-only experience?`,
      a: (title) =>
        `Very much so. Pittsburgh's food culture is deeply tied to its industrial and immigrant history, and many of the dishes and establishments described here are unique to the city.`,
    },
    {
      trigger: /.*/,
      q: () => `What is Pittsburgh's most iconic food?`,
      a: () =>
        `The Primanti Brothers sandwich — stuffed with coleslaw and french fries — is the undisputed symbol of Pittsburgh food culture. But pierogies, kielbasa, and Heinz ketchup are all deeply Pittsburgh too.`,
    },
    {
      trigger: /.*/,
      q: () => `Where is the best neighborhood to eat in Pittsburgh?`,
      a: () =>
        `Lawrenceville on Butler Street is currently the most exciting dining neighborhood. The Strip District is essential for market food on Saturday mornings. Bloomfield (Little Italy) and Squirrel Hill each have long-established dining traditions.`,
    },
  ],
  activities: [
    {
      trigger: /.*/,
      q: () => `Do I need to book in advance?`,
      a: () =>
        `Most outdoor activities and self-guided options require no advance booking. For popular restaurants, museum tickets on busy weekends, or stadium games, booking ahead is strongly recommended.`,
    },
    {
      trigger: /.*/,
      q: () => `Is Pittsburgh easy to navigate as a first-time visitor?`,
      a: () =>
        `Yes, with some planning. Downtown and the North Shore are very walkable. The East End neighborhoods are best reached by bus or car. Pittsburgh's geography — hills, bridges, rivers — is part of the experience, not an obstacle.`,
    },
    {
      trigger: /.*/,
      q: () => `What is the best time of year to visit Pittsburgh?`,
      a: () =>
        `Late spring (May–June) and fall (September–October) offer the best weather and the most outdoor events. Summer brings festivals and baseball. Winter is cold but the holiday lights along the river are genuinely beautiful.`,
    },
    {
      trigger: /.*/,
      q: () => `Where should I stay in Pittsburgh?`,
      a: () =>
        `Downtown hotels put you close to most major attractions. For a longer stay, the East End (Oakland, Shadyside, Squirrel Hill) neighborhoods offer a more residential feel. [Find Pittsburgh accommodation here](${AFFILIATE_LINK}).`,
    },
  ],
  guides: [
    {
      trigger: /.*/,
      q: () => `Do Pittsburgh hotels fill up quickly?`,
      a: () =>
        `During Steelers home games, major conventions, and summer weekends, Pittsburgh hotels book up fast — often weeks in advance. Booking early and looking for free-cancellation options gives you the most flexibility.`,
    },
    {
      trigger: /.*/,
      q: () => `What Pittsburgh neighborhoods are best for hotels?`,
      a: () =>
        `Downtown (the Golden Triangle) is most convenient for attractions and stadiums. The North Shore is ideal for sports events. Oakland works well for museum visits and university business. The South Side and Lawrenceville suit visitors who want nightlife nearby.`,
    },
    {
      trigger: /.*/,
      q: () => `Is there an airport hotel near Pittsburgh International?`,
      a: () =>
        `Yes — several hotels cluster around Pittsburgh International Airport (PIT) in Moon Township, about 20 minutes west of Downtown. They're convenient for early flights but distant from the city's neighborhoods.`,
    },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractNeighborhood(title) {
  // Pull the neighborhood name from common title patterns
  const match = title.match(
    /(?:Exploring |Discover |Pittsburgh'?s?\s+)?([A-Z][a-zA-Z\s\-']+?)(?::|,|\s+-\s+|$)/
  );
  return match ? match[1].trim() : "this neighborhood";
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { data: {}, body: content };
  const raw = match[1];
  const data = {};
  raw.split("\n").forEach((line) => {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    // Strip surrounding quotes
    val = val.replace(/^["']|["']$/g, "");
    // Parse arrays like ["tag1", "tag2"]
    if (val.startsWith("[")) {
      try {
        val = JSON.parse(val.replace(/'/g, '"'));
      } catch {}
    }
    if (key) data[key] = val;
  });
  const body = content.slice(match[0].length).trimStart();
  return { data, body, frontmatterRaw: match[0] };
}

function extractHeadings(body) {
  const lines = body.split("\n");
  return lines
    .filter((l) => l.startsWith("## ") || l.startsWith("### "))
    .map((l) => l.replace(/^#{2,3}\s+/, "").trim());
}

// ─── Summary Table Generator ──────────────────────────────────────────────────

function inferSummaryData(data, body, category) {
  const title = data.title || "";
  const description = data.description || "";
  const lowerBody = body.toLowerCase();

  const inferred = {};

  // Location — look for bold **Location:** pattern or common Pittsburgh locations
  const locationMatch = body.match(/\*\*Location:\*\*\s*([^\n]+)/);
  if (locationMatch) {
    inferred.location = locationMatch[1].replace(/\*\*/g, "").trim();
  } else if (category === "neighborhoods") {
    inferred.location = `Pittsburgh, PA`;
  }

  // Best for — infer from description keywords
  const bestForParts = [];
  if (/histor|heritage/i.test(description)) bestForParts.push("History lovers");
  if (/food|dining|eat|culinar/i.test(description)) bestForParts.push("Foodies");
  if (/art|culture|museum/i.test(description)) bestForParts.push("Art & culture");
  if (/family|kids/i.test(description)) bestForParts.push("Families");
  if (/outdoor|park|trail|nature/i.test(description)) bestForParts.push("Outdoor enthusiasts");
  if (/nightlife|bar|drink/i.test(description)) bestForParts.push("Nightlife seekers");
  if (/budget|affordable/i.test(description)) bestForParts.push("Budget travelers");
  if (/sport|game|steeler|pirate|penguin/i.test(description)) bestForParts.push("Sports fans");
  if (bestForParts.length === 0) bestForParts.push("All visitors");
  inferred.best_for = bestForParts.slice(0, 3).join(", ");

  // Vibe — neighborhood category only
  if (category === "neighborhoods") {
    if (/trendy|hip|artsy|creative/i.test(lowerBody)) inferred.vibe = "Trendy & creative";
    else if (/historic|classic|traditional/i.test(lowerBody)) inferred.vibe = "Historic & charming";
    else if (/lively|vibrant|bustling/i.test(lowerBody)) inferred.vibe = "Lively & vibrant";
    else if (/walkable|quiet|residential/i.test(lowerBody)) inferred.vibe = "Walkable & residential";
    else inferred.vibe = "Unique Pittsburgh character";
  }

  // Getting there — extract from travel tips if present
  const busMatch = body.match(/\*\*(?:Public Transit|Getting (?:There|Around)):\*\*\s*([^\n]+)/i);
  if (busMatch) {
    inferred.getting_there = busMatch[1].replace(/\*\*/g, "").trim().split(".")[0];
  } else if (category === "neighborhoods") {
    inferred.getting_there = "Bus or car from Downtown Pittsburgh";
  }

  // Don't miss — find the first bolded item in a list
  const boldListMatch = body.match(/- \*\*([^*]+)\*\*/);
  if (boldListMatch) {
    inferred.dont_miss = boldListMatch[1].trim();
  } else {
    const firstH3Match = body.match(/### (.+)/);
    inferred.dont_miss = firstH3Match ? firstH3Match[1].trim() : "Local character & hidden gems";
  }

  // Food-culture specific
  if (category === "food-culture") {
    inferred.type = /bar|tavern|pub|drink|beer|whiskey/i.test(lowerBody)
      ? "Bars & Drinks"
      : /pizza|sandwich|food/i.test(lowerBody)
      ? "Iconic Eats"
      : /coffee|café/i.test(lowerBody)
      ? "Coffee & Café"
      : /vegan|vegetarian/i.test(lowerBody)
      ? "Plant-Based Dining"
      : "Food & Culture";
    inferred.price_range = /budget|affordable|cheap/i.test(lowerBody)
      ? "$ — Budget-friendly"
      : /luxury|fine dining|upscale/i.test(lowerBody)
      ? "$$$ — Upscale"
      : "$$ — Moderate";
  }

  // Activities specific
  if (category === "activities") {
    inferred.duration = /weekend|two days|48.hour/i.test(lowerBody)
      ? "Full weekend (2 days)"
      : /half.day|morning|afternoon/i.test(lowerBody)
      ? "Half day"
      : /full.day|day trip/i.test(lowerBody)
      ? "Full day"
      : "2–4 hours";
    inferred.cost = /free|no cost|no charge/i.test(lowerBody)
      ? "Free or low cost"
      : /ticket|admission|fee/i.test(lowerBody)
      ? "Varies (tickets required for some)"
      : "Mostly free";
  }

  // Guides specific
  if (category === "guides") {
    inferred.budget = /budget|affordable|cheap/i.test(title + description)
      ? "$ — Budget-friendly"
      : /historic|luxury/i.test(title + description)
      ? "$$–$$$"
      : "$$ — Moderate";
    inferred.booking = `[Check availability](${AFFILIATE_LINK})`;
    inferred.tip = /prepay|cancellation/i.test(lowerBody)
      ? "Look for free cancellation options"
      : "Book early for game weekends";
  }

  return inferred;
}

function buildSummaryTable(data, body, category) {
  const fields = CATEGORY_FIELDS[category] || CATEGORY_FIELDS["neighborhoods"];
  const inferred = inferSummaryData(data, body, category);

  const rows = fields
    .map(({ key, label }) => {
      const value = inferred[key];
      if (!value) return null;
      return `| ${label} | ${value} |`;
    })
    .filter(Boolean);

  if (rows.length === 0) return "";

  return [
    `<div class="summary-box">`,
    ``,
    `| | |`,
    `|---|---|`,
    ...rows,
    ``,
    `</div>`,
    ``,
  ].join("\n");
}

// ─── Callout Injector ─────────────────────────────────────────────────────────

function injectCallouts(body) {
  const lines = body.split("\n");
  const result = [];
  let h2Count = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      h2Count++;
      result.push(line);
      i++;

      // After every other h2 section, collect the first paragraph and add a callout
      if (h2Count % 2 === 0) {
        // Skip blank lines after heading
        while (i < lines.length && lines[i].trim() === "") {
          result.push(lines[i]);
          i++;
        }
        // Collect first paragraph
        const paraLines = [];
        while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("#")) {
          paraLines.push(lines[i]);
          i++;
        }
        if (paraLines.length > 0) {
          result.push(...paraLines);
          // Extract a key fact sentence (first sentence of the paragraph)
          const fullPara = paraLines.join(" ").replace(/\[.*?\]\(.*?\)/g, "").trim();
          const firstSentence = fullPara.split(/(?<=[.!?])\s+/)[0];
          if (firstSentence && firstSentence.length > 40 && firstSentence.length < 200) {
            result.push("");
            result.push(`> 💡 **Pittsburgh Fact:** ${firstSentence}`);
            result.push("");
          }
        }
      }
    } else {
      result.push(line);
      i++;
    }
  }

  return result.join("\n");
}

// ─── FAQ Generator ────────────────────────────────────────────────────────────

function buildFAQ(data, body, category) {
  const title = data.title || "";
  const headings = extractHeadings(body);
  const templates = FAQ_TEMPLATES[category] || FAQ_TEMPLATES["neighborhoods"];

  // Pick relevant FAQ items: first check trigger against headings, then fallback to /.*/
  const used = new Set();
  const faqs = [];

  for (const tmpl of templates) {
    if (faqs.length >= 5) break;
    const matches =
      tmpl.trigger.source === ".*"
        ? true
        : headings.some((h) => tmpl.trigger.test(h));
    if (matches && !used.has(tmpl.q.toString())) {
      used.add(tmpl.q.toString());
      faqs.push({ q: tmpl.q(title), a: tmpl.a(title) });
    }
  }

  if (faqs.length === 0) return "";

  const lines = ["", "---", "", "## Frequently Asked Questions", ""];
  faqs.forEach(({ q, a }) => {
    lines.push(`#### ${q}`);
    lines.push(`${a}`);
    lines.push("");
  });

  return lines.join("\n");
}

// ─── Already Enhanced Check ───────────────────────────────────────────────────

function isAlreadyEnhanced(body) {
  return (
    body.includes('<div class="summary-box">') ||
    body.includes("## Frequently Asked Questions")
  );
}

// ─── Main Processor ───────────────────────────────────────────────────────────

function processFile(filePath, dryRun, force) {
  const raw = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
  const { data, body, frontmatterRaw } = parseFrontmatter(raw);

  if (!data.category) {
    console.warn(`  ⚠️  No category in frontmatter — skipping ${filePath}`);
    return;
  }

  if (!force && isAlreadyEnhanced(body)) {
    console.log(`  ⏭️  Already enhanced — skipping ${path.basename(filePath)}`);
    return;
  }

  const category = data.category;

  // 1. Build summary table
  const summaryTable = buildSummaryTable(data, body, category);

  // 2. Inject callouts into body
  const bodyWithCallouts = injectCallouts(body);

  // 3. Build FAQ section
  const faqSection = buildFAQ(data, body, category);

  // 4. Assemble final content
  // Summary goes before first paragraph (after the opening sentence if it exists)
  let enhancedBody = bodyWithCallouts;

  // Insert summary table after first paragraph break
  const firstParaEnd = enhancedBody.indexOf("\n\n");
  if (firstParaEnd !== -1 && summaryTable) {
    enhancedBody =
      enhancedBody.slice(0, firstParaEnd + 2) +
      summaryTable +
      enhancedBody.slice(firstParaEnd + 2);
  } else if (summaryTable) {
    enhancedBody = summaryTable + enhancedBody;
  }

  // Append FAQ before the last affiliate link line if present, otherwise at end
  const lastLinkMatch = enhancedBody.match(/\n\[.+?\]\(https?:\/\/trip\.tpo\.mx.+?\)\s*$/);
  if (lastLinkMatch && faqSection) {
    const insertPos = enhancedBody.lastIndexOf(lastLinkMatch[0]);
    enhancedBody =
      enhancedBody.slice(0, insertPos) +
      faqSection +
      enhancedBody.slice(insertPos);
  } else if (faqSection) {
    enhancedBody = enhancedBody.trimEnd() + faqSection;
  }

  const finalContent = frontmatterRaw + "\n\n" + enhancedBody.trimStart();

  if (dryRun) {
    console.log(`\n${"─".repeat(60)}`);
    console.log(`DRY RUN: ${filePath}`);
    console.log("─".repeat(60));
    console.log(finalContent);
  } else {
    fs.writeFileSync(filePath, finalContent, "utf8");
    console.log(`  ✅  Enhanced: ${path.basename(filePath)}`);
  }
}

// ─── Entry Point ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const dryRun = process.argv.includes("--dry-run");
const force = process.argv.includes("--force");

if (args.length === 0) {
  console.error("Usage: node scripts/enhance-article.js <file-or-directory> [--dry-run] [--force]");
  process.exit(1);
}

const target = path.resolve(args[0]);
const stat = fs.statSync(target);

if (stat.isDirectory()) {
  const files = fs.readdirSync(target).filter((f) => f.endsWith(".md"));
  console.log(`\n🔍 Processing ${files.length} articles in ${target}...\n`);
  files.forEach((f) => processFile(path.join(target, f), dryRun, force));
} else {
  console.log(`\n🔍 Processing ${target}...\n`);
  processFile(target, dryRun, force);
}

console.log("\n✨ Done.\n");
