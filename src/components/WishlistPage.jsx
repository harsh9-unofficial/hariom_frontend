import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Gold Infinity Ring 1",
      price: 120,
      image: "/images/Product1.png",
    },
    {
      id: 2,
      name: "Gold Infinity Ring 2",
      price: 120,
      image: "/images/Product1.png",
    },
  ]);

  // Function to delete an item from the wishlist
  const deleteItem = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold mb-2">Wishlist</h1>
      <p className="text-gray-500 mb-6 text-lg">Home / Wishlist</p>

      {/* If wishlist is empty, show a message */}
      {wishlistItems.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          Your wishlist is currently empty.
        </div>
      ) : (
        <>
          {/* Table headers (visible on medium+) */}
          <div className="hidden md:grid grid-cols-7 font-semibold text-gray-600 border-b border-gray-300 pb-2">
            <div className="col-span-1">Product</div>
            <div className="col-span-4">Description</div>
            <div>Total</div>
            <div className="text-center">Actions</div>
          </div>

          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:grid md:grid-cols-7 items-center gap-4 py-6 border-b border-gray-300"
            >
              {/* Product Image */}
              <div className="col-span-1 flex justify-center md:justify-start">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded object-cover"
                />
              </div>

              {/* Description */}
              <div className="col-span-2 text-center md:text-left">
                <p className="text-lg font-medium">{item.name}</p>
              </div>

              {/* Add To Cart Button */}
              <div className="col-span-2 flex justify-center md:justify-start">
                <Link to="/cart">
                  <button className="bg-[#558AFF] text-white px-6 py-2 sm:px-10 sm:py-3 rounded text-sm cursor-pointer transition">
                    Add To Cart
                  </button>
                </Link>
              </div>

              {/* Total Price */}
              <div className="text-lg font-medium text-center md:text-left">
                ₹{item.price.toFixed(2)}
              </div>

              {/* Actions (Delete) */}
              <div className="flex justify-center">
                <Trash2
                  className="text-gray-600 hover:text-red-500 cursor-pointer"
                  onClick={() => deleteItem(item.id)} // Trigger delete on click
                />
              </div>
            </div>
          ))}
        </>
      )}

      {/* Continue Shopping Button */}
      <div className="mt-8">
        <button className="flex items-center gap-4 border border-gray-300 px-4 py-2 rounded cursor-pointer transition">
          <FaChevronLeft />
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default WishlistPage;
