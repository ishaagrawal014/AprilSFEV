import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import content from "@/data/content.json";

type FleetStats = {
  deployed: number;
  active: number;
  greenKilometers: number;
};

export const useFleetStats = () => {
  const [stats, setStats] = useState<FleetStats>(content.home.stats);
  const [liveKilometers, setLiveKilometers] = useState(stats.greenKilometers);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getStats();
        setStats({
          deployed: data.deployed,
          active: data.active,
          greenKilometers: data.greenKilometers,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLiveKilometers(stats.greenKilometers);
  }, [stats.greenKilometers]);

  useEffect(() => {
    const increment = setInterval(() => {
      setLiveKilometers((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 2000);

    return () => clearInterval(increment);
  }, []);

  return { stats, liveKilometers };
};

