import React, { useState, useEffect } from "react";
import { PiShoppingCart } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { USER_BASE_URL } from "../config";

const CategoryProducts = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { categoryName } = useParams();

  const formattedCategoryName = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "All Products";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${USER_BASE_URL}/api/products/category/${categoryName}`
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
  }, [categoryName]); // Add categoryName as dependency

  // Function to handle adding product to wishlist using axios
  const handleAddToWishlist = async (productId, e) => {
    e.stopPropagation();

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
        { productId, userId, quantity: 1 },
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

  if (loading) {
    return (
      <section className="container mx-auto py-12 px-2 md:px-4 lg:px-10 xl:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
          {formattedCategoryName}
        </h2>
        <p className="text-lg md:text-xl text-gray-500 mb-6">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto py-12 px-2 md:px-4 lg:px-10 xl:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
          {formattedCategoryName}
        </h2>
        <p className="text-lg md:text-xl text-red-500 mb-6">Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-12 px-2 md:px-4 lg:px-10 xl:px-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
        {formattedCategoryName}
      </h2>
      <p className="text-lg md:text-xl text-gray-500 mb-6">
        Home / {formattedCategoryName}
      </p>

      {/* Products Grid */}
      <div className="grid grid-cols-4 gap-3 md:gap-4">
        {products.length === 0 ? (
          <p className="text-lg text-gray-500 col-span-full">
            No products available.
          </p>
        ) : (
          products.map((product) => (
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
    </section>
  );
};

export default CategoryProducts;
