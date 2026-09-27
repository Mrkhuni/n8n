import { useStore } from "../store";
import { BarChart3, TrendingUp, Calendar, Target, CheckCircle2, Star } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg p-3 border border-white/10">
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} className="text-xs font-semibold" style={{ color: entry.color }}>
            {entry.name}: ₹{entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ReportsPage() {
  const reports = useStore((s) => s.reports);

  const chartData = reports.map((r) => ({
    date: r.date.slice(5),
    revenue: r.totalRevenue,
    profit: r.profit,
  }));

  const latest = reports[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10"><TrendingUp className="w-4 h-4 text-emerald-400" /></div>
          <div><p className="text-lg font-bold text-emerald-400">₹{latest.totalRevenue.toLocaleString()}</p><p className="text-[10px] text-gray-500">Latest Revenue</p></div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10"><Target className="w-4 h-4 text-sky-400" /></div>
          <div><p className="text-lg font-bold text-white">{latest.activeSources}</p><p className="text-[10px] text-gray-500">Active Sources</p></div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-500/10"><CheckCircle2 className="w-4 h-4 text-violet-400" /></div>
          <div><p className="text-lg font-bold text-white">{latest.tasksCompleted}</p><p className="text-[10px] text-gray-500">Tasks Done Today</p></div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10"><Star className="w-4 h-4 text-amber-400" /></div>
          <div><p className="text-lg font-bold text-white">{latest.newOpportunities}</p><p className="text-[10px] text-gray-500">New Opportunities</p></div>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="glass rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Revenue Trend</h3>
            <p className="text-[11px] text-gray-500">All-time daily report data</p>
          </div>
          <span className="text-xs text-gray-400">₹0 budget · ∞ ROI</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={chartData.reverse()}>
            <defs>
              <linearGradient id="reportGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={2} fill="url(#reportGrad)" />
            <Area type="monotone" dataKey="profit" name="Profit" stroke="#38bdf8" strokeWidth={1.5} fill="transparent" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Reports */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-sky-400" />
          Daily Reports
        </h3>
        {reports.map((report) => (
          <div key={report.date} className="glass rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-white">{report.date}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                  ₹{report.totalRevenue.toLocaleString()} revenue
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400">
                  ₹{report.profit.toLocaleString()} profit
                </span>
              </div>
              <span className="text-[10px] text-gray-500">
                {report.tasksCompleted} tasks · {report.activeSources} sources · {report.newOpportunities} new opps
              </span>
            </div>
            <div className="space-y-1">
              {report.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                  <span className="text-emerald-400 mt-0.5">✦</span>
                  {h}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
