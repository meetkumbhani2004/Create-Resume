import React from "react";
import { CheckCircle } from "lucide-react";

const testimonials = [
  {
    name: "Briar Martin",
    handle: "@neilstellar",
    image: "https://i.pravatar.cc/100?img=1",
    text: "Radiant made undercutting all of our competitors an absolute breeze.",
  },
  {
    name: "Avery Johnson",
    handle: "@averywrites",
    image: "https://i.pravatar.cc/100?img=2",
    text: "Radiant made undercutting all of our competitors an absolute breeze.",
  },
  {
    name: "Jordan Lee",
    handle: "@jordantalks",
    image: "https://i.pravatar.cc/100?img=3",
    text: "Radiant made undercutting all of our competitors an absolute breeze.",
  },
  {
    name: "Liam Brown",
    handle: "@liamdesigns",
    image: "https://i.pravatar.cc/100?img=4",
    text: "An intuitive experience that simplified our process drastically.",
  },
  {
    name: "Sophia Davis",
    handle: "@sophiacodes",
    image: "https://i.pravatar.cc/100?img=5",
    text: "Radiant helped us scale our workflow with ease and speed.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden pt-20" id="testimonials">
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-3">
          💬 Testimonials
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Don’t just take our words
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hear what our users say about us. We’re always looking for ways to
          improve. If you have a positive experience, leave a review!
        </p>
      </div>

      {/* Animation Container */}
      <div className="space-y-8 max-w-6xl mx-auto relative">
        {/* Row 1 - Left to Right */}
        <div className="overflow-hidden relative before:absolute before:left-0 before:top-0 before:h-full before:w-16 before:bg-gradient-to-r before:from-white before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:h-full after:w-16 after:bg-gradient-to-l after:from-white after:to-transparent after:z-10">
          <div className="flex animate-scroll-left gap-6">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-72 sm:w-80 p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 flex items-center gap-1">
                      {t.name}
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </h3>
                    <p className="text-gray-500 text-sm">{t.handle}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{t.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="overflow-hidden relative before:absolute before:left-0 before:top-0 before:h-full before:w-16 before:bg-gradient-to-r before:from-white before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:h-full after:w-16 after:bg-gradient-to-l after:from-white after:to-transparent after:z-10">
          <div className="flex animate-scroll-right gap-6">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-72 sm:w-80 p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 flex items-center gap-1">
                      {t.name}
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </h3>
                    <p className="text-gray-500 text-sm">{t.handle}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
