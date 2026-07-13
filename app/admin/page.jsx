import "./page.css";
import {
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

const stats = [
  { label: "Revenue", value: "₹4.82L", percent: 78, icon: DollarSign },
  { label: "Orders", value: "1,284", percent: 62, icon: ShoppingBag },
  { label: "Customers", value: "312", percent: 45, icon: Users },
  { label: "Stock", value: "2,145", percent: 90, icon: Package },
];

const recentOrders = [
  { id: "#RM-1042", customer: "Aisha Rahman", amount: "₹2,499", status: "Delivered" },
  { id: "#RM-1041", customer: "Kevin Thomas", amount: "₹1,299", status: "Processing" },
  { id: "#RM-1040", customer: "Diya Menon", amount: "₹3,850", status: "Pending" },
  { id: "#RM-1039", customer: "Arjun Nair", amount: "₹999", status: "Delivered" },
  { id: "#RM-1038", customer: "Fathima Siddiq", amount: "₹5,120", status: "Cancelled" },
];

const statusConfig = {
  Delivered: { icon: CheckCircle2, className: "statusDelivered" },
  Processing: { icon: Loader2, className: "statusProcessing" },
  Pending: { icon: Clock, className: "statusPending" },
  Cancelled: { icon: XCircle, className: "statusCancelled" },
};

function RingStat({ label, value, percent, icon: Icon }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="statCard">
      <div className="ringWrapper">
        <svg width="64" height="64" viewBox="0 0 64 64" className="ringSvg">
          <circle cx="32" cy="32" r={radius} fill="none" stroke="var(--secondary)" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="ringIcon">
          <Icon size={18} />
        </div>
      </div>
      <div>
        <p className="statValue">{value}</p>
        <p className="statLabel">{label}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="overviewWrap">
    

      {/* Ring stats */}
      <div className="statsGrid">
        {stats.map((stat) => (
          <RingStat key={stat.label} {...stat} />
        ))}
      </div>

      {/* Recent orders as a stacked list */}
      <div className="ordersCard">
        <div className="ordersHeader">
          <h2 className="ordersTitle">Recent Orders</h2>
          <button className="viewAllBtn">
            View all <ArrowRight size={14} />
          </button>
        </div>

        <div className="ordersList">
          {recentOrders.map((order) => {
            const config = statusConfig[order.status];
            const StatusIcon = config.icon;
            return (
              <div key={order.id} className="orderRow">
                <div className="orderLeft">
                  <div className={`orderIconWrap ${config.className}`}>
                    <StatusIcon size={18} />
                  </div>
                  <div>
                    <p className="orderId">{order.id}</p>
                    <p className="orderCustomer">{order.customer}</p>
                  </div>
                </div>
                <div className="orderRight">
                  <p className="orderAmount">{order.amount}</p>
                  <p className={`orderStatus ${config.className}`}>{order.status}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}