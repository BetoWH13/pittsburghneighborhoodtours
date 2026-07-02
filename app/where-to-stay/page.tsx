import type { Metadata } from "next";

const BASE_URL = "https://pittsburghneighborhoodtours.com";

export const metadata: Metadata = {
  title: "Where to Stay in Pittsburgh by Neighborhood | Pittsburgh Neighborhood Tours",
  description:
    "Compare Pittsburgh neighborhoods before you book. Find the right area for a first visit, sports trip, food weekend, museum stay, or airport overnight.",
  alternates: {
    canonical: `${BASE_URL}/where-to-stay`,
  },
  openGraph: {
    title: "Where to Stay in Pittsburgh by Neighborhood",
    description:
      "Choose the right Pittsburgh neighborhood first, then book the stay that fits your trip.",
    url: `${BASE_URL}/where-to-stay`,
    siteName: "Pittsburgh Neighborhood Tours",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Where to Stay in Pittsburgh by Neighborhood",
    description:
      "Compare Pittsburgh stay areas by trip type before you book.",
  },
};

const areaRows = [
  {
    area: "Downtown",
    bestFor: "First-timers",
    why: "Walkable, central, easy transit, bridges, Point State Park, theaters",
    watchOut: "Less neighborhood charm than the East End",
  },
  {
    area: "North Shore",
    bestFor: "Sports and events",
    why: "Stadiums, riverfront, museums, skyline views, easy Downtown access",
    watchOut: "Game-day pricing and event-heavy energy",
  },
  {
    area: "Strip District",
    bestFor: "Food-focused weekends",
    why: "Markets, restaurants, bars, strong city energy",
    watchOut: "Fewer classic hotel options than Downtown",
  },
  {
    area: "Lawrenceville",
    bestFor: "Nightlife and local feel",
    why: "Restaurants, bars, creative scene, neighborhood atmosphere",
    watchOut: "Less straightforward for a first-time visitor base",
  },
  {
    area: "Oakland",
    bestFor: "Universities, museums, hospital visits",
    why: "Pitt, CMU, Carnegie Museums, Phipps, medical campuses",
    watchOut: "Not the classic visitor base for most leisure trips",
  },
  {
    area: "Shadyside and Squirrel Hill",
    bestFor: "Calmer local stays",
    why: "Walkable streets, restaurants, residential feel, parks, easier pace",
    watchOut: "Fewer obvious hotel choices and less core-tourist convenience",
  },
  {
    area: "Airport and Moon Township",
    bestFor: "Early flights",
    why: "PIT access, shuttles, practical overnight logistics",
    watchOut: "Poor base for exploring the city on foot",
  },
];

const supportGuides = [
  {
    href: "/where-to-stay/first-time-visitors",
    title: "Best Areas for First-Time Visitors",
    body: "Downtown, North Shore, Strip District, and the simplest first-trip base decisions.",
  },
  {
    href: "/where-to-stay/without-a-car",
    title: "Pittsburgh Without a Car",
    body: "The best stay areas when walkability and transit matter more than parking.",
  },
  {
    href: "/where-to-stay/near-stadiums-and-events",
    title: "Near Stadiums and Events",
    body: "North Shore vs Downtown vs food-and-bars alternatives for game weekends.",
  },
  {
    href: "/where-to-stay/near-universities-and-museums",
    title: "Near Universities and Museums",
    body: "Oakland, Shadyside, Squirrel Hill, and East End base logic.",
  },
  {
    href: "/where-to-stay/airport-vs-downtown",
    title: "Airport vs Downtown",
    body: "When Moon Township solves a real problem and when it quietly hurts the trip.",
  },
];

