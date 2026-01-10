import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaHome,
  FaUserCircle,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import ReadOnRouteLogo from "../../../Components/Logo/ReadOnRouteLogo";
import useAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() =>
        Swal.fire({
          icon: "success",
          title: "Logged out successfully",
          timer: 1200,
          showConfirmButton: false,
        })
      )
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Logout failed",
          text: error.message,
        })
      );
  };

  /* ===================== Theme Control ===================== */
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = (e) => setTheme(e.target.checked ? "dark" : "light");

  /* ===================== Nav Links ===================== */
  // eslint-disable-next-line no-unused-vars
  const navItem = (to, label, Icon) => (
    <li key={label}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 transition-all duration-300 ${
            isActive
              ? "text-primary font-semibold border-b-2 border-primary"
              : "hover:text-primary"
          }`
        }
      >
        <Icon size={16} />
        {label}
      </NavLink>
    </li>
  );

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="navbar playfair sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b border-base-300 px-6"
    >
      {/* ================= Left ================= */}
      <div className="navbar-start gap-3">
        {/* Mobile dropdown / hamburger */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">
                <FaHome className="inline mr-2" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/allbooks">
                <FaBookOpen className="inline mr-2" />
                Books
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FaTachometerAlt className="inline mr-2" />
                  Dashboard
              </Link>
            </li>
           
            {user ? (
              <li>
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-2 w-full text-base-content"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="flex items-center gap-2 w-full text-base-content"
                >
                  <FaUserCircle /> Login
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ReadOnRouteLogo />
        </Link>
      </div>

      {/* ================= Center / Desktop Menu ================= */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-base-content gap-2">
          {navItem("/", "Home", FaHome)}
          {navItem("/allbooks", "Books", FaBookOpen)}
          {navItem("/dashboard", "Dashboard", FaTachometerAlt)}
        </ul>
      </div>

      {/* ================= Right ================= */}
      <div className="navbar-end flex items-center gap-3">
        {/* Theme Toggle */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={handleToggle}
          />
          {/* Sun */}
          <svg
            className="swap-off h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          {/* Moon */}
          <svg
            className="swap-on h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        {/* User Avatar / Login */}
        {user ? (
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
            <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  className="w-9 h-9 rounded-full object-cover border border-base-300"
                />
              ) : (
                <FaUserCircle size={34} />
              )}
            </div>
            <button
              onClick={handleLogOut}
              className="btn btn-sm bg-primary text-primary-content hover:bg-accent"
            >
              <FaSignOutAlt />
            </button>
          </motion.div>
        ) : (
          <Link
            to="/login"
            className="btn btn-sm bg-primary text-primary-content hover:bg-accent"
          >
            Log In
          </Link>
        )}
      </div>
    </motion.nav>
  );
};

export default NavBar;
