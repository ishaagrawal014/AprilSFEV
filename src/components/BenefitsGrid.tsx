import {
  Key,
  Users,
  Wrench,
  ShieldCheck,
  Package,
  TrendingUp,
  FileCheck,
  Truck,
} from "lucide-react";

const BenefitsGrid = () => {
  const benefits = [
    { icon: Key, label: "Easy Ownership" },
    { icon: Users, label: "Team of EV Experts" },
    { icon: Wrench, label: "Maintenance & Services" },
    { icon: ShieldCheck, label: "Reliable Vehicles" },
    { icon: Package, label: "Spares Availability" },
    { icon: TrendingUp, label: "High Vehicle Uptime" },
    { icon: FileCheck, label: "Easy Insurance Claims" },
    { icon: Truck, label: "Road Side Assistance" },
  ];

  return (
    <section className="section-padding bg-card">
      <div className="container-alt">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-accent mb-2">

          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Everything You Need
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center p-6 bg-secondary rounded-xl hover:bg-accent/10 transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 bg-card rounded-full flex items-center justify-center mb-3 shadow-alt-sm group-hover:shadow-gold group-hover:scale-110 transition-all duration-300">
                <benefit.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
              </div>
              <span className="text-sm font-medium text-primary">
                {benefit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;
