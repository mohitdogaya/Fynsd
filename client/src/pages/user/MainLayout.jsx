import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MainLayout() {
      const navigate = useNavigate();

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
    };

    fetchUser();
  }, [navigate]);
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}