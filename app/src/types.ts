export type AgentId = "scout" | "creator" | "executor" | "growth" | "cfo";
export type AgentStatus = "idle" | "scanning" | "creating" | "executing" | "analyzing" | "error";
export type RiskLevel = "low" | "medium" | "high";
export type OpportunityStatus = "discovered" | "approved" | "rejected" | "in_progress" | "completed" | "paused";
export type TaskStatus = "pending_approval" | "approved" | "in_progress" | "completed" | "failed" | "rejected";
export type WithdrawalStatus = "pending" | "approved" | "processing" | "completed" | "rejected";
export type AppView = "overview" | "agents" | "opportunities" | "tasks" | "revenue" | "approvals" | "reports" | "settings";

export interface Agent {
  id: AgentId;
  name: string;
  description: string;
  icon: string;
  status: AgentStatus;
  lastActive: number;
  tasksCompleted: number;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  source: string;
  platform: string;
  estimatedEarning: string;
  riskLevel: RiskLevel;
  status: OpportunityStatus;
  discoveredAt: number;
  potentialMonthly: number;
  category: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  agentId: AgentId;
  relatedOpportunityId?: string;
  status: TaskStatus;
  createdAt: number;
  completedAt?: number;
  estimatedEarning?: number;
  actualEarning?: number;
  ownerApprovalRequired: boolean;
  ownerApproved: boolean;
  notes?: string;
}

export interface RevenueEntry {
  id: string;
  source: string;
  amount: number;
  currency: string;
  date: number;
  taskId?: string;
  type: "income" | "expense" | "withdrawal";
  status: "completed" | "pending" | "processing";
  notes?: string;
}

export interface IncomeSource {
  id: string;
  name: string;
  platform: string;
  status: "active" | "paused" | "scaling";
  monthlyRevenue: number;
  lastEarned: number;
  trend: "up" | "down" | "stable";
  category: string;
}

export interface DailyReport {
  date: string;
  totalRevenue: number;
  totalExpenses: number;
  profit: number;
  newOpportunities: number;
  tasksCompleted: number;
  activeSources: number;
  roi: number;
  highlights: string[];
}

export interface DashboardMetrics {
  totalRevenue: number;
  totalExpenses: number;
  profit: number;
  roi: number;
  activeSources: number;
  pendingWithdrawals: number;
  pendingApprovals: number;
  tasksToday: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
}
