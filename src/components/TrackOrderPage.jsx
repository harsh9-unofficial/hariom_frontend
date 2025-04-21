import React, { useEffect, useState } from "react";
import { User, ClipboardList, Trash2, LogOut, X, ArrowLeft } from "lucide-react";
import axios from "axios";
import { USER_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const TrackOrderPage = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [activeTab, setActiveTab] = useState("profile");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    phone: "",
    dob: "",
    email: "",
  });
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Store full order details
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab !== "history") {
      setSelectedOrder(null); // Reset selected order when switching tabs
    }
  };

  const isActive = (tab) =>
    activeTab === tab
      ? "bg-[#558AFF] text-white font-medium"
      : "hover:bg-gray-100 text-black";

  // Utility function to get product image
  const getProductImage = (images) => {
    try {
      const imageArray = Array.isArray(images)
        ? images
        : JSON.parse(images || "[]");
      return imageArray[0]
        ? `${USER_BASE_URL}/${imageArray[0]}`
        : "/images/Product9.png";
    } catch (e) {
      console.error("Error parsing images:", e);
      return "/images/Product9.png";
    }
  };

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
      return;
    }

    // Fetch user data and order history in parallel
    const fetchData = async () => {
      try {
        const [userResponse, orderResponse] = await Promise.all([
          axios.get(`${USER_BASE_URL}/api/users/profile/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${USER_BASE_URL}/api/order/getuserorder/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUserData({
          fullname: userResponse.data.user.fullname || "",
          username: userResponse.data.user.username || "",
          phone: userResponse.data.user.phone || "",
          dob: userResponse.data.user.dob || "",
          email: userResponse.data.user.email || "",
        });
        setOrders(orderResponse.data || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        toast.error("Failed to load data.");
      }
    };

    fetchData();
  }, [userId, token, navigate]);

  // Fetch specific order details
  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(
        `${USER_BASE_URL}/api/order/${orderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedOrder(response.data);
    } catch (err) {
      console.error("Failed to fetch order details:", err);
      toast.error("Failed to load order details.");
    }
  };

  // Handle Delete Account
  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${USER_BASE_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.clear();
      toast.success("Account deleted successfully.");
      setShowModal(false);
      navigate("/signup");
    } catch (err) {
      toast.error("Failed to delete account.");
      console.error(err);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully.");
    setShowLogoutModal(false);
    navigate("/login");
  };

  // Order status steps
  const statusSteps = [
    { id: 1, name: "Ordered", status: 1 },
    { id: 2, name: "Processing", status: 2 },
    { id: 3, name: "Shipped", status: 3 },
    { id: 4, name: "Delivered", status: 4 },
    { id: 5, name: "Cancelled", status: 5 },
  ];

  return (
    <div className="container mx-auto px-2 md:px-4 lg:px-10 xl:px-8 py-12">
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
            <h2 className="font-medium text-2xl">Hi, {userData.fullname}</h2>
          </div>

          <div className="w-full space-y-1">
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

        {/* Right Side Content */}
        <div className="w-full md:w-2/3 lg:w-7/10 border border-gray-400 rounded-xl py-5 lg:py-10 px-3 md:px-4 lg:px-8 h-fit">
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Full Name</label>
                <input
                  type="text"
                  value={userData.fullname}
                  readOnly
                  className="w-full border border-gray-400 rounded-md py-3 px-4 bg-gray-100"
                />
              </div>
              <div>
                <label className="block mb-1">Username</label>
                <input
                  type="text"
                  value={userData.username}
                  readOnly
                  className="w-full border border-gray-400 rounded-md py-3 px-4 bg-gray-100"
                />
              </div>
              <div>
                <label className="block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={userData.phone}
                  readOnly
                  className="w-full border border-gray-400 rounded-md py-3 px-4 bg-gray-100"
                />
              </div>
              <div>
                <label className="block mb-1">DOB</label>
                <input
                  type="text"
                  value={userData.dob}
                  readOnly
                  className="w-full border border-gray-400 rounded-md py-3 px-4 bg-gray-100"
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  readOnly
                  className="w-full border border-gray-400 rounded-md py-3 px-4 bg-gray-100 text-gray-600"
                />
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Order History</h3>
              {selectedOrder ? (
                // Detailed Order View
                <div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="flex items-center gap-2 text-[#558AFF] mb-4 hover:underline"
                    aria-label="Back to order list"
                  >
                    <ArrowLeft size={18} />
                    Back to Orders
                  </button>
                  <h4 className="text-lg font-semibold mb-4">
                    Order #{selectedOrder.id}
                  </h4>
                  <div className="space-y-4">
                    {/* Order Items */}
                    {selectedOrder.OrderItems?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 border-b pb-4"
                      >
                        <img
                          src={getProductImage(item.Product?.images)}
                          alt={item.Product?.name || "Product"}
                          className="w-16 h-16 rounded-md"
                        />
                        <div>
                          <p className="font-medium">{item.Product?.name || "Unknown"}</p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-500">
                            Price: ₹{item.price.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Total: ₹{item.totalAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {/* Order Details */}
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        Placed on: {new Date(selectedOrder.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total: ₹{selectedOrder.totalPrice.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Shipping Address: {selectedOrder.address}, {selectedOrder.apt}, {selectedOrder.city}, {selectedOrder.state} {selectedOrder.postalCode}
                      </p>
                    </div>
                    {/* Order Status Progress Bar */}
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold mb-4">Order Status</h4>
                      <div className="flex items-center justify-between relative">
                        {statusSteps.map((step, index) => (
                          <div key={step.id} className="flex flex-col items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                selectedOrder.status >= step.status
                                  ? "bg-[#558AFF] text-white"
                                  : "bg-gray-200 text-gray-500"
                              }`}
                            >
                              {selectedOrder.status >= step.status ? "✓" : step.id}
                            </div>
                            <p className="text-sm mt-2">{step.name}</p>
                            {index < statusSteps.length - 1 && (
                              <div
                                className={`absolute top-3 h-1 w-1/5 ${
                                  selectedOrder.status > step.status
                                    ? "bg-[#558AFF]"
                                    : "bg-gray-200"
                                }`}
                                style={{
                                  left: `calc(${(index + 1) * 20}% - 10%)`,
                                }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : orders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
              ) : (
                // Order List View
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center gap-4 border-b pb-4"
                    >
                      <img
                        src={getProductImage(order.orderItems?.[0]?.Product?.images)}
                        alt={order.orderItems?.[0]?.Product?.name || "Product"}
                        className="w-16 h-16 rounded-md cursor-pointer"
                        onClick={() => fetchOrderDetails(order.id)}
                      />
                      <div>
                        <p className="font-medium">
                          Order #{order.id} -{" "}
                          {order.orderItems?.[0]?.Product?.name || "Unknown"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Placed on: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Total: ₹{order.totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "delete" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Delete Account</h3>
              <p className="text-red-500">This action is irreversible.</p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Delete My Account
              </button>
            </div>
          )}

          {activeTab === "logout" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Log Out</h3>
              <p>Are you sure you want to log out?</p>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="mt-4 bg-[#558AFF] text-white px-4 py-2 rounded cursor-pointer"
              >
                Confirm Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="delete-modal-title"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 id="delete-modal-title" className="text-lg font-semibold">
                Confirm Delete
              </h2>
              <button
                onClick={() => setShowModal(false)}
                aria-label="Close delete modal"
              >
                <X className="w-5 h-5 text-gray-600 cursor-pointer" />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete your account? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="logout-modal-title"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 id="logout-modal-title" className="text-lg font-semibold">
                Confirm Logout
              </h2>
              <button
                onClick={() => setShowLogoutModal(false)}
                aria-label="Close logout modal"
              >
                <X className="w-5 h-5 text-gray-600 cursor-pointer" />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-[#558AFF] text-white rounded cursor-pointer"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;