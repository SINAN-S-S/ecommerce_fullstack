"use client";

import { useState } from "react";
import "./Coupons.css";

const initialCoupon = {
  _id: "",
  name: "",
  code: "",
  discount: "",
  expiryDate: "",
  minimumOrderAmount: "",
  maximumDiscount: "",
  usageLimit: "",
  usedCount: "",
  status: "Active",
};

const sampleCoupons = [
  {
    _id: "1",
    name: "Festival Offer",
    code: "FEST50",
    discount: 50,
    expiryDate: "2026-12-31",
    minimumOrderAmount: 1000,
    maximumDiscount: 500,
    usageLimit: 200,
    usedCount: 25,
    status: "Active",
  },
  {
    _id: "2",
    name: "Welcome",
    code: "WELCOME20",
    discount: 20,
    expiryDate: "2026-10-15",
    minimumOrderAmount: 500,
    maximumDiscount: 150,
    usageLimit: 100,
    usedCount: 75,
    status: "Inactive",
  },
];

export default function CouponsPage() {
  const [coupon, setCoupon] = useState(initialCoupon);
  const [coupons, setCoupons] = useState(sampleCoupons);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setCoupon({
      ...coupon,
      [e.target.name]: e.target.value,
    });
  };

  const saveCoupon = () => {
    if (editing) {
      setCoupons((prev) =>
        prev.map((item) =>
          item._id === coupon._id ? coupon : item
        )
      );
    } else {
      setCoupons([
        {
          ...coupon,
          _id: Date.now().toString(),
        },
        ...coupons,
      ]);
    }

    setCoupon(initialCoupon);
    setEditing(false);
  };

  const editCoupon = (item) => {
    setCoupon(item);
    setEditing(true);
  };

  const deleteCoupon = (id) => {
    setCoupons(coupons.filter((item) => item._id !== id));
  };

  const filtered = coupons.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coupon-page">

      <div className="top-bar">
        <h1>Coupons</h1>

        <input
          placeholder="Search coupon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="coupon-form">

        <h2>{editing ? "Edit Coupon" : "Create Coupon"}</h2>

        <div className="grid">

          <input
            placeholder="Coupon Name"
            name="name"
            value={coupon.name}
            onChange={handleChange}
          />

          <input
            placeholder="Coupon Code"
            name="code"
            value={coupon.code}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="Discount %"
            name="discount"
            value={coupon.discount}
            onChange={handleChange}
          />

          <input
            type="date"
            name="expiryDate"
            value={coupon.expiryDate}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="Minimum Order"
            name="minimumOrderAmount"
            value={coupon.minimumOrderAmount}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="Maximum Discount"
            name="maximumDiscount"
            value={coupon.maximumDiscount}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="Usage Limit"
            name="usageLimit"
            value={coupon.usageLimit}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="Used Count"
            name="usedCount"
            value={coupon.usedCount}
            onChange={handleChange}
          />

          <select
            name="status"
            value={coupon.status}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

        </div>

        <button onClick={saveCoupon}>
          {editing ? "Update Coupon" : "Create Coupon"}
        </button>

      </div>

      <div className="table-card">

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Discount</th>
              <th>Expiry</th>
              <th>Min Order</th>
              <th>Max Discount</th>
              <th>Usage</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((item) => (

              <tr key={item._id}>

                <td>{item.name}</td>

                <td>{item.code}</td>

                <td>{item.discount}%</td>

                <td>{item.expiryDate}</td>

                <td>₹{item.minimumOrderAmount}</td>

                <td>₹{item.maximumDiscount}</td>

                <td>
                  {item.usedCount}/{item.usageLimit}
                </td>

                <td>
                  <span
                    className={
                      item.status === "Active"
                        ? "badge active"
                        : "badge inactive"
                    }
                  >
                    {item.status}
                  </span>
                </td>

                <td>

                  <button
                    className="edit"
                    onClick={() => editCoupon(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteCoupon(item._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}