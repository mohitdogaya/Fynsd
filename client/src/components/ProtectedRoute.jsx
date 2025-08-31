// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roleRequired }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Agar login nahi hai ya role match nahi karta → redirect
  if (!token || role !== roleRequired) {
    return <Navigate to={roleRequired === "admin" ? "/admin/login" : "/user/login"} />;
  }

  return children;
}
