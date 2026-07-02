import type { Metadata } from "next";

const BASE_URL = "https://pittsburghneighborhoodtours.com";

export const metadata: Metadata = {
  title:
    "Where to Stay Near Pitt, CMU, and Oakland Museums | Pittsburgh Neighborhood Tours",
  description:
    "Compare Oakland, Shadyside, Squirrel Hill, and Downtown if your Pittsburgh trip centers on Pitt, CMU, Carnegie Museums, or Phipps.",
  alternates: {
    canonical: `${BASE_URL}/where-to-stay/near-universities-and-museums`,
  },
};

const rows = [
  {
    area: "Oakland",
    bestFor: "Closest access",
    reason: "Pitt, CMU, Carnegie Museums, Phipps, and hospital visits all center here",
    caution: "More practical than atmospheric",
  },
  {
    area: "Shadyside",
    bestFor: "Nicer neighborhood feel nearby",
    reason: "Walkable streets, restaurants, calmer pace, still close to Oakland",
    caution: "Not as immediate as staying in Oakland itself",
  },
  {
    area: "Squirrel Hill",
    bestFor: "Longer or calmer stays",
    reason: "Residential feel, strong food scene, park access, easier local rhythm",
    caution: "Less obvious for short museum-only visits",
  },
  {
    area: "Downtown",
    bestFor: "Mixed trip with sightseeing beyond Oakland",
    reason: "Better if museums are only part of a bigger first-visit plan",
    caution: "Adds daily transit or rideshare friction to the campus side",
  },
];

export default function UniversitiesAndMuseumsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-4xl mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent mb-3">
          Where to Stay
        </p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-5">
          Where to Stay Near Pitt, CMU, and Oakland Museums
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          If the real trip is Pitt, Carnegie Mellon, Carnegie Museums, Phipps, or
          a hospital-related visit, your best base is usually simpler than a broad
          citywide hotel search makes it look.
        </p>
      </div>

      <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 mb-10">
        <h2 className="text-2xl font-heading font-bold text-primary mb-4">
          Quick Answer
        </h2>
        <p className="text-gray-700 leading-relaxed">
          <strong>Oakland</strong> is the strongest default when proximity matters
          most. Choose <strong>Shadyside</strong> or <strong>Squirrel Hill</strong>{" "}
          if you want a better neighborhood feel while staying close to the East
          End institutions. Use <strong>Downtown</strong> only if this is a mixed
          trip and Oakland is not your only anchor.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-heading font-bold text-primary mb-4">
          Compare the Best East End Bases
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
                  <td className="px-4 py-4 text-gray-700">{row.reason}</td>
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
            What Actually Matters Here
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong>Oakland</strong> is not the city&apos;s most romantic base, but
              it is the cleanest answer when the campuses and museums are the
              reason for the trip.
            </p>
            <p>
              <strong>Shadyside</strong> gives you better neighborhood texture if
              you still want easy access to Oakland but do not want the stay to
              feel institutional.
            </p>
            <p>
              <strong>Squirrel Hill</strong> is useful for longer or calmer stays,
              especially if restaurants, park access, and a residential feel matter.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-2xl shadow-lg p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold mb-3">
            Stay Tool
          </p>
          <h2 className="text-3xl font-heading font-bold mb-4">
            Check East End and Oakland Stays
          </h2>
          <p className="text-gray-100 leading-relaxed mb-5">
            When proximity matters, check the exact location rather than trusting
            a broad neighborhood label. The East End works best when your base is
            actually close to the places driving the trip.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://trip.tpo.mx/j6OajJW1"
              className="bg-gold text-primary font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Check Pittsburgh Stays
            </a>
            <a
              href="/neighborhoods/oakland"
              className="border border-white/60 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Read the Oakland Guide
            </a>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <a href="/where-to-stay" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
          <strong className="block text-primary mb-1">Where to Stay Hub</strong>
          <span className="text-sm text-gray-600">Compare all the major Pittsburgh bases.</span>
        </a>
        <a href="/neighborhoods/oakland" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
          <strong className="block text-primary mb-1">Oakland Guide</strong>
          <span className="text-sm text-gray-600">Museums, universities, hospitals, and local context.</span>
        </a>
        <a href="/neighborhoods/squirrel-hill" className="rounded-xl border border-gray-200 px-4 py-4 hover:border-accent hover:bg-gray-50 transition-colors">
          <strong className="block text-primary mb-1">Squirrel Hill Guide</strong>
          <span className="text-sm text-gray-600">A calmer East End option with strong food access.</span>
        </a>
      </section>
    </div>
  );
}
