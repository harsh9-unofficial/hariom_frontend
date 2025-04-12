// src/components/Header.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { PiShoppingCart } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { RiUser3Line } from "react-icons/ri";
import { LuMenu } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";

const Header = ({ pageName }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isTransparent = pageName === "AboutUsPage";

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Product", path: "/products" },
    { name: "Combos", path: "/combos" },
    { name: "About us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

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
        className={`container mx-auto flex justify-between items-center  px-2 md:px-4 lg:px-10 xl:px-8  py-3 ${
          isTransparent ? "bg-transparent" : "bg-white"
        }`}
      >
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
        <div className="hidden md:flex space-x-2">
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
          <Link
            to="/login"
            className="text-white p-3 bg-[#558AFF] rounded-full text-xl focus:outline-none cursor-pointer"
          >
            <RiUser3Line />
          </Link>
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
        <div className="space-x-2 flex justify-center">
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
          <Link
            to="/login"
            className="text-white p-3 bg-[#558AFF] rounded-full text-xl focus:outline-none cursor-pointer"
          >
            <RiUser3Line />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
