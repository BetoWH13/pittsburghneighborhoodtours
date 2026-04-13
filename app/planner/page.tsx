"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TripLength = "1day" | "weekend" | "extended";
type Interest =
  | "history"
  | "food"
  | "arts"
  | "outdoors"
  | "sports"
  | "nightlife"
  | "family";
type TravelStyle = "budget" | "balanced" | "splurge";

interface PlannerState {
  tripLength: TripLength | null;
  interests: Interest[];
  travelStyle: TravelStyle | null;
}

interface ItinerarySlot {
  time: string;
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
  type: "activity" | "food" | "neighborhood" | "tip" | "outdoors" | "nightlife" | "family";
}

interface ItineraryDay {
  day: string;
  theme: string;
  slots: ItinerarySlot[];
}

// ─── Content Database ─────────────────────────────────────────────────────────
// Maps interests/style to real site articles

const ITINERARY_BLOCKS: Record<string, ItinerarySlot[]> = {
  stripDistrictMorning: [
    {
      time: "8:00 AM",
      title: "Strip District Market Morning",
      description:
        "Start with coffee at 21st Street Coffee, then work the vendors on Penn Ave — fresh pierogies, Penn Mac's Italian imports, Wholey's fish counter.",
      link: "/neighborhoods/strip-district",
      linkLabel: "Strip District Guide",
      type: "neighborhood",
    },
  ],
  primantiBreakfast: [
    {
      time: "9:00 AM",
      title: "Primanti Brothers",
      description:
        "The original on 18th St. Order the Almost Famous Cheesesteak. Fries inside the sandwich is not negotiable.",
      link: "/food-culture/primanti-brothers",
      linkLabel: "The Primanti Story",
      type: "food",
    },
  ],
  warholMuseum: [
    {
      time: "10:30 AM",
      title: "Andy Warhol Museum",
      description:
        "Seven floors of work from Pittsburgh's most famous son. Don't miss the Silver Clouds room and the Supernova prints.",
      link: "/activities/a-perfect-weekend-in-pittsburgh",
      linkLabel: "Weekend Itinerary",
      type: "activity",
    },
  ],
  northSideTour: [
    {
      time: "10:00 AM",
      title: "North Side Walking Tour",
      description:
        "Start at Randyland, walk through Mexican War Streets, visit the Mattress Factory, end at Allegheny Commons.",
      link: "/neighborhoods/north-side",
      linkLabel: "North Side Guide",
      type: "neighborhood",
    },
  ],
  oaklandMuseums: [
    {
      time: "2:00 PM",
      title: "Oakland Museum Mile",
      description:
        "Carnegie Museum of Natural History + Carnegie Museum of Art back to back. The dinosaur hall is legendary.",
      link: "/activities/a-perfect-weekend-in-pittsburgh",
      linkLabel: "Oakland in the Weekend Guide",
      type: "activity",
    },
  ],
  cathedralOfLearning: [
    {
      time: "11:30 AM",
      title: "Cathedral of Learning & Nationality Rooms",
      description:
        "The 42-story Gothic tower of Pitt. The free Nationality Rooms showcase 30 countries' heritage — one of Pittsburgh's most underrated attractions.",
      link: "/neighborhoods/oakland",
      linkLabel: "Oakland Guide",
      type: "activity",
    },
  ],
  schenleys: [
    {
      time: "4:00 PM",
      title: "Schenley Park",
      description:
        "Miles of trails, Panther Hollow ravine, and the great lawn. Perfect afternoon decompression between museums and dinner.",
      link: "/neighborhoods/oakland",
      linkLabel: "Oakland Guide",
      type: "outdoors",
    },
  ],
  frickPark: [
    {
      time: "9:00 AM",
      title: "Frick Park Morning Hike",
      description:
        "644 acres of Pittsburgh's best wooded trails. Take the Fern Hollow trail and follow Fern Hollow Run to the lower park.",
      link: "/neighborhoods/squirrel-hill",
      linkLabel: "Squirrel Hill & Frick Park",
      type: "activity",
    },
  ],
  mtWashington: [
    {
      time: "4:30 PM",
      title: "Mount Washington Overlook",
      description:
        "Take the Duquesne Incline up for the best view of Pittsburgh's skyline and three rivers. Stay for sunset if the timing works.",
      link: "/neighborhoods/the-duquesne-incline",
      linkLabel: "Duquesne Incline Guide",
      type: "activity",
    },
  ],
  lawrencevilleDinner: [
    {
      time: "7:00 PM",
      title: "Dinner in Lawrenceville",
      description:
        "Morcilla for Spanish small plates, or Pusadee's Garden for Thai in the most beautiful outdoor space in Pittsburgh (reserve ahead).",
      link: "/neighborhoods/lawrenceville",
      linkLabel: "Lawrenceville Guide",
      type: "food",
    },
  ],
  bloomfieldDinner: [
    {
      time: "7:00 PM",
      title: "Dinner in Bloomfield (Little Italy)",
      description:
        "Liberty Avenue classics — Tessaro's wood-fired burgers or the Bloomfield Bridge Tavern for pierogies and Polish comfort food.",
      link: "/neighborhoods/bloomfield",
      linkLabel: "Bloomfield Guide",
      type: "food",
    },
  ],
  craftBeer: [
    {
      time: "8:30 PM",
      title: "Pittsburgh Craft Beer Night",
      description:
        "Church Brew Works in Lawrenceville (tanks on an altar), Dancing Gnome for hop-forward IPAs, or Penn Brewery's beer hall on the North Side.",
      link: "/food-culture/pittsburghs-craft-beer-scene",
      linkLabel: "Pittsburgh Craft Beer Guide",
      type: "food",
    },
  ],
  southSideNight: [
    {
      time: "9:00 PM",
      title: "East Carson Street, South Side",
      description:
        "Pittsburgh's most concentrated bar strip. Start at the Smiling Moose, end wherever the night takes you.",
      link: "/neighborhoods/south-side",
      linkLabel: "South Side Guide",
      type: "nightlife",
    },
  ],
  squirrelHillBrunch: [
    {
      time: "9:30 AM",
      title: "Squirrel Hill Sunday Brunch",
      description:
        "Pamela's Diner on Forbes for the legendary flat hotcakes. Walk Forbes/Murray afterward and browse Jerry's Records.",
      link: "/neighborhoods/squirrel-hill",
      linkLabel: "Squirrel Hill Guide",
      type: "food",
    },
  ],
  frickEstate: [
    {
      time: "11:00 AM",
      title: "Frick Pittsburgh Estate",
      description:
        "Clayton mansion + Frick Art Museum + vintage car collection. One of the most underrated morning destinations in the city.",
      link: "/activities/a-perfect-weekend-in-pittsburgh",
      linkLabel: "Perfect Weekend Guide",
      type: "activity",
    },
  ],
  gameDay: [
    {
      time: "12:00 PM",
      title: "Pittsburgh Game Day Experience",
      description:
        "Walk the Roberto Clemente Bridge to PNC Park for a Pirates game, or cross to Acrisure Stadium for the Steelers with Terrible Towel in hand.",
      link: "/activities/pittsburgh-for-sports-fans",
      linkLabel: "Pittsburgh Sports Guide",
      type: "activity",
    },
  ],
  selfGuidedWalk: [
    {
      time: "10:00 AM",
      title: "Self-Guided Neighborhood Walk",
      description:
        "Pick a neighborhood and go: Lawrenceville (Butler St), North Side (Mexican War Streets), or South Side Slopes (city steps).",
      link: "/activities/self-guided-walking-tours-of-pittsburgh",
      linkLabel: "Walking Tour Guide",
      type: "activity",
    },
  ],
  hiddenGems: [
    {
      time: "2:00 PM",
      title: "Pittsburgh Hidden Gems",
      description:
        "Randyland, the Duquesne Incline, paper streets, and the South Side Slopes steps — the Pittsburgh that doesn't make the postcards.",
      link: "/activities/hidden-gems-of-pittsburgh-neighborhoods",
      linkLabel: "Hidden Gems Guide",
      type: "activity",
    },
  ],
  familyActivities: [
    {
      time: "10:00 AM",
      title: "Family-Friendly Pittsburgh",
      description:
        "Carnegie Natural History (dinosaurs), Phipps Conservatory, the Incline ride, and Kennywood Park nearby.",
      link: "/activities/family-friendly-activities-in-pittsburgh",
      linkLabel: "Family Activities Guide",
      type: "family",
    },
  ],
  budgetTip: [
    {
      time: "💡 Budget Tip",
      title: "Where to Stay on a Budget",
      description:
        "No-prepayment hotel options keep your options flexible. Pittsburgh's Airbnb market in Lawrenceville and Squirrel Hill is strong.",
      link: "/guides/budget-friendly-accommodations-in-pittsburgh",
      linkLabel: "Budget Accommodations Guide",
      type: "tip",
    },
  ],
  splurgeTip: [
    {
      time: "💡 Where to Stay",
      title: "Pittsburgh's Historic Hotels",
      description:
        "The Omni William Penn (opened 1916, Beaux-Arts landmark), The Renaissance Pittsburgh (1906 copper dome), or The Priory on the North Side.",
      link: "/guides/top-historic-hotels",
      linkLabel: "Historic Hotels Guide",
      type: "tip",
    },
  ],
  localsTip: [
    {
      time: "💡 Local Tip",
      title: "Think Like a Pittsburgher",
      description:
        "Learn the neighborhoods, say 'n'at' (and that), know your bridge (there are 446 of them), and never call it 'the 'burgh' — it's just Pittsburgh.",
      link: "/guides/a-locals-guide-to-pittsburghs-neighborhoods",
      linkLabel: "A Local's Guide",
      type: "tip",
    },
  ],
};

