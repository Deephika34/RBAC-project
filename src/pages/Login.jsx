import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending login data:", formData);

      // ✅ CORRECT API CALL
      const res = await API.post("/auth/login", formData);

      console.log("Login Response:", res.data);

      // ✅ Save token & role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("✅ Login successful");

      // ✅ Redirect
      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      alert(
        error.response?.data?.message || "❌ Login failed"
      );
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;