"use client";

import '../product.css'

const BRANDS = [
  { id: "B-01", name: "Norra", products: 26, active: true },
  { id: "B-02", name: "Fieldwalk", products: 40, active: true },
  { id: "B-03", name: "Havenwood", products: 9, active: false },
  { id: "B-04", name: "Muir & Co.", products: 17, active: true },
];

export default function BrandsPage() {
  return (
    <div className="admin-page">
      <div className="breadcrumb">Admin / Products <span>/ Brands</span></div>

      <div className="page-hero">
        <div>
          <div className="hero-eyebrow">Partner labels</div>
          <div className="hero-title">Brands</div>
          <div className="hero-subtitle">Manage the brands sold in your store</div>
        </div>
        <div className="hero-actions">
          <button className="btn btn-primary">+ Add Brand</button>
        </div>
      </div>

      <div className="toolbar">
        <input className="search-input" placeholder="Search brands..." />
      </div>

      <div className="table-shell">
        <table className="data-table">
          <thead><tr><th>Brand</th><th>Products</th><th>Status</th></tr></thead>
          <tbody>
            {BRANDS.map((b) => (
              <tr key={b.id}>
                <td>
                  <div className="cell-with-thumb">
                    <div className="thumb">{b.name.charAt(0)}</div>
                    <span className="cell-primary">{b.name}</span>
                  </div>
                </td>
                <td>{b.products}</td>
                <td>
                  <span className={`badge ${b.active ? "badge-success" : "badge-neutral"}`}>
                    <span className="badge-dot" />{b.active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}