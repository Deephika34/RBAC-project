import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    alert("Logged out");
    navigate("/");
  };

  return (
    <div style={{ padding: "10px", background: "#eee" }}>
      <Link to="/dashboard">Dashboard</Link>

      {" | "}

      {/* Admin மட்டும் Users page */}
      {role === "admin" && <Link to="/users">Users</Link>}

      {" | "}

      {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/">Login</Link>
      )}
    </div>
  );
}

export default Navbar;