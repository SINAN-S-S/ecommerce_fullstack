"use client";
import { useState } from "react";
import styles from "./shippingMethods.module.css";

export default function SettingsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
        <ShippingMethodsSection />
        <DeliveryChargesSection />
        <TrackingSection />
      </div>
    </div>
  );
}

/* =========================================================
   SECTION 1: Shipping Methods
   (inline row editing + inline add-form panel)
   ========================================================= */
function ShippingMethodsSection() {
  const [shippingData, setShippingData] = useState([
    {
      id: 1,
      method: "Standard Shipping",
      delivery: "5-7 Days",
      charge: "₹50",
      status: "Active",
      editing: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [newMethod, setNewMethod] = useState({
    method: "",
    delivery: "5-7 Days",
    charge: "",
    status: "Active",
  });

  const handleAdd = () => setShowForm(true);

  const handleSaveNew = () => {
    if (newMethod.method.trim() === "" || newMethod.charge.trim() === "") {
      alert("Please fill all fields.");
      return;
    }

    const nextId =
      shippingData.length > 0
        ? Math.max(...shippingData.map((item) => item.id)) + 1
        : 1;

    setShippingData([
      ...shippingData,
      {
        id: nextId,
        method: newMethod.method,
        delivery: newMethod.delivery,
        charge: newMethod.charge,
        status: newMethod.status,
        editing: false,
      },
    ]);

    setNewMethod({
      method: "",
      delivery: "5-7 Days",
      charge: "",
      status: "Active",
    });

    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewMethod({
      method: "",
      delivery: "5-7 Days",
      charge: "",
      status: "Active",
    });
  };

  const handleDelete = (id) => {
    setShippingData(shippingData.filter((item) => item.id !== id));
  };

  const handleEditToggle = (id) => {
    setShippingData(
      shippingData.map((item) =>
        item.id === id ? { ...item, editing: !item.editing } : item
      )
    );
  };

  const handleFieldChange = (id, field, value) => {
    setShippingData(
      shippingData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <section className={styles.card}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Shipping Methods</h2>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleAdd}>
          + Add Shipping Method
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className={styles.formBox}>
          <input
            type="text"
            placeholder="Shipping Method"
            value={newMethod.method}
            onChange={(e) => setNewMethod({ ...newMethod, method: e.target.value })}
            className={styles.input}
          />

          <select
            className={styles.select}
            value={newMethod.delivery}
            onChange={(e) => setNewMethod({ ...newMethod, delivery: e.target.value })}
          >
            <option>Today</option>
            <option>1-2 Days</option>
            <option>2-3 Days</option>
            <option>5-7 Days</option>
          </select>

          <input
            type="text"
            placeholder="Charge (e.g. ₹50)"
            value={newMethod.charge}
            onChange={(e) => setNewMethod({ ...newMethod, charge: e.target.value })}
            className={styles.input}
          />

          <select
            className={styles.select}
            value={newMethod.status}
            onChange={(e) => setNewMethod({ ...newMethod, status: e.target.value })}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <div className={styles.formButtons}>
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSaveNew}>
              Save
            </button>
            <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>Method</th>
              <th>Delivery</th>
              <th>Charge</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shippingData.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.empty}>
                  No shipping methods yet. Add one to get started.
                </td>
              </tr>
            ) : (
              shippingData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>

                  <td>
                    {item.editing ? (
                      <input
                        type="text"
                        value={item.method}
                        onChange={(e) => handleFieldChange(item.id, "method", e.target.value)}
                        className={styles.input}
                      />
                    ) : (
                      item.method
                    )}
                  </td>

                  <td>
                    {item.editing ? (
                      <select
                        value={item.delivery}
                        onChange={(e) => handleFieldChange(item.id, "delivery", e.target.value)}
                        className={styles.select}
                      >
                        <option>Today</option>
                        <option>1-2 Days</option>
                        <option>2-3 Days</option>
                        <option>5-7 Days</option>
                      </select>
                    ) : (
                      item.delivery
                    )}
                  </td>

                  <td>
                    {item.editing ? (
                      <input
                        type="text"
                        value={item.charge}
                        onChange={(e) => handleFieldChange(item.id, "charge", e.target.value)}
                        className={styles.input}
                      />
                    ) : (
                      item.charge
                    )}
                  </td>

                  <td>
                    {item.editing ? (
                      <select
                        value={item.status}
                        onChange={(e) => handleFieldChange(item.id, "status", e.target.value)}
                        className={styles.select}
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    ) : (
                      <span
                        className={`${styles.badge} ${
                          item.status === "Active" ? styles.active : styles.inactive
                        }`}
                      >
                        {item.status}
                      </span>
                    )}
                  </td>

                  <td>
                    <div className={styles.rowActions}>
                      <button
                        className={`${styles.iconBtn} ${styles.edit}`}
                        onClick={() => handleEditToggle(item.id)}
                      >
                        {item.editing ? "Save" : "Edit"}
                      </button>
                      <button
                        className={`${styles.iconBtn} ${styles.delete}`}
                        onClick={() => handleDelete(item.id)}
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
    </section>
  );
}

/* =========================================================
   SECTION 2: Delivery Charges
   (modal-based add / edit / delete)
   ========================================================= */
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

/* =========================================================
   SECTION 3: Tracking
   (modal-based add / edit / delete, auto-generated Tracking ID)
   ========================================================= */
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
