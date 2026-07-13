"use client";

import { useState } from "react";
import "./staff.css";

export default function StaffList() {
  const [staffs, setStaffs] = useState([
    {
      id: 1,
      name: "Muhammed Anas",
      email: "anas@gmail.com",
      active: true,
    },
    {
      id: 2,
      name: "Ameen",
      email: "ameen@gmail.com",
      active: true,
    },
    {
      id: 3,
      name: "Rahul",
      email: "rahul@gmail.com",
      active: true,
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setNewStaff({
      ...newStaff,
      [e.target.name]: e.target.value,
    });
  }

  function addStaff() {
    if (
      newStaff.name === "" ||
      newStaff.email === "" ||
      newStaff.password === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    setStaffs([
      ...staffs,
      {
        id: staffs.length + 1,
        name: newStaff.name,
        email: newStaff.email,
        active: true,
      },
    ]);

    setNewStaff({
      name: "",
      email: "",
      password: "",
    });

    setShowModal(false);
  }

  function toggleStaff(id) {
    setStaffs(
      staffs.map((staff) =>
        staff.id === id
          ? { ...staff, active: !staff.active }
          : staff
      )
    );
  }

  return (
    <div className="staff-container">
      <div className="Header">
        <h1 id="text">Staff List</h1>

        <button
          className="add-staff-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Staff
        </button>
      </div>

      <table className="staff-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {staffs.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.name}</td>

              <td>{staff.email}</td>

              <td>
                <span
                  className={
                    staff.active
                      ? "status active"
                      : "status removed"
                  }
                >
                  {staff.active ? "Active" : "Removed"}
                </span>
              </td>

              <td>
                <button
                  className={
                    staff.active
                      ? "remove-btn"
                      : "add-btn"
                  }
                  onClick={() => toggleStaff(staff.id)}
                >
                  {staff.active ? "Remove" : "Add"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-box">
            <h2>Add Staff</h2>

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={newStaff.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={newStaff.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={newStaff.password}
              onChange={handleChange}
            />

            <div className="buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={addStaff}
              >
                Add Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}