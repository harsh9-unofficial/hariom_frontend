// src/admin/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  ChartBarSquareIcon as ChartBarIcon,
  ShoppingBagIcon,
  Cog6ToothIcon as CogIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon as ChatAltIcon,
  InboxIcon,
  XMarkIcon as XIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ onClose }) => {
  const navItems = [
    { name: "Dashboard", path: "/admin", icon: ChartBarIcon },
    { name: "Categories", path: "/admin/categories", icon: BookOpenIcon },
    { name: "Products", path: "/admin/products", icon: ShoppingBagIcon },
    { name: "Users", path: "/admin/users", icon: ChatAltIcon },
    { name: "Reviews", path: "/admin/reviews", icon: CogIcon },
    { name: "Contact", path: "/admin/contact", icon: ChatAltIcon },
    { name: "Orders", path: "/admin/orders", icon: InboxIcon },
  ];

  const handleNavClick = () => {
    if (onClose && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center w-[150px] h-[110px] p-8">
        <img src="/images/logo2.png" alt="Logo" className="w-20" />
      </div>

      {/* Mobile close button */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="text-lg font-semibold">Admin Panel</div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={handleNavClick}
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    isActive
                      ? "text-indigo-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
