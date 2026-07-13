"use client";
import { useState } from "react";
import styles from "../shippingMethods.module.css";

export default function SettingsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
        <TrackingSection />
        
      </div>
    </div>
  );
}
function TrackingSection() {
  const STATUS_OPTIONS = ["Pending", "In Transit", "Delivered", "Cancelled"];

  const initialTracking = [
    { id: 1, trackingId: "TRK1001", customer: "Rahul", courier: "Blue Dart", status: "In Transit" },
    { id: 2, trackingId: "TRK1002", customer: "Anjali", courier: "Delhivery", status: "Delivered" },
    { id: 3, trackingId: "TRK1003", customer: "Akash", courier: "DTDC", status: "Pending" },
  ];

  const [trackingData, setTrackingData] = useState(initialTracking);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ customer: "", courier: "", status: "Pending" });
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState("");

  // Generates the next sequential Tracking ID, e.g. TRK1001 -> TRK1002
  const generateTrackingId = (data) => {
    const usedNumbers = data
      .map((row) => parseInt(String(row.trackingId).replace(/\D/g, ""), 10))
      .filter((n) => !Number.isNaN(n));

    const nextNumber = usedNumbers.length > 0 ? Math.max(...usedNumbers) + 1 : 1001;
    return `TRK${nextNumber}`;
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData({ customer: "", courier: "", status: "Pending" });
    setError("");
    setIsFormOpen(true);
  };

  const openEditForm = (row) => {
    setEditingId(row.id);
    setFormData({ customer: row.customer, courier: row.courier, status: row.status });
    setError("");
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ customer: "", courier: "", status: "Pending" });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedCustomer = formData.customer.trim();
    const trimmedCourier = formData.courier.trim();

    if (!trimmedCustomer) {
      setError("Customer name is required.");
      return;
    }
    if (!trimmedCourier) {
      setError("Courier is required.");
      return;
    }

    if (editingId !== null) {
      // Editing keeps the existing Tracking ID — it's never regenerated
      setTrackingData((prev) =>
        prev.map((row) =>
          row.id === editingId
            ? { ...row, customer: trimmedCustomer, courier: trimmedCourier, status: formData.status }
            : row
        )
      );
    } else {
      const nextId =
        trackingData.length > 0 ? Math.max(...trackingData.map((r) => r.id)) + 1 : 1;
      const nextTrackingId = generateTrackingId(trackingData);

      setTrackingData((prev) => [
        ...prev,
        {
          id: nextId,
          trackingId: nextTrackingId,
          customer: trimmedCustomer,
          courier: trimmedCourier,
          status: formData.status,
        },
      ]);
    }

    closeForm();
  };

  const confirmDelete = (id) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);
  const handleDelete = () => {
    setTrackingData((prev) => prev.filter((row) => row.id !== deleteId));
    setDeleteId(null);
  };

  const statusBadgeClass = (status) => {
    switch (status) {
      case "Delivered":
        return styles.active;
      case "Cancelled":
        return styles.inactive;
      case "In Transit":
        return styles.transit;
      default:
        return styles.pending;
    }
  };

  return (
    <section className={styles.card}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Tracking</h2>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={openAddForm}>
          Track Order
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Customer</th>
              <th>Courier</th>
              <th>Status</th>
              <th style={{ width: "160px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trackingData.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.empty}>
                  No tracking records yet. Add one to get started.
                </td>
              </tr>
            ) : (
              trackingData.map((row) => (
                <tr key={row.id}>
                  <td>{row.trackingId}</td>
                  <td>{row.customer}</td>
                  <td>{row.courier}</td>
                  <td>
                    <span className={`${styles.badge} ${statusBadgeClass(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.rowActions}>
                      <button
                        className={`${styles.iconBtn} ${styles.edit}`}
                        onClick={() => openEditForm(row)}
                        aria-label={`Edit ${row.trackingId}`}
                      >
                        Edit
                      </button>
                      <button
                        className={`${styles.iconBtn} ${styles.delete}`}
                        onClick={() => confirmDelete(row.id)}
                        aria-label={`Delete ${row.trackingId}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit modal */}
      {isFormOpen && (
        <div className={styles.modalOverlay} onClick={closeForm}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tr-modal-title"
          >
            <h2 id="tr-modal-title" className={styles.modalTitle}>
              {editingId !== null ? "Edit Tracking" : "Add Tracking"}
            </h2>

            {editingId === null && (
              <p className={styles.modalText}>
                Tracking ID will be generated automatically:{" "}
                <strong>{generateTrackingId(trackingData)}</strong>
              </p>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              {editingId !== null && (
                <>
                  <label className={styles.label} htmlFor="trackingId">
                    Tracking ID
                  </label>
                  <input
                    id="trackingId"
                    type="text"
                    className={styles.input}
                    value={trackingData.find((r) => r.id === editingId)?.trackingId || ""}
                    disabled
                  />
                </>
              )}

              <label className={styles.label} htmlFor="customer">
                Customer
              </label>
              <input
                id="customer"
                name="customer"
                type="text"
                className={styles.input}
                placeholder="e.g. Priya"
                value={formData.customer}
                onChange={handleChange}
                autoFocus
              />

              <label className={styles.label} htmlFor="courier">
                Courier
              </label>
              <input
                id="courier"
                name="courier"
                type="text"
                className={styles.input}
                placeholder="e.g. Blue Dart"
                value={formData.courier}
                onChange={handleChange}
              />

              <label className={styles.label} htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                className={styles.select}
                value={formData.status}
                onChange={handleChange}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>

              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={closeForm}
                >
                  Cancel
                </button>
                <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                  {editingId !== null ? "Save Changes" : "Add Tracking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId !== null && (
        <div className={styles.modalOverlay} onClick={cancelDelete}>
          <div
            className={`${styles.modal} ${styles.modalSmall}`}
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
          >
            <h2 className={styles.modalTitle}>Delete this tracking record?</h2>
            <p className={styles.modalText}>
              This will permanently remove tracking record{" "}
              <strong>{trackingData.find((r) => r.id === deleteId)?.trackingId}</strong>.
            </p>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnDanger}`}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
