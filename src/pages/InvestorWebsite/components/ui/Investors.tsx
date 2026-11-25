import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Investors() {
  const description =
    "Designed for those who expect more from their capital. Bypass the volatility of the market and enjoy steady, contract backed rental income. Pure returns, zero operations.";

  const stats = [
    { value: "15+", label: "Years of Automotive Expertise" },
    { value: "6,500+", label: "Vehicle Deployment" },
    { value: "21%", label: "Annual Rental Return" },
  ];

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
      {/* Left Content */}
      <div>
        <p className="text-base sm:text-lg text-[#1b1b1b] max-w-2xl">
          {description}
        </p>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="text-center sm:text-left">
              <p className="text-2xl sm:text-3xl font-bold text-[#23c55e]">
                {stat.value}
              </p>
              <p className="mt-1 text-xs sm:text-sm font-medium text-[#555] leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <a
            href="#calc"
            className="flex items-center justify-center sm:justify-start text-[#258afe] font-semibold hover:underline"
          >
            See how
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative w-full overflow-hidden rounded-3xl shadow-lg h-64 sm:h-80 lg:h-full min-h-[300px]">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000"
          alt="Investors collaborating"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
