import { Fuel, Leaf, MapPin, Zap, Wrench, BadgePercent } from "lucide-react";

const PanIndiaCoverage = () => {
  const metrics = [
    {
      icon: Fuel,
      value: "₹150 Cr",
      label: "Savings in Fuel Cost",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Leaf,
      value: "67.8 Cr",
      label: "Kg/Year Carbon Offset",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: MapPin,
      value: "37+",
      label: "Cities Covered",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Zap,
      value: "7,000+",
      label: "Charging Stations",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Wrench,
      value: "150+",
      label: "Service Garages",
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-alt">
        <div className="text-center max-w-3xl mx-auto mb-12">

          
          <h2 className="text-6xl md:text-5xl font-bold text-green-700 mb-4">
            Pan India Coverage
          </h2>
          <p className="text-lg text-muted-foreground">
            Become a part of India's largest EV ecosystem. Start your savings journey today!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 text-center shadow-alt-md hover:shadow-alt-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {metric.value}
              </div>
              
              <p className="text-xs md:text-sm text-muted-foreground">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PanIndiaCoverage;
