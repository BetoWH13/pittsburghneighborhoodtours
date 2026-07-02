import type { Metadata } from "next";

const BASE_URL = "https://pittsburghneighborhoodtours.com";

export const metadata: Metadata = {
  title: "Where to Stay in Pittsburgh Without a Car | Pittsburgh Neighborhood Tours",
  description:
    "Choose the best Pittsburgh area if you do not want to drive. Compare Downtown, North Shore, Oakland, and neighborhood-heavy options before booking.",
  alternates: {
    canonical: `${BASE_URL}/where-to-stay/without-a-car`,
  },
};

const rows = [
  {
    area: "Downtown",
    worksBest: "Best overall no-car base",
    strength: "Walkable core, transit, bridges, theaters, Point State Park",
    weakness: "Less local-neighborhood feel",
  },
  {
    area: "North Shore",
    worksBest: "Stadiums and museums",
    strength: "Walk to PNC Park, Acrisure Stadium, Warhol Museum, riverfront",
    weakness: "Best when your trip fits that side of the city",
  },
  {
    area: "Oakland",
    worksBest: "Museums, Pitt, CMU",
    strength: "Dense cluster of campuses, museums, and practical transit connections",
    weakness: "Not the simplest base for broad city sightseeing",
  },
  {
    area: "Strip District",
    worksBest: "Food-heavy city weekends",
    strength: "Strong city energy, markets, bars, walkable links into Downtown",
    weakness: "Less classic hotel inventory",
  },
  {
    area: "Airport or far suburbs",
    worksBest: "Almost never",
    strength: "Cheap-looking nightly rates can tempt people",
    weakness: "You will spend the savings on time, rides, or frustration",
  },
];

export default function WithoutCarPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-4xl mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent mb-3">
          Where to Stay
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-5">
          Where to Stay in Pittsburgh Without a Car
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Pittsburgh without a car is completely workable if you choose the right
          base. Choose the wrong one and the city starts feeling steeper, longer,
          and more fragmented than it actually is.
        </p>
      </div>

      <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 mb-10">
        <h2 className="text-2xl font-heading font-bold text-primary mb-4">
          Quick Answer
        </h2>
        <p className="text-gray-700 leading-relaxed">
          <strong>Downtown</strong> is the strongest no-car default.{" "}
          <strong>North Shore</strong> works if your trip revolves around games or
          riverfront attractions. <strong>Oakland</strong> works for museums and
          universities. Avoid the airport area and most outer-suburban bases if
          you want the city to feel easy.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-heading font-bold text-primary mb-4">
          Compare Pittsburgh Bases Without a Car
        </h2>
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
          <table className="w-full min-w-[860px] text-sm md:text-base">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-left px-4 py-4 font-semibold">Area</th>
                <th className="text-left px-4 py-4 font-semibold">Works Best For</th>
                <th className="text-left px-4 py-4 font-semibold">Strength</th>
                <th className="text-left px-4 py-4 font-semibold">Weakness</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.area} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-4 font-semibold text-primary">{row.area}</td>
                  <td className="px-4 py-4 text-gray-700">{row.worksBest}</td>
                  <td className="px-4 py-4 text-gray-700">{row.strength}</td>
                  <td className="px-4 py-4 text-gray-700">{row.weakness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            The Real No-Car Logic
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Downtown works because it gives you density. You can walk major
              sights, cross bridges on foot, and reduce the number of rideshare
              decisions you need to make.
            </p>
            <p>
              North Shore is nearly as good if you want stadiums, the Science
              Center, or the Warhol Museum close at hand.
            </p>
            <p>
              Oakland makes sense when the trip has a built-in anchor: Pitt, CMU,
              Carnegie Museums, or a hospital visit.
            </p>
            <p>
              The airport, Moon Township, and most outer suburbs are not clever
              no-car hacks. They mostly just move the inconvenience somewhere
              later in the trip.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            Booking Caution
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Check the exact walking reality, not just the neighborhood name. In
            Pittsburgh, two places can look close on a map but involve hills,
            bridges, or roads that make them feel less connected than expected.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <a
              href="https://trip.tpo.mx/j6OajJW1"
              className="bg-primary text-white font-semibold px-5 py-3 rounded-lg hover:bg-secondary transition-colors"
            >
              Check Pittsburgh Stays
            </a>
            <a
              href="/planner"
              className="border border-primary/20 text-primary font-semibold px-5 py-3 rounded-lg hover:bg-white transition-colors"
            >
              Use the Planner
            </a>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <a href="/where-to-stay" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
          <strong className="block text-primary mb-1">Where to Stay Hub</strong>
          <span className="text-sm text-gray-600">Compare all stay areas before you book.</span>
        </a>
        <a href="/neighborhoods/oakland" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
          <strong className="block text-primary mb-1">Oakland Guide</strong>
          <span className="text-sm text-gray-600">Useful if museums or universities drive the trip.</span>
        </a>
        <a href="/guides/visit-pittsburgh" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
          <strong className="block text-primary mb-1">Visit Pittsburgh Guide</strong>
          <span className="text-sm text-gray-600">Broader trip-planning context beyond the base decision.</span>
        </a>
      </section>
    </div>
  );
}
