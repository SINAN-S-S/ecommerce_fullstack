"use client";

import { useState } from "react";
import Side from "@/components/side-bar/Side-bar";
import NavBar from "@/components/admin-nav/nav-bar";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <NavBar onToggleSidebar={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1">
        <Side
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}