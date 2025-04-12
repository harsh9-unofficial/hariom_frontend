import { FaFacebookF } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#558AFF] text-white px-2 md:px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-0 py-4 md:py-7 px-2 md:px-4 lg:px-10 xl:px-8 ">
        {/* Logo and Description */}
        <div className="space-y-4 col-span-1 lg:col-span-2 lg:w-[70%] pl-0 md:pl-4 lg:pl-0">
          <Link to="/">
            <img
              src="/images/logo3.png"
              alt="Hariom Chemicals Logo"
              className="h-auto"
            />
          </Link>
          <p>
            Premium cleaning solutions for every home and business. Eco-friendly
            and effective.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Instagram"
              className="bg-white p-2 rounded-full"
            >
              <FaInstagram className="text-[#558AFF] text-2xl" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="bg-white p-2 rounded-full"
            >
              <FiYoutube className="text-[#558AFF] text-2xl" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="bg-white p-2 rounded-full"
            >
              <FaFacebookF className="text-[#558AFF] text-2xl" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1 pl-0 md:pl-4 lg:pl-0">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                All Product
              </Link>
            </li>
            <li>
              <Link to="/combos" className="hover:underline">
                Combos
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="col-span-1 pl-0 md:pl-4 lg:pl-0">
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/track-order" className="hover:underline">
                Track Order
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Return & Exchange
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="col-span-1 pl-0 md:pl-4 lg:pl-0">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li>123, Gold District New York, NY 10001</li>
            <li>Email: info@adminadmn12.com</li>
            <li>Phone: +1 (555) 123-4567</li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-6 border-t border-white/30 pt-4 text-center text-sm py-4">
        © 2025 HARIOM CHEMCAL. All rights reserved.
      </div>
    </footer>
  );
}
