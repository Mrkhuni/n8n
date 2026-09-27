import { useStore } from "../store";
import {
  Shield,
  Bell,
  Clock,
  TrendingUp,
} from "lucide-react";

const VIEW_TITLES: Record<string, string> = {
  overview: "Dashboard Overview",
  agents: "Autonomous Agents",
  opportunities: "Income Opportunities",
  tasks: "Task Management",
  revenue: "Revenue & Finance",
  approvals: "Owner Approvals",
  reports: "Daily Reports",
  settings: "System Settings",
};

export function Header() {
  const currentView = useStore((s) => s.currentView);
  const getMetrics = useStore((s) => s.getMetrics);
  const tasks = useStore((s) => s.tasks);
  const metrics = getMetrics();

  const pendingApprovals = tasks.filter(
    (t) => t.status === "pending_approval" && t.ownerApprovalRequired
  ).length;

  return (
    <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-white">
          {VIEW_TITLES[currentView]}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick Stats */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-gray-400">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">
              ₹{metrics.totalRevenue.toLocaleString()}
            </span>
            <span>earned</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-1.5 text-gray-400">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>{metrics.activeSources} sources</span>
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
            <Bell className="w-4 h-4" />
          </button>
          {pendingApprovals > 0 && (
            <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-[9px] font-bold text-white">{pendingApprovals}</span>
            </div>
          )}
        </div>

        {/* Owner Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-medium text-emerald-400">OWNER</span>
        </div>
      </div>
    </header>
  );
}
