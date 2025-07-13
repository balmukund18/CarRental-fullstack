import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import {
  FaHome,
  FaCarSide,
  FaClipboardList,
  FaTachometerAlt,
  FaUserCircle,
  FaBell,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } =
    useAppContext();

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [navbarSearch, setNavbarSearch] = useState("");
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Menu links with icons
  const menuLinksWithIcons = [
    { name: "Home", path: "/", icon: <FaHome className="inline mr-2" /> },
    {
      name: "Cars",
      path: "/cars",
      icon: <FaCarSide className="inline mr-2" />,
    },
    {
      name: "My Bookings",
      path: "/my-bookings",
      icon: <FaClipboardList className="inline mr-2" />,
    },
  ];

  return (
    <>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${
          location.pathname === "/" && "bg-light"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 group">
          <motion.img
            whileHover={{}}
            src={assets.logo}
            alt="logo"
            className="h-8 transition-all duration-200 group-hover:shadow-lg"
          />
        </Link>

        <div
          className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${
            location.pathname === "/" ? "bg-light" : "bg-white"
          } ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
        >
          {menuLinksWithIcons.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:text-primary ${
                location.pathname === link.path
                  ? "bg-primary/10 text-primary font-semibold"
                  : ""
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}

          <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56 bg-white transition-all duration-200 focus-within:shadow-md">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500 transition-all duration-200 focus:w-48"
              placeholder="Search cars"
              value={navbarSearch}
              onChange={(e) => setNavbarSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && navbarSearch.trim()) {
                  navigate(
                    `/cars?search=${encodeURIComponent(navbarSearch.trim())}`
                  );
                  setNavbarSearch("");
                }
              }}
            />
            <FaBell
              className="ml-2 text-gray-400 hover:text-primary transition-all duration-200 cursor-pointer"
              title="Notifications"
            />
          </div>

          <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
            <button
              onClick={() => (isOwner ? navigate("/owner") : changeRole())}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dull transition-all duration-200 shadow-sm cursor-pointer"
            >
              <FaTachometerAlt className="inline" />
              {isOwner ? "Dashboard" : "List cars"}
            </button>

            {/* Profile/User Icon with Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-borderColor hover:bg-primary/10 hover:text-primary transition-all duration-200 shadow-sm cursor-pointer"
                  onClick={() => setProfileDropdown((v) => !v)}
                >
                  <FaUserCircle className="text-2xl" />
                  <span className="hidden md:inline cursor-pointer">
                    {user.name?.split(" ")[0] || "Profile"}
                  </span>
                </button>
                {profileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-xl border border-white/70 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden glassy-dropdown"
                    style={{
                      boxShadow:
                        "0 8px 32px 0 rgba(37,99,235,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.08)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      right: "auto",
                      minWidth: "220px",
                      maxWidth: "90vw",
                    }}
                  >
                    <div className="w-1 h-full bg-primary absolute left-0 top-0 rounded-l-2xl opacity-70" />
                    <button
                      className="flex items-center gap-3 w-full text-left px-5 py-3 font-medium text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-150 focus:bg-primary/10 focus:text-primary text-base group"
                      onClick={() => {
                        setProfileDropdown(false);
                        navigate("/my-bookings");
                      }}
                    >
                      <FaClipboardList className="text-lg group-hover:scale-110 transition-transform" />
                      My Bookings
                    </button>
                    <button
                      className="flex items-center gap-3 w-full text-left px-5 py-3 font-medium text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-150 focus:bg-primary/10 focus:text-primary text-base group"
                      onClick={() => {
                        setProfileDropdown(false);
                        setShowProfileCard(true);
                      }}
                    >
                      <FaUserCircle className="text-lg group-hover:scale-110 transition-transform" />
                      Profile
                    </button>
                    <button
                      className="flex items-center gap-3 w-full text-left px-5 py-3 font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150 focus:bg-red-50 focus:text-red-600 text-base group border-t border-gray-100"
                      onClick={() => {
                        setProfileDropdown(false);
                        logout();
                      }}
                    >
                      <FaTimes className="text-lg group-hover:scale-110 transition-transform" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-primary-dull transition-all duration-200 shadow-sm cursor-pointer"
              >
                <FaUserCircle className="inline text-lg" />
                Login
              </button>
            )}
          </div>
        </div>

        {/* Animated Hamburger/Close Icon for Mobile */}
        <button
          className="sm:hidden cursor-pointer p-2 rounded-full hover:bg-primary/10 transition-all duration-200"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </motion.div>
      {/* Profile Card Modal */}
      {showProfileCard && user && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setShowProfileCard(false)}
        >
          <div
            className="relative bg-white rounded-3xl shadow-2xl p-8 w-[90vw] max-w-xs flex flex-col items-center text-center animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-primary text-xl"
              onClick={() => setShowProfileCard(false)}
            >
              <FaTimes />
            </button>
            <img
              src={user.image || assets.user_profile}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-primary/20 shadow mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {user.name}
            </h2>
            <p className="text-gray-500 mb-2">{user.email}</p>
            <p className="text-sm text-gray-400">
              Joined:{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : ""}
            </p>
          </div>
        </div>
      )}
      <style>{`
        .glassy-dropdown {
          box-shadow: 0 8px 32px 0 rgba(37,99,235,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.08);
        }
      `}</style>
    </>
  );
};

export default Navbar;
