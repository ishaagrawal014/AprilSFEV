import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function WorkingProfessionals() {
  const description =
    "The preferred choice for busy professionals. Enjoy the security of asset ownership without the stress of maintenance or management. A 100% hands-off investment with guaranteed monthly payouts.";

  const stats = [
    { value: "₹8,800", label: "Monthly Rental Passive Income" },
    { value: "Asset Backed", label: "Returns Delivered" },
    { value: "₹2.5L", label: "Minimum Investment" },
    { value: "4 Years", label: "Assured Fixed Rental Return" },
  ];

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Left Side - Image */}
      <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
        <img
          src="/images/wp.jpeg"
          alt="Professional real estate investment"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Original Content */}
      <div className="mt-8">
        {/* Description */}
        <p className="text-base sm:text-lg text-[#1b1b1b] max-w-3xl">
          {description}
        </p>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center sm:text-left">
              <p className="text-2xl sm:text-3xl font-bold text-[#23c55e]">
                {stat.value}
              </p>
              <p className="mt-1 text-xs sm:text-sm font-medium text-[#555]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <a
            href="#investment"
            className="flex items-center justify-center sm:justify-start text-[#258afe] font-semibold hover:underline"
          >
            See how
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}