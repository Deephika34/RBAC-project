// Users.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const Users = () => {
  // Role & token fetch
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // If user not logged in, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If user is not admin, show access denied
  if (role !== "admin") {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        ❌ Access Denied – Only Admins can view this page
      </div>
    );
  }

  // Mock users data
  const mockUsers = [
    { id: 1, name: "Deephika", email: "deephika@gmail.com", role: "admin" },
    { id: 2, name: "Ramesh", email: "ramesh@gmail.com", role: "user" },
    { id: 3, name: "Priya", email: "priya@gmail.com", role: "user" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users Page (Admin Only) 👥</h2>
      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}
      >
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;