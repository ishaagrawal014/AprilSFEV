import { MapPin, BatteryCharging, Leaf } from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import CountUp from "react-countup";

type LiveFleetStatsProps = {
    variant?: "section" | "hero";
};

// Deterministic pseudo random
const pseudoRandom = (seed: number) => {
    return Math.abs(Math.sin(seed) * 10000);
};

/**
 * Returns a multiplier for night hours
 * 12 AM  → ~0.95
 * 3–4 AM → ~0.75 (lowest)
 * 8 AM   → ~0.95
 */
const nightActivityMultiplier = (hour: number) => {
    // Map 0–8 → 0–1
    const t = hour / 8;

    // Bell curve dip (lowest in middle)
    // 1 - dipDepth * sin(pi * t)
    const dipDepth = 0.25; // how low it can go
    return 1 - dipDepth * Math.sin(Math.PI * t);
};

// Calculate stats based on time
const calculateStats = () => {
    const seedDate = new Date("2025-11-24T00:00:00");
    const now = new Date();

    const diffMinutes = Math.floor(
        (now.getTime() - seedDate.getTime()) / 60000
    );

    const hour = now.getHours();
    const slot5 = Math.floor(diffMinutes / 5);

    const deployedFleet = 6278;

    /* ---------------- ACTIVE FLEET LOGIC ---------------- */

    let minActive = 5587;
    let maxActive = 5745;

    // 12 AM – 3 AM (decline)
    if (hour >= 0 && hour < 3) {
        minActive = 4993 - hour * 250;   // 3400 → ~2900
        maxActive = 5194 - hour * 300;   // 3700 → ~2800
    }

    // 3 AM – 6 AM (lowest zone)
    else if (hour >= 3 && hour < 6) {
        minActive = 4723;
        maxActive = 4923 - (5 - hour) * 200; // tighter around 3–4 AM
    }

    // 6 AM – 9 AM (ramp up)
    else if (hour >= 6 && hour < 9) {
        minActive = 5189 + (hour - 6) * 300; // 2700 → 3600
        maxActive = 5327 + (hour - 6) * 200; // 3300 → 3900
    }

    // 9 AM – 6 PM (stable daytime)
    else if (hour >= 9 && hour < 18) {
        minActive = 3600;
        maxActive = 3900;
    }

    // Evening (6 PM – 12 AM)
    else {
        minActive = 3600;
        maxActive = 4000;
    }

    const activeFleet =
        minActive +
        Math.floor(
            pseudoRandom(slot5 + hour * 100) % (maxActive - minActive + 1)
        );

    /* ---------------- GREEN KM ---------------- */

    const slot20 = Math.floor(diffMinutes / 20);
    const baseKm = 7_000_000;

    let totalAdded = 0;
    for (let i = 1; i <= slot20; i++) {
        const isNight = hour >= 0 && hour < 8;
        const baseIncrement = isNight ? 80 : 160;
        const variance = isNight ? 40 : 110;

        totalAdded +=
            baseIncrement +
            Math.floor(pseudoRandom(i) % variance);
    }

    return {
        deployed: deployedFleet,
        active: activeFleet,
        greenKilometers: baseKm + totalAdded
    };
};

export default function LiveFleetStats({
    variant = "section"
}: LiveFleetStatsProps) {
    const [stats, setStats] = useState({
        deployed: 4368,
        active: 3700,
        greenKilometers: 7000000
    });

    const updateStats = useCallback(() => {
        setStats(calculateStats());
    }, []);

    useEffect(() => {
        updateStats();
    }, [updateStats]);

    useEffect(() => {
        const interval = setInterval(updateStats, 15000);
        return () => clearInterval(interval);
    }, [updateStats]);

    const statsData = [
        {
            label: "Deployed Vehicles",
            value: stats.deployed,
            icon: MapPin,
            color: "text-blue-600",
            iot: true
        },
        {
            label: "Active EVs on Road",
            value: stats.active,
            icon: BatteryCharging,
            color: "text-green-500",
            live: true
        },
        {
            label: "Green Kilometers",
            value: stats.greenKilometers,
            icon: Leaf,
            color: "text-blue-600",
            live: true
        }
    ];

    const animationStyles = (
        <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .live-indicator {
          animation: blink 2s infinite;
        }
      `}</style>
    );

    if (variant === "hero") {
        return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {animationStyles}
                {statsData.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl border border-white/50 bg-white/80 px-4 py-3 shadow-card backdrop-blur"
                    >
                        <div className="flex items-center justify-between text-xs font-semibold text-[#050505]/80">
                            <span>{stat.label}</span>

                            {stat.iot && (
                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-blue-600">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                                    IoT Enabled
                                </span>
                            )}

                            {stat.live && (
                                <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#23c55e] live-indicator">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#23c55e] opacity-60"></span>
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#23c55e]" />
                                    </span>
                                    Live
                                </span>
                            )}
                        </div>

                        <div className="mt-1 text-xl font-bold text-[#132644]">
                            <CountUp
                                key={stat.value}
                                end={stat.value}
                                duration={1.2}
                                separator=","
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <section className="bg-layer-blue py-16">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-[#050505]">
                        Live Fleet Statistics
                    </h2>
                    <p className="mt-2 text-base text-muted-foreground">
                        Real-time impact tracking
                    </p>
                </div>

                {animationStyles}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {statsData.map((stat, index) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-[#e1e7f5] bg-white p-6 shadow-card transition-transform duration-300 hover:-translate-y-1"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <stat.icon
                                    className={`h-11 w-11 ${stat.color} rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-700/10 p-2 shadow-sm`}
                                />

                                {stat.iot && (
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                                        IoT Enabled
                                    </span>
                                )}

                                {stat.live && (
                                    <span className="flex items-center gap-1 text-xs font-semibold text-[#23c55e] live-indicator">
                                        <span className="relative flex h-2 w-2">
                                            <span className="absolute inline-flex h-full w-full rounded-full bg-[#23c55e] opacity-60"></span>
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#23c55e]" />
                                        </span>
                                        Live
                                    </span>
                                )}
                            </div>

                            <div className="text-4xl font-bold text-[#050505]">
                                <CountUp
                                    key={stat.value}
                                    end={stat.value}
                                    duration={1.2}
                                    separator=","
                                />
                            </div>

                            <div className="text-sm font-semibold text-muted-foreground">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
