import type { Metadata } from "next";

const BASE_URL = "https://pittsburghneighborhoodtours.com";

export const metadata: Metadata = {
  title:
    "Best Pittsburgh Neighborhoods to Stay In for a First Visit | Pittsburgh Neighborhood Tours",
  description:
    "First time in Pittsburgh? Compare Downtown, North Shore, Strip District, and Oakland to choose the easiest base before you book.",
  alternates: {
    canonical: `${BASE_URL}/where-to-stay/first-time-visitors`,
  },
};

const rows = [
  {
    area: "Downtown",
    bestFor: "The easiest default",
    why: "Walkable, central, close to major sights, bridges, theaters, and transit",
    caution: "Less neighborhood character than the East End",
  },
  {
    area: "North Shore",
    bestFor: "First visit with sports mixed in",
    why: "Riverfront, skyline views, stadiums, museums, and easy bridge walk to Downtown",
    caution: "Game-day crowds and rates can distort the experience",
  },
  {
    area: "Strip District",
    bestFor: "First visit with food priority",
    why: "Markets, restaurants, stronger local energy, good access to Downtown and Lawrenceville",
    caution: "Less polished as a pure hotel base",
  },
  {
    area: "Oakland",
    bestFor: "Museums or university-heavy first trip",
    why: "Phipps, Carnegie Museums, Pitt, and CMU are all right there",
    caution: "Not as simple as Downtown if you want broad city sightseeing",
  },
];

export default function FirstTimeVisitorsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-4xl mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent mb-3">
          Where to Stay
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-5">
          Best Pittsburgh Neighborhoods to Stay In for a First Visit
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          If this is your first Pittsburgh trip, do not overcomplicate the base.
          The best first-time answer is usually the area that makes the city easiest
          to understand on day one, not the one with the coolest bar tucked three
          neighborhoods away.
        </p>
      </div>

      <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 mb-10">
        <h2 className="text-2xl font-heading font-bold text-primary mb-4">
          Quick Answer
        </h2>
        <p className="text-gray-700 leading-relaxed">
          <strong>Downtown</strong> is still the safest first answer. Choose{" "}
          <strong>North Shore</strong> if stadium access matters,{" "}
          <strong>Strip District</strong> if food and city energy matter more than
          hotel polish, and <strong>Oakland</strong> if museums or campus visits are
          central to the trip.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-heading font-bold text-primary mb-4">
          Compare the Best First-Visit Bases
        </h2>
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
          <table className="w-full min-w-[860px] text-sm md:text-base">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-left px-4 py-4 font-semibold">Area</th>
                <th className="text-left px-4 py-4 font-semibold">Best For</th>
                <th className="text-left px-4 py-4 font-semibold">Why It Works</th>
                <th className="text-left px-4 py-4 font-semibold">Watch Out For</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.area} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-4 font-semibold text-primary">{row.area}</td>
                  <td className="px-4 py-4 text-gray-700">{row.bestFor}</td>
                  <td className="px-4 py-4 text-gray-700">{row.why}</td>
                  <td className="px-4 py-4 text-gray-700">{row.caution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            How to Think About the First Base
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong>Downtown</strong> wins because it reduces friction. You can
              learn the bridges, walk the Point, cross to the North Shore, and
              reach theaters, Market Square, and major transit without making every
              move a logistics puzzle.
            </p>
            <p>
              <strong>North Shore</strong> is the better first base if the trip
              includes a Pirates or Steelers game and you want riverfront scenery
              built into the stay.
            </p>
            <p>
              <strong>Strip District</strong> makes sense when your version of a
              city trip starts with food, bars, and markets instead of hotel
              convenience.
            </p>
            <p>
              <strong>Oakland</strong> is the right first stay only when the real
              trip is museums, Pitt, CMU, or medical-related visits.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-2xl shadow-lg p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold mb-3">
            Stay Tool
          </p>
          <h2 className="text-3xl font-heading font-bold mb-4">
            Check First-Visit Pittsburgh Stays
          </h2>
          <p className="text-gray-100 leading-relaxed mb-5">
            Once you know the right starting neighborhood, compare live location,
            rates, cancellation terms, and parking. If flexibility matters, check
            the no-prepayment guide before you lock anything in.
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
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <a href="/where-to-stay" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
          <strong className="block text-primary mb-1">Where to Stay Hub</strong>
          <span className="text-sm text-gray-600">Compare all major Pittsburgh stay areas.</span>
        </a>
        <a href="/neighborhoods/north-side" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
          <strong className="block text-primary mb-1">North Side Guide</strong>
          <span className="text-sm text-gray-600">Useful if sports or museums shape the trip.</span>
        </a>
        <a href="/planner" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
          <strong className="block text-primary mb-1">Trip Planner</strong>
          <span className="text-sm text-gray-600">Route your trip type into the most practical base.</span>
        </a>
      </section>
    </div>
  );
}
