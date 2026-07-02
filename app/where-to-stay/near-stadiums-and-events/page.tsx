import type { Metadata } from "next";

const BASE_URL = "https://pittsburghneighborhoodtours.com";

export const metadata: Metadata = {
  title:
    "Where to Stay in Pittsburgh for a Steelers, Pirates, or Penguins Game | Pittsburgh Neighborhood Tours",
  description:
    "Compare North Shore, Downtown, and nearby Pittsburgh areas for stadium weekends, concerts, and event-heavy trips before you book.",
  alternates: {
    canonical: `${BASE_URL}/where-to-stay/near-stadiums-and-events`,
  },
};

const rows = [
  {
    area: "North Shore",
    bestFor: "Pirates and Steelers trips",
    edge: "Walk to PNC Park and Acrisure Stadium, plus riverfront views",
    tradeoff: "Can feel event-district heavy outside your actual plans",
  },
  {
    area: "Downtown",
    bestFor: "Mixed-event weekends",
    edge: "Strong all-purpose base for PPG Paints Arena, theaters, and bridge walk to North Shore",
    tradeoff: "Less immediate stadium feel than staying on the North Shore itself",
  },
  {
    area: "Strip District",
    bestFor: "Game weekend plus bars and food",
    edge: "Good energy before and after events with easy access to the core",
    tradeoff: "Not as direct as simply staying Downtown or North Shore",
  },
  {
    area: "South Side",
    bestFor: "Nightlife-first event trips",
    edge: "Late food and bar access after concerts or games",
    tradeoff: "Noise and less practical first-visit simplicity",
  },
];

export default function NearStadiumsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-4xl mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent mb-3">
          Where to Stay
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-5">
          Where to Stay in Pittsburgh for Stadiums and Events
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Event trips distort a city. Rates move, traffic changes, and the best
          base becomes the one that matches the venue pattern instead of the one
          that would win on a quiet normal weekend.
        </p>
      </div>

      <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 mb-10">
        <h2 className="text-2xl font-heading font-bold text-primary mb-4">
          Quick Answer
        </h2>
        <p className="text-gray-700 leading-relaxed">
          <strong>North Shore</strong> is the best answer for Pirates and Steelers
          trips. <strong>Downtown</strong> is the stronger all-purpose answer when
          the weekend mixes games, concerts, theaters, and general sightseeing.
          If food and bars matter almost as much as the event itself, the{" "}
          <strong>Strip District</strong> is a smart alternative.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-heading font-bold text-primary mb-4">
          Compare Event-Trip Bases
        </h2>
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
          <table className="w-full min-w-[860px] text-sm md:text-base">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-left px-4 py-4 font-semibold">Area</th>
                <th className="text-left px-4 py-4 font-semibold">Best For</th>
                <th className="text-left px-4 py-4 font-semibold">Main Edge</th>
                <th className="text-left px-4 py-4 font-semibold">Tradeoff</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.area} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-4 font-semibold text-primary">{row.area}</td>
                  <td className="px-4 py-4 text-gray-700">{row.bestFor}</td>
                  <td className="px-4 py-4 text-gray-700">{row.edge}</td>
                  <td className="px-4 py-4 text-gray-700">{row.tradeoff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            Venue Logic
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Choose <strong>North Shore</strong> when the trip is really about
              PNC Park or Acrisure Stadium. Staying there strips away most of the
              pregame and postgame friction.
            </p>
            <p>
              Choose <strong>Downtown</strong> when the weekend includes PPG Paints
              Arena, theater, restaurants, and maybe one sports event rather than
              a full stadium-centric schedule.
            </p>
            <p>
              The <strong>Strip District</strong> is for visitors who want game
              access but also care about bars, brunch, and city texture outside
              the event window.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-2xl shadow-lg p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold mb-3">
            Stay Tool
          </p>
          <h2 className="text-3xl font-heading font-bold mb-4">
            Check Stadium-Trip Pittsburgh Stays
          </h2>
          <p className="text-gray-100 leading-relaxed mb-5">
            Event weekends move fast. Check location, cancellation terms, and
            parking before you assume one side of the city is equivalent to the
            other.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://trip.tpo.mx/j6OajJW1"
              className="bg-gold text-primary font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Check Event-Trip Stays
            </a>
            <a
              href="/neighborhoods/north-side"
              className="border border-white/60 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Read the North Side Guide
            </a>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <a href="/where-to-stay" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
          <strong className="block text-primary mb-1">Where to Stay Hub</strong>
          <span className="text-sm text-gray-600">Compare all major Pittsburgh stay areas.</span>
        </a>
        <a href="/activities/pittsburgh-for-sports-fans" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
          <strong className="block text-primary mb-1">Sports Fan Guide</strong>
          <span className="text-sm text-gray-600">Pair your base with the right game-weekend plan.</span>
        </a>
        <a href="/guides/visit-pittsburgh" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
          <strong className="block text-primary mb-1">Visit Pittsburgh Guide</strong>
          <span className="text-sm text-gray-600">Broader logistics, attractions, and trip context.</span>
        </a>
      </section>
    </div>
  );
}
