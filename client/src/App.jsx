// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/user/Home.jsx";
// User Pages
import KnowledgeDetail from "./pages/user/KnowledgeDetail.jsx";
import KnowledgeList from "./pages/user/KnowledgeList.jsx";
import UserLogin from "./pages/user/UserLogin.jsx";
import UserSignup from "./pages/user/UserSignup.jsx";
import UserProfile from "./pages/user/UserProfile.jsx";
import About from "./pages/user/About.jsx";
import Calculators from "./pages/user/Calculators.jsx";
import MyActivity from "./pages/user/MyActivity.jsx";

import Advertise from "./pages/user/Advertise.jsx";
import MainLayout from "./pages/user/MainLayout.jsx"

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminSignup from "./pages/admin/AdminSignup.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminEditor from "./pages/admin/AdminEditor.jsx";
import AllContents from "./pages/admin/AllContents.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminProfile from "./pages/admin/AdminProfile.jsx";
import AdminRoadmapEditor from "./pages/admin/AdminRoadmapEditor.jsx";
import RoadmapPage from "./pages/user/RoadmapPage.jsx";

// Layouts
import UserLayout from "./pages/user/UserLayout.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";

// Role-based route wrapper
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AllRoadmap from "./pages/admin/AllRoadmap.jsx";
import FAQ from "./pages/user/FAQ.jsx";
import Contact from "./pages/user/Contact.jsx";
import GoogleCallback from "./pages/user/GoogleCallback";
import NotFound from "./pages/common/NotFound.jsx";

export default function App() {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/advertise" element={<Advertise />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/login" element={<UserLogin />} />
      </Route>

      {/* Fallback Route - last me rakho */}
      <Route path="*" element={<NotFound />} />

      <Route path="/user/signup" element={<>
        <Navbar />
        <UserSignup />
      </>} />
      <Route path="/user/google/callback" element={<GoogleCallback />} />
      {/* ===================== USER ROUTES ===================== */}
      <Route element={<UserLayout />}>
        <Route path="/knowledge" element={<>
          <KnowledgeList />
          <Footer />
        </>} />
        <Route path="/knowledge/:slug" element={<>
          <KnowledgeDetail />
          <Footer />
        </>} />

        <Route
          path="/user/profile"
          element={
            <ProtectedRoute roleRequired="user">
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/activity"
          element={
            <ProtectedRoute roleRequired="user">
              <MyActivity />
            </ProtectedRoute>
          }
        />

        {/* Roadmap Page */}
        <Route path="/roadmap" element={<>
          <RoadmapPage />
          <Footer />
        </>} />
      </Route>

      {/* ===================== ADMIN ROUTES ===================== */}
      {/* <Route path="/admin/signup" element={<AdminSignup />} /> */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/content/new"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/content/:id"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contents"
          element={
            <ProtectedRoute roleRequired="admin">
              <AllContents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/roadmap"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminRoadmapEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roadmaps/:id"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminRoadmapEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/roadmaps"
          element={
            <ProtectedRoute roleRequired="admin">
              <AllRoadmap />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
