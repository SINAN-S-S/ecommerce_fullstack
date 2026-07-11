"use client";
import React, { useState } from "react";
import "./PaymentsDashboard.css";
import Swal from "sweetalert2";
import {
  Search, Bell,
  DollarSign, Activity, Clock, ShieldCheck
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid
} from "recharts";

// Hardcoded mock data for the dashboard
const revenueData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 51000 },
  { month: "Mar", revenue: 47500 },
  { month: "Apr", revenue: 63000 },
  { month: "May", revenue: 58200 },
  { month: "Jun", revenue: 71000 },
];

const methodData = [
  { name: "Card", value: 54, color: "#2C211C" },
  { name: "UPI", value: 26, color: "#8DB38B" },
  { name: "PayPal", value: 12, color: "#D9A441" },
  { name: "Wallet", value: 8, color: "#D96B6B" },
];

const mockTransactions = [
  { id: "TXN-1001", customer: "Ava Whitfield", orderId: "ORD-5310", amount: 4500, method: "Card", status: "Success", date: "12 Jun 2026" },
  { id: "TXN-1002", customer: "Leo Marchetti", orderId: "ORD-5311", amount: 1500, method: "UPI", status: "Pending", date: "14 Jun 2026" },
  { id: "TXN-1003", customer: "Priya Nair", orderId: "ORD-5312", amount: 8000, method: "PayPal", status: "Failed", date: "15 Jun 2026" },
  { id: "TXN-1004", customer: "Owen Castillo", orderId: "ORD-5313", amount: 2300, method: "Card", status: "Refunded", date: "16 Jun 2026" },
  { id: "TXN-1005", customer: "Mika Tanaka", orderId: "ORD-5314", amount: 6200, method: "Wallet", status: "Success", date: "17 Jun 2026" },
  { id: "TXN-1006", customer: "Elena Volkov", orderId: "ORD-5315", amount: 3100, method: "Card", status: "Success", date: "18 Jun 2026" },
  { id: "TXN-1007", customer: "Rahul Mehta", orderId: "ORD-5316", amount: 1200, method: "UPI", status: "Success", date: "18 Jun 2026" }
];

const mockPendingPayments = [
  { id: "PND-1", customer: "Priya Nair", order: "ORD-5400", amount: 24000, due: "12 Jul", method: "Card" },
  { id: "PND-2", customer: "Noah Kessler", order: "ORD-5401", amount: 12500, due: "14 Jul", method: "UPI" },
];

const mockRefunds = [
  { id: "RFD-1", customer: "Owen Castillo", order: "ORD-5500", amount: 1200, reason: "Damaged item", status: "Pending" },
  { id: "RFD-2", customer: "Isla Fraser", order: "ORD-5501", amount: 4500, reason: "Wrong size", status: "Approved" },
];

// Helper to format currency
const formatCurrency = (amount) => {
  return "₹" + amount.toLocaleString("en-IN");
};

// Reusable stat card
const StatCard = ({ icon, label, value, sub }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        {icon}
      </div>
      <div className="stat-info">
        <p className="stat-label">{label}</p>
        <h3 className="stat-value">{value}</h3>
        <p className="stat-sub">{sub}</p>
      </div>
    </div>
  );
};

// Badge component for status colors
const StatusBadge = ({ status }) => {
  let badgeClass = "badge";
  if (status === "Success") badgeClass += " badge-success";
  else if (status === "Pending") badgeClass += " badge-warning";
  else if (status === "Failed") badgeClass += " badge-danger";
  else badgeClass += " badge-default";

  return <span className={badgeClass}>{status}</span>;
};