export default function WhereToStayPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent mb-3">
          Where to Stay
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-5">
          Where to Stay in Pittsburgh by Neighborhood
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Pittsburgh is easier to plan when you choose the right neighborhood
          first. These guides help you compare areas before booking a place to
          stay, so the hotel decision follows the trip instead of driving it.
        </p>
      </div>

      <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 mb-10">
        <div className="grid md:grid-cols-[1.2fr,0.8fr] gap-6 items-start">
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              Quick Answer
            </h2>
            <ul className="space-y-3 text-gray-700 leading-relaxed">
              <li><strong>First visit:</strong> Downtown is still the easiest default.</li>
              <li><strong>Sports trip:</strong> North Shore if the game is the center of the weekend.</li>
              <li><strong>Food-and-bars trip:</strong> Strip District or Lawrenceville.</li>
              <li><strong>Museums, Pitt, or CMU:</strong> Oakland.</li>
              <li><strong>Local, calmer stay:</strong> Squirrel Hill or other calmer East End areas.</li>
              <li><strong>Early flight:</strong> Moon Township near PIT.</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent mb-3">
              Positioning
            </p>
            <p className="text-gray-700 leading-relaxed">
              This site is neighborhood-first, not hotel-first. The point is to
              choose the right base in Pittsburgh, then check live stay options
              once you understand the tradeoffs.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-heading font-bold text-primary mb-4">
          Compare Pittsburgh Stay Areas
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6 max-w-4xl">
          If you only read one thing before booking, make it this table. It
          tells you what each area is actually good at and where it starts to
          break down.
        </p>
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
          <table className="w-full min-w-[860px] text-sm md:text-base">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-left px-4 py-4 font-semibold">Area</th>
                <th className="text-left px-4 py-4 font-semibold">Best For</th>
                <th className="text-left px-4 py-4 font-semibold">Why Stay Here</th>
                <th className="text-left px-4 py-4 font-semibold">Watch Out For</th>
              </tr>
            </thead>
            <tbody>
              {areaRows.map((row, index) => (
                <tr key={row.area} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-4 font-semibold text-primary">{row.area}</td>
                  <td className="px-4 py-4 text-gray-700">{row.bestFor}</td>
                  <td className="px-4 py-4 text-gray-700">{row.why}</td>
                  <td className="px-4 py-4 text-gray-700">{row.watchOut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-heading font-bold text-primary mb-4">
          Support Guides Under This Section
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6 max-w-4xl">
          Use these when the trip has one dominant constraint and you want a more
          direct answer than a citywide comparison page can give.
        </p>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {supportGuides.map((guide) => (
            <a
              key={guide.href}
              href={guide.href}
              className="rounded-2xl border border-gray-200 bg-white px-5 py-5 shadow-sm hover:border-accent hover:bg-gray-50 transition-colors"
            >
              <strong className="block text-primary font-heading text-lg mb-2">{guide.title}</strong>
              <span className="text-sm text-gray-600 leading-relaxed">{guide.body}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            Area-by-Area Guidance
          </h2>
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <div>
              <h3 className="font-heading text-xl font-bold text-primary mb-2">Downtown</h3>
              <p>
                Best if you want the easiest first-trip setup. Walkability,
                bridges, theaters, Point State Park, and straightforward transit
                matter more here than local-neighborhood personality.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-primary mb-2">North Shore</h3>
              <p>
                The strongest choice for stadium weekends, riverfront views, and
                museum access without losing easy Downtown access.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-primary mb-2">Strip District and Lawrenceville</h3>
              <p>
                Better for visitors who care more about restaurants, bars,
                markets, and waking up inside a living neighborhood than about a
                polished hotel district.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-primary mb-2">Oakland</h3>
              <p>
                The practical answer for Carnegie Museums, Pitt, CMU, medical
                visits, or trips centered on that part of the East End.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-primary mb-2">Airport Area</h3>
              <p>
                Useful for early departures, late arrivals, and one-night
                logistical stays. It solves an airport problem, not a city
                experience problem.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            Related Neighborhood Reads
          </h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            Stay decisions make more sense when you understand the district
            itself. Use these pages to sanity-check the vibe before you book.
          </p>
          <div className="grid gap-3">
            <a href="/neighborhoods/north-side" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
              <strong className="block text-primary">North Side</strong>
              <span className="text-sm text-gray-600">Stadiums, museums, riverfront, game-weekend logic.</span>
            </a>
            <a href="/neighborhoods/lawrenceville" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
              <strong className="block text-primary">Lawrenceville</strong>
              <span className="text-sm text-gray-600">Restaurants, bars, nightlife, and neighborhood energy.</span>
            </a>
            <a href="/neighborhoods/oakland" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
              <strong className="block text-primary">Oakland</strong>
              <span className="text-sm text-gray-600">Museums, universities, hospitals, and practical stays.</span>
            </a>
            <a href="/neighborhoods/squirrel-hill" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
              <strong className="block text-primary">Squirrel Hill</strong>
              <span className="text-sm text-gray-600">A quieter, more residential base with food and park access.</span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary to-secondary text-white rounded-2xl shadow-lg p-6 md:p-8 mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold mb-3">
          Stay Tool
        </p>
        <h2 className="text-3xl font-heading font-bold mb-4">
          Check Current Pittsburgh Stay Options
        </h2>
        <p className="text-gray-100 leading-relaxed mb-5 max-w-3xl">
          Once you know the right part of the city, compare live availability,
          location, cancellation terms, and price. If flexibility matters, pair
          the live search with our no-prepayment guide before you commit.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://trip.tpo.mx/j6OajJW1"
            className="bg-gold text-primary font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Check Pittsburgh Stays
          </a>
          <a
            href="/guides/where-to-stay-in-pittsburgh-no-prepayment-hotels"
            className="border border-white/60 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            Compare Flexible Booking Options
          </a>
        </div>
      </section>

      <section className="grid lg:grid-cols-[1.2fr,0.8fr] gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            Useful Next Steps
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/planner" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
              <strong className="block text-primary mb-1">Trip Planner</strong>
              <span className="text-sm text-gray-600">Let the planner route you toward the best base for your trip type.</span>
            </a>
            <a href="/guides/visit-pittsburgh" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
              <strong className="block text-primary mb-1">Visit Pittsburgh Guide</strong>
              <span className="text-sm text-gray-600">Broader planning guide for timing, neighborhoods, attractions, and logistics.</span>
            </a>
            <a href="/guides/where-to-stay-in-pittsburgh-no-prepayment-hotels" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
              <strong className="block text-primary mb-1">Flexible Booking Guide</strong>
              <span className="text-sm text-gray-600">Use this if cancellation terms and no-prepayment options matter.</span>
            </a>
            <a href="/neighborhoods/pittsburgh-suburbs" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
              <strong className="block text-primary mb-1">Suburbs Guide</strong>
              <span className="text-sm text-gray-600">Helpful if you are deciding between airport, suburban, and city-neighborhood bases.</span>
            </a>
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            Booking Caution
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Always check the exact location, cancellation terms, parking setup,
            fees, and transit reality before booking. In Pittsburgh, staying in
            the right area matters more than finding the cheapest-looking room
            on a map.
          </p>
        </div>
      </section>
    </div>
  );
}