// ─── Itinerary Generator ──────────────────────────────────────────────────────

function generateItinerary(state: PlannerState): ItineraryDay[] {
  const { tripLength, interests, travelStyle } = state;
  const hasInterest = (i: Interest) => interests.includes(i);
  const days: ItineraryDay[] = [];

  const foodSlots =
    travelStyle === "splurge"
      ? ITINERARY_BLOCKS.lawrencevilleDinner
      : ITINERARY_BLOCKS.bloomfieldDinner;
  const stayTip =
    travelStyle === "budget"
      ? ITINERARY_BLOCKS.budgetTip
      : travelStyle === "splurge"
      ? ITINERARY_BLOCKS.splurgeTip
      : ITINERARY_BLOCKS.localsTip;

  // Day 1 — always included
  const day1Slots: ItinerarySlot[] = [];

  if (hasInterest("food")) {
    day1Slots.push(...ITINERARY_BLOCKS.stripDistrictMorning);
  } else {
    day1Slots.push(...ITINERARY_BLOCKS.primantiBreakfast);
  }

  if (hasInterest("arts")) {
    day1Slots.push(...ITINERARY_BLOCKS.warholMuseum);
  } else if (hasInterest("history")) {
    day1Slots.push(...ITINERARY_BLOCKS.northSideTour);
  } else if (hasInterest("family")) {
    day1Slots.push(...ITINERARY_BLOCKS.familyActivities);
  } else {
    day1Slots.push(...ITINERARY_BLOCKS.selfGuidedWalk);
  }

  if (hasInterest("outdoors")) {
    day1Slots.push(...ITINERARY_BLOCKS.schenleys);
  } else if (hasInterest("history")) {
    day1Slots.push(...ITINERARY_BLOCKS.cathedralOfLearning);
  } else {
    day1Slots.push(...ITINERARY_BLOCKS.hiddenGems);
  }

  day1Slots.push(...ITINERARY_BLOCKS.mtWashington);

  if (hasInterest("nightlife")) {
    day1Slots.push(...ITINERARY_BLOCKS.southSideNight);
  } else if (hasInterest("food")) {
    day1Slots.push(...foodSlots);
  } else if (hasInterest("arts")) {
    day1Slots.push(...ITINERARY_BLOCKS.craftBeer);
  } else {
    day1Slots.push(...foodSlots);
  }

  day1Slots.push(...stayTip);

  days.push({
    day: "Day 1",
    theme: "First Impressions — the Pittsburgh that hits different",
    slots: day1Slots,
  });

  if (tripLength === "1day") return days;

  // Day 2
  const day2Slots: ItinerarySlot[] = [];

  if (hasInterest("food")) {
    day2Slots.push(...ITINERARY_BLOCKS.squirrelHillBrunch);
  } else {
    day2Slots.push(...ITINERARY_BLOCKS.primantiBreakfast);
  }

  if (hasInterest("sports")) {
    day2Slots.push(...ITINERARY_BLOCKS.gameDay);
  } else if (hasInterest("history")) {
    day2Slots.push(...ITINERARY_BLOCKS.frickEstate);
  } else if (hasInterest("outdoors")) {
    day2Slots.push(...ITINERARY_BLOCKS.frickPark);
  } else {
    day2Slots.push(...ITINERARY_BLOCKS.oaklandMuseums);
  }

  if (hasInterest("arts")) {
    day2Slots.push(...ITINERARY_BLOCKS.oaklandMuseums);
  } else if (!hasInterest("sports")) {
    day2Slots.push(...ITINERARY_BLOCKS.selfGuidedWalk);
  }

  if (hasInterest("food")) {
    day2Slots.push(...ITINERARY_BLOCKS.craftBeer);
  } else if (hasInterest("nightlife")) {
    day2Slots.push(...ITINERARY_BLOCKS.southSideNight);
  } else {
    day2Slots.push(...foodSlots);
  }

  days.push({
    day: "Day 2",
    theme: "Going deeper — neighborhoods, parks, and local rituals",
    slots: day2Slots,
  });

  if (tripLength === "weekend") return days;

  // Day 3+ — extended stays
  const day3Slots: ItinerarySlot[] = [];

  day3Slots.push(...ITINERARY_BLOCKS.stripDistrictMorning);

  if (hasInterest("history")) {
    day3Slots.push(...ITINERARY_BLOCKS.northSideTour);
  } else {
    day3Slots.push(...ITINERARY_BLOCKS.hiddenGems);
  }

  day3Slots.push(...ITINERARY_BLOCKS.bloomfieldDinner);
  day3Slots.push(...ITINERARY_BLOCKS.craftBeer);
  day3Slots.push(...ITINERARY_BLOCKS.localsTip);

  days.push({
    day: "Day 3",
    theme: "Living like a local — the Pittsburgh the tourists don't see",
    slots: day3Slots,
  });

  return days;
}

