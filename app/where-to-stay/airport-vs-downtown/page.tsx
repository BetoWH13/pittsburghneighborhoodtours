import type { Metadata } from "next";

const BASE_URL = "https://pittsburghneighborhoodtours.com";

export const metadata: Metadata = {
  title:
    "Airport vs Downtown Pittsburgh: Where Should You Stay? | Pittsburgh Neighborhood Tours",
  description:
    "Compare Moon Township and Downtown Pittsburgh before you book. Know when airport convenience helps and when it quietly makes the whole trip worse.",
  alternates: {
    canonical: `${BASE_URL}/where-to-stay/airport-vs-downtown`,
  },
};

const comparisonRows = [
  {
    topic: "Best for",
    downtown: "First-time visits, sightseeing, walkability, mixed itineraries",
    airport: "Early flights, late arrivals, one-night layover logic",
  },
  {
    topic: "Main advantage",
    downtown: "You are already in the city you came to see",
    airport: "You remove pre-flight or late-arrival stress",
  },
  {
    topic: "Main downside",
    downtown: "Parking and nightly rates can be higher",
    airport: "You are far from the neighborhoods that define the trip",
  },
  {
    topic: "Who should choose it",
    downtown: "Most leisure travelers",
    airport: "Travelers solving a flight-timing problem",
  },
];

export default function AirportVsDowntownPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-4xl mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent mb-3">
          Where to Stay
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-5">
          Airport vs Downtown Pittsburgh: Where Should You Stay?
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          This is one of the easiest Pittsburgh mistakes to make. Airport hotels
          can look efficient and inexpensive, but if the real trip is the city,
          they often move the inconvenience somewhere you do not notice until later.
        </p>
      </div>

      <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 mb-10">
        <h2 className="text-2xl font-heading font-bold text-primary mb-4">
          Quick Answer
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Choose <strong>Downtown</strong> if you are actually visiting Pittsburgh.
          Choose the <strong>airport area</strong> only if you need to solve a flight
          problem: very early departure, very late arrival, or a short overnight.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-heading font-bold text-primary mb-4">
          Direct Comparison
        </h2>
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
          <table className="w-full min-w-[860px] text-sm md:text-base">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-left px-4 py-4 font-semibold">Question</th>
                <th className="text-left px-4 py-4 font-semibold">Downtown</th>
                <th className="text-left px-4 py-4 font-semibold">Airport / Moon Township</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, index) => (
                <tr key={row.topic} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-4 font-semibold text-primary">{row.topic}</td>
                  <td className="px-4 py-4 text-gray-700">{row.downtown}</td>
                  <td className="px-4 py-4 text-gray-700">{row.airport}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            When Downtown Wins
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Downtown wins for most leisure trips because it keeps you close to
              the Point, the bridges, theaters, stadium walks, Market Square, and
              simple movement around the core.
            </p>
            <p>
              If you want your Pittsburgh trip to feel like Pittsburgh instead of
              a sequence of rides into the city, Downtown is the cleaner answer.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            When the Airport Actually Wins
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The airport area wins when the stay is mostly about an early flight,
              late landing, overnight connection, or conference near PIT.
            </p>
            <p>
              It is a logistical base, not a city base. That distinction is the
              whole decision.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary to-secondary text-white rounded-2xl shadow-lg p-6 md:p-8 mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold mb-3">
          Stay Tool
        </p>
        <h2 className="text-3xl font-heading font-bold mb-4">
          Check Downtown and Airport Stays
        </h2>
        <p className="text-gray-100 leading-relaxed mb-5 max-w-3xl">
          Compare exact location, cancellation terms, parking, and total trip
          friction before you decide. Airport convenience can be real, but only
          when it solves the right problem.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://trip.tpo.mx/j6OajJW1"
            className="bg-gold text-primary font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Check Pittsburgh Stays
          </a>
          <a
            href="/neighborhoods/pittsburgh-suburbs"
            className="border border-white/60 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            Read the Suburbs Guide
          </a>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <a href="/where-to-stay" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
          <strong className="block text-primary mb-1">Where to Stay Hub</strong>
          <span className="text-sm text-gray-600">Compare all major Pittsburgh stay areas.</span>
        </a>
        <a href="/guides/where-to-stay-in-pittsburgh-no-prepayment-hotels" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
          <strong className="block text-primary mb-1">Flexible Booking Guide</strong>
          <span className="text-sm text-gray-600">Useful if your flight plans might move.</span>
        </a>
        <a href="/planner" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
          <strong className="block text-primary mb-1">Trip Planner</strong>
          <span className="text-sm text-gray-600">Route your trip into the most practical base.</span>
        </a>
      </section>
    </div>
  );
}
