// src/components/Header.js
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { PiShoppingCart } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { RiUser3Line } from "react-icons/ri";
import { LuMenu } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";

const Header = ({ pageName }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const desktopUserMenuRef = useRef(null);
  const mobileUserMenuRef = useRef(null);

  const navigate = useNavigate();

  const isTransparent = pageName === "AboutUsPage";

  // Close mobile menu & check auth on route change
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    setIsAuthenticated(!!(token && userId));
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedOutsideDesktop =
        desktopUserMenuRef.current &&
        !desktopUserMenuRef.current.contains(e.target);

      const clickedOutsideMobile =
        mobileUserMenuRef.current &&
        !mobileUserMenuRef.current.contains(e.target);

      if (clickedOutsideDesktop && clickedOutsideMobile) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Product", path: "/products" },
    { name: "Combos", path: "/combos" },
    { name: "About us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header
      className={`w-full font-sans ${
        isTransparent ? "bg-transparent" : "bg-white shadow-lg"
      }`}
    >
      {/* Top Banner */}
      <div
        className={`${
          isTransparent ? "hidden" : "block"
        } bg-[#558AFF] text-white text-center py-2 text-sm md:text-md`}
      >
        Free shipping on all orders above $499
      </div>

      {/* Main Navigation */}
      <nav
        className={`container mx-auto flex justify-between items-center px-2 md:px-4 lg:px-10 xl:px-8 py-3 ${
          isTransparent ? "bg-transparent" : "bg-white"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/images/logo2.png"
              alt="Harlom Chemicals Logo"
              className="h-18 lg:h-18 xl:h-full mr-2 cursor-pointer"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-3xl focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <RxCross1 className="text-2xl mr-1" />
            ) : (
              <LuMenu />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 lg:space-x-10">
          {navLinks.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`${
                  isActive(item.path)
                    ? "text-[#558AFF]"
                    : isTransparent
                    ? "text-white"
                    : "text-black"
                } font-semibold hover:text-[#558AFF] text-xl md:text-lg lg:text-xl transition-colors`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Action Buttons */}
        <div
          className="hidden md:flex space-x-2 items-center relative"
          ref={desktopUserMenuRef}
        >
          <button className="text-white p-3 bg-[#558AFF] rounded-full text-xl focus:outline-none cursor-pointer">
            <GoSearch />
          </button>
          <Link
            to="/cart"
            className="text-white p-3 bg-[#558AFF] rounded-full text-xl focus:outline-none cursor-pointer"
          >
            <PiShoppingCart />
          </Link>
          <Link
            to="/wishlist"
            className="text-white p-3 bg-[#558AFF] rounded-full text-xl focus:outline-none cursor-pointer"
          >
            <GoHeart />
          </Link>

          {/* User Menu */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="text-white p-3 bg-[#558AFF] rounded-full text-xl focus:outline-none cursor-pointer"
              >
                <RiUser3Line />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    to="/track-order"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white p-3 bg-[#558AFF] rounded-full text-xl focus:outline-none cursor-pointer"
            >
              <RiUser3Line />
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isTransparent ? "bg-transparent" : "bg-white"
        } transition-all pb-4 text-center ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="space-y-4 py-4 px-6">
          {navLinks.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`${
                  isActive(item.path)
                    ? "text-[#558AFF]"
                    : isTransparent
                    ? "text-white"
                    : "text-black"
                } font-semibold hover:text-[#558AFF] text-xl transition-colors`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Action Buttons */}
        <div className="space-x-2 flex justify-center" ref={mobileUserMenuRef}>
          <button className="text-white p-3 bg-[#558AFF] rounded-full text-xl focus:outline-none cursor-pointer">
            <GoSearch />
          </button>
          <Link
            to="/cart"
            className="text-white p-3 bg-[#558AFF] rounded-full text-xl focus:outline-none cursor-pointer"
          >
            <PiShoppingCart />
          </Link>
          <Link
            to="/wishlist"
            className="text-white p-3 bg-[#558AFF] rounded-full text-xl focus:outline-none cursor-pointer"
          >
            <GoHeart />
          </Link>
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="text-white p-3 bg-[#558AFF] rounded-full text-xl focus:outline-none cursor-pointer"
              >
                <RiUser3Line />
              </button>
              {isUserMenuOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-28 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    to="/track-order"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-left"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-red-600 hover:bg-gray-100 text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white p-3 bg-[#558AFF] rounded-full text-xl focus:outline-none cursor-pointer"
            >
              <RiUser3Line />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
