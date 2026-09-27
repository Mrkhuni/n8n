import { useStore } from "../store";
import { TaskRow } from "./TaskRow";
import { useState } from "react";
import { Filter, CheckSquare, Clock, AlertTriangle } from "lucide-react";

export function TasksPage() {
  const tasks = useStore((s) => s.tasks);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [agentFilter, setAgentFilter] = useState<string>("all");

  const filtered = tasks.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (agentFilter !== "all" && t.agentId !== agentFilter) return false;
    return true;
  });

  const completed = tasks.filter((t) => t.status === "completed").length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const pending = tasks.filter((t) => t.status === "pending_approval").length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <CheckSquare className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">{completed}</p>
            <p className="text-[10px] text-gray-500">Completed</p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10">
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">{inProgress}</p>
            <p className="text-[10px] text-gray-500">In Progress</p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">{pending}</p>
            <p className="text-[10px] text-gray-500">Pending Approval</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Filter className="w-3.5 h-3.5" />
          Status:
        </div>
        {["all", "pending_approval", "in_progress", "completed", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
              statusFilter === f
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
                : "bg-white/5 text-gray-400 hover:text-gray-200"
            }`}
          >
            {f === "all" ? "All" : f.replace("_", " ")}
          </button>
        ))}
        <div className="w-px h-4 bg-white/10" />
        <div className="flex items-center gap-2 text-xs text-gray-400">Agent:</div>
        {["all", "scout", "creator", "executor", "growth", "cfo"].map((a) => (
          <button
            key={a}
            onClick={() => setAgentFilter(a)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
              agentFilter === a
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/20"
                : "bg-white/5 text-gray-400 hover:text-gray-200"
            }`}
          >
            {a === "all" ? "All" : a.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filtered.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
        {filtered.length === 0 && (
          <div className="glass rounded-xl p-8 text-center">
            <CheckSquare className="w-8 h-8 text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No tasks match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
