// src/pages/admin/AdminLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Check if admin is logged in
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      // redirect to admin login if not logged in as admin
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <main >
      <Outlet /> {/* Admin pages */}
    </main>
  );
}
