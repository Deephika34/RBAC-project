import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // ✅ direct read

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Dashboard Page</h2>

      <p>Welcome! You are logged in.</p>
      <p><strong>Your Role:</strong> {role}</p>

      {role === "admin" && (
        <h3>Admin Panel: You have full access 🔥</h3>
      )}

      {role === "user" && (
        <h3>User Panel: Limited access 🙂</h3>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;