import { useStore } from "../store";
import { Settings, Shield, Zap, Bell, Database, Lock, AlertTriangle } from "lucide-react";

const RULES = [
  { icon: "💰", title: "₹0 Budget Rule", desc: "AI agents use ONLY free and open-source tools. No paid APIs, subscriptions, or hidden costs.", enforced: true },
  { icon: "🚫", title: "No Scams or Fraud", desc: "No spam, fake accounts, fraudulent methods, or illegal activities. Ever.", enforced: true },
  { icon: "🔒", title: "Owner-Only Withdrawals", desc: "AI can earn, track, and optimize — but CANNOT withdraw, transfer, spend, or access your money.", enforced: true },
  { icon: "✍️", title: "Manual Approval Required", desc: "Every withdrawal, payment, and financial action requires your explicit approval.", enforced: true },
  { icon: "🏦", title: "No Financial Credentials", desc: "System never stores or exposes financial credentials, bank details, or payment info.", enforced: true },
  { icon: "📊", title: "Profit-Only Scaling", desc: "Start with zero investment. Scale only from verified profits.", enforced: true },
  { icon: "🎯", title: "Safety-First Prioritization", desc: "Automatically prioritize the safest and highest-potential opportunities.", enforced: true },
  { icon: "📋", title: "Owner Approval for Money", desc: "Before ANY action involving money, ask for OWNER approval.", enforced: true },
];

export function SettingsPage() {
  const agents = useStore((s) => s.agents);
  const tasks = useStore((s) => s.tasks);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* System Info */}
      <div className="glass rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="w-5 h-5 text-sky-400" />
          <h3 className="text-sm font-semibold text-white">System Configuration</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-white/[0.02] text-center">
            <p className="text-lg font-bold text-white">5</p>
            <p className="text-[10px] text-gray-500">Active Agents</p>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.02] text-center">
            <p className="text-lg font-bold text-emerald-400">₹0</p>
            <p className="text-[10px] text-gray-500">Monthly Budget</p>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.02] text-center">
            <p className="text-lg font-bold text-white">100%</p>
            <p className="text-[10px] text-gray-500">Free Tools</p>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.02] text-center">
            <p className="text-lg font-bold text-white">{tasks.length}</p>
            <p className="text-[10px] text-gray-500">Total Tasks</p>
          </div>
        </div>
      </div>

      {/* Safety Rules */}
      <div className="glass rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Enforced Rules</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
            All Active
          </span>
        </div>
        <div className="space-y-3">
          {RULES.map((rule, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <span className="text-lg mt-0.5">{rule.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-xs font-semibold text-white">{rule.title}</h4>
                  {rule.enforced && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                      ENFORCED
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-400">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Config */}
      <div className="glass rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-5 h-5 text-violet-400" />
          <h3 className="text-sm font-semibold text-white">Agent Configuration</h3>
        </div>
        <div className="space-y-2">
          {agents.map((agent) => (
            <div key={agent.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02]">
              <span className="text-lg">{agent.icon}</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-white">{agent.name}</p>
                <p className="text-[10px] text-gray-500">{agent.description}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full agent-status-${agent.status}`} />
                <span className="text-[10px] text-gray-400">{agent.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass rounded-xl p-5 border border-rose-500/20">
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <h3 className="text-sm font-semibold text-rose-400">Important Notices</h3>
        </div>
        <div className="space-y-2 text-xs text-gray-400">
          <p>• This system operates with a <span className="text-emerald-400 font-semibold">₹0 budget</span>. No money is spent by any agent.</p>
          <p>• All income is tracked but <span className="text-amber-400 font-semibold">cannot be withdrawn</span> without your explicit approval.</p>
          <p>• Financial credentials are <span className="text-rose-400 font-semibold">never stored</span> in this system.</p>
          <p>• The AI agents can discover, create, execute, and optimize — but the <span className="text-emerald-400 font-semibold">owner (you)</span> has final control over all money.</p>
        </div>
      </div>
    </div>
  );
}
