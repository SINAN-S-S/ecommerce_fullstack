"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import '../product.css'

const CATEGORIES = ["Bags", "Accessories", "Footwear", "Apparel", "Outerwear"];

export default function AddProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    productName: "", Brand: "", price: "", discoundPrice: "", stock: "", weight: "",
    status: "Active", categoryId: "", description: "", thumbnail: "", isTrending: false,
    productImage: [""], size: [""], color: [""],
  });

  function update(field, value) { setForm((f) => ({ ...f, [field]: value })); }
  function updateListItem(field, index, value) {
    setForm((f) => { const next = [...f[field]]; next[index] = value; return { ...f, [field]: next }; });
  }
  function addListItem(field) { setForm((f) => ({ ...f, [field]: [...f[field], ""] })); }
  function removeListItem(field, index) { setForm((f) => ({ ...f, [field]: f[field].filter((_, i) => i !== index) })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    console.log("New product:", {
      ...form,
      productImage: form.productImage.filter(Boolean),
      size: form.size.filter(Boolean),
      color: form.color.filter(Boolean),
    });
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    router.push("/admin/product");
  }

  return (
    <div className="admin-page">
      <div className="breadcrumb">Admin / Products <span>/ Add Product</span></div>

      <div className="page-hero">
        <div>
          <div className="hero-eyebrow">New listing</div>
          <div className="hero-title">Add Product</div>
          <div className="hero-subtitle">Fill in the details below to publish it to your catalog</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-col" style={{ gridColumn: "1 / 2" }}>
          <div className="card" style={{ padding: 26 }}>
            <h2 className="form-section-title">Product details</h2>
            <div className="field">
              <label className="field-label">Product name</label>
              <input required className="field-input" value={form.productName} onChange={(e) => update("productName", e.target.value)} placeholder="e.g. Classic Canvas Tote" />
            </div>
            <div className="form-row">
              <div className="field">
                <label className="field-label">Brand</label>
                <input className="field-input" value={form.Brand} onChange={(e) => update("Brand", e.target.value)} placeholder="e.g. Norra" />
              </div>
              <div className="field">
                <label className="field-label">Category</label>
                <select className="field-input" value={form.categoryId} onChange={(e) => update("categoryId", e.target.value)}>
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="field">
              <label className="field-label">Description</label>
              <textarea rows={5} className="field-textarea" value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Materials, fit, care instructions..." />
            </div>
            <div className="form-row">
              <div className="field">
                <label className="field-label">Weight</label>
                <input className="field-input" value={form.weight} onChange={(e) => update("weight", e.target.value)} placeholder="e.g. 450g or 0.45" />
              </div>
              <div className="field">
                <label className="field-label">Status</label>
                <select className="field-input" value={form.status} onChange={(e) => update("status", e.target.value)}>
                  <option>Active</option><option>Low stock</option><option>Out of stock</option><option>Draft</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 26 }}>
            <h2 className="form-section-title">Product images</h2>
            {form.productImage.map((url, i) => (
              <div key={i} className="field" style={{ display: "flex", gap: 8 }}>
                <input className="field-input" value={url} onChange={(e) => updateListItem("productImage", i, e.target.value)} placeholder="https://image-url.com/photo.jpg" />
                {form.productImage.length > 1 && <button type="button" className="btn btn-ghost" onClick={() => removeListItem("productImage", i)}>Remove</button>}
              </div>
            ))}
            <button type="button" className="btn btn-light" onClick={() => addListItem("productImage")}>+ Add image URL</button>
          </div>

          <div className="card" style={{ padding: 26 }}>
            <h2 className="form-section-title">Variants</h2>
            <label className="field-label">Sizes</label>
            {form.size.map((s, i) => (
              <div key={i} className="field" style={{ display: "flex", gap: 8 }}>
                <input className="field-input" value={s} onChange={(e) => updateListItem("size", i, e.target.value)} placeholder="e.g. S, M, L, 42, One size" />
                {form.size.length > 1 && <button type="button" className="btn btn-ghost" onClick={() => removeListItem("size", i)}>Remove</button>}
              </div>
            ))}
            <button type="button" className="btn btn-light" onClick={() => addListItem("size")}>+ Add size</button>
            <div style={{ height: 18 }} />
            <label className="field-label">Colors</label>
            {form.color.map((c, i) => (
              <div key={i} className="field" style={{ display: "flex", gap: 8 }}>
                <input className="field-input" value={c} onChange={(e) => updateListItem("color", i, e.target.value)} placeholder="e.g. Black, Olive, Sand" />
                {form.color.length > 1 && <button type="button" className="btn btn-ghost" onClick={() => removeListItem("color", i)}>Remove</button>}
              </div>
            ))}
            <button type="button" className="btn btn-light" onClick={() => addListItem("color")}>+ Add color</button>
          </div>
        </div>

        <div className="form-col">
          <div className="card" style={{ padding: 26 }}>
            <h2 className="form-section-title">Pricing & stock</h2>
            <div className="field">
              <label className="field-label">Price (USD)</label>
              <input required type="number" step="0.01" min="0" className="field-input" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="0.00" />
            </div>
            <div className="field">
              <label className="field-label">Discount price</label>
              <input type="number" step="0.01" min="0" className="field-input" value={form.discoundPrice} onChange={(e) => update("discoundPrice", e.target.value)} placeholder="Optional" />
            </div>
            <div className="field">
              <label className="field-label">Stock quantity</label>
              <input required type="number" min="0" className="field-input" value={form.stock} onChange={(e) => update("stock", e.target.value)} placeholder="0" />
            </div>
            <div className="field">
              <label className="field-label">Thumbnail URL</label>
              <input className="field-input" value={form.thumbnail} onChange={(e) => update("thumbnail", e.target.value)} placeholder="https://image-url.com/thumb.jpg" />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--text)" }}>
              <input type="checkbox" checked={form.isTrending} onChange={(e) => update("isTrending", e.target.checked)} />
              Mark as trending
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={saving} className="btn btn-primary btn-block">{saving ? "Saving..." : "Save product"}</button>
            <button type="button" onClick={() => router.push("/admin/product")} className="btn btn-ghost btn-block">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}