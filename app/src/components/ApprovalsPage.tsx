import { useStore } from "../store";
import { Shield, CheckCircle2, XCircle, AlertTriangle, Lock } from "lucide-react";

export function ApprovalsPage() {
  const tasks = useStore((s) => s.tasks);
  const approveTask = useStore((s) => s.approveTask);
  const rejectTask = useStore((s) => s.rejectTask);

  const pendingApprovals = tasks.filter(
    (t) => t.status === "pending_approval" && t.ownerApprovalRequired
  );
  const recentApprovals = tasks.filter(
    (t) =>
      (t.status === "approved" || t.status === "rejected") &&
      t.ownerApprovalRequired &&
      t.ownerApproved !== undefined
  );
  const recentRejections = tasks.filter(
    (t) => t.status === "rejected" && t.ownerApprovalRequired
  );

  const pendingWithdrawals = pendingApprovals.filter((t) =>
    t.title.toLowerCase().includes("withdraw")
  );
  const pendingActions = pendingApprovals.filter(
    (t) => !t.title.toLowerCase().includes("withdraw")
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Security Notice */}
      <div className="glass rounded-xl p-5 border border-amber-500/20 bg-amber-500/5">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-amber-400 mb-1">Owner-Only Zone</h3>
            <p className="text-xs text-gray-400">
              This area requires your manual approval. AI agents cannot withdraw, transfer,
              spend, or access your money. Every financial action listed here needs your
              explicit approval before execution.
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-400">{pendingApprovals.length}</p>
          <p className="text-[10px] text-gray-500">Pending Approvals</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-rose-400">{pendingWithdrawals.length}</p>
          <p className="text-[10px] text-gray-500">Pending Withdrawals</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">{recentApprovals.length}</p>
          <p className="text-[10px] text-gray-500">Completed Actions</p>
        </div>
      </div>

      {/* Pending Withdrawals */}
      {pendingWithdrawals.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Pending Withdrawals — Requires Owner Approval
          </h3>
          <div className="space-y-3">
            {pendingWithdrawals.map((task) => (
              <div
                key={task.id}
                className="glass rounded-xl p-5 border border-amber-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <Shield className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white mb-1">{task.title}</h4>
                    <p className="text-xs text-gray-400 mb-2">{task.description}</p>
                    {task.estimatedEarning && (
                      <p className="text-xs text-amber-400 font-semibold">
                        Amount: ₹{task.estimatedEarning.toLocaleString()}
                      </p>
                    )}
                    {task.notes && (
                      <p className="text-[11px] text-gray-500 mt-1.5 italic">{task.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => approveTask(task.id)}
                      className="px-4 py-2 text-xs font-semibold bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approve Withdrawal
                    </button>
                    <button
                      onClick={() => rejectTask(task.id)}
                      className="px-4 py-2 text-xs font-semibold bg-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-500/30 transition-colors flex items-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Other Actions */}
      {pendingActions.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Pending Actions
          </h3>
          <div className="space-y-3">
            {pendingActions.map((task) => (
              <div key={task.id} className="glass rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <span className="text-lg">
                    {task.agentId === "creator"
                      ? "🎨"
                      : task.agentId === "executor"
                      ? "⚡"
                      : task.agentId === "scout"
                      ? "🔍"
                      : task.agentId === "growth"
                      ? "📈"
                      : "💰"}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white">{task.title}</h4>
                    <p className="text-[11px] text-gray-400">{task.description}</p>
                    {task.notes && (
                      <p className="text-[10px] text-gray-500 mt-1 italic">{task.notes}</p>
                    )}
                  </div>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No pending */}
      {pendingApprovals.length === 0 && (
        <div className="glass rounded-xl p-8 text-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <p className="text-sm font-semibold text-white mb-1">All Caught Up</p>
          <p className="text-xs text-gray-400">
            No pending approvals. All agent actions are within approved parameters.
          </p>
        </div>
      )}

      {/* Recent Activity */}
      {recentApprovals.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Recent Approval History</h3>
          <div className="space-y-2">
            {recentApprovals.slice(0, 5).map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg glass"
              >
                {task.ownerApproved ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-300 truncate">{task.title}</p>
                </div>
                <span
                  className={`text-[10px] font-medium ${
                    task.ownerApproved ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {task.ownerApproved ? "Approved" : "Rejected"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
