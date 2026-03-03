import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  let role = "";

  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <div>
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