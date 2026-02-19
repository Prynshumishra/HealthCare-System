import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItemClass = ({ isActive }) =>
    `relative px-2 py-1 transition ${
      isActive ? "text-primary font-semibold" : "hover:text-primary"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 h-20 text-md font-medium">

        {/* Logo */}
        <img
          src={assets.logo}
          alt="logo"
          className="w-40 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 font-medium">
          <NavLink to="/" className={navItemClass}>HOME</NavLink>
          <NavLink to="/doctors" className={navItemClass}>ALL DOCTORS</NavLink>
          <NavLink to="/about" className={navItemClass}>ABOUT</NavLink>
          <NavLink to="/contact" className={navItemClass}>CONTACT</NavLink>
          <NavLink to="/careers" className={navItemClass}>CAREERS</NavLink>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Authenticated */}
          {token && userData ? (
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src={userData.image}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <img src={assets.dropdown_icon} alt="" className="w-2.5" />
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 mt-3 hidden group-hover:block">
                <div className="w-48 bg-white border rounded-md shadow-lg p-4 flex flex-col gap-2 text-gray-600">
                  <button onClick={() => navigate("/my-profile")} className="text-left hover:text-primary">
                    My Profile
                  </button>
                  <button onClick={() => navigate("/my-appointments")} className="text-left hover:text-primary">
                    My Appointments
                  </button>
                  <button onClick={logout} className="text-left text-red-500 hover:underline">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block bg-primary text-white px-6 py-2.5 rounded-full hover:opacity-90 transition"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Icon */}
          <img
            src={assets.menu_icon}
            alt=""
            className="w-6 md:hidden cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-50 transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        } transition-transform md:hidden`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b">
          <img src={assets.logo} className="w-32" alt="" />
          <img
            src={assets.cross_icon}
            className="w-6 cursor-pointer"
            onClick={() => setShowMenu(false)}
            alt=""
          />
        </div>

        <nav className="flex flex-col items-center gap-4 mt-8 text-lg font-medium">
          {[
            ["/", "HOME"],
            ["/doctors", "ALL DOCTORS"],
            ["/about", "ABOUT"],
            ["/contact", "CONTACT"],
            ["/careers", "CAREERS"],
          ].map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setShowMenu(false)}
              className="px-6 py-2 rounded hover:bg-gray-100"
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
