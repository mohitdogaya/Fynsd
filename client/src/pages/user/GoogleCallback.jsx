// src/pages/user/GoogleCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../lib/api";

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", "user");

      // 👇 fetch profile to update isPremium
      api.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(({ data }) => {
          localStorage.setItem("isPremium", data.isPremium ? "true" : "false");
          toast.success("Google login successful 🎉");
          setTimeout(() => navigate("/"), 1200);
        })
        .catch(() => {
          toast.error("Failed to fetch profile");
          navigate("/user/login");
        });
    } else {
      toast.error("Google login failed. Try again.");
      navigate("/user/login");
    }
  }, [navigate]);
  return (
    <div className="h-screen flex items-center justify-center text-lg font-semibold text-gray-700">
      Processing Google Login...
    </div>
  );
}
