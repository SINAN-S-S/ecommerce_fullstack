"use client";

import '../product.css'

const CATEGORIES = [
  { id: "C-01", name: "Bags", products: 18, updated: "2 days ago" },
  { id: "C-02", name: "Accessories", products: 34, updated: "5 days ago" },
  { id: "C-03", name: "Footwear", products: 22, updated: "1 week ago" },
  { id: "C-04", name: "Apparel", products: 51, updated: "3 hours ago" },
  { id: "C-05", name: "Outerwear", products: 14, updated: "2 weeks ago" },
  { id: "C-06", name: "Home & Living", products: 8, updated: "1 month ago" },
];

export default function CategoriesPage() {
  return (
    <div className="admin-page">
      <div className="breadcrumb">Admin / Products <span>/ Categories</span></div>

      <div className="page-hero">
        <div>
          <div className="hero-eyebrow">Organize your catalog</div>
          <div className="hero-title">Categories</div>
          <div className="hero-subtitle">Group products so shoppers can browse by type</div>
        </div>
        <div className="hero-actions">
          <button className="btn btn-primary">+ Add Category</button>
        </div>
      </div>

      <div className="toolbar">
        <input className="search-input" placeholder="Search categories..." />
      </div>

      <div className="tile-grid">
        {CATEGORIES.map((c) => (
          <div key={c.id} className="tile">
            <div className="tile-top">
              <div className="thumb" style={{ borderRadius: 12 }}>{c.name.charAt(0)}</div>
              <span className="badge badge-neutral">{c.products} items</span>
            </div>
            <div className="tile-name">{c.name}</div>
            <div className="tile-meta">Updated {c.updated}</div>
          </div>
        ))}
      </div>
    </div>
  );
}