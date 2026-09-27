import type { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  color?: string;
  subtitle?: string;
}

export function MetricCard({
  label,
  value,
  icon,
  trend,
  trendUp,
  color = "emerald",
  subtitle,
}: MetricCardProps) {
  const colorClasses: Record<string, string> = {
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
    sky: "from-sky-500/20 to-sky-500/5 border-sky-500/20",
    amber: "from-amber-500/20 to-amber-500/5 border-amber-500/20",
    rose: "from-rose-500/20 to-rose-500/5 border-rose-500/20",
    violet: "from-violet-500/20 to-violet-500/5 border-violet-500/20",
  };

  const iconColors: Record<string, string> = {
    emerald: "text-emerald-400",
    sky: "text-sky-400",
    amber: "text-amber-400",
    rose: "text-rose-400",
    violet: "text-violet-400",
  };

  return (
    <div
      className={`glass glass-hover rounded-xl p-5 bg-gradient-to-br ${colorClasses[color]} transition-all duration-200 cursor-default`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg bg-white/5 ${iconColors[color]}`}>{icon}</div>
        {trend && (
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
              trendUp
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-rose-500/10 text-rose-400"
            }`}
          >
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
      {subtitle && <p className="text-[10px] text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}