// ─── Step Components ──────────────────────────────────────────────────────────

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              i + 1 < step
                ? "bg-green-500 text-white"
                : i + 1 === step
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {i + 1 < step ? "✓" : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className={`h-0.5 w-8 transition-colors ${
                i + 1 < step ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Slot Type Icons ──────────────────────────────────────────────────────────

const TYPE_ICONS: Record<string, string> = {
  activity: "🗺️",
  food: "🍽️",
  neighborhood: "🏘️",
  tip: "💡",
  outdoors: "🌿",
  nightlife: "🍺",
  family: "👨‍👩‍👧",
};

const TYPE_COLORS: Record<string, string> = {
  activity: "border-blue-200 bg-blue-50",
  food: "border-orange-200 bg-orange-50",
  neighborhood: "border-indigo-200 bg-indigo-50",
  tip: "border-yellow-200 bg-yellow-50",
  outdoors: "border-green-200 bg-green-50",
  nightlife: "border-purple-200 bg-purple-50",
  family: "border-pink-200 bg-pink-50",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PlannerPage() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<PlannerState>({
    tripLength: null,
    interests: [],
    travelStyle: null,
  });
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);

  function toggleInterest(interest: Interest) {
    setState((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  }

  function generate() {
    const effectiveState = {
      ...state,
      interests: state.interests.length === 0 ? (["food", "history"] as Interest[]) : state.interests,
      travelStyle: state.travelStyle ?? "balanced",
    };
    setItinerary(generateItinerary(effectiveState));
    setStep(4);
  }

  function reset() {
    setStep(1);
    setState({ tripLength: null, interests: [], travelStyle: null });
    setItinerary(null);
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🗺️</div>
        <h1 className="text-4xl font-heading font-bold text-primary mb-3">
          Pittsburgh Trip Planner
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Answer three quick questions and get a personalized Pittsburgh
          itinerary built from our local guides — no fluff, just the real city.
        </p>
      </div>

      {step < 4 && <StepIndicator step={step} total={3} />}

      {/* Step 1: Trip Length */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">
            How long are you staying?
          </h2>
          <div className="grid gap-4">
            {[
              {
                value: "1day" as TripLength,
                label: "One day",
                sub: "A tight but rewarding crash course in Pittsburgh",
                icon: "⚡",
              },
              {
                value: "weekend" as TripLength,
                label: "A weekend",
                sub: "Two days — the sweet spot for first-time visitors",
                icon: "📅",
              },
              {
                value: "extended" as TripLength,
                label: "3+ days",
                sub: "Enough time to explore the neighborhoods like a local",
                icon: "🏡",
              },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setState((p) => ({ ...p, tripLength: opt.value }));
                  setStep(2);
                }}
                className="flex items-center gap-5 p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-primary hover:shadow-md transition-all text-left group"
              >
                <span className="text-3xl">{opt.icon}</span>
                <div>
                  <div className="font-heading font-bold text-primary text-lg group-hover:text-accent transition-colors">
                    {opt.label}
                  </div>
                  <div className="text-gray-500 text-sm">{opt.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Interests */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary mb-2">
            What are you into?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Pick as many as you like. We'll build around them.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {(
              [
                { value: "food", label: "Food & Drink", icon: "🍽️" },
                { value: "history", label: "History", icon: "🏛️" },
                { value: "arts", label: "Arts & Culture", icon: "🎨" },
                { value: "outdoors", label: "Parks & Outdoors", icon: "🌿" },
                { value: "sports", label: "Sports", icon: "🏈" },
                { value: "nightlife", label: "Nightlife", icon: "🍺" },
                { value: "family", label: "Family", icon: "👨‍👩‍👧" },
              ] as { value: Interest; label: string; icon: string }[]
            ).map((opt) => {
              const selected = state.interests.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => toggleInterest(opt.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all font-semibold text-sm ${
                    selected
                      ? "border-primary bg-primary text-white shadow-md"
                      : "border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  {opt.label}
                </button>
              );
            })}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2.5 border-2 border-gray-200 rounded-lg text-gray-600 hover:border-gray-400 font-semibold transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Travel Style */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">
            What's your travel style?
          </h2>
          <div className="grid gap-4 mb-8">
            {[
              {
                value: "budget" as TravelStyle,
                label: "Budget-smart",
                sub: "Free museums, dive bars, pierogies for $8, city steps as cardio",
                icon: "💰",
              },
              {
                value: "balanced" as TravelStyle,
                label: "Balanced",
                sub: "Mix of affordable classics and some nicer dinners",
                icon: "⚖️",
              },
              {
                value: "splurge" as TravelStyle,
                label: "Splurge",
                sub: "Historic hotels, tasting menus, premium seats at the game",
                icon: "✨",
              },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  setState((p) => ({ ...p, travelStyle: opt.value }))
                }
                className={`flex items-center gap-5 p-5 border-2 rounded-xl transition-all text-left ${
                  state.travelStyle === opt.value
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-gray-200 bg-white hover:border-primary"
                }`}
              >
                <span className="text-3xl">{opt.icon}</span>
                <div>
                  <div
                    className={`font-heading font-bold text-lg ${
                      state.travelStyle === opt.value
                        ? "text-primary"
                        : "text-gray-800"
                    }`}
                  >
                    {opt.label}
                  </div>
                  <div className="text-gray-500 text-sm">{opt.sub}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2.5 border-2 border-gray-200 rounded-lg text-gray-600 hover:border-gray-400 font-semibold transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={generate}
              className="flex-1 bg-accent text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Build My Itinerary →
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Itinerary Output */}
      {step === 4 && itinerary && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary">
                Your Pittsburgh Itinerary
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {itinerary.length} day{itinerary.length > 1 ? "s" : ""} ·{" "}
                {state.interests.length > 0
                  ? state.interests.join(", ")
                  : "General"}{" "}
                · {state.travelStyle}
              </p>
            </div>
            <button
              onClick={reset}
              className="text-sm text-accent hover:underline font-semibold"
            >
              Start over
            </button>
          </div>

          <div className="space-y-10">
            {itinerary.map((day) => (
              <div key={day.day}>
                {/* Day header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {day.day}
                  </div>
                  <div className="text-sm text-gray-500 italic">{day.theme}</div>
                </div>

                {/* Timeline */}
                <div className="relative pl-6 border-l-2 border-gray-200 space-y-4">
                  {day.slots.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`relative -ml-3.5 pl-5 border rounded-xl p-4 ${
                        TYPE_COLORS[slot.type] ?? "border-gray-200 bg-white"
                      }`}
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-2.5 top-5 w-4 h-4 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-xs">
                        {TYPE_ICONS[slot.type] ?? "📍"}
                      </div>

                      <div className="text-xs font-semibold text-gray-400 mb-1">
                        {slot.time}
                      </div>
                      <div className="font-heading font-bold text-primary mb-1">
                        {slot.title}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-2">
                        {slot.description}
                      </p>
                      {slot.link && (
                        <a
                          href={slot.link}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                        >
                          📖 {slot.linkLabel ?? "Read the guide"} →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Hotel CTA */}
          <div className="mt-10 p-6 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl text-center">
            <div className="text-3xl mb-3">🏨</div>
            <h3 className="text-xl font-heading font-bold mb-2">
              Ready to book your Pittsburgh stay?
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Find hotels near all the spots in your itinerary.
            </p>
            <a
              href="https://trip.tpo.mx/j6OajJW1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold text-primary font-bold px-6 py-2.5 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Find Hotels in Pittsburgh
            </a>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={reset}
              className="text-sm text-gray-400 hover:text-accent hover:underline"
            >
              ← Plan a different trip
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
