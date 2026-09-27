import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Agent, Opportunity, Task, RevenueEntry, IncomeSource, DailyReport, AppView, DashboardMetrics, AgentId, OpportunityStatus, TaskStatus } from "./types";
import { AGENTS, OPPORTUNITIES, TASKS, REVENUE_ENTRIES, INCOME_SOURCES, DAILY_REPORTS } from "./mockData";

interface AppState {
  currentView: AppView;
  setView: (view: AppView) => void;
  agents: Agent[];
  updateAgentStatus: (id: AgentId, status: Agent["status"]) => void;
  opportunities: Opportunity[];
  updateOpportunityStatus: (id: string, status: OpportunityStatus) => void;
  tasks: Task[];
  approveTask: (id: string) => void;
  rejectTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  revenueEntries: RevenueEntry[];
  incomeSources: IncomeSource[];
  reports: DailyReport[];
  getMetrics: () => DashboardMetrics;
  simulateAgentActivity: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentView: "overview",
      setView: (view) => set({ currentView: view }),
      agents: AGENTS,
      updateAgentStatus: (id, status) =>
        set((state) => ({
          agents: state.agents.map((a) => (a.id === id ? { ...a, status, lastActive: Date.now() } : a)),
        })),
      opportunities: OPPORTUNITIES,
      updateOpportunityStatus: (id, status) =>
        set((state) => ({
          opportunities: state.opportunities.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
      tasks: TASKS,
      approveTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ownerApproved: true, status: "approved" as TaskStatus } : t)),
        })),
      rejectTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ownerApproved: false, status: "rejected" as TaskStatus } : t)),
        })),
      updateTaskStatus: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, status, completedAt: status === "completed" ? Date.now() : t.completedAt } : t
          ),
        })),
      revenueEntries: REVENUE_ENTRIES,
      incomeSources: INCOME_SOURCES,
      reports: DAILY_REPORTS,
      getMetrics: () => {
        const state = get();
        const completedRevenue = state.revenueEntries.filter((r) => r.type === "income" && r.status === "completed").reduce((sum, r) => sum + r.amount, 0);
        const pendingRevenue = state.revenueEntries.filter((r) => r.type === "income" && r.status === "pending").reduce((sum, r) => sum + r.amount, 0);
        const totalRevenue = completedRevenue + pendingRevenue;
        const totalExpenses = 0;
        const profit = totalRevenue - totalExpenses;
        const activeSources = state.incomeSources.filter((s) => s.status === "active" || s.status === "scaling").length;
        const pendingApprovals = state.tasks.filter((t) => t.status === "pending_approval" && t.ownerApprovalRequired).length;
        const pendingWithdrawals = state.tasks.filter((t) => t.status === "pending_approval" && t.title.toLowerCase().includes("withdraw")).length;
        const tasksToday = state.tasks.filter((t) => t.createdAt > Date.now() - 86400000 || (t.completedAt && t.completedAt > Date.now() - 86400000)).length;
        return { totalRevenue, totalExpenses, profit, roi: totalExpenses === 0 ? 9999 : Math.round(((profit - totalExpenses) / totalExpenses) * 100), activeSources, pendingWithdrawals, pendingApprovals, tasksToday, revenueThisMonth: completedRevenue, revenueLastMonth: 8500 };
      },
      simulateAgentActivity: () => {
        const statuses: Agent["status"][] = ["idle", "scanning", "creating", "executing", "analyzing"];
        set((state) => ({
          agents: state.agents.map((a) => ({
            ...a,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            lastActive: Date.now() - Math.floor(Math.random() * 300000),
          })),
        }));
      },
    }),
    { name: "ai-income-system-store", partialize: (state) => ({ currentView: state.currentView }) }
  )
);
