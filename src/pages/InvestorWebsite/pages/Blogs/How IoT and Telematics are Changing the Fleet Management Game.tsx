import React from "react";

// ==========================
// BLOG CONTENT CONFIG
// Only update this object
// ==========================
const blog = {
  title: "How IoT and Telematics are Changing the Fleet Management Game",
  subtitle:
    "How connected EV technology is transforming fleet efficiency, safety, and profitability in India",
  heroImage: "/images/blog-iot-ev.jpg",
  author: "SpeedForce EV",
  date: "January 2026",
  sections: [
    {
      heading: "Introduction",
      content: `For decades, fleet management was a game of guesswork. Managers relied on manual logs, phone calls, and gut feeling to track vehicles. In the era of electric mobility, guesswork is expensive. IoT and telematics have turned every EV into a data-generating powerhouse.`
    },
    {
      heading: "From 'Where is my driver?' to 'How is my battery?'",
      highlight: "Real-time battery intelligence eliminates range anxiety.",
      content: `Modern EV telematics monitors State of Charge (SoC) and State of Health (SoH) in real time. Fleet managers can instantly determine whether a vehicle can complete its delivery loop or needs a battery swap.`
    },
    {
      heading: "Predictive Maintenance: Fixing It Before It Breaks",
      highlight: "Prevent downtime before it happens.",
      content: `IoT sensors track motor temperature, voltage fluctuations, and brake wear. Vehicles can be routed for service before failures occur, maximizing fleet uptime.`
    },
    {
      heading: "Driver Behaviour Profiling",
      list: [
        "Over-speeding",
        "Harsh braking",
        "Idling time",
        "Geofence violations"
      ],
      content: `Telematics creates driver scorecards that encourage smoother driving, resulting in better range efficiency and fewer accidents.`
    },
    {
      heading: "Theft Prevention and Asset Security",
      content: `Remote immobilization and geofencing protect fleet assets 24/7, ensuring safety in the gig economy.`
    }
  ],
  cta: {
    text: "Does your fleet have a digital heartbeat?",
    button: "Contact SpeedForce EV",
    link: "/contact"
  }
};

// ==========================
// TEMPLATE COMPONENT
// ==========================
export default function BlogDetailPage() {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Hero */}
      <section
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${blog.heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/90 to-indigo-800/90" />
        <div className="relative z-10 max-w-4xl px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {blog.title}
          </h1>
          <p className="text-lg md:text-xl text-blue-100">
            {blog.subtitle}
          </p>
          <div className="mt-6 text-sm text-blue-200">
            {blog.author} • {blog.date}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {blog.sections.map((section, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              {section.heading}
            </h2>

            {section.highlight && (
              <div className="border-l-4 border-blue-600 bg-blue-50 p-4 text-blue-900 font-medium">
                {section.highlight}
              </div>
            )}

            <p className="text-lg leading-relaxed text-slate-700">
              {section.content}
            </p>

            {section.list && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {section.list.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 bg-white shadow-sm rounded-lg px-4 py-3"
                  >
                    <span className="h-2 w-2 bg-blue-600 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h3 className="text-3xl font-bold mb-6">{blog.cta.text}</h3>
          <a
            href={blog.cta.link}
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition"
          >
            {blog.cta.button}
          </a>
        </div>
      </section>
    </div>
  );
}
