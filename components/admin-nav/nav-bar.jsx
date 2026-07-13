"use client";
import Link from "next/link";
import "./nav-bar.css";
import { Menu, Search, Moon, Bell, MessageSquare, Maximize, Grid3x3, Settings } from "lucide-react";

export default function NavBar({ onToggleSidebar }) {
  return (
    <header className="header">
      <div className="leftContainer">
        <button className="menuToggle" onClick={onToggleSidebar} aria-label="Toggle Menu">
          <Menu size={22} />
        </button>

        <Link href="/admin" className="logoLink">
          <div className="logoContainer">
            <div className="logoMark">R</div>
            <span className="logoText">Remos</span>
          </div>
        </Link>

        <div className="searchContainer">
          <input type="text" placeholder="Search here..." className="searchInput" />
          <Search size={18} className="searchIcon" />
        </div>
      </div>

      <div className="actions">
        <button className="iconBtn mobileHide" aria-label="Toggle theme">
          <Moon size={18} />
        </button>

        <Link href="/admin/notifications" className="iconBtn" aria-label="Notifications">
          <Bell size={18} />
          <span className="badge badgeWarning">1</span>
        </Link>

        <Link href="/admin/messages" className="iconBtn mobileHide" aria-label="Messages">
          <MessageSquare size={18} />
          <span className="badge badgeDark">1</span>
        </Link>

        <button className="iconBtn desktopOnly" aria-label="Fullscreen">
          <Maximize size={18} />
        </button>

        <button className="iconBtn desktopOnly" aria-label="Apps">
          <Grid3x3 size={18} />
        </button>

        <Link href="/admin/profile" className="profile">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
            alt="Kristin Watson"
            className="avatar"
          />
          <div className="profileText">
            <span className="profileName">Kristin Watson</span>
            <span className="profileRole">Admin</span>
          </div>
        </Link>

        <Link href="/admin/settings" className="iconBtn mobileHide" aria-label="Settings">
          <Settings size={18} />
        </Link>
      </div>
    </header>
  );
}