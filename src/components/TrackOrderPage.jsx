import React, { useState } from "react";
import { User, ClipboardList, Trash2, LogOut } from "lucide-react";

const TrackOrderPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const isActive = (tab) =>
    activeTab === tab
      ? "bg-[#558AFF] text-white font-medium"
      : "hover:bg-gray-100 text-black";

  const currentStep = 2;
  return (
    <div className="container mx-auto px-2 py-12">
      <h1 className="text-2xl font-semibold mb-1">Track Your Order</h1>
      <p className="text-gray-500 mb-6">Home / Track Your Order</p>

      <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 lg:w-3/10 h-fit border border-gray-400 rounded-xl p-4 lg:p-10 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/images/image.png"
              alt="Profile"
              className="w-18 h-18 rounded-full"
            />
            <h2 className="font-medium text-2xl">Hii, Rahi</h2>
          </div>

          <div className="w-full space-y-1 ">
            <button
              onClick={() => handleTabClick("profile")}
              className={`flex items-center gap-6 w-full text-gray-500 px-5 py-3 rounded-md transition cursor-pointer ${isActive(
                "profile"
              )}`}
            >
              <User size={18} />
              My Profile
            </button>
            <button
              onClick={() => handleTabClick("history")}
              className={`flex items-center gap-6 w-full text-gray-500 px-5 py-3 rounded-md transition cursor-pointer ${isActive(
                "history"
              )}`}
            >
              <ClipboardList size={18} />
              Order History
            </button>
            <button
              onClick={() => handleTabClick("delete")}
              className={`flex items-center gap-6 w-full text-gray-500 px-5 py-3 rounded-md transition cursor-pointer ${isActive(
                "delete"
              )}`}
            >
              <Trash2 size={18} />
              Delete Account
            </button>
            <button
              onClick={() => handleTabClick("logout")}
              className={`flex items-center gap-6 w-full text-gray-500 px-5 py-3 rounded-md transition cursor-pointer ${isActive(
                "logout"
              )}`}
            >
              <LogOut size={18} />
              Log out
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="w-full md:w-2/3 lg:w-7/10 border border-gray-400 rounded-xl py-5 lg:py-10 px-3 md:px-4 lg:px-8 h-fit">
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block  mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-400 rounded-md py-3 px-4"
                />
              </div>
              <div>
                <label className="block  mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-400 rounded-md py-3 px-4"
                />
              </div>
              <div>
                <label className="block  mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="Number"
                  className="w-full border border-gray-400 rounded-md py-3 px-4"
                />
              </div>
              <div>
                <label className="block  mb-1">DOB</label>
                <input
                  type="text"
                  placeholder="12/12/2006"
                  className="w-full border border-gray-400 rounded-md py-3 px-4"
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value="adminadm123@gmail.com"
                  disabled
                  className="w-full border border-gray-400 rounded-md py-3 px-4 bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-6">
              {/* Stepper */}
              <div className="relative flex justify-between items-center mb-10 md:px-4">
                {/* Connecting background line */}
                <div className="absolute top-4 left-[calc(12.5%+16px)] right-[calc(12.5%+16px)] h-0.5 bg-gray-300 z-0"></div>

                {/* Progress line */}
                <div
                  className="absolute top-4 left-[calc(12.5%+2px)] h-0.5 bg-blue-500 z-10 transition-all duration-500"
                  style={{ width: `calc(25% * ${currentStep - 1})` }}
                ></div>

                {/* Stepper circles */}
                {["Ordered", "Shipping", "Out of delivery", "Delivered"].map(
                  (step, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center relative z-20 w-1/4"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-colors duration-300 ${
                            isCompleted || isCurrent
                              ? "bg-blue-500 text-white border-blue-500"
                              : "bg-white text-gray-400 border-gray-300"
                          }`}
                        >
                          {isCompleted || isCurrent ? "✓" : stepNumber}
                        </div>
                        <p className="text-sm mt-2 text-center">{step}</p>
                      </div>
                    );
                  }
                )}
              </div>

              {/* Order Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-400 rounded-md p-4">
                  <h4 className="font-medium">Delivery by Hari om Chemical</h4>
                  <p className="text-sm text-gray-500">
                    Tracking ID: 1234789412345689
                  </p>
                </div>
                <div className="border border-gray-400 rounded-md p-4">
                  <h4 className="font-medium">Shipping Address</h4>
                  <p className="text-sm text-gray-500">
                    123 Gold District New York, NY 10001
                  </p>
                </div>
              </div>

              {/* Product Image */}
              <div>
                <img
                  src="/images/Product1.png"
                  alt="Cleaning Products"
                  className="rounded-md shadow"
                />
              </div>
            </div>
          )}

          {activeTab === "delete" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Delete Account</h3>
              <p className="text-red-500">This action is irreversible.</p>
              <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete My Account
              </button>
            </div>
          )}

          {activeTab === "logout" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Log Out</h3>
              <p>Are you sure you want to log out?</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Confirm Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
