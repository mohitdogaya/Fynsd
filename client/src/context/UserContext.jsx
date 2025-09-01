// src/context/UserContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // user fetch function
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    if (role === "admin") {
      navigate("/admin", { replace: true });
      return;
    }

    try {
      const { data } = await api.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem("isPremium", data.isPremium ? "true" : "false");
      setUser(data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setUser(null);
      navigate("/user/login", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

// custom hook
export function useUser() {
  return useContext(UserContext);
}
