import type { Agent } from "../types";

const STATUS_LABELS: Record<string, string> = {
  idle: "Idle",
  scanning: "Scanning",
  creating: "Creating",
  executing: "Executing",
  analyzing: "Analyzing",
  error: "Error",
};

const STATUS_COLORS: Record<string, string> = {
  idle: "bg-gray-500/20 text-gray-400",
  scanning: "bg-sky-500/20 text-sky-400",
  creating: "bg-violet-500/20 text-violet-400",
  executing: "bg-emerald-500/20 text-emerald-400",
  analyzing: "bg-amber-500/20 text-amber-400",
  error: "bg-rose-500/20 text-rose-400",
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

export function AgentCard({ agent }: { agent: Agent }) {
  const isActive = agent.status !== "idle";

  return (
    <div
      className={`glass glass-hover rounded-xl p-5 transition-all duration-300 ${
        isActive ? "border-emerald-500/20 animate-glow" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{agent.icon}</div>
          <div>
            <h3 className="text-sm font-bold text-white">{agent.name}</h3>
            <p className="text-[10px] text-gray-500">{agent.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className={`w-2 h-2 rounded-full agent-status-${agent.status} ${
              isActive ? "pulse-dot" : ""
            }`}
          />
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              STATUS_COLORS[agent.status]
            }`}
          >
            {STATUS_LABELS[agent.status]}
          </span>
        </div>
      </div>

      {/* Activity Bar */}
      <div className="h-1 rounded-full bg-white/5 mb-4 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isActive
              ? "bg-gradient-to-r from-emerald-500 to-sky-500 animate-pulse-slow"
              : "bg-gray-600/30"
          }`}
          style={{ width: isActive ? "100%" : "20%" }}
        />
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-gray-400">
          <span>Tasks completed:</span>
          <span className="font-semibold text-white">{agent.tasksCompleted}</span>
        </div>
        <div className="text-gray-500">Last: {timeAgo(agent.lastActive)}</div>
      </div>
    </div>
  );
}
