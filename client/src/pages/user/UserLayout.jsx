// src/pages/user/UserLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useUser } from "../../context/UserContext";

export default function UserLayout() {
  const { loading } = useUser();

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
