import { useStore } from "../store";
import { useState } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Shield,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const RISK_CONFIG = {
  low: { label: "Low Risk", color: "text-emerald-400 bg-emerald-500/10", icon: Shield },
  medium: { label: "Medium Risk", color: "text-amber-400 bg-amber-500/10", icon: AlertTriangle },
  high: { label: "High Risk", color: "text-rose-400 bg-rose-500/10", icon: AlertTriangle },
};

const STATUS_COLORS: Record<string, string> = {
  discovered: "bg-sky-500/10 text-sky-400",
  approved: "bg-emerald-500/10 text-emerald-400",
  rejected: "bg-rose-500/10 text-rose-400",
  in_progress: "bg-amber-500/10 text-amber-400",
  completed: "bg-emerald-500/10 text-emerald-400",
  paused: "bg-gray-500/10 text-gray-400",
};

export function OpportunitiesPage() {
  const opportunities = useStore((s) => s.opportunities);
  const updateOpportunityStatus = useStore((s) => s.updateOpportunityStatus);
  const [filter, setFilter] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");

  const filtered = opportunities.filter((opp) => {
    if (filter !== "all" && opp.status !== filter) return false;
    if (riskFilter !== "all" && opp.riskLevel !== riskFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter:</span>
        </div>
        {["all", "discovered", "approved", "in_progress", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
              filter === f
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
                : "bg-white/5 text-gray-400 hover:text-gray-200"
            }`}
          >
            {f === "all" ? "All" : f.replace("_", " ")}
          </button>
        ))}
        <div className="w-px h-4 bg-white/10" />
        {["all", "low", "medium", "high"].map((r) => (
          <button
            key={r}
            onClick={() => setRiskFilter(r)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
              riskFilter === r
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/20"
                : "bg-white/5 text-gray-400 hover:text-gray-200"
            }`}
          >
            {r === "all" ? "All Risk" : r.charAt(0).toUpperCase() + r.slice(1) + " Risk"}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="glass rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-white">{opportunities.length}</p>
          <p className="text-[10px] text-gray-500">Total Found</p>
        </div>
        <div className="glass rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-emerald-400">
            {opportunities.filter((o) => o.status === "approved" || o.status === "in_progress").length}
          </p>
          <p className="text-[10px] text-gray-500">Active</p>
        </div>
        <div className="glass rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-amber-400">
            ₹{opportunities.reduce((s, o) => s + o.potentialMonthly, 0).toLocaleString()}
          </p>
          <p className="text-[10px] text-gray-500">Potential/mo</p>
        </div>
        <div className="glass rounded-lg p-3 text-center">
          <p className="text-xl font-bold text-sky-400">
            {opportunities.filter((o) => o.riskLevel === "low").length}
          </p>
          <p className="text-[10px] text-gray-500">Low Risk</p>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-3">
        {filtered.map((opp) => {
          const risk = RISK_CONFIG[opp.riskLevel];
          const RiskIcon = risk.icon;
          return (
            <div key={opp.id} className="glass rounded-xl p-5 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-white">{opp.title}</h4>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        STATUS_COLORS[opp.status]
                      }`}
                    >
                      {opp.status.replace("_", " ")}
                    </span>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${risk.color}`}
                    >
                      <RiskIcon className="w-2.5 h-2.5" />
                      {risk.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{opp.description}</p>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="text-sky-400">Platform:</span> {opp.platform}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-emerald-400">Potential:</span> {opp.estimatedEarning}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-amber-400">Category:</span> {opp.category}
                    </span>
                    <span>Discovered {new Date(opp.discoveredAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {opp.status === "discovered" && (
                    <>
                      <button
                        onClick={() => updateOpportunityStatus(opp.id, "approved")}
                        className="px-3 py-1.5 text-[11px] font-medium bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateOpportunityStatus(opp.id, "rejected")}
                        className="px-3 py-1.5 text-[11px] font-medium bg-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-500/30 transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {(opp.status === "approved" || opp.status === "in_progress") && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                      <TrendingUp className="w-3 h-3" />
                      Active
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="glass rounded-xl p-8 text-center">
            <Search className="w-8 h-8 text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No opportunities match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
