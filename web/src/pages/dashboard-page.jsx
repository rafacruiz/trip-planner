

export default function HomePage() {
  const trips = [
    {
      id: 1,
      title: "Japan Adventure",
      country: "Japan",
      flag: "🇯🇵",
      image:
        "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1200",
      start: "Apr 10",
      end: "Apr 25",
      travelers: [
        "https://i.pravatar.cc/40?img=1",
        "https://i.pravatar.cc/40?img=2",
        "https://i.pravatar.cc/40?img=3",
      ],
    },
    {
      id: 2,
      title: "Weekend in Rome",
      country: "Italy",
      flag: "🇮🇹",
      image:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200",
      start: "May 3",
      end: "May 6",
      travelers: [
        "https://i.pravatar.cc/40?img=4",
        "https://i.pravatar.cc/40?img=5",
      ],
    },
    {
      id: 3,
      title: "Iceland Roadtrip",
      country: "Iceland",
      flag: "🇮🇸",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200",
      start: "Jun 12",
      end: "Jun 20",
      travelers: [
        "https://i.pravatar.cc/40?img=6",
        "https://i.pravatar.cc/40?img=7",
        "https://i.pravatar.cc/40?img=8",
        "https://i.pravatar.cc/40?img=9",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Navbar */}
      

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">My Trips</h1>
          <p className="text-gray-500 mt-1">
            Plan, organize and share your adventures 🌍
          </p>
        </div>

        {/* Trips grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-sm font-medium">
                  {trip.flag} {trip.country}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  {trip.title}
                </h3>

                {/* Dates */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                  📅 {trip.start} – {trip.end}
                </div>

                {/* Travelers */}
                <div className="flex items-center justify-between mt-5">
                  <div className="flex -space-x-2">
                    {trip.travelers.map((avatar, i) => (
                      <img
                        key={i}
                        src={avatar}
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>

                  <span className="text-sm text-blue-600 font-medium group-hover:underline">
                    View Trip →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating create button */}
      <button className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl transition hover:scale-105">
        +
      </button>
    </div>
  );
}
