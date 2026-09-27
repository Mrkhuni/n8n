import { useStore } from "../store";
import { MetricCard } from "./MetricCard";
import { AgentCard } from "./AgentCard";
import {
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  ArrowUpRight,
  Zap,
  Shield,
  AlertTriangle,
  CheckSquare,
  Percent,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

const revenueData = [
  { day: "Mon", revenue: 800, profit: 800 },
  { day: "Tue", revenue: 1200, profit: 1200 },
  { day: "Wed", revenue: 2500, profit: 2500 },
  { day: "Thu", revenue: 1850, profit: 1850 },
  { day: "Fri", revenue: 3200, profit: 3200 },
  { day: "Sat", revenue: 2800, profit: 2800 },
  { day: "Sun", revenue: 2970, profit: 2970 },
];

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

export function OverviewPage() {
  const metrics = useStore((s) => s.getMetrics());
  const agents = useStore((s) => s.agents);
  const tasks = useStore((s) => s.tasks);
  const opportunities = useStore((s) => s.opportunities);

  const recentTasks = [...tasks].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);
  const pendingApprovals = tasks.filter(
    (t) => t.status === "pending_approval" && t.ownerApprovalRequired
  );
  const topOpportunities = opportunities
    .filter((o) => o.status === "approved" || o.status === "in_progress")
    .sort((a, b) => b.potentialMonthly - a.potentialMonthly)
    .slice(0, 3);
  const completedTasks = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Security Banner */}
      <div className="glass rounded-xl p-4 border border-emerald-500/20 flex items-center gap-3">
        <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-emerald-400 font-semibold">Owner-Only Control Active</p>
          <p className="text-xs text-gray-400">
            AI agents cannot withdraw, transfer, spend, or access your money. Every financial
            action requires your manual approval.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-[11px] font-medium text-emerald-400">
          ₹0 Budget · 100% Free
        </div>
      </div>

      {/* Key Metrics — Tasks | Revenue | Profit | ROI | Active Sources | Pending Withdrawals */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          label="Tasks"
          value={tasks.length.toString()}
          icon={<CheckSquare className="w-4 h-4" />}
          color="violet"
          subtitle={`${completedTasks} completed · ${metrics.tasksToday} today`}
        />
        <MetricCard
          label="Revenue"
          value={`₹${metrics.totalRevenue.toLocaleString()}`}
          icon={<TrendingUp className="w-4 h-4" />}
          trend={`${metrics.revenueLastMonth > 0 ? Math.round(((metrics.revenueThisMonth - metrics.revenueLastMonth) / metrics.revenueLastMonth) * 100) : 0}%`}
          trendUp={true}
          color="emerald"
          subtitle="Lifetime earnings"
        />
        <MetricCard
          label="Profit"
          value={`₹${metrics.profit.toLocaleString()}`}
          icon={<DollarSign className="w-4 h-4" />}
          color="sky"
          subtitle="₹0 expenses — all revenue = profit"
        />
        <MetricCard
          label="ROI"
          value={metrics.totalExpenses === 0 ? "∞" : `${metrics.roi}%`}
          icon={<Percent className="w-4 h-4" />}
          color="amber"
          subtitle="₹0 invested"
        />
        <MetricCard
          label="Active Sources"
          value={metrics.activeSources.toString()}
          icon={<Target className="w-4 h-4" />}
          trend="2 scaling"
          trendUp={true}
          color="violet"
        />
        <MetricCard
          label="Pending Withdrawals"
          value={metrics.pendingWithdrawals.toString()}
          icon={<AlertTriangle className="w-4 h-4" />}
          color="rose"
          subtitle={`${metrics.pendingApprovals} approvals pending`}
        />
      </div>

      {/* Revenue Chart + Agent Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Revenue Trend</h3>
              <p className="text-[11px] text-gray-500">Last 7 days · All ₹0 cost</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-emerald-400">₹15,320</p>
              <p className="text-[10px] text-gray-500">this week</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${v}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#revenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Active Sources + ROI */}
        <div className="space-y-4">
          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">ROI</h3>
            <div className="text-center py-4">
              <p className="text-4xl font-bold gradient-text-gold">∞</p>
              <p className="text-xs text-gray-400 mt-1">
                Infinite ROI — ₹0 invested, ₹{metrics.totalRevenue.toLocaleString()} earned
              </p>
            </div>
            <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500">
              <Zap className="w-3 h-3 text-emerald-400" />
              100% free tools only
            </div>
          </div>

          <div className="glass rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Top Opportunities</h3>
            <div className="space-y-2.5">
              {topOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="flex items-center gap-2 text-xs p-2 rounded-lg bg-white/[0.02]"
                >
                  <div className="flex-1 truncate text-gray-300">{opp.title}</div>
                  <div className="text-emerald-400 font-medium shrink-0">
                    ₹{opp.potentialMonthly.toLocaleString()}/mo
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Agent Grid */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          Live Agent Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
          <button className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
            View All <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-2">
          {recentTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.02] transition-colors text-xs"
            >
              <span className="text-lg">
                {task.agentId === "scout"
                  ? "🔍"
                  : task.agentId === "creator"
                  ? "🎨"
                  : task.agentId === "executor"
                  ? "⚡"
                  : task.agentId === "growth"
                  ? "📈"
                  : "💰"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-300 truncate">{task.title}</p>
                <p className="text-[10px] text-gray-500">
                  {task.agentId.toUpperCase()} · {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  task.status === "completed"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : task.status === "in_progress"
                    ? "bg-sky-500/10 text-sky-400"
                    : task.status === "pending_approval"
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-gray-500/10 text-gray-400"
                }`}
              >
                {task.status.replace("_", " ")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
