"use client";

import '../product.css'

const INVENTORY = [
  { id: "P-1042", productName: "Classic Canvas Tote", Brand: "Norra", stock: 128, reorderAt: 20 },
  { id: "P-1043", productName: "Ridge Wool Beanie", Brand: "Norra", stock: 0, reorderAt: 15 },
  { id: "P-1044", productName: "Everyday Sneaker", Brand: "Fieldwalk", stock: 54, reorderAt: 25 },
  { id: "P-1045", productName: "Linen Overshirt", Brand: "Fieldwalk", stock: 12, reorderAt: 15 },
  { id: "P-1046", productName: "Suede Crossbody Bag", Brand: "Havenwood", stock: 31, reorderAt: 10 },
];

function stockInfo(stock, reorderAt) {
  if (stock === 0) return { label: "Out of stock", cls: "badge-danger" };
  if (stock <= reorderAt) return { label: "Reorder soon", cls: "badge-warning" };
  return { label: "In stock", cls: "badge-success" };
}

export default function InventoryPage() {
  return (
    <div className="admin-page">
      <div className="breadcrumb">Admin / Products <span>/ Inventory</span></div>

      <div className="page-hero">
        <div>
          <div className="hero-eyebrow">Stock control</div>
          <div className="hero-title">Inventory</div>
          <div className="hero-subtitle">Track stock levels and know what needs reordering</div>
        </div>
        <div className="hero-actions">
          <button className="btn btn-secondary">Download report</button>
        </div>
      </div>

      <div className="toolbar">
        <input className="search-input" placeholder="Search by product or brand..." />
        <select className="filter-select">
          <option>All stock levels</option><option>In stock</option><option>Reorder soon</option><option>Out of stock</option>
        </select>
      </div>

      <div className="table-shell">
        <table className="data-table">
          <thead><tr><th>Product</th><th>Brand</th><th>In stock</th><th>Reorder at</th><th>Status</th></tr></thead>
          <tbody>
            {INVENTORY.map((item) => {
              const info = stockInfo(item.stock, item.reorderAt);
              return (
                <tr key={item.id}>
                  <td className="cell-primary">{item.productName}</td>
                  <td className="cell-muted">{item.Brand}</td>
                  <td>{item.stock}</td>
                  <td>{item.reorderAt}</td>
                  <td><span className={`badge ${info.cls}`}><span className="badge-dot" />{info.label}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}