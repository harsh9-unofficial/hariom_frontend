import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleTogglePassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2">
      {/* Logo */}
      <div className="mb-6">
        <Link to="/">
          <img
            src="/images/logo2.png"
            alt="Hari Om Chemicals Logo"
            className="w-28 h-auto mx-auto"
          />
        </Link>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-xl space-y-4">
        {/* FullName */}
        <input
          type="text"
          placeholder="Fullname"
          className="w-full border border-gray-300 rounded-md px-4 py-5 text-base focus:outline-none focus:ring-2 focus:ring-[#558AFF] placeholder-gray-700 placeholder:font-semibold"
        />

        {/* UserName */}
        <input
          type="text"
          placeholder="Username"
          className="w-full border border-gray-300 rounded-md px-4 py-5 text-base focus:outline-none focus:ring-2 focus:ring-[#558AFF] placeholder-gray-700 placeholder:font-semibold"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-gray-300 rounded-md px-4 py-5 text-base focus:outline-none focus:ring-2 focus:ring-[#558AFF] placeholder-gray-700 placeholder:font-semibold"
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password input type
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-5 text-base pr-10 focus:outline-none focus:ring-2 focus:ring-[#558AFF] placeholder-gray-700 placeholder:font-semibold"
          />
        </div>

        {/* Repeat Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password input type
            placeholder="Repeat Password"
            className="w-full border border-gray-300 rounded-md px-4 py-5 text-base pr-10 focus:outline-none focus:ring-2 focus:ring-[#558AFF] placeholder-gray-700 placeholder:font-semibold"
          />
          <button
            type="button"
            onClick={handleTogglePassword} // Toggle visibility on click
            className="absolute right-3 top-6"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-gray-800 cursor-pointer" />
            ) : (
              <Eye className="w-5 h-5 text-gray-800 cursor-pointer" />
            )}
          </button>
        </div>

        {/* Login Button */}
        <button className="w-full bg-[#558AFF] text-white py-4 rounded-md cursor-pointer">
          Sign Up
        </button>

        {/* Bottom Link */}
        <div className="text-center text-md text-gray-500 mt-4">
          Can't Sign up?{" "}
          <Link to="/login">
            <span className="text-[#558AFF] cursor-pointer">
              Log in an account
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
