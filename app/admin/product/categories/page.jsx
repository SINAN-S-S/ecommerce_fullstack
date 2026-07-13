"use client";

import { useEffect, useState } from "react";
import "../product.css";

const INITIAL_CATEGORIES = [
  { id: "C-01", name: "Bags", products: 18, updated: "2 days ago" },
  { id: "C-02", name: "Accessories", products: 34, updated: "5 days ago" },
  { id: "C-03", name: "Footwear", products: 22, updated: "1 week ago" },
  { id: "C-04", name: "Apparel", products: 51, updated: "3 hours ago" },
  { id: "C-05", name: "Outerwear", products: 14, updated: "2 weeks ago" },
  { id: "C-06", name: "Home & Living", products: 8, updated: "1 month ago" },
];

function AddCategoryModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }
    setSaving(true);
    // Hook this up to your API once the backend is ready, e.g.:
    // await fetch("/api/categories", { method: "POST", body: JSON.stringify({ name }) });
    await new Promise((r) => setTimeout(r, 400));
    onSave({
      id: `C-${Math.floor(Math.random() * 9000 + 1000)}`,
      name: name.trim(),
      products: 0,
      updated: "Just now",
    });
    setSaving(false);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add Category</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label">Category name</label>
            <input
              autoFocus
              className="field-input"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Bags, Footwear, Outerwear"
            />
            {error && <div className="field-error">{error}</div>}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [showModal, setShowModal] = useState(false);

  function handleSave(newCategory) {
    setCategories((prev) => [newCategory, ...prev]);
    setShowModal(false);
  }

  return (
    <div className="admin-page">
      <div className="breadcrumb">
        Admin / Products <span>/ Categories</span>
      </div>

      <div className="page-hero">
        <div>
          <div className="hero-eyebrow">Organize your catalog</div>
          <div className="hero-title">Categories</div>
          <div className="hero-subtitle">Group products so shoppers can browse by type</div>
        </div>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Add Category
          </button>
        </div>
      </div>

      <div className="toolbar">
        <input className="search-input" placeholder="Search categories..." />
      </div>

      <div className="tile-grid">
        {categories.map((c) => (
          <div key={c.id} className="tile">
            <div className="tile-top">
              <div className="thumb" style={{ borderRadius: 12 }}>
                {c.name.charAt(0)}
              </div>
              <span className="badge badge-neutral">{c.products} items</span>
            </div>
            <div className="tile-name">{c.name}</div>
            <div className="tile-meta">Updated {c.updated}</div>
          </div>
        ))}
      </div>

      {showModal && <AddCategoryModal onClose={() => setShowModal(false)} onSave={handleSave} />}
    </div>
  );
}