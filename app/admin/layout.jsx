"use client";

import "../globals.css";
import { Inter } from "next/font/google";
import Side from "@/components/side-bar/Side-bar";
import NavBar from "@/components/admin-nav/nav-bar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Side />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}