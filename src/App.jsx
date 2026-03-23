// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";

function App() {
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard Route - Protected */}
      <Route
        path="/dashboard"
        element={
          localStorage.getItem("token") ? <Dashboard /> : <Navigate to="/login" />
        }
      />

      {/* Users Route - Protected + Admin only */}
      <Route
        path="/users"
        element={
          localStorage.getItem("token") ? <Users /> : <Navigate to="/login" />
        }
      />

      {/* Default Route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;