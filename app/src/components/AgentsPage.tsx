import { useStore } from "../store";
import { AgentCard } from "./AgentCard";
import { Bot, Activity, Clock, CheckCircle2, Zap } from "lucide-react";

const AGENT_DESCRIPTIONS = {
  scout: {
    role: "Opportunity Scout",
    capabilities: [
      "Searches 50+ free platforms for income opportunities",
      "Evaluates legitimacy and safety of each opportunity",
      "Scores opportunities by risk level and earning potential",
      "Filters out scams, spam, and illegal methods",
      "Recommends top 3 safest opportunities daily",
    ],
    rules: [
      "Never recommends paid tools or subscriptions",
      "Rejects any opportunity requiring upfront payment",
      "Flags any platform with history of fraud",
    ],
  },
  creator: {
    role: "Content Creator",
    capabilities: [
      "Writes articles, blog posts, and social media content",
      "Creates Canva templates and digital products",
      "Drafts YouTube scripts and video descriptions",
      "Generates marketing copy and product descriptions",
      "Produces email templates and outreach messages",
    ],
    rules: [
      "Uses only free creation tools (Canva, GIMP, etc.)",
      "Never uses paid stock photos or assets",
      "All content is original — no plagiarism",
    ],
  },
  executor: {
    role: "Task Executor",
    capabilities: [
      "Sets up accounts on free platforms",
      "Posts content across social media",
      "Submits gig listings and proposals",
      "Manages Telegram channel posts",
      "Completes micro-tasks and surveys",
    ],
    rules: [
      "Only executes owner-approved tasks",
      "Never shares personal financial information",
      "Never creates fake accounts or impersonates others",
    ],
  },
  growth: {
    role: "Growth Analyst",
    capabilities: [
      "Tracks performance metrics across all sources",
      "Identifies scaling opportunities",
      "Recommends resource allocation changes",
      "A/B tests content strategies",
      "Generates weekly growth reports",
    ],
    rules: [
      "Only recommends strategies within budget (₹0)",
      "Prioritizes verified, proven income sources",
      "Never recommends risky or unverified methods",
    ],
  },
  cfo: {
    role: "Chief Financial Officer",
    capabilities: [
      "Tracks all revenue from all income sources",
      "Records expenses (should always be ₹0)",
      "Calculates profit, ROI, and growth rate",
      "Manages withdrawal requests",
      "Generates daily and weekly financial reports",
    ],
    rules: [
      "CANNOT withdraw, transfer, or spend money",
      "CANNOT access financial credentials",
      "ALL withdrawals require OWNER approval",
      "Never stores or exposes financial data",
    ],
  },
};

export function AgentsPage() {
  const agents = useStore((s) => s.agents);
  const tasks = useStore((s) => s.tasks);

  const totalTasksCompleted = agents.reduce((sum, a) => sum + a.tasksCompleted, 0);
  const activeAgents = agents.filter((a) => a.status !== "idle").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <Bot className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">{agents.length}</p>
            <p className="text-[10px] text-gray-500">Total Agents</p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10">
            <Activity className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">{activeAgents}</p>
            <p className="text-[10px] text-gray-500">Active Now</p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-500/10">
            <CheckCircle2 className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">{totalTasksCompleted}</p>
            <p className="text-[10px] text-gray-500">Tasks Completed</p>
          </div>
        </div>
        <div className="glass rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-emerald-400">₹0</p>
            <p className="text-[10px] text-gray-500">Total Spent</p>
          </div>
        </div>
      </div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      {/* Agent Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-sky-400" />
          Agent Capabilities & Rules
        </h3>
        {agents.map((agent) => {
          const details = AGENT_DESCRIPTIONS[agent.id];
          return (
            <div key={agent.id} className="glass rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{agent.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-white">{agent.name}</h4>
                  <p className="text-[11px] text-gray-400">{details.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                    Capabilities
                  </p>
                  <ul className="space-y-1.5">
                    {details.capabilities.map((cap, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                    Safety Rules
                  </p>
                  <ul className="space-y-1.5">
                    {details.rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="text-amber-400 mt-0.5">⚠</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
