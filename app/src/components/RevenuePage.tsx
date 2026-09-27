import { useStore } from "../store";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Target,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const sourceData = [
  { name: "Fiverr", value: 3300, color: "#10b981" },
  { name: "Medium", value: 1850, color: "#38bdf8" },
  { name: "YouTube", value: 200, color: "#a78bfa" },
  { name: "Telegram", value: 450, color: "#f59e0b" },
  { name: "Google", value: 120, color: "#fb7185" },
];

const TREND_ICONS = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg p-3 border border-white/10">
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} className="text-xs font-semibold" style={{ color: entry.fill }}>
            ₹{entry.value.toLocaleString()}/mo
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function RevenuePage() {
  const incomeSources = useStore((s) => s.incomeSources);
  const revenueEntries = useStore((s) => s.revenueEntries);

  const totalMonthly = incomeSources.reduce((s, src) => s + src.monthlyRevenue, 0);
  const allTimeRevenue = revenueEntries
    .filter((r) => r.type === "income")
    .reduce((s, r) => s + r.amount, 0);
  const pendingRevenue = revenueEntries
    .filter((r) => r.type === "income" && r.status === "pending")
    .reduce((s, r) => s + r.amount, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-emerald-400">₹{totalMonthly.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500">Monthly Revenue</p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10">
            <Wallet className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">₹{allTimeRevenue.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500">All-Time Revenue</p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <Target className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-amber-400">₹{pendingRevenue.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500">Pending</p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-emerald-400">₹0</p>
            <p className="text-[10px] text-gray-500">Expenses</p>
          </div>
        </div>
      </div>

      {/* Revenue by Source Chart + Source List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Revenue by Source</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={sourceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${v}`}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {sourceData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Income Sources */}
        <div className="glass rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Active Income Sources</h3>
          <div className="space-y-3">
            {incomeSources.map((src) => {
              const TrendIcon = TREND_ICONS[src.trend];
              return (
                <div
                  key={src.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-semibold text-white">{src.name}</h4>
                      <span
                        className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${
                          src.status === "active"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : src.status === "scaling"
                            ? "bg-sky-500/10 text-sky-400"
                            : "bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        {src.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      {src.platform} · {src.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-emerald-400">
                      ₹{src.monthlyRevenue.toLocaleString()}/mo
                    </p>
                    <div className="flex items-center gap-1 justify-end">
                      <TrendIcon
                        className={`w-2.5 h-2.5 ${
                          src.trend === "up"
                            ? "text-emerald-400"
                            : src.trend === "down"
                            ? "text-rose-400"
                            : "text-gray-400"
                        }`}
                      />
                      <span className="text-[9px] text-gray-500">{src.trend}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="glass rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Transaction History</h3>
        <div className="space-y-2">
          {revenueEntries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.02] transition-colors"
            >
              <div
                className={`p-2 rounded-lg ${
                  entry.type === "income"
                    ? "bg-emerald-500/10"
                    : entry.type === "expense"
                    ? "bg-rose-500/10"
                    : "bg-amber-500/10"
                }`}
              >
                {entry.type === "income" ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 text-rose-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-white">{entry.source}</p>
                <p className="text-[10px] text-gray-500">
                  {new Date(entry.date).toLocaleDateString()} · {entry.type}
                  {entry.taskId && " · Task linked"}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`text-xs font-bold ${
                    entry.amount >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {entry.amount >= 0 ? "+" : ""}₹{Math.abs(entry.amount).toLocaleString()}
                </p>
                <p
                  className={`text-[9px] ${
                    entry.status === "completed"
                      ? "text-emerald-400"
                      : entry.status === "pending"
                      ? "text-amber-400"
                      : "text-sky-400"
                  }`}
                >
                  {entry.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
