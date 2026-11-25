import { cn } from "@/lib/utils";
import { useFleetStats } from "@/pages/InvestorWebsite/hooks/useFleetStats";

type FleetStatsCardProps = {
  className?: string;
  variant?: "hero" | "section";
};

const FleetStatsCard = ({ className, variant = "hero" }: FleetStatsCardProps) => {
  const { stats, liveKilometers } = useFleetStats();
  const uptime = Math.min(100, Math.round((stats.active / stats.deployed) * 100));

  const metrics = [
    {
      label: "Vehicles On Road",
      value: stats.active.toLocaleString("en-IN"),
      description: "Live fleet coverage",
    },
    {
      label: "Fleet Uptime",
      value: `${uptime}%`,
      description: "Across all hubs",
    },
    {
      label: "Green Km Driven",
      value: liveKilometers.toLocaleString("en-IN"),
      description: "Total since launch",
    },
  ];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-card backdrop-blur",
        variant === "hero" && "hero-card max-w-md",
        variant === "section" && "rounded-3xl border-[#e1e7f5] bg-white",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.35em] text-[#4f5b6a]">
        Live Fleet Stats
        <span className="flex items-center gap-1 text-[10px] font-bold text-[#23c55e]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#23c55e] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#23c55e]" />
          </span>
          Live
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={cn(
              "flex items-center justify-between rounded-2xl px-4 py-3",
              index % 2 === 0 ? "bg-[#f0f0f0]/70" : "bg-[#edf7f7]/70",
            )}
          >
            <div>
              <p className="text-[13px] font-medium text-[#4b5563]">{metric.label}</p>
              <p className="text-[11px] text-[#6b7280]">{metric.description}</p>
            </div>
            <p className="text-xl font-bold text-[#050505]">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FleetStatsCard;

