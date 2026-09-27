import type { Agent, Opportunity, Task, RevenueEntry, IncomeSource, DailyReport } from "./types";

const now = Date.now();
const day = 86400000;

export const AGENTS: Agent[] = [
  { id: "scout", name: "SCOUT", description: "Discovers legitimate free online income opportunities across platforms.", icon: "🔍", status: "scanning", lastActive: now - 120000, tasksCompleted: 47 },
  { id: "creator", name: "CREATOR", description: "Creates content, digital products, offers and marketing material.", icon: "🎨", status: "creating", lastActive: now - 60000, tasksCompleted: 34 },
  { id: "executor", name: "EXECUTOR", description: "Performs approved tasks using only free tools. Never spends money.", icon: "⚡", status: "executing", lastActive: now - 30000, tasksCompleted: 62 },
  { id: "growth", name: "GROWTH", description: "Analyzes results and improves the best-performing income sources.", icon: "📈", status: "analyzing", lastActive: now - 90000, tasksCompleted: 28 },
  { id: "cfo", name: "CFO", description: "Tracks revenue, expenses, profit and withdrawal status. Never touches money.", icon: "💰", status: "idle", lastActive: now - 180000, tasksCompleted: 53 },
];

export const OPPORTUNITIES: Opportunity[] = [
  { id: "opp-1", title: "Medium Partner Program", description: "Write articles on Medium's Partner Program. Earn based on reading time from paying members.", source: "SCOUT", platform: "Medium", estimatedEarning: "₹500–5,000/mo", riskLevel: "low", status: "in_progress", discoveredAt: now - 14 * day, potentialMonthly: 3000, category: "Content Writing" },
  { id: "opp-2", title: "YouTube Shorts Monetization", description: "Create YouTube Shorts (60s videos). Monetize through ads once you hit 1,000 subs + 10M views.", source: "SCOUT", platform: "YouTube", estimatedEarning: "₹1,000–10,000/mo", riskLevel: "low", status: "approved", discoveredAt: now - 10 * day, potentialMonthly: 5000, category: "Video Content" },
  { id: "opp-3", title: "Fiverr Free Tier Services", description: "Offer free-creation services on Fiverr: writing, design prompts, data research — all done with free AI tools.", source: "SCOUT", platform: "Fiverr", estimatedEarning: "₹2,000–15,000/mo", riskLevel: "medium", status: "approved", discoveredAt: now - 8 * day, potentialMonthly: 8000, category: "Freelancing" },
  { id: "opp-4", title: "Telegram Channel Content", description: "Run a Telegram channel with free educational content. Monetize via affiliate links and sponsorships.", source: "SCOUT", platform: "Telegram", estimatedEarning: "₹500–3,000/mo", riskLevel: "low", status: "in_progress", discoveredAt: now - 7 * day, potentialMonthly: 2000, category: "Community" },
  { id: "opp-5", title: "Google Opinion Rewards Surveys", description: "Complete surveys via Google Opinion Rewards and similar apps for Play Store credits and small cash.", source: "SCOUT", platform: "Google", estimatedEarning: "₹100–500/mo", riskLevel: "low", status: "completed", discoveredAt: now - 20 * day, potentialMonthly: 300, category: "Microtasks" },
  { id: "opp-6", title: "Canva Templates Store", description: "Create and sell free-to-make Canva templates on Gumroad or Etsy. Zero cost to create.", source: "SCOUT", platform: "Gumroad", estimatedEarning: "₹1,000–8,000/mo", riskLevel: "low", status: "discovered", discoveredAt: now - 3 * day, potentialMonthly: 4000, category: "Digital Products" },
  { id: "opp-7", title: "GitHub Sponsorships + OSS", description: "Build open-source tools and enable GitHub Sponsors. Earn from community support.", source: "SCOUT", platform: "GitHub", estimatedEarning: "₹0–20,000/mo", riskLevel: "low", status: "discovered", discoveredAt: now - 2 * day, potentialMonthly: 5000, category: "Open Source" },
  { id: "opp-8", title: "Quora Partner Program", description: "Ask and answer questions on Quora. Earn from the Partner Program based on engagement.", source: "SCOUT", platform: "Quora", estimatedEarning: "₹200–2,000/mo", riskLevel: "low", status: "approved", discoveredAt: now - 5 * day, potentialMonthly: 1500, category: "Content Writing" },
];

