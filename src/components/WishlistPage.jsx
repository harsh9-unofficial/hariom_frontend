import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

// Empty Cart UI
function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 gap-5 xl:gap-8 2xl:gap-5">
      <h2 className="text-xl font-semibold mb-2">
        Your Wishlist is Currently Empty.
      </h2>
      <Link to="/products">
        <button className="bg-[#558AFF] text-white px-6 py-2 rounded cursor-pointer transition">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}

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

  const deleteItem = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-semibold mb-2">Wishlist</h1>
      <p className="text-gray-500 mb-8 text-lg">Home / Wishlist</p>

      {wishlistItems.length === 0 ? (
        // <div className="text-center text-lg text-gray-500">
        <EmptyWishlist />
      ) : (
        // </div>
        <>
          {/* Table headers for md+ only */}
          <div className="hidden md:grid grid-cols-7 font-semibold text-gray-600 border-b border-gray-300 gap-4 pb-2">
            <div className="col-span-1">Product</div>
            <div className="col-span-4">Description</div>
            <div>Total</div>
            <div className="text-center">Actions</div>
          </div>

          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-300 py-4 md:py-6 flex flex-col md:grid md:grid-cols-7 gap-4 items-center"
            >
              {/* Mobile layout */}
              <div className="w-full flex md:hidden items-center justify-between gap-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-26 h-26 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-base font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    ₹{item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-8 mt-2">
                    <Link to="/cart">
                      <button className="bg-[#558AFF] text-white text-xs px-4 py-2 rounded">
                        Add to Cart
                      </button>
                    </Link>
                    <Trash2
                      size={18}
                      className="text-gray-600 hover:text-red-500 cursor-pointer"
                      onClick={() => deleteItem(item.id)}
                    />
                  </div>
                </div>
              </div>

              {/* --------- Desktop & Tablet Layout --------- */}
              <div className="hidden md:flex col-span-1 justify-center md:justify-start">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded object-cover"
                />
              </div>

              <div className="hidden md:block col-span-2 text-center md:text-left">
                <p className="text-lg font-medium">{item.name}</p>
              </div>

              <div className="hidden md:flex col-span-2 justify-center md:justify-start">
                <Link to="/cart">
                  <button className="bg-[#558AFF] text-white px-6 py-2 sm:px-10 sm:py-3 rounded text-sm cursor-pointer transition">
                    Add To Cart
                  </button>
                </Link>
              </div>

              <div className="hidden md:block text-lg font-medium text-center md:text-left">
                ₹{item.price.toFixed(2)}
              </div>

              <div className="hidden md:flex justify-center">
                <Trash2
                  className="text-gray-600 hover:text-red-500 cursor-pointer"
                  onClick={() => deleteItem(item.id)}
                />
              </div>
            </div>
          ))}
          {/* Continue Shopping Button */}
          <div className="mt-8">
            <button className="flex items-center gap-4 border border-gray-300 px-4 py-2 rounded cursor-pointer transition">
              <FaChevronLeft />
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistPage;
