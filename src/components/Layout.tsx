import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MobileSidebar, Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

const titles: Record<string, string> = {
  "/": "Overview",
  "/conversations": "Conversations",
  "/analytics": "Analytics",
  "/agents": "AI Agents",
  "/settings": "Settings",
};

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const title = titles[location.pathname] ?? "Aria Support";

  return (
    <div className="flex h-screen overflow-hidden bg-page">
      <Sidebar />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