export const TASKS: Task[] = [
  { id: "task-1", title: "Write 5 Medium articles on AI tools", description: "CREATOR drafts 5 SEO-optimized articles about free AI tools for content creators.", agentId: "creator", relatedOpportunityId: "opp-1", status: "completed", createdAt: now - 12 * day, completedAt: now - 10 * day, estimatedEarning: 1500, actualEarning: 1200, ownerApprovalRequired: false, ownerApproved: true, notes: "3 articles published, 2 pending review." },
  { id: "task-2", title: "Create 10 YouTube Shorts scripts", description: "CREATOR drafts 10 short-form video scripts on productivity hacks.", agentId: "creator", relatedOpportunityId: "opp-2", status: "completed", createdAt: now - 8 * day, completedAt: now - 6 * day, estimatedEarning: 800, ownerApprovalRequired: false, ownerApproved: true },
  { id: "task-3", title: "Set up Fiverr gig listings", description: "EXECUTOR creates 3 Fiverr gig listings for writing and research services.", agentId: "executor", relatedOpportunityId: "opp-3", status: "completed", createdAt: now - 7 * day, completedAt: now - 5 * day, estimatedEarning: 2000, ownerApprovalRequired: true, ownerApproved: true, notes: "3 gigs live. First order received!" },
  { id: "task-4", title: "Write 5 Quora answers on tech topics", description: "CREATOR writes detailed, helpful answers linking to our Medium articles.", agentId: "creator", relatedOpportunityId: "opp-8", status: "in_progress", createdAt: now - 2 * day, estimatedEarning: 400, ownerApprovalRequired: false, ownerApproved: true },
  { id: "task-5", title: "Withdraw ₹2,500 from Fiverr", description: "Fiverr balance is ₹2,500. Requesting withdrawal to bank account.", agentId: "cfo", status: "pending_approval", createdAt: now - 1 * day, estimatedEarning: 2500, ownerApprovalRequired: true, ownerApproved: false, notes: "⚠️ Requires owner approval before processing." },
  { id: "task-6", title: "Analyze top 3 performing sources", description: "GROWTH analyzes which income sources are scaling fastest and recommends focus.", agentId: "growth", status: "in_progress", createdAt: now - 1 * day, ownerApprovalRequired: false, ownerApproved: true },
  { id: "task-7", title: "Create Canva template pack", description: "CREATOR designs 20 social media template packs for Gumroad listing.", agentId: "creator", relatedOpportunityId: "opp-6", status: "pending_approval", createdAt: now - 0.5 * day, ownerApprovalRequired: true, ownerApproved: false, notes: "Design mockups ready for review." },
  { id: "task-8", title: "Post Telegram channel content (Week 3)", description: "EXECUTOR schedules and posts 7 educational posts to the Telegram channel.", agentId: "executor", relatedOpportunityId: "opp-4", status: "completed", createdAt: now - 3 * day, completedAt: now - 1 * day, estimatedEarning: 150, ownerApprovalRequired: false, ownerApproved: true },
];

export const REVENUE_ENTRIES: RevenueEntry[] = [
  { id: "rev-1", source: "Medium", amount: 1200, currency: "₹", date: now - 10 * day, taskId: "task-1", type: "income", status: "completed" },
  { id: "rev-2", source: "Fiverr", amount: 2500, currency: "₹", date: now - 5 * day, taskId: "task-3", type: "income", status: "completed" },
  { id: "rev-3", source: "Google Rewards", amount: 120, currency: "₹", date: now - 4 * day, type: "income", status: "completed" },
  { id: "rev-4", source: "Telegram Affiliate", amount: 150, currency: "₹", date: now - 2 * day, taskId: "task-8", type: "income", status: "completed" },
  { id: "rev-5", source: "Fiverr", amount: 800, currency: "₹", date: now - 1 * day, type: "income", status: "pending" },
  { id: "rev-6", source: "Medium", amount: 650, currency: "₹", date: now - 0.5 * day, type: "income", status: "pending" },
  { id: "rev-7", source: "Fiverr Withdrawal", amount: -2500, currency: "₹", date: now - 1 * day, taskId: "task-5", type: "withdrawal", status: "processing" },
];

export const INCOME_SOURCES: IncomeSource[] = [
  { id: "src-1", name: "Medium Partner Program", platform: "Medium", status: "active", monthlyRevenue: 1850, lastEarned: now - 1 * day, trend: "up", category: "Content Writing" },
  { id: "src-2", name: "Fiverr Services", platform: "Fiverr", status: "scaling", monthlyRevenue: 3300, lastEarned: now - 0.5 * day, trend: "up", category: "Freelancing" },
  { id: "src-3", name: "YouTube Shorts", platform: "YouTube", status: "active", monthlyRevenue: 200, lastEarned: now - 7 * day, trend: "up", category: "Video Content" },
  { id: "src-4", name: "Telegram Channel", platform: "Telegram", status: "active", monthlyRevenue: 450, lastEarned: now - 2 * day, trend: "stable", category: "Community" },
  { id: "src-5", name: "Google Rewards", platform: "Google", status: "paused", monthlyRevenue: 120, lastEarned: now - 4 * day, trend: "down", category: "Microtasks" },
];

export const DAILY_REPORTS: DailyReport[] = [
  { date: "2026-08-31", totalRevenue: 15320, totalExpenses: 0, profit: 15320, newOpportunities: 3, tasksCompleted: 8, activeSources: 4, roi: 9999, highlights: ["Fiverr first order completed — ₹2,500 earned", "3 Medium articles published and earning", "Telegram channel hit 150 subscribers", "No money spent — all tools are free"] },
  { date: "2026-08-30", totalRevenue: 14800, totalExpenses: 0, profit: 14800, newOpportunities: 2, tasksCompleted: 5, activeSources: 4, roi: 9999, highlights: ["YouTube Shorts channel gaining traction", "Medium articles getting consistent reads", "Growth agent identified scaling opportunity on Fiverr"] },
  { date: "2026-08-29", totalRevenue: 13650, totalExpenses: 0, profit: 13650, newOpportunities: 1, tasksCompleted: 4, activeSources: 4, roi: 9999, highlights: ["Telegram affiliate links generating first clicks", "CFO tracking all revenue streams accurately", "No expenses — ₹0 budget maintained"] },
  { date: "2026-08-28", totalRevenue: 12100, totalExpenses: 0, profit: 12100, newOpportunities: 2, tasksCompleted: 6, activeSources: 3, roi: 9999, highlights: ["Fiverr gig impressions doubled after SCOUT analysis", "Creator produced 5 high-quality Medium drafts", "Zero expenses maintained across all operations"] },
  { date: "2026-08-27", totalRevenue: 10500, totalExpenses: 0, profit: 10500, newOpportunities: 1, tasksCompleted: 3, activeSources: 3, roi: 9999, highlights: ["First Medium earnings deposited", "YouTube Shorts channel setup complete", "Growth agent recommending focus on Fiverr + Medium"] },
];
