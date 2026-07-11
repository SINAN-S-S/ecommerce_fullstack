 "use client";
import React, { useMemo, useState } from "react";
import "./Orders.css";
 
 
const NAV_ITEMS = [
  { key: "all", label: "All Orders" },
  { key: "pending", label: "Pending Orders" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
  { key: "returns", label: "Returns & Refunds" },
];
 

 
const STATUS_LABELS = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returns: "Returns",
};
 

 
const ORDERS = [
  {
    id: "ORD-2381",
    customer: "Arjun Menon",
    date: "2026-01-01",
    items: 2,
    total: 1499,
    payment: "paid",
    status: "pending",
  },
  {
    id: "ORD-2382",
    customer: "Rahul Prasad",
    date: "2026-01-03",
    items: 1,
    total: 799,
    payment: "unpaid",
    status: "processing",
  },
  {
    id: "ORD-2383",
    customer: "Meera Suresh",
    date: "2026-01-04",
    items: 4,
    total: 2899,
    payment: "paid",
    status: "shipped",
  },
  {
    id: "ORD-2384",
    customer: "Lakshmi Menon",
    date: "2026-01-05",
    items: 3,
    total: 4599,
    payment: "paid",
    status: "delivered",
  },
  {
    id: "ORD-2385",
    customer: "Fathima Beevi",
    date: "2026-01-06",
    items: 2,
    total: 999,
    payment: "unpaid",
    status: "cancelled",
  },
  {
    id: "ORD-2386",
    customer: "Anjali Varma",
    date: "2026-01-07",
    items: 5,
    total: 5299,
    payment: "paid",
    status: "processing",
  },
  {
    id: "ORD-2387",
    customer: "Nikhil Raj",
    date: "2026-01-08",
    items: 1,
    total: 699,
    payment: "paid",
    status: "pending",
  },
  {
    id: "ORD-2388",
    customer: "Sarath Kumar",
    date: "2026-01-09",
    items: 3,
    total: 2499,
    payment: "paid",
    status: "shipped",
  },
  {
    id: "ORD-2389",
    customer: "Devika Nair",
    date: "2026-01-10",
    items: 2,
    total: 1899,
    payment: "unpaid",
    status: "pending",
  },
  {
    id: "ORD-2390",
    customer: "Akhil Das",
    date: "2026-01-11",
    items: 6,
    total: 6499,
    payment: "paid",
    status: "delivered",
  },
];
 

 
function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}
 

 
function StatusBadge({ status }) {
  return (
    <span className={`badge badge--${status}`}>
      <span className="badge__dot" />
      {STATUS_LABELS[status]}
    </span>
  );
}
 

 
export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [payment, setPayment] = useState("all");
  const [sort, setSort] = useState("date_desc");
 
  const filteredOrders = useMemo(() => {
    let result = ORDERS.filter((order) => {
      const matchesStatus = status === "all" || order.status === status;
      const matchesPayment = payment === "all" || order.payment === payment;
 
      const keyword = search.trim().toLowerCase();
      const matchesSearch =
        keyword === "" ||
        order.id.toLowerCase().includes(keyword) ||
        order.customer.toLowerCase().includes(keyword);
 
      return matchesStatus && matchesPayment && matchesSearch;
    });
 
    result = [...result].sort((a, b) => {
      switch (sort) {
        case "date_asc":
          return a.date > b.date ? 1 : -1;
        case "total_desc":
          return b.total - a.total;
        case "total_asc":
          return a.total - b.total;
        case "date_desc":
        default:
          return a.date < b.date ? 1 : -1;
      }
    });
 
    return result;
  }, [search, status, payment, sort]);
 
  const pageTitle =
    NAV_ITEMS.find((item) => item.key === status)?.label || "Orders";
 
  function handleResetFilters() {
    setSearch("");
    setStatus("all");
    setPayment("all");
    setSort("date_desc");
  }
 
  return (
    <div className="orders-page">
      <main className="main">

        <div className="header">
          <div>
            <h1 className="header__title">{pageTitle}</h1>
            <p className="header__subtitle">
              {filteredOrders.length} result
              {filteredOrders.length !== 1 && "s"} found
            </p>
          </div>
        </div>
 
        <div className="filter-bar">
          <div className="filter-bar__search">
            <input
              className="input"
              placeholder="Search order id or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
 
          <select
            className="select"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          >
            <option value="all">Payment: all</option>
            <option value="paid">Payment: paid</option>
            <option value="unpaid">Payment: unpaid</option>
          </select>
 
          <select
            className="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {NAV_ITEMS.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </select>
 
          <select
            className="select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="date_desc">Sort: newest</option>
            <option value="date_asc">Sort: oldest</option>
            <option value="total_desc">Sort: total high-low</option>
            <option value="total_asc">Sort: total low-high</option>
          </select>
 
          <button className="reset-btn" onClick={handleResetFilters}>
            Reset
          </button>
        </div>
 
        <div className="table-wrap">
          <div className="table-scroll">
            <table className="table">
              <thead>
                <tr>
                  <th>ORDER</th>
                  <th>CUSTOMER</th>
                  <th>DATE</th>
                  <th className="ta-right">ITEMS</th>
                  <th className="ta-right">TOTAL</th>
                  <th>PAYMENT</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
 
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="cell-id">{order.id}</td>
                    <td className="cell-customer">{order.customer}</td>
                    <td className="cell-muted">{order.date}</td>
                    <td className="cell-muted ta-right">{order.items}</td>
                    <td className="cell-total ta-right">
                      {formatPrice(order.total)}
                    </td>
                    <td>
                      <span className={`payment payment--${order.payment}`}>
                        {order.payment}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="ta-right">
                      <button className="view-btn">View</button>
                    </td>
                  </tr>
                ))}
 
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan="8" className="empty-row">
                      No orders match this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
 