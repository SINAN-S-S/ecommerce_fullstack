"use client";

import { useEffect, useState } from "react";
import "../product.css";

const INITIAL_BRANDS = [
  { id: "B-01", name: "Norra", products: 26, active: true },
  { id: "B-02", name: "Fieldwalk", products: 40, active: true },
  { id: "B-03", name: "Havenwood", products: 9, active: false },
  { id: "B-04", name: "Muir & Co.", products: 17, active: true },
];

function AddBrandModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);
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
      setError("Brand name is required.");
      return;
    }
    setSaving(true);
    // Hook this up to your API once the backend is ready, e.g.:
    // await fetch("/api/brands", { method: "POST", body: JSON.stringify({ name, active }) });
    await new Promise((r) => setTimeout(r, 400));
    onSave({
      id: `B-${Math.floor(Math.random() * 9000 + 1000)}`,
      name: name.trim(),
      products: 0,
      active,
    });
    setSaving(false);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add Brand</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label">Brand name</label>
            <input
              autoFocus
              className="field-input"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Norra, Fieldwalk, Havenwood"
            />
            {error && <div className="field-error">{error}</div>}
          </div>

          <div className="field">
            <label className="field-label">Status</label>
            <div className="toggle-row">
              <button
                type="button"
                className={`toggle-pill ${active ? "on" : ""}`}
                onClick={() => setActive((v) => !v)}
                aria-pressed={active}
              >
                <span className="toggle-knob" />
              </button>
              <span className="toggle-label">{active ? "Active" : "Inactive"}</span>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save brand"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BrandsPage() {
  const [brands, setBrands] = useState(INITIAL_BRANDS);
  const [showModal, setShowModal] = useState(false);

  function handleSave(newBrand) {
    setBrands((prev) => [newBrand, ...prev]);
    setShowModal(false);
  }

  return (
    <div className="admin-page">
      <div className="breadcrumb">
        Admin / Products <span>/ Brands</span>
      </div>

      <div className="page-hero">
        <div>
          <div className="hero-eyebrow">Partner labels</div>
          <div className="hero-title">Brands</div>
          <div className="hero-subtitle">Manage the brands sold in your store</div>
        </div>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Add Brand
          </button>
        </div>
      </div>

      <div className="toolbar">
        <input className="search-input" placeholder="Search brands..." />
      </div>

      <div className="table-shell">
        <table className="data-table">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Products</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b) => (
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
                    <span className="badge-dot" />
                    {b.active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && <AddBrandModal onClose={() => setShowModal(false)} onSave={handleSave} />}
    </div>
  );
}