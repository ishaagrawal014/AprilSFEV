import { Helmet } from "react-helmet-async";
import { Zap, Target, Globe, ArrowRight, Battery, Users, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | SpeedForce EV - Building India's EV Fleet Ecosystem</title>
        <meta
          name="description"
          content="Learn about SpeedForce EV's mission to accelerate sustainable transportation through electric mobility solutions and fleet management."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-secondary to-sky-light py-16 md:py-20">
            <div className="container-alt">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-full mb-6">
                    <Zap className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-primary">About SpeedForce EV</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                    Building Next-Gen{" "}
                    <span className="relative inline-block text-accent">
                      EV Mobility
                      <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                        <path d="M2 8C50 2 150 2 198 8" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                    </span>
                  </h1>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    SpeedForce EV is building the next generation of electric mobility by creating a structured and scalable ecosystem for EV fleet operations.
                  </p>
                </div>

                {/* Hero Image */}
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src="/images/1.JPG"
                    alt="SpeedForce EV Fleet"
                    className="w-full h-[400px] object-cover rounded-2xl border border-border shadow-alt-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-12 bg-card border-b border-border">
            <div className="container-alt">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: "2021", label: "Founded" },
                  { value: "EV", label: "First Focused Fleet" },
                  { value: "100%", label: "Sustainable Operations" },
                  { value: "12,000+", label: "Vehicles Deployed" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-secondary border border-border rounded-xl p-6 hover:border-accent/30 hover:shadow-alt-md transition-all duration-300 text-center"
                  >
                    <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="section-padding bg-card">
            <div className="container-alt">
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-1">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-4">
                    <Target className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-accent">Our Vision</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                    Accelerating Sustainable Transport
                  </h2>
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                  <p className="text-lg text-primary leading-relaxed">
                    Our vision is to accelerate the transition towards sustainable transportation while making electric mobility <span className="font-semibold text-accent">accessible, reliable, and financially viable</span> for businesses and partners.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe the future of mobility lies in well-organized fleet ecosystems powered by intelligent infrastructure, strong partnerships, and dependable vehicles. Our platform focuses on deploying electric vehicles into high-utilization commercial environments where they can deliver maximum operational efficiency and environmental impact.
                  </p>
                </div>
              </div>
            </div>
          </section>

           <section className="relative h-[420px] bg-[url('/images/3.JPG')] bg-cover bg-center">
  <div className="absolute inset-0 bg-black/40"></div>
</section>

          {/* What We Do - Three Pillars */}
          <section className="section-padding bg-secondary/30">
            <div className="container-alt">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-4">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">What We Do</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Our Core Pillars
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Battery,
                    title: "Vehicle Deployment",
                    desc: "Strategic collaborations with leading EV manufacturers ensures our fleets are built with reliable, purpose-driven vehicles designed for commercial operations — combining performance, cost efficiency, and long-term sustainability.",
                    color: "green"
                  },
                  {
                    icon: Target,
                    title: "Integrated Ecosystem",
                    desc: "Beyond vehicle deployment, we're developing an integrated ecosystem supporting fleet management, maintenance, operational monitoring, and structured ownership opportunities for partners.",
                    color: "blue"
                  },
                  {
                    icon: Globe,
                    title: "Scalable Growth",
                    desc: "Our ecosystem-driven approach enables individuals and partners to participate in the rapidly growing EV mobility sector while benefiting from a professionally managed operational framework.",
                    color: "accent"
                  }
                ].map((pillar, i) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={i}
                      className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 hover:shadow-alt-lg transition-all duration-300 group"
                    >
                      <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center mb-6 text-accent group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-4 uppercase tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            
          </section>
          <section className="w-full max-w-7xl mx-auto px-4 py-10 space-y-8 flex flex-col justify-center items-center">
            {/* Card 1 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-[32px] bg-[#FFF3E8] p-6 md:p-10 shadow-sm w-full">
                {/* Left logos */}
                <div className="flex flex-col items-center gap-4 min-w-[180px]">
                    <img src="/images/Wardwizard_Innovation & Mobility Ltd.png" alt="Wardwizard" className="h-28" />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                        Wardwizard Innovations & Mobility Limited
                    </h3>
                    <p className="mt-2 text-base md:text-lg text-gray-700">
                        Exclusive Partnership with <strong>joy e-bike</strong> & <strong>joy e-rik</strong> for EV manufacturing.
                    </p>
                </div>

                {/* Right logos */}
                <div className="flex flex-col items-center gap-4 min-w-[140px]">
                    <img src="/images/logo100.png" alt="Joy e-bike" className="h-10" />
                    <img src="/images/logo200.png" alt="Joy e-rik" className="h-10" />
                </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-[32px] bg-[#EEF7F0] p-6 md:p-10 shadow-sm w-full">
                {/* Left logo */}
                <div className="flex items-center min-w-[180px] justify-center">
                    <img src="/images/Ril.png" alt="Reliance Industries" className="h-16" />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                        <strong>Jio Things</strong>
                    </h3>
                    <p className="mt-2 text-base md:text-lg text-gray-700">
                        Only EV fleet management company to incorporate <strong>JioThings</strong> platform.
                    </p>
                </div>

                {/* Right logo */}
                <div className="flex items-center min-w-[140px] justify-center">
                    <img src="/images/700.png" alt="JioThings" className="h-10" />
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-[32px] bg-[#e2f0ff] p-6 md:p-10 shadow-sm w-full">
                {/* Left logo */}
                <div className="flex items-center min-w-[180px] justify-center">
                    <img src="/images/logo600.png" alt="Reliance Industries" className="h-16" />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                        Exclusive Insurance Package
                    </h3>
                    <p className="mt-2 text-base md:text-lg text-gray-700">
                        Asset Shield Program powered by <strong>Bluebells Insurance Broking Pvt. Ltd.</strong>
                    </p>
                </div>

                {/* Right logo */}
                <div className="flex items-center min-w-[200px] justify-center">
                    <img src="/images/ShieldLogo.png" alt="Shield Logo" className="h-20" />
                </div>
            </div>
        
        </section>
          

          {/* Mission Statement */}
          <section className="section-padding bg-card ">
            <div className="container-alt">
              <div className="relative rounded-2xl overflow-hidden border border-accent/20 bg-gradient-to-br from-accent/5 to-secondary p-12 md:p-16 ">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
                    <Award className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-accent">Our Mission</span>
                  </div>
                  
                  <blockquote className="text-2xl md:text-3xl font-bold text-primary leading-tight mb-8">
                    "To organize the EV fleet industry, enable sustainable transportation at scale, and create long-term value for partners, businesses, and communities."
                  </blockquote>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    With a long-term vision and a commitment to responsible growth, SpeedForce EV is steadily shaping a future where electric mobility becomes the backbone of modern transportation.
                  </p>
                </div>
              </div>
            </div>
          </section>

        

          {/* Why Choose Section */}
          <section className="section-padding bg-secondary/30">
            <div className="container-alt">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Why Partner With Us
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Users, text: "Professional fleet management ecosystem" },
                  { icon: TrendingUp, text: "Structured growth and partnership opportunities" },
                  { icon: Battery, text: "Access to reliable EV infrastructure" },
                  { icon: Award, text: "Long-term sustainable business model" },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-6 text-center hover:bg-accent/5 hover:border-accent/20 border border-border transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-6 h-6 text-accent" />
                    </div>
                    <p className="text-sm font-medium text-primary">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16  text-primary-foreground bg-[url('/images/6.png')] bg-black/70 bg-cover bg-center relative">
            <div className="container-alt text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Join the Movement?
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                Partner with SpeedForce EV and be part of the electric mobility revolution. Together, we're building a sustainable future for transportation.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
              <a href="/contact">
                <Button variant="gold" size="xl" className="gap-2">
                  Get in Touch <ArrowRight className="w-5 h-5" />
                </Button>
                </a>
                <a href="/">
                <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;