export default function PaymentsDashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [pendingPayments, setPendingPayments] = useState(mockPendingPayments);
  const [refunds, setRefunds] = useState(mockRefunds);

  // Filter transactions based on search and selected status
  const filteredTransactions = mockTransactions.filter((txn) => {
    const matchesSearch = txn.id.toLowerCase().includes(search.toLowerCase()) || 
                          txn.customer.toLowerCase().includes(search.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter !== "All") {
      matchesStatus = txn.status === statusFilter;
    }
    
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    Swal.fire({
      icon: 'success',
      title: 'Export Started',
      text: 'Downloading CSV...',
      timer: 2000,
      showConfirmButton: false
    });
  };

  const handleMarkPaid = (id) => {
    // Remove the payment from pending list
    const newPendingList = pendingPayments.filter(payment => payment.id !== id);
    setPendingPayments(newPendingList);
    Swal.fire({
      icon: 'success',
      title: 'Payment Received',
      text: 'Payment marked as paid and removed from list.',
      timer: 2000,
      showConfirmButton: false
    });
  };

  const handleRemind = (customer) => {
    Swal.fire({
      icon: 'info',
      title: 'Reminder Sent',
      text: `Reminder successfully sent to ${customer}.`,
      timer: 2000,
      showConfirmButton: false
    });
  };

  const handleApproveRefund = (id) => {
    const updatedRefunds = refunds.map(refund => {
      if (refund.id === id) {
        return { ...refund, status: "Approved" };
      }
      return refund;
    });
    setRefunds(updatedRefunds);
    Swal.fire({
      icon: 'success',
      title: 'Refund Approved',
      text: 'The refund request has been processed.',
      timer: 2000,
      showConfirmButton: false
    });
  };

  return (
    <div className="dashboard-container">
      

      <div className="dashboard-content">
        
        {/* Stats Row */}
        <div className="stats-row">
          <StatCard 
            icon={<DollarSign />} 
            label="Total Revenue" 
            value={formatCurrency(485000)} 
            sub="Up from last month" 
          />
          <StatCard 
            icon={<Activity />} 
            label="Total Transactions" 
            value="1,245" 
            sub="Card, UPI, PayPal" 
          />
          <StatCard 
            icon={<Clock />} 
            label="Pending Payments" 
            value={formatCurrency(36500)} 
            sub="Waiting for settlement" 
          />
          <StatCard 
            icon={<ShieldCheck />} 
            label="Success Rate" 
            value="98%" 
            sub="Well above average" 
          />
        </div>

        {/* Charts Row */}
        <div className="charts-row">
          <div className="chart-item">
            <h3>Monthly Revenue</h3>
            <p className="subtitle">Settled revenue past 6 months</p>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#2C211C" fill="#e7ddd5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-item">
            <h3>Payment Methods</h3>
            <p className="subtitle">Split by method</p>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={methodData} dataKey="value" nameKey="name" outerRadius={80}>
                    {methodData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="pie-legend">
               {methodData.map((m) => (
                 <span key={m.name} style={{ color: m.color, marginRight: 15 }}>● {m.name}</span>
               ))}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-section">
          <div className="table-header">
            <div>
              <h3>Payment History</h3>
              <p className="subtitle">{filteredTransactions.length} transactions found</p>
            </div>
            <div className="table-filters">
              <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
                <option value="All">All Statuses</option>
                <option value="Success">Success</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
              <button className="btn-primary" onClick={handleExportCSV}>Export CSV</button>
            </div>
          </div>

          <table className="simple-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => (
                <tr key={txn.id}>
                  <td>{txn.id}</td>
                  <td>{txn.customer}</td>
                  <td>{txn.orderId}</td>
                  <td><b>{formatCurrency(txn.amount)}</b></td>
                  <td>{txn.method}</td>
                  <td><StatusBadge status={txn.status} /></td>
                  <td>{txn.date}</td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">No transactions found for the search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Split Row */}
        <div className="bottom-row">
          <div className="bottom-box">
            <h3>Pending Payments</h3>
            <p className="subtitle">Keep an eye on these before they go overdue.</p>
            <div className="pending-list">
              {pendingPayments.length === 0 ? (
                <p>No pending payments today.</p>
              ) : (
                pendingPayments.map((payment) => (
                  <div key={payment.id} className="pending-item">
                    <div>
                      <h4>{payment.customer}</h4>
                      <p className="pending-sub">Order: {payment.order} | Due: {payment.due}</p>
                    </div>
                    <div className="pending-action">
                      <h4 className="pending-amount">{formatCurrency(payment.amount)}</h4>
                      <div className="pending-btn-group">
                        <button className="btn-success" onClick={() => handleMarkPaid(payment.id)}>
                          Mark Paid
                        </button>
                        <button className="btn-outline" onClick={() => handleRemind(payment.customer)}>
                          Remind
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bottom-box">
            <h3>Refund Requests</h3>
            <p className="subtitle">Review and action customer refund claims.</p>
            <table className="simple-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {refunds.map((refund) => (
                  <tr key={refund.id}>
                    <td>{refund.customer}</td>
                    <td>{formatCurrency(refund.amount)}</td>
                    <td>{refund.status}</td>
                    <td>
                      {refund.status === "Pending" ? (
                        <button className="btn-primary" onClick={() => handleApproveRefund(refund.id)}>
                          Approve
                        </button>
                      ) : (
                        <span className="text-muted">Done</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}