// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "./LogoutButton";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Hide for admin
  if (location.pathname.startsWith("/admin") || role === "admin") return null;

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 
                 backdrop-blur-md bg-white/30 
                 border-b border-[#C6A969]/20 shadow-md"
    >
      <nav
        className="max-w-7xl mx-auto flex justify-between items-center 
                   px-4 md:px-8 py-3 md:py-4"
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-[#00FF7C]"
        >
          Fynsd
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-[#171614]">
          <li>
            <Link to="/" className="relative group transition duration-200">
              Home
              <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-[#00FF7C] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/knowledge"
              className="relative group transition duration-200"
            >
              Knowledge
              <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-[#00FF7C] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/roadmap"
              className="relative group transition duration-200"
            >
              Roadmaps
              <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-[#00FF7C] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/calculators"
              className="relative group transition duration-200"
            >
              Calculators
              <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-[#00FF7C] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="relative group transition duration-200"
            >
              About
              <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-[#00FF7C] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>

          {/* Auth Buttons */}
          {token && role === "user" ? (
            <li className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-2 
                           bg-white/20 backdrop-blur-xl border border-white/30 
                           text-[#09332C] font-semibold rounded-2xl 
                           hover:bg-white/30 shadow-md 
                           transition-all duration-300"
              >
                Profile <ChevronDown size={16} />
              </button>

              {/* Dropdown */}
              {open && (
                <div
                  className="absolute right-0 mt-2 w-48 
                             rounded-2xl backdrop-blur-xl bg-white/40 
                             border border-white/30 shadow-lg 
                             overflow-hidden animate-fadeIn"
                >
                  <Link
                    to="/user/profile"
                    className="block px-4 py-2 text-sm text-[#171614] hover:bg-[#00FF7C]/20 transition"
                    onClick={() => setOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/user/activity"
                    className="block px-4 py-2 text-sm text-[#171614] hover:bg-[#00FF7C]/20 transition"
                    onClick={() => setOpen(false)}
                  >
                    My Activity
                  </Link>
                  <div className="border-t border-white/20" />
                  {/* <div
                    className="px-4 py-2 text-sm text-red-600 hover:bg-red-100/40 cursor-pointer transition"
                    onClick={() => {
                      setOpen(false);
                      localStorage.clear();
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </div> */}
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/user/login"
                  className="px-4 py-2 rounded-lg text-sm font-semibold 
                             text-[#171614] bg-[#FFB703] 
                             shadow hover:shadow-md hover:scale-105 
                             transition-all duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/user/signup"
                  className="px-4 py-2 rounded-lg text-sm font-semibold 
                             text-[#171614] bg-[#E9DCC9] 
                             shadow hover:shadow-md hover:scale-105 
                             transition-all duration-300"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
