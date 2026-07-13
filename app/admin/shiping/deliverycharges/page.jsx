"use client";
import { useState } from "react";
import styles from "../shippingMethods.module.css";

export default function SettingsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
        
        <DeliveryChargesSection />
        
      </div>
    </div>
  );
}

function DeliveryChargesSection() {
  const initialCharges = [
    { id: 1, location: "Kerala", charge: 50 },
    { id: 2, location: "Tamil Nadu", charge: 80 },
    { id: 3, location: "Karnataka", charge: 100 },
  ];

  const [charges, setCharges] = useState(initialCharges);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ location: "", charge: "" });
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState("");

  const openAddForm = () => {
    setEditingId(null);
    setFormData({ location: "", charge: "" });
    setError("");
    setIsFormOpen(true);
  };

  const openEditForm = (row) => {
    setEditingId(row.id);
    setFormData({ location: row.location, charge: String(row.charge) });
    setError("");
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ location: "", charge: "" });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedLocation = formData.location.trim();
    const numericCharge = Number(formData.charge);

    if (!trimmedLocation) {
      setError("Location is required.");
      return;
    }
    if (!formData.charge || Number.isNaN(numericCharge) || numericCharge < 0) {
      setError("Enter a valid charge amount.");
      return;
    }

    if (editingId !== null) {
      setCharges((prev) =>
        prev.map((row) =>
          row.id === editingId
            ? { ...row, location: trimmedLocation, charge: numericCharge }
            : row
        )
      );
    } else {
      const nextId =
        charges.length > 0 ? Math.max(...charges.map((r) => r.id)) + 1 : 1;
      setCharges((prev) => [
        ...prev,
        { id: nextId, location: trimmedLocation, charge: numericCharge },
      ]);
    }

    closeForm();
  };

  const confirmDelete = (id) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);
  const handleDelete = () => {
    setCharges((prev) => prev.filter((row) => row.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <section className={styles.card}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Delivery Charges</h2>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={openAddForm}>
          + Add Charge
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: "15%" }}>ID</th>
              <th>Location</th>
              <th>Charge</th>
              <th style={{ width: "160px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {charges.length === 0 ? (
              <tr>
                <td colSpan={4} className={styles.empty}>
                  No delivery charges yet. Add one to get started.
                </td>
              </tr>
            ) : (
              charges.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.location}</td>
                  <td>₹{row.charge}</td>
                  <td>
                    <div className={styles.rowActions}>
                      <button
                        className={`${styles.iconBtn} ${styles.edit}`}
                        onClick={() => openEditForm(row)}
                        aria-label={`Edit ${row.location}`}
                      >
                        Edit
                      </button>
                      <button
                        className={`${styles.iconBtn} ${styles.delete}`}
                        onClick={() => confirmDelete(row.id)}
                        aria-label={`Delete ${row.location}`}
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
            aria-labelledby="dc-modal-title"
          >
            <h2 id="dc-modal-title" className={styles.modalTitle}>
              {editingId !== null ? "Edit Charge" : "Add Charge"}
            </h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.label} htmlFor="location">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                className={styles.input}
                placeholder="e.g. Andhra Pradesh"
                value={formData.location}
                onChange={handleChange}
                autoFocus
              />

              <label className={styles.label} htmlFor="charge">
                Charge (₹)
              </label>
              <input
                id="charge"
                name="charge"
                type="number"
                min="0"
                className={styles.input}
                placeholder="e.g. 60"
                value={formData.charge}
                onChange={handleChange}
              />

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
                  {editingId !== null ? "Save Changes" : "Add Charge"}
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
            <h2 className={styles.modalTitle}>Delete this charge?</h2>
            <p className={styles.modalText}>
              This will permanently remove the delivery charge for{" "}
              <strong>{charges.find((r) => r.id === deleteId)?.location}</strong>.
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
