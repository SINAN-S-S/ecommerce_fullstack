"use client";
import { useState } from "react";
import styles from "./shippingMethods.module.css";

export default function SettingsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
        <ShippingMethodsSection />
        
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

