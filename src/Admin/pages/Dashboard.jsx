import React, { useState, useEffect } from "react";
import {
  ArrowPathIcon,
  ShoppingBagIcon,
  CogIcon,
  InboxIcon,
  BookOpenIcon,
  PhoneIcon,
  UserIcon,
  CalendarIcon,
  EnvelopeIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { USER_BASE_URL } from "../../config";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    services: 0,
    blogs: 0,
    inquiries: 0,
    contacts: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [productsRes, servicesRes, blogsRes, inquiriesRes, contactsRes] =
          await Promise.all([
            axios.get(`${USER_BASE_URL}/product/getall`),
            axios.get(`${USER_BASE_URL}/service/getall`),
            axios.get(`${USER_BASE_URL}/blog/getall`),
            axios.get(`${USER_BASE_URL}/inquiry/getall`),
            axios.get(`${USER_BASE_URL}/contact/getall`),
          ]);

        // Get 5 most recent inquiries
        const sortedInquiries = [...inquiriesRes.data]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setStats({
          products: productsRes.data.length,
          services: servicesRes.data.length,
          blogs: blogsRes.data.length,
          inquiries: inquiriesRes.data.length,
          contacts: contactsRes.data.length,
        });

        setRecentInquiries(sortedInquiries);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Refresh data every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [productsRes, servicesRes, blogsRes, inquiriesRes, contactsRes] =
        await Promise.all([
          axios.get(`${USER_BASE_URL}/product/getall`),
          axios.get(`${USER_BASE_URL}/service/getall`),
          axios.get(`${USER_BASE_URL}/blog/getall`),
          axios.get(`${USER_BASE_URL}/inquiry/getall`),
          axios.get(`${USER_BASE_URL}/contact/getall`),
        ]);

      const sortedInquiries = [...inquiriesRes.data]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setStats({
        products: productsRes.data.length,
        services: servicesRes.data.length,
        blogs: blogsRes.data.length,
        inquiries: inquiriesRes.data.length,
        contacts: contactsRes.data.length,
      });

      setRecentInquiries(sortedInquiries);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const statsData = [
    {
      name: "Total Products",
      value: stats.products,
      icon: ShoppingBagIcon,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      name: "Total Services",
      value: stats.services,
      icon: CogIcon,
      color: "bg-green-100 text-green-600",
    },
    {
      name: "Total Blogs",
      value: stats.blogs,
      icon: BookOpenIcon,
      color: "bg-red-100 text-red-600",
    },
    {
      name: "New Inquiries",
      value: stats.inquiries,
      icon: InboxIcon,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      name: "New Contacts",
      value: stats.contacts,
      icon: PhoneIcon,
      color: "bg-pink-100 text-pink-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Last updated: {lastUpdated}
          </span>
          <button
            onClick={refreshData}
            disabled={loading}
            className={`p-2 rounded-full ${
              loading ? "bg-gray-100" : "bg-gray-200 hover:bg-gray-300"
            }`}
            title="Refresh data"
          >
            <ArrowPathIcon
              className={`h-5 w-5 text-gray-600 ${
                loading ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {statsData.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {loading ? "--" : stat.value}
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activity Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white shadow rounded-lg overflow-hidden lg:col-span-2">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Inquiries
            </h3>
            <span className="text-sm text-gray-500">Last 5 inquiries</span>
          </div>
          <div className="bg-white overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <ArrowPathIcon className="h-8 w-8 text-gray-400 animate-spin" />
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {recentInquiries.length > 0 ? (
                  recentInquiries.map((inquiry) => (
                    <li
                      key={inquiry.inquiryId}
                      className="px-4 py-4 sm:px-6 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {inquiry.inquiryType} Inquiry
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              inquiry.status === "new"
                                ? "bg-green-100 text-green-800"
                                : inquiry.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {inquiry.status || "new"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex items-center">
                          <UserIcon className="flex-shrink-0 h-4 w-4 text-gray-400 mr-1" />
                          <p className="text-sm text-gray-500">
                            {inquiry.name}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <CalendarIcon className="flex-shrink-0 h-4 w-4 text-gray-400 mr-1" />
                          {formatDate(inquiry.createdAt)}
                        </div>
                      </div>
                      <div className="mt-2 flex items-start">
                        <ChatBubbleLeftIcon className="flex-shrink-0 h-4 w-4 text-gray-400 mr-1 mt-1" />
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {inquiry.message}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center">
                        <EnvelopeIcon className="flex-shrink-0 h-4 w-4 text-gray-400 mr-1" />
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          {inquiry.email}
                        </a>
                        <PhoneIcon className="flex-shrink-0 h-4 w-4 text-gray-400 ml-3 mr-1" />
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="text-xs text-gray-600"
                        >
                          {inquiry.phone}
                        </a>
                      </div>
                    </li>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No recent inquiries</p>
                  </div>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Quick Actions
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <Link
                to="/admin/products"
                className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <ShoppingBagIcon className="h-5 w-5 text-indigo-600 mr-3" />
                  <span>Manage Products</span>
                </div>
              </Link>
              <Link
                to="/admin/services"
                className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <CogIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span>Manage Services</span>
                </div>
              </Link>
              <Link
                to="/admin/blogs"
                className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <BookOpenIcon className="h-5 w-5 text-red-600 mr-3" />
                  <span>Manage Blogs</span>
                </div>
              </Link>
              <Link
                to="/admin/inquiries"
                className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <InboxIcon className="h-5 w-5 text-yellow-600 mr-3" />
                  <span>View All Inquiries</span>
                </div>
              </Link>
              <Link
                to="/admin/contact"
                className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-pink-600 mr-3" />
                  <span>View All Contacts</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
