import { useState } from "react";
import { Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const initialCartItems = [
  {
    id: 1,
    name: "All-Purpose Cleaner",
    size: "100ml",
    price: 120,
    quantity: 1,
    image: "/images/Product1.png",
  },
  {
    id: 2,
    name: "Gold Infinity Ring 1",
    size: "100ml",
    price: 120,
    quantity: 1,
    image: "/images/Product1.png",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const incrementQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = cartItems.length > 0 ? 20 : 0; // Only add shipping if cart has items
  const tax = cartItems.length > 0 ? 20 : 0; // Only add tax if cart has items
  const total = subtotal + shipping + tax;

  return (
    <div className="px-2 py-12 container mx-auto">
      {/* Header */}
      <h2 className="text-4xl font-semibold mb-2">Cart Page</h2>
      <p className="text-xl text-gray-500 mb-8">Home / Cart Page</p>

      {/* Cart Content */}
      {cartItems.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          Your cart is currently empty.
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left - Cart Table */}
          <div className="flex-1">
            {/* Cart Table Header */}
            <div className="hidden lg:grid grid-cols-7 gap-4 font-medium border-b border-gray-300 pb-4 text-lg text-gray-600 text-center">
              <div>Product</div>
              <div className="col-span-2">Description</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Total</div>
              <div>Actions</div>
            </div>

            {/* Item List */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-300 py-4 md:grid md:grid-cols-7 md:gap-4 md:items-center text-center"
              >
                {/* Product Image */}
                <div className="flex justify-center md:block mb-4 md:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-32 w-32 object-cover rounded"
                  />
                </div>

                {/* Description */}
                <div className="col-span-2 text-left mb-2 md:mb-0">
                  <p className="font-medium text-lg md:text-2xl">{item.name}</p>
                  <p className="text-gray-500 text-sm md:text-xl">
                    Size: {item.size}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex justify-center items-center mb-2 md:mb-0">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="px-3 md:px-5 py-2 md:py-4 text-gray-600"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-8 text-center border-0"
                    />
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="px-3 md:px-5 py-2 md:py-4 text-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-gray-800 text-base md:text-lg mb-1 md:mb-0">
                  ₹{item.price.toFixed(2)}
                </div>

                {/* Total */}
                <div className="text-gray-800 text-base md:text-lg mb-1 md:mb-0">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>

                {/* Delete Button */}
                <div className="flex justify-center">
                  <Trash2
                    className="text-gray-600 cursor-pointer hover:text-red-500"
                    onClick={() => removeItem(item.id)}
                  />
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <div className="mt-6">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm text-gray-600">
                <ArrowLeft size={16} />
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="w-full lg:w-[25%] h-fit border border-gray-300 rounded-lg p-6 space-y-6 mt-6 lg:mt-0">
            <h3 className="text-xl font-semibold">Order Summary</h3>
            <div className="space-y-2 text-gray-600 border-b border-gray-200 pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-500 text-white py-4 rounded cursor-pointer text-">
              <Link to="/checkout">Proceed to Checkout</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
