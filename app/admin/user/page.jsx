"use client";

import { useState } from "react";
import "./UserList.css";

export default function UsersPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Muhammed Anas",
      email: "anas@gmail.com",
      phone: "+91 9876543210",
      address: "Palakkad, Kerala",
      status: "Active",
    },
    {
      id: 2,
      name: "Ameen",
      email: "ameen@gmail.com",
      phone: "+91 9123456789",
      address: "Malappuram, Kerala",
      status: "Blocked",
    },
    {
      id: 3,
      name: "Rahul",
      email: "rahul@gmail.com",
      phone: "+91 9988776655",
      address: "Kochi, Kerala",
      status: "Active",
    },
    {
      id: 4,
      name: "Fathima",
      email: "fathima@gmail.com",
      phone: "+91 9876512345",
      address: "Calicut, Kerala",
      status: "Active",
    },
    {
      id: 5,
      name: "Arjun",
      email: "arjun@gmail.com",
      phone: "+91 9090909090",
      address: "Thrissur, Kerala",
      status: "Blocked",
    },
    {
      id: 6,
      name: "Nihal",
      email: "nihal@gmail.com",
      phone: "+91 9000011111",
      address: "Kannur, Kerala",
      status: "Active",
    },
  ]);

  const toggleBlock = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Blocked" : "Active",
            }
          : user
      )
    );
  };

  return (
    <div id="userList-container" className="userList-container">
      <div className="Header">
        <h1 id="text">User Management</h1>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>#{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>

              <td>
                <span
                  className={
                    user.status === "Active"
                      ? "status active"
                      : "status blocked"
                  }
                >
                  {user.status}
                </span>
              </td>

              <td>
                <button
                  className={
                    user.status === "Active"
                      ? "block-btn"
                      : "unblock-btn"
                  }
                  onClick={() => toggleBlock(user.id)}
                >
                  {user.status === "Active" ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}