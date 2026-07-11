"use client";

import '../product.css'

const REVIEWS = [
  { id: "R-201", productName: "Classic Canvas Tote", author: "Maya R.", rating: 5, comment: "Sturdy, roomy, and looks great every day.", status: "Published" },
  { id: "R-202", productName: "Everyday Sneaker", author: "Josh K.", rating: 4, comment: "Comfortable but runs slightly small.", status: "Published" },
  { id: "R-203", productName: "Ridge Wool Beanie", author: "Anon.", rating: 2, comment: "Itchier than expected.", status: "Pending" },
];

function Stars({ rating }) {
  return (
    <div className="stars">
      {"★".repeat(rating)}
      <span className="empty">{"★".repeat(5 - rating)}</span>
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="admin-page">
      <div className="breadcrumb">Admin / Products <span>/ Reviews</span></div>

      <div className="page-hero">
        <div>
          <div className="hero-eyebrow">Customer feedback</div>
          <div className="hero-title">Reviews</div>
          <div className="hero-subtitle">Moderate customer feedback across your catalog</div>
        </div>
      </div>

      <div className="toolbar">
        <input className="search-input" placeholder="Search reviews..." />
        <select className="filter-select"><option>All statuses</option><option>Published</option><option>Pending</option></select>
      </div>

      <div className="review-list">
        {REVIEWS.map((r) => (
          <div key={r.id} className="card review-card">
            <div className="review-top">
              <div className="review-author">
                <div className="thumb">{r.author.charAt(0)}</div>
                <div>
                  <div className="cell-primary">{r.productName}</div>
                  <div className="cell-muted">{r.author}</div>
                </div>
              </div>
              <span className={`badge ${r.status === "Published" ? "badge-success" : "badge-warning"}`}>
                <span className="badge-dot" />{r.status}
              </span>
            </div>
            <Stars rating={r.rating} />
            <p className="review-comment">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}