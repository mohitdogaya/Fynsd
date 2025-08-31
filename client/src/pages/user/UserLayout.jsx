// src/pages/user/UserLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function UserLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      // ⇝ Not logged in → redirect
      if (!token) {
        navigate("/user/login", { replace: true });
        // return; // 🔹 prevent further execution
      }

      // ⇝ Admin trying to access user page → redirect
      if (role === "admin") {
        navigate("/admin", { replace: true });
        return; // 🔹 prevent further execution
      }

      try {
        const { data } = await api.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.setItem("isPremium", data.isPremium ? "true" : "false");
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        navigate("/user/login", { replace: true }); // ⇝ fallback
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // ⇝ Loading spinner
  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <>
      <Navbar />
      <main>
        <Outlet context={{ user }} />
      </main>
    </>
  );
}
