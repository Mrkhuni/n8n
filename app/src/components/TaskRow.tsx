import type { Task } from "../types";
import { useStore } from "../store";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  AlertTriangle,
  Shield,
  User,
} from "lucide-react";

const STATUS_CONFIG: Record<
  string,
  { icon: typeof CheckCircle2; color: string; bg: string; label: string }
> = {
  pending_approval: {
    icon: Shield,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    label: "Pending Approval",
  },
  approved: {
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    label: "Approved",
  },
  in_progress: {
    icon: Loader2,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    label: "In Progress",
  },
  completed: {
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    label: "Completed",
  },
  failed: {
    icon: XCircle,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    label: "Failed",
  },
  rejected: {
    icon: XCircle,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    label: "Rejected",
  },
};

const AGENT_ICONS: Record<string, string> = {
  scout: "🔍",
  creator: "🎨",
  executor: "⚡",
  growth: "📈",
  cfo: "💰",
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

export function TaskRow({ task }: { task: Task }) {
  const approveTask = useStore((s) => s.approveTask);
  const rejectTask = useStore((s) => s.rejectTask);
  const config = STATUS_CONFIG[task.status] || STATUS_CONFIG.pending_approval;
  const StatusIcon = config.icon;

  return (
    <div className="glass rounded-xl p-4 flex items-center gap-4 transition-all hover:bg-white/[0.03]">
      {/* Agent */}
      <div className="text-xl">{AGENT_ICONS[task.agentId]}</div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-semibold text-white truncate">{task.title}</h4>
          {task.ownerApprovalRequired && !task.ownerApproved && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded-full shrink-0">
              <AlertTriangle className="w-2.5 h-2.5" />
              Owner
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 truncate">{task.description}</p>
        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-500">
          <span>{timeAgo(task.createdAt)}</span>
          {task.estimatedEarning !== undefined && (
            <span>
              Est: <span className="text-emerald-400">₹{task.estimatedEarning.toLocaleString()}</span>
            </span>
          )}
          {task.actualEarning !== undefined && (
            <span>
              Earned: <span className="text-emerald-400 font-semibold">₹{task.actualEarning.toLocaleString()}</span>
            </span>
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0 ${config.bg} ${config.color}`}
      >
        <StatusIcon className="w-3 h-3" />
        {config.label}
      </div>

      {/* Actions for pending approval tasks */}
      {task.status === "pending_approval" && task.ownerApprovalRequired && (
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => approveTask(task.id)}
            className="px-3 py-1.5 text-[11px] font-medium bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
          >
            Approve
          </button>
          <button
            onClick={() => rejectTask(task.id)}
            className="px-3 py-1.5 text-[11px] font-medium bg-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-500/30 transition-colors"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
