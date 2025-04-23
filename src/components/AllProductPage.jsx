import React, { useState, useEffect } from "react";
import { PiShoppingCart } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios"; // Import axios
import { USER_BASE_URL } from "../config";

const AllProductPage = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: null, max: null });
  const [selectedRatings, setSelectedRatings] = useState([]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${USER_BASE_URL}/api/products/all-products`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle adding product to wishlist using axios
  const handleAddToWishlist = async (productId, e) => {
    e.stopPropagation(); // Prevent navigating to product details page

    if (!userId || !token) {
      toast.error("Please log in to add items to your wishlist.");
      return;
    }

    try {
      const response = await axios.post(
        `${USER_BASE_URL}/api/wishlist/add`,
        { productId, userId },
        {
          headers: {
            // Include authorization token if required, e.g.:
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Product added to wishlist!");
      navigate("/wishlist");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error adding product to wishlist"
      );
    }
  };

  // Function to handle adding product to cart
  const handleAddToCart = async (productId, e) => {
    e.stopPropagation();

    if (!userId || !token) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    try {
      const response = await axios.post(
        `${USER_BASE_URL}/api/cart/add`,
        { productId, userId, quantity: 1 }, // Default quantity of 1
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Product added to cart!");
      navigate("/cart");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error adding product to cart"
      );
    }
  };

  const handleCategoryToggle = (cat) => {
    setSelectedCategories((prev) => {
      if (cat === "All Purpose") {
        // If All Purpose is selected, only include it
        return prev.includes(cat) ? [] : ["All Purpose"];
      } else {
        // If another category is selected, exclude All Purpose and toggle the selected category
        const withoutAllPurpose = prev.filter((c) => c !== "All Purpose");
        return withoutAllPurpose.includes(cat)
          ? withoutAllPurpose.filter((c) => c !== cat)
          : [...withoutAllPurpose, cat];
      }
    });
  };

  const handleRatingToggle = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const filteredProducts = products.filter((product) => {
    // Category filter
    const inCategory =
      selectedCategories.length === 0 || // Show all products if no categories are selected
      selectedCategories.includes(product.Category?.name); // Match selected categories exactly
  
    // Price range filter
    const inPriceRange =
      (priceRange.min === null || product.price >= priceRange.min) &&
      (priceRange.max === null || product.price <= priceRange.max);
  
    // Rating filter
    const inRating =
      selectedRatings.length === 0 ||
      selectedRatings.some((r) => product.averageRatings >= r);
  
    return inCategory && inPriceRange && inRating;
  });

  const categories = [
    "All Purpose",
    "Kitchen",
    "Bathroom",
    "Floor",
    "Glass",
    "Laundry",
  ];

  if (loading) {
    return (
      <section className="container mx-auto py-12 px-2 md:px-4 lg:px-10 xl:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
          All Products
        </h2>
        <p className="text-lg md:text-xl text-gray-500 mb-6">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto py-12 px-2 md:px-4 lg:px-10 xl:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
          All Products
        </h2>
        <p className="text-lg md:text-xl text-red-500 mb-6">Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-12 px-2 md:px-4 lg:px-10 xl:px-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
        All Products
      </h2>
      <p className="text-lg md:text-xl text-gray-500 mb-6">
        Home / All Products
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 space-y-4 md:space-y-0 md:gap-4">
        {/* Sidebar */}
        <aside className="lg:col-span-2 xl:col-span-2 p-1 md:p-0 lg:p-4 py-4 border border-[#558bff81] rounded-lg space-y-4 text-sm bg-white h-fit">
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-xl lg:text-2xl pt-4 px-4">
              Categories
            </h3>
            <ul className="p-2 px-4">
              {categories.map((cat, index) => (
                <li key={index}>
                  <label className="flex items-center space-x-2 py-1">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                      className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 accent-[#558AFF]"
                    />
                    <span className="text-lg lg:text-xl text-gray-400 font-medium">
                      {cat}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="pb-2 px-4">
            <h3 className="font-semibold mb-2 text-xl lg:text-2xl">
              Price Range
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-base lg:text-lg text-gray-500">
                    Min
                  </span>
                  <input
                    type="text"
                    value={priceRange.min ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPriceRange({
                        ...priceRange,
                        min: value === "" ? null : parseInt(value) || 0,
                      });
                    }}
                    placeholder="₹0"
                    className="border border-gray-400 rounded px-2 py-2 lg:py-3 w-full text-base lg:text-lg"
                  />
                </div>
                <div>
                  <span className="text-base lg:text-lg text-gray-500">
                    Max
                  </span>
                  <input
                    type="text"
                    value={priceRange.max ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPriceRange({
                        ...priceRange,
                        max: value === "" ? null : parseInt(value) || 9999999,
                      });
                    }}
                    placeholder="₹2000"
                    className="border border-gray-400 rounded px-2 py-2 lg:py-3 w-full text-base lg:text-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="pb-4 px-4">
            <h3 className="font-semibold mb-2 text-xl lg:text-2xl">Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3].map((stars) => (
                <label key={stars} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(stars)}
                    onChange={() => handleRatingToggle(stars)}
                    className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 accent-[#558AFF]"
                  />
                  <span className="text-2xl lg:text-3xl flex items-center">
                    <span className="text-[#558AFF]">{"★".repeat(stars)}</span>
                    <span className="text-gray-400">
                      {"☆".repeat(5 - stars)}
                    </span>
                    {stars !== 5 && (
                      <span className="text-base text-gray-400 ml-1">
                        {" "}
                        & Up
                      </span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="col-span-2 lg:col-span-4 xl:col-span-6 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
          {filteredProducts.length === 0 ? (
            <p className="text-lg text-gray-500 col-span-full">
              No products match the selected filters.
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative rounded-xl border border-[#558bffb3] overflow-hidden transition h-fit cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative">
                  <img
                    src={`${USER_BASE_URL}/${product.images[0]}`}
                    alt={product.name}
                    className="w-full bg-blue-100"
                    onError={(e) => {
                      e.target.src = "/fallback-image.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-15 transition-opacity duration-300" />

                  {/* Icons on Hover */}
                  <div
                    className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300 invisible md:visible"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => handleAddToWishlist(product.id, e)}
                      className="text-white p-3 bg-[#558AFF] text-2xl rounded-full focus:outline-none cursor-pointer"
                    >
                      <GoHeart />
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(product.id, e)}
                      className="text-white p-3 bg-[#558AFF] text-2xl rounded-full focus:outline-none cursor-pointer"
                    >
                      <PiShoppingCart />
                    </button>
                  </div>
                </div>
                <div className="py-4 px-3">
                  <h3 className="text-sm font-medium text-black truncate whitespace-nowrap overflow-hidden">
                    {product.name}
                  </h3>
                  <p className="text-[#558AFF] text-sm font-semibold mt-1">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AllProductPage;
