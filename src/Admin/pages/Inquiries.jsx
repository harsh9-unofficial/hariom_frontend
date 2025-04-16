import React, { useState, useEffect } from "react";
import {
  TrashIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  UserIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { USER_BASE_URL } from "../../config";
import { toast } from "react-hot-toast";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [expandedMessages, setExpandedMessages] = useState({});

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${USER_BASE_URL}/inquiry/getall`);
      setInquiries(response.data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (inquiryId) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await axios.delete(`${USER_BASE_URL}/inquiry/remove/${inquiryId}`);
        fetchInquiries();
        toast.success("Inquiry Deleted...");
      } catch (error) {
        toast.error("Error deleting Inquiry");
        console.error("Error deleting inquiry:", error);
      }
    }
  };

  // Toggle message expansion
  const toggleExpandMessage = (inquiryId) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [inquiryId]: !prev[inquiryId],
    }));
  };

  // Filter inquiries based on search
  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.inquiryType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInquiries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Message display with expand/collapse
  const renderMessage = (message, inquiryId) => {
    const isExpanded = expandedMessages[inquiryId];
    const displayMessage = isExpanded
      ? message
      : `${message.substring(0, 50)}${message.length > 50 ? "..." : ""}`;

    return (
      <div className="flex flex-col">
        <div
          className={`text-sm text-gray-500 ${
            isExpanded ? "" : "line-clamp-2"
          }`}
        >
          {displayMessage}
        </div>
        {message.length > 100 && (
          <button
            onClick={() => toggleExpandMessage(inquiryId)}
            className="text-xs text-indigo-600 hover:text-indigo-800 mt-1 self-start"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    );
  };

  // Inquiry type badge colors
  const getInquiryTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "general":
        return "bg-blue-100 text-blue-800";
      case "product":
        return "bg-purple-100 text-purple-800";
      case "service":
        return "bg-green-100 text-green-800";
      case "support":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Customer Inquiries</h1>

        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search inquiries..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ArrowPathIcon className="h-12 w-12 text-gray-400 animate-spin" />
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No inquiries found</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((inquiry) => (
                    <tr key={inquiry.inquiryId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <UserIcon className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" />
                          <div className="text-sm font-medium text-gray-900">
                            {inquiry.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center">
                            <EnvelopeIcon className="flex-shrink-0 h-4 w-4 text-gray-400 mr-1" />
                            <a
                              href={`mailto:${inquiry.email}`}
                              className="text-xs text-blue-600 hover:underline"
                            >
                              {inquiry.email}
                            </a>
                          </div>
                          <div className="flex items-center">
                            <PhoneIcon className="flex-shrink-0 h-4 w-4 text-gray-400 mr-1" />
                            <a
                              href={`tel:${inquiry.phone}`}
                              className="text-xs text-gray-600"
                            >
                              {inquiry.phone}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getInquiryTypeColor(
                            inquiry.inquiryType
                          )}`}
                        >
                          {inquiry.inquiryType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start">
                          <ChatBubbleLeftIcon className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2 mt-1" />
                          {renderMessage(inquiry.message, inquiry.inquiryId)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(inquiry.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDelete(inquiry.inquiryId)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t rounded-b-lg">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredInquiries.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{filteredInquiries.length}</span>{" "}
                results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-3 py-1 border rounded flex items-center ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeftIcon className="h-4 w-4 mr-1" />
                  Previous
                </button>
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 border rounded ${
                          currentPage === pageNum
                            ? "bg-indigo-50 text-indigo-600 border-indigo-500"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="px-3 py-1">...</span>
                  )}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className={`px-3 py-1 border rounded hover:bg-gray-50`}
                    >
                      {totalPages}
                    </button>
                  )}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 border rounded flex items-center ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Next
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Inquiries;
