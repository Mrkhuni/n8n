import { useStore } from "../store";
import type { AppView } from "../types";
import {
  LayoutDashboard,
  Bot,
  Search,
  CheckSquare,
  DollarSign,
  Shield,
  BarChart3,
  Settings,
  Zap,
} from "lucide-react";

const NAV_ITEMS: { id: AppView; label: string; icon: typeof LayoutDashboard; badge?: string }[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "agents", label: "Agents", icon: Bot },
  { id: "opportunities", label: "Opportunities", icon: Search },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "approvals", label: "Approvals", icon: Shield },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const STATUS_LABELS: Record<string, string> = {
  idle: "Idle",
  scanning: "Scanning",
  creating: "Creating",
  executing: "Executing",
  analyzing: "Analyzing",
  error: "Error",
};

export function Sidebar() {
  const currentView = useStore((s) => s.currentView);
  const setView = useStore((s) => s.setView);
  const agents = useStore((s) => s.agents);
  const tasks = useStore((s) => s.tasks);

  const pendingApprovals = tasks.filter(
    (t) => t.status === "pending_approval" && t.ownerApprovalRequired
  ).length;

  return (
    <aside className="w-64 h-full glass border-r border-white/5 flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white leading-tight">AI Income</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">System v1.0</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.id === "approvals" && pendingApprovals > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-400 rounded-full">
                  {pendingApprovals}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Agent Status Panel */}
      <div className="p-3 border-t border-white/5">
        <p className="text-[10px] text-gray-500 uppercase tracking-wider px-3 mb-2">
          Agent Status
        </p>
        <div className="space-y-1.5">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => setView("agents")}
            >
              <span className="text-sm">{agent.icon}</span>
              <span className="text-xs text-gray-300 flex-1 truncate">{agent.name}</span>
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-1.5 h-1.5 rounded-full agent-status-${agent.status} ${
                    agent.status !== "idle" ? "pulse-dot" : ""
                  }`}
                />
                <span className="text-[10px] text-gray-500">
                  {STATUS_LABELS[agent.status]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Badge */}
      <div className="p-4 border-t border-white/5">
        <div className="glass rounded-lg p-3 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
            Budget
          </p>
          <p className="text-lg font-bold text-emerald-400">₹0</p>
          <p className="text-[10px] text-gray-500">100% Free Tools</p>
        </div>
      </div>
    </aside>
  );
}
