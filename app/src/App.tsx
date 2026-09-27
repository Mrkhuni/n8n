import { useStore } from "./store";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { OverviewPage } from "./components/OverviewPage";
import { AgentsPage } from "./components/AgentsPage";
import { OpportunitiesPage } from "./components/OpportunitiesPage";
import { TasksPage } from "./components/TasksPage";
import { RevenuePage } from "./components/RevenuePage";
import { ApprovalsPage } from "./components/ApprovalsPage";
import { ReportsPage } from "./components/ReportsPage";
import { SettingsPage } from "./components/SettingsPage";
import { useEffect } from "react";

function App() {
  const currentView = useStore((s) => s.currentView);
  const simulateAgentActivity = useStore((s) => s.simulateAgentActivity);

  // Simulate agent activity every 15 seconds
  useEffect(() => {
    const interval = setInterval(simulateAgentActivity, 15000);
    return () => clearInterval(interval);
  }, [simulateAgentActivity]);

  const renderPage = () => {
    switch (currentView) {
      case "overview":
        return <OverviewPage />;
      case "agents":
        return <AgentsPage />;
      case "opportunities":
        return <OpportunitiesPage />;
      case "tasks":
        return <TasksPage />;
      case "revenue":
        return <RevenuePage />;
      case "approvals":
        return <ApprovalsPage />;
      case "reports":
        return <ReportsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-dark-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 fade-in">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
