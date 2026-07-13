"use client";

import Link from "next/link";
import { useState } from "react";
import './product.css'

const PRODUCTS = [
  { _id: "P-1042", productName: "Classic Canvas Tote", Brand: "Norra", price: 42.0, "discound-price": 35.0, thumbnail: "https://picsum.photos/seed/tote/80", status: "Active", categoryName: "Bags", "is-trending": true, "is-deleted": false, stock: 128, rating: 4.6, review: 82 },
  { _id: "P-1043", productName: "Ridge Wool Beanie", Brand: "Norra", price: 24.0, "discound-price": null, thumbnail: "https://picsum.photos/seed/beanie/80", status: "Out of stock", categoryName: "Accessories", "is-trending": false, "is-deleted": false, stock: 0, rating: 4.1, review: 19 },
  { _id: "P-1044", productName: "Everyday Sneaker", Brand: "Fieldwalk", price: 89.0, "discound-price": 74.0, thumbnail: "https://picsum.photos/seed/sneaker/80", status: "Active", categoryName: "Footwear", "is-trending": true, "is-deleted": false, stock: 54, rating: 4.8, review: 210 },
  { _id: "P-1045", productName: "Linen Overshirt", Brand: "Fieldwalk", price: 68.0, "discound-price": null, thumbnail: "https://picsum.photos/seed/shirt/80", status: "Low stock", categoryName: "Apparel", "is-trending": false, "is-deleted": false, stock: 12, rating: 4.3, review: 44 },
];

function Badge({ status }) {
  const map = { Active: "badge-success", "Low stock": "badge-warning", "Out of stock": "badge-danger" };
  return (
    <span className={`badge ${map[status] || "badge-neutral"}`}>
      <span className="badge-dot" />
      {status}
    </span>
  );
}

export default function AllProductsPage() {
  const [products] = useState(PRODUCTS.filter((p) => !p["is-deleted"]));
  const active = products.filter((p) => p.status === "Active").length;
  const lowStock = products.filter((p) => p.status === "Low stock").length;
  const outOfStock = products.filter((p) => p.status === "Out of stock").length;

  return (
    <div className="admin-page">
      <div className="breadcrumb">Admin <span>/ Products</span></div>

      <div className="page-hero">
        <div>
          <div className="hero-eyebrow">Catalog overview</div>
          <div className="hero-title">All Products</div>
          <div className="hero-subtitle">{products.length} products currently in your catalog</div>
        </div>
        <div className="hero-actions">
          <button className="btn btn-secondary">Export CSV</button>
          <Link href="/admin/product/add-product" className="btn btn-primary">+ Add Product</Link>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card tone-neutral">
          <div className="stat-icon">📦</div>
          <div className="stat-label">Total products</div>
          <div className="stat-value">{products.length}</div>
        </div>
        <div className="stat-card tone-success">
          <div className="stat-icon">✅</div>
          <div className="stat-label">Active</div>
          <div className="stat-value">{active}</div>
          <div className="stat-delta success">{products.length ? Math.round((active / products.length) * 100) : 0}% of catalog</div>
        </div>
        <div className="stat-card tone-warning">
          <div className="stat-icon">⚠️</div>
          <div className="stat-label">Low stock</div>
          <div className="stat-value">{lowStock}</div>
          <div className="stat-delta warning">Needs attention</div>
        </div>
        <div className="stat-card tone-danger">
          <div className="stat-icon">🚫</div>
          <div className="stat-label">Out of stock</div>
          <div className="stat-value">{outOfStock}</div>
          <div className="stat-delta danger">Restock soon</div>
        </div>
      </div>

      <div className="toolbar">
        <input className="search-input" placeholder="Search products by name..." />
        <select className="filter-select">
          <option>All statuses</option>
          <option>Active</option>
          <option>Low stock</option>
          <option>Out of stock</option>
        </select>
        <select className="filter-select">
          <option>All categories</option>
          <option>Bags</option>
          <option>Accessories</option>
          <option>Footwear</option>
          <option>Apparel</option>
        </select>
      </div>

      <div className="table-shell">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th><th>Brand</th><th>Category</th><th>Price</th>
              <th>Stock</th><th>Rating</th><th>Trending</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>
                  <div className="cell-with-thumb">
                    {p.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.thumbnail} alt={p.productName} className="thumb-img" />
                    ) : (
                      <div className="thumb">{p.productName.charAt(0)}</div>
                    )}
                    <div>
                      <div className="cell-primary">{p.productName}</div>
                      <div className="cell-muted">{p._id}</div>
                    </div>
                  </div>
                </td>
                <td>{p.Brand || "—"}</td>
                <td>{p.categoryName || "Uncategorized"}</td>
                <td className="cell-primary">
                  ${p.price.toFixed(2)}
                  {p["discound-price"] ? (
                    <span className="cell-muted" style={{ marginLeft: 6, textDecoration: "line-through" }}>
                      ${p["discound-price"].toFixed(2)}
                    </span>
                  ) : null}
                </td>
                <td>{p.stock}</td>
                <td>{p.rating.toFixed(1)} <span className="cell-muted">({p.review})</span></td>
                <td>{p["is-trending"] ? <span className="badge badge-accent">🔥 Trending</span> : <span className="cell-muted">—</span>}</td>
                <td><Badge status={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-footer">
          <span>Showing {products.length} of {products.length} products</span>
          <div className="pagination">
            <button className="page-btn">‹</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}