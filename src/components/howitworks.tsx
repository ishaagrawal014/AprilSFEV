import { Zap, MapPin, Wrench, Shield, Battery, Settings, CheckCircle2, Truck, Gauge, Route, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const vehicles = [
    {
      type: "Low-Speed EVs",
      icon: Zap,
      description: "Perfect for urban logistics and last-mile delivery",
      features: ["Up to 45 km/h", "Ideal for city routes", "Lower operating costs"],
      image: "/images/Wolf.jpg",
      gradient: "from-blue-500 to-cyan-400",
      accentColor: "#21c45d"
    },
    {
      type: "High-Speed EVs",
      icon: Truck,
      description: "Built for long-distance and highway transport",
      features: ["Highway capable", "Extended range", "Heavy-duty performance"],
      image: "/images/mihos.jpg",
      gradient: "from-purple-500 to-pink-400",
      accentColor: "#21c45d"
    }
  ];

  const services = [
    {
      icon: Wrench,
      title: "Maintenance",
      description: "Regular servicing and preventive care",
      gradient: "from-orange-400 to-red-500"
    },
    {
      icon: Settings,
      title: "Service Support",
      description: "24/7 technical assistance and repairs",
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      icon: Battery,
      title: "Battery Management",
      description: "Optimal charging and battery health",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Compliance",
      description: "All regulatory requirements handled",
      gradient: "from-purple-400 to-pink-500"
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-alt">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#21c45d]/10 to-transparent blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/10 to-[#21c45d]/10 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" style={{ color: "#21c45d" }} />
              <span className="text-sm font-medium" style={{ color: "#21c45d" }}>Simple Process</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started with your EV fleet in three simple steps
            </p>
          </div>
        </div>

        {/* Step 1: Choose Your Vehicles */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8 group">
            <div className="w-14 h-14 bg-gradient-to-br from-accent to-[#21c45d] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-accent/50 group-hover:scale-110 transition-transform">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-1">
                Choose Your Vehicles
              </h3>
              <p className="text-muted-foreground">Select from low-speed or high-speed EVs</p>
            </div>
            <ArrowRight className="w-6 h-6 text-[#21c45d] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Vehicle Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
            {vehicles.map((vehicle, index) => (
              <div
                key={index}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-accent via-[#21c45d] to-accent rounded-3xl opacity-0 group-hover:opacity-40 blur transition-opacity" />
                
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border hover:border-[#21c45d]/50 transition-all aspect-video">
                  {/* Vehicle Image - Full Background */}
                  <div className="absolute inset-0">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.type}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Dark overlay gradient */}
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="relative h-full flex flex-col p-4">
  {/* Top content (if any later) */}
  <div>
    <h4 className="text-3xl md:text-xl font-bold text-white drop-shadow-lg">
      {vehicle.type}
    </h4>
    <p className="text-white/90 text-sm mb-2 drop-shadow">
      {vehicle.description}
    </p>
  </div>

  {/* Bottom content */}
  <div className="mt-auto drop-shadow-lg">
    <div className="space-y-2 mb-2 ">
      {vehicle.features.map((feature, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 rounded-xl "
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#21c45d/80" }}
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-white">
            {feature}
          </span>
        </div>
      ))}
    </div>

    
  </div>
</div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Deploy & Track */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8 group">
            <div className="w-14 h-14 bg-gradient-to-br from-accent to-[#21c45d] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-accent/50 group-hover:scale-110 transition-transform">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-1">
                Deploy & Track
              </h3>
              <p className="text-muted-foreground">IoT-enabled with complete dashboard access</p>
            </div>
            <Route className="w-6 h-6 text-[#21c45d] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Horizontal Tracking Visualization */}
          <div className="relative bg-gradient-to-r from-slate-900 via-sky-900 to-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMyMWM0NWQiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
            
            {/* Glowing orbs */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#21c45d] rounded-full blur-3xl opacity-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "1s" }} />
            
            <div className="relative">
              {/* Route Line */}
              <div className="absolute top-1/2 left-0 right-0 h-2 bg-white/10 rounded-full" style={{ transform: 'translateY(-50%)' }}>
                <div className="h-full bg-gradient-to-r from-accent via-[#21c45d] to-accent rounded-full shadow-lg shadow-[#21c45d]/50 animate-pulse" style={{ width: '70%' }} />
              </div>

              {/* Tracking Points */}
              <div className="relative z-10 flex justify-between items-center min-h-[200px]">
                {/* Starting Point */}
                <div className="flex flex-col items-center group/point">
                  <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-100 rounded-2xl flex items-center justify-center shadow-2xl mb-4 border-4 border-[#21c45d] group-hover/point:scale-110 transition-transform relative">
                    <MapPin className="w-10 h-10 text-[#21c45d]" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#21c45d] rounded-full animate-ping" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-xl shadow-xl border border-gray-200">
                    <p className="text-xs font-bold text-gray-800">Start Point</p>
                    <p className="text-xs text-gray-600">Depot A</p>
                  </div>
                </div>

                {/* In Transit */}
                <div className="flex flex-col items-center group/point">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#21c45d] to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-[#21c45d]/50 mb-4 animate-pulse group-hover/point:scale-110 transition-transform">
                      <Truck className="w-10 h-10 text-white" />
                    </div>
                    {/* Moving indicator */}
                    <div className="absolute -top-2 -right-2 flex gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-[#21c45d] to-emerald-600 px-4 py-3 rounded-xl shadow-xl">
                    <p className="text-xs font-bold text-white">In Transit</p>
                    <p className="text-xs text-white/80">Live Location</p>
                  </div>
                </div>

                {/* Checkpoint */}
                <div className="flex flex-col items-center group/point">
                  <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-100 rounded-2xl flex items-center justify-center shadow-2xl mb-4 border-4 border-accent/50 group-hover/point:scale-110 transition-transform">
                    <CheckCircle2 className="w-10 h-10 text-accent" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-xl shadow-xl border border-gray-200">
                    <p className="text-xs font-bold text-gray-800">Checkpoint</p>
                    <p className="text-xs text-gray-600">Hub B</p>
                  </div>
                </div>

                {/* Destination */}
                <div className="flex flex-col items-center group/point">
                  <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-100 rounded-2xl flex items-center justify-center shadow-2xl mb-4 border-4 border-gray-300 group-hover/point:scale-110 group-hover/point:border-[#21c45d] transition-all">
                    <MapPin className="w-10 h-10 text-accent" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-xl shadow-xl border border-gray-200">
                    <p className="text-xs font-bold text-gray-800">Destination</p>
                    <p className="text-xs text-gray-600">Customer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="relative mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Real-time GPS", value: "Active", icon: MapPin, color: "#21c45d" },
                { label: "Battery Level", value: "87%", icon: Battery, color: "#21c45d" },
                { label: "Distance", value: "24 km", icon: Route, color: "#f59e0b" },
                { label: "ETA", value: "18 min", icon: Gauge, color: "#f59e0b" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/95 backdrop-blur px-4 py-4 rounded-2xl shadow-xl border border-gray-200 text-center hover:scale-105 transition-transform group">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                      <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                    <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: We Handle the Rest */}
        <div>
          <div className="flex items-center gap-4 mb-8 group">
            <div className="w-14 h-14 bg-gradient-to-br from-accent to-[#21c45d] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-accent/50 group-hover:scale-110 transition-transform">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-1">
                We Handle the Rest
              </h3>
              <p className="text-muted-foreground">Comprehensive support for your entire fleet</p>
            </div>
            <Shield className="w-6 h-6 text-[#21c45d] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Service Boxes */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative group"
              >
                {/* Glow effect on hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-75 blur transition-opacity`} />
                
                <div className="relative bg-card rounded-2xl p-6 shadow-xl border border-border hover:border-transparent transition-all overflow-hidden h-full">
                  {/* Background decoration */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity`} />
                  
                  <div className="relative">
                    {/* Icon with gradient background */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h4 className="text-lg font-bold text-primary mb-2 group-hover:text-[#21c45d] transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Decorative check icon */}
                    <div className="mt-4 flex items-center gap-2 text-[#21c45d] opacity-0 group-hover:opacity-100 transition-opacity">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs font-medium">Included</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#21c45d]/10 to-transparent blur-3xl" />
            <div className="relative">
              <Button 
                variant="gold" 
                size="lg"
                className="bg-gradient-to-r from-accent via-[#21c45d] to-accent hover:shadow-2xl hover:shadow-[#21c45d]/50 hover:scale-105 transition-all group"
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-muted-foreground mt-4">Join 500+ businesses transforming their fleet</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;