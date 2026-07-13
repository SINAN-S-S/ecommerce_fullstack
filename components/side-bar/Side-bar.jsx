"use client";

import { useState } from "react";
import Link from "next/link";
import "./Side-bar.css";

import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  CreditCard,
  TicketPercent,
  Truck,
  Megaphone,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  X,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    children: [
      { name: "Overview", path: "/admin" },
      { name: "Analytics", path: "/admin/analytics" },
      { name: "Reports", path: "/admin/reports" },
    ],
  },
  {
    title: "Products",
    icon: ShoppingBag,
    children: [
      { name: "All Products", path: "/admin/product" },
      { name: "Add Product", path: "/admin/product/add-product" },
      { name: "Categories", path: "/admin/product/categories" },
      { name: "Brands", path: "/admin/product/brands" },
      { name: "Inventory", path: "/admin/product/inventory" },
      { name: "Reviews", path: "/admin/product/reviews" },
    ],
  },
  {
    title: "Orders",
    icon: Package,
    children: [
      { name: "All Orders", path: "/admin/orders" },
      
    ],
  },
  {
    title: "Customers",
    icon: Users,
    children: [
      { name: "All Customers", path: "/admin/user" },
      { name: "Customer Details", path: "/admin/customers/details" },
      { name: "Customer Reviews", path: "/admin/customers/reviews" },
    ],
  },
  {
    title: "Payments",
    icon: CreditCard,
    children: [
      { name: "Payment History", path: "/admin/payments" },
      { name: "Pending Payments", path: "/admin/payments/pending" },
      { name: "Refund Requests", path: "/admin/payments/refund-requests" },
    ],
  },
  {
    title: "Coupons",
    icon: TicketPercent,
    children: [
      { name: "All Coupons", path: "/admin/coupons/all" },
      { name: "Create Coupon", path: "/admin/coupons/create" },
    ],
  },
  {
    title: "Shipping",
    icon: Truck,
    children: [
      { name: "Shipping Methods", path: "/admin/shipping" },
      { name: "Delivery Charges", path: "/admin/shipping/charges" },
      { name: "Tracking", path: "/admin/shipping/tracking" },
    ],
  },
  {
    title: "Marketing",
    icon: Megaphone,
    children: [
      { name: "Banners", path: "/admin/marketing/banners" },
      { name: "Offers", path: "/admin/marketing/offers" },
      { name: "Notifications", path: "/admin/marketing/notifications" },
    ],
  },
  {
    title: "Reports",
    icon: BarChart3,
    children: [
      { name: "Sales Report", path: "/admin/reports/sales" },
      { name: "Product Report", path: "/admin/reports/products" },
      { name: "Customer Report", path: "/admin/reports/customers" },
      { name: "Revenue Report", path: "/admin/reports/revenue" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { name: "Store Information", path: "/admin/settings/store-info" },
      { name: "Payment Settings", path: "/admin/settings/payment" },
      { name: "Shipping Settings", path: "/admin/settings/shipping" },
      { name: "Tax Settings", path: "/admin/settings/tax" },
      { name: "Account Settings", path: "/admin/settings/account" },
    ],
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const [openMenu, setOpenMenu] = useState("Dashboard");

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? "sidebarOpen" : ""}`}>
        <div className="sidebarHeader">
          <div className="logoContainer">
            <div className="logoMark">R</div>
            <span className="logoText">Remos</span>
          </div>

          <button
            className="closeBtn"
            onClick={onClose}
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebarBody">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isDropdownOpen = openMenu === item.title;

            return (
              <div
                key={item.title}
                className={`menuItem ${
                  isDropdownOpen ? "activeItem" : ""
                }`}
              >
                <button
                  className={`menuBtn ${
                    isDropdownOpen ? "activeBtn" : ""
                  }`}
                  onClick={() =>
                    setOpenMenu(isDropdownOpen ? "" : item.title)
                  }
                >
                  <div className="menuLeft">
                    <Icon size={18} className="menuIcon" />
                    <span className="menuText">{item.title}</span>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`arrow ${
                      isDropdownOpen ? "rotate" : ""
                    }`}
                  />
                </button>

                <div
                  className={`dropdown ${
                    isDropdownOpen ? "open" : ""
                  }`}
                >
                  <div className="dropdownInner">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.path}
                        className="dropdownBtn"
                        onClick={onClose}
                      >
                        <span className="diamond">◇</span>
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="sidebarFooter">
          <Link
            href="/admin/logout"
            className="logoutBtn"
            onClick={onClose}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
}