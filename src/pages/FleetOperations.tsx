
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  BatteryCharging,
  CheckCircle2,
  Clock,
  Phone,
  Play,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FleetOperations = () => {
  const [videoError, setVideoError] = useState(false);

  const phoneNumber = "+917859896534";

  return (
    <>
      <Helmet>
        <title>
          EV Fleet Scheme | SpeedForce EV - Electric Two-Wheeler Fleet
        </title>

        <meta
          name="description"
          content="Explore the SpeedForce EV electric two-wheeler fleet scheme. Discover low-speed EV models, advertised monthly pricing, battery options, and fleet enquiries."
        />

        <meta
          name="keywords"
          content="SpeedForce EV, electric scooter fleet, low speed electric scooter, fleet business, EV fleet scheme"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-20">
          {/* 1. VIDEO HERO SECTION */}
          <section className="relative isolate overflow-hidden bg-[#07152e]">
            <div className="relative min-h-[520px] md:min-h-[680px] lg:min-h-[740px]">
              <img
    src="/images/3.JPG"
    alt="SpeedForce EV fleet vehicles"
    className="absolute inset-0 h-full w-full object-cover"
  />

              {/* Contrast overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#07152e]/90 via-[#07152e]/55 to-[#07152e]/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07152e]/75 via-transparent to-black/10" />

              {/* Hero content */}
              <div className="container-alt relative z-10 flex min-h-[520px] items-center py-20 md:min-h-[680px] lg:min-h-[740px]">
                <div className="max-w-3xl">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-md">
                    <Zap className="h-4 w-4 text-green-400" />

                    <span className="text-sm font-medium text-white">
                      SpeedForce EV Fleet Scheme
                    </span>
                  </div>

                  <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    Build Your Fleet with
                    <span className="mt-2 block text-green-400">
                      Electric Two-Wheelers
                    </span>
                  </h1>

                  <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
                    Explore low speed electric 2 wheelers for your fleet
                    business, with advertised monthly pricing options
                    depending on your battery requirements.
                  </p>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a href="#fleet-pricing">
                      <Button
                        variant="gold"
                        size="xl"
                        className="w-full gap-2 sm:w-auto"
                      >
                        Explore Fleet Pricing
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </a>

                    <a
                      href={`https://wa.me/${phoneNumber.replace("+", "")}?text=${encodeURIComponent(
                        "Hello SpeedForce EV, I would like to know more about your electric two-wheeler fleet scheme."
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="xl"
                        className="w-full border-white/70 bg-white/5 text-white hover:bg-white/15 sm:w-auto"
                      >
                        Enquire on WhatsApp
                      </Button>
                    </a>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/85">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      Low-Speed EVs
                    </span>

                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      Battery Options
                    </span>

                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      Fleet Enquiries
                    </span>
                  </div>
                </div>
              </div>

              {/* Scroll indicator */}
              <a
                href="#fleet-pricing"
                aria-label="Scroll to fleet pricing"
                className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/70 md:flex"
              >
                <span>Explore the scheme</span>
                <span className="h-8 w-px bg-white/50" />
              </a>
            </div>
          </section>

          {/* 2. SCHEME INTRODUCTION */}
          
{/* Scheme Introduction with Vertical Video */}
<section className="bg-card py-14 md:py-20">
  <div className="container-alt">
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

      {/* Left: Content */}
      <div>
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
          <Zap className="h-4 w-4" />
          The Fleet Scheme
        </span>

        <h2 className="mb-6 text-3xl font-bold leading-tight text-primary md:text-4xl lg:text-5xl">
          Looking for Electric Two-Wheelers for Your Fleet Business?
        </h2>

        <p className="mb-8 text-base leading-relaxed text-muted-foreground md:text-lg">
          Expand your fleet with SpeedForce EV's low-speed electric
          two-wheelers. Explore our vehicle options, advertised monthly
          pricing, and battery configurations for your fleet business.
        </p>

        <div className="mb-8 space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
            <div>
              <h3 className="font-semibold text-primary">
                Flexible Battery Options
              </h3>
              <p className="text-sm text-muted-foreground">
                Explore options with and without a battery.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
            <div>
              <h3 className="font-semibold text-primary">
                Fleet-Focused Vehicles
              </h3>
              <p className="text-sm text-muted-foreground">
                Discover electric two-wheelers for commercial use.
              </p>
            </div>
          </div>
        </div>

        <a href="#fleet-pricing">
          <Button variant="gold" size="xl" className="gap-2">
            Explore Pricing
            <ArrowRight className="h-5 w-5" />
          </Button>
        </a>
      </div>

      {/* Right: Vertical Video */}
      <div className="flex justify-center lg:justify-end">
        <div className="relative w-full max-w-[340px] overflow-hidden rounded-3xl border border-border bg-black shadow-xl">
          <video
            className="aspect-[9/16] w-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster="/images/fleet-scheme-poster.jpg"
          >
            <source
              src="/videos/Speed Force.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

    </div>
  </div>
</section>


          {/* 3. PRICING */}
          <section
            id="fleet-pricing"
            className="scroll-mt-24 bg-secondary/30 py-16 md:py-24"
          >
            <div className="container-alt">
              <div className="mb-12 text-center">
                <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  Fleet Pricing
                </span>

                <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
                  Choose Your Battery Option
                </h2>

                <p className="mx-auto max-w-2xl text-muted-foreground">
                  Compare the two monthly price points advertised for the
                  SpeedForce EV fleet scheme.
                </p>
              </div>

              <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
                {/* With battery */}
                <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg md:p-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                    <BatteryCharging className="h-7 w-7 text-accent" />
                  </div>

                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Option 01
                  </p>

                  <h3 className="mb-3 text-2xl font-bold text-primary">
                    With Battery
                  </h3>

                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    The advertised pricing option with battery included.
                  </p>

                  <div className="mb-6 flex items-baseline gap-2">
                    <span className="text-5xl font-bold tracking-tight text-primary">
                      ₹4,500
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / month*
                    </span>
                  </div>

                  <div className="mb-8 h-px bg-border" />

                  <ul className="mb-8 space-y-3 text-sm text-primary">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      Battery included in the advertised option
                    </li>

                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      Suitable for fleet scheme enquiries
                    </li>
                  </ul>

                  <a href="/contact">
                    <Button variant="gold" size="xl" className="w-full gap-2">
                      Enquire Now
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </a>
                </div>

                {/* Without battery */}
                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg md:p-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10">
                    <Zap className="h-7 w-7 text-blue-600" />
                  </div>

                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Option 02
                  </p>

                  <h3 className="mb-3 text-2xl font-bold text-primary">
                    Without Battery
                  </h3>

                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    The advertised pricing option without battery included.
                  </p>

                  <div className="mb-6 flex items-baseline gap-2">
                    <span className="text-5xl font-bold tracking-tight text-primary">
                      ₹3,000
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / month*
                    </span>
                  </div>

                  <div className="mb-8 h-px bg-border" />

                  <ul className="mb-8 space-y-3 text-sm text-primary">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      Battery excluded from the advertised option
                    </li>

                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      Enquire about battery arrangements and eligibility
                    </li>
                  </ul>

                  <a href="/contact">
                    <Button
                      variant="outline"
                      size="xl"
                      className="w-full gap-2"
                    >
                      Enquire Now
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </div>

              <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
                *Prices are reproduced from the supplied promotional poster.
                Confirm the billing period, applicable taxes, deposits,
                eligibility, battery arrangements, and contractual terms
                with SpeedForce EV before entering into an agreement.
              </p>
            </div>
          </section>

          {/* 4. VEHICLE MODELS AND SPECIFICATIONS */}
          <section className="bg-card py-16 md:py-24">
            <div className="container-alt">
              <div className="mb-12 text-center">
                <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  Vehicle Highlights
                </span>

                <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
                  Designed for Everyday Fleet Use
                </h2>

                <p className="mx-auto max-w-2xl text-muted-foreground">
                  Explore the models and features highlighted in the
                  supplied SpeedForce EV promotional material.
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Range */}
                <div className="overflow-hidden rounded-2xl border border-border bg-background">
                  <div className="relative flex min-h-[220px] items-center justify-center bg-[#e8f1fa] p-8">
                    <div className="text-center">
                      <BatteryCharging className="mx-auto mb-4 h-12 w-12 text-blue-700" />

                      <p className="text-sm font-semibold uppercase tracking-widest text-blue-800">
                        Advertised Range
                      </p>

                      <p className="mt-2 text-5xl font-bold text-blue-900">
                        80–100
                        <span className="ml-2 text-xl">km*</span>
                      </p>

                      <p className="mt-2 text-sm text-blue-800">
                        In ECO mode
                      </p>
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="mb-3 text-xl font-bold text-primary">
                      Range for Daily Operations
                    </h3>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      The promotional material advertises an 80–100 km
                      range in ECO mode. Actual range may vary with load,
                      riding conditions, battery condition, and usage.
                    </p>
                  </div>
                </div>

                {/* Battery swapping */}
                <div className="overflow-hidden rounded-2xl border border-border bg-background">
                  <div className="flex min-h-[220px] items-center justify-center bg-[#e8f6ed] p-8">
                    <div className="text-center">
                      <Zap className="mx-auto mb-4 h-12 w-12 text-green-700" />

                      <p className="text-sm font-semibold uppercase tracking-widest text-green-800">
                        Battery Swapping
                      </p>

                      <p className="mt-2 text-5xl font-bold text-green-900">
                        Yes
                      </p>

                      <p className="mt-2 text-sm text-green-800">
                        As advertised in the supplied poster
                      </p>
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="mb-3 text-xl font-bold text-primary">
                      Battery Swapping Capability
                    </h3>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Battery swapping is indicated in the supplied
                      promotional material. Confirm model compatibility,
                      battery availability, and swapping access before
                      deployment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Model names */}
              <div className="mt-10 rounded-2xl border border-border bg-secondary/30 p-7 md:p-10">
                <h3 className="mb-4 text-xl font-bold text-primary md:text-2xl">
                  Featured Models
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />

                    <div>
                      <h4 className="font-semibold text-primary">
                        Gen Next Nanu
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Featured in the supplied fleet scheme poster.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />

                    <div>
                      <h4 className="font-semibold text-primary">
                        WOLF
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Featured in the supplied fleet scheme poster.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. HOW TO ENQUIRE */}
          <section className="bg-secondary/30 py-16 md:py-20">
            <div className="container-alt">
              <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-8 text-center shadow-sm md:p-12">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                  <ShieldCheck className="h-7 w-7 text-accent" />
                </div>

                <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
                  Ready to Expand Your Fleet?
                </h2>

                <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-muted-foreground">
                  Connect with SpeedForce EV to discuss vehicle availability,
                  the applicable monthly pricing, battery options, and the
                  terms of the fleet scheme.
                </p>

                <div className="mb-8 flex flex-wrap justify-center gap-4">
                  <a href={`tel:${phoneNumber}`}>
                    <Button variant="gold" size="xl" className="gap-2">
                      <Phone className="h-5 w-5" />
                      +91 78598 96534
                    </Button>
                  </a>

                  <a href="/contact">
                    <Button
                      variant="outline"
                      size="xl"
                      className="gap-2"
                    >
                      Contact Us
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </a>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Contact our team for current availability and terms.
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FleetOperations;
