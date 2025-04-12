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

// Empty Cart UI
function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 gap-5 xl:gap-8 2xl:gap-5">
      <h2 className="text-xl font-semibold mb-2">
        Your Cart is Currently Empty.
      </h2>
      <Link to="/products">
        <button className="bg-[#558AFF] text-white px-6 py-2 rounded cursor-pointer transition">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}

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

  const shipping = cartItems.length > 0 ? 20 : 0;
  const tax = cartItems.length > 0 ? 20 : 0;
  const total = subtotal + shipping + tax;

  return (
    <div className=" px-2 md:px-4 lg:px-10 xl:px-8 py-12 container mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold mb-2">Cart Page</h2>
      <p className="text-lg md:text-xl text-gray-500 mb-8">Home / Cart Page</p>

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Cart Items */}
          <div className="flex-1">
            {/* Table Header (Large Screens Only) */}
            <div className="hidden lg:grid grid-cols-7 gap-4 font-medium border-b border-gray-300 pb-4 text-lg text-gray-600 text-center">
              <div>Product</div>
              <div className="col-span-2">Description</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Total</div>
              <div>Actions</div>
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => (
              <div key={item.id} className="border-b border-gray-300 py-4">
                {/* Mobile layout */}
                <div className="w-full flex md:hidden items-start gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-30 h-30 object-cover rounded"
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-base font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-sm text-gray-800 mt-1">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-8 mt-2">
                      <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="px-3 py-2 text-gray-600 text-sm cursor-pointer"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          readOnly
                          value={item.quantity}
                          className="w-8 text-center text-sm"
                        />
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="px-3 py-2 text-gray-600 text-sm cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <Trash2
                        size={18}
                        className="text-gray-600 hover:text-red-500 cursor-pointer"
                        onClick={() => removeItem(item.id)}
                      />
                    </div>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:grid grid-cols-7 lg:gap-4 items-center text-center md:text-left">
                  <div className="flex justify-center md:justify-start">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-28 w-28 object-cover rounded"
                    />
                  </div>
                  <div className="md:col-span-2 md:pl-3 lg:pl-0">
                    <p className="font-medium text-lg">{item.name}</p>
                    <p className="text-gray-500 text-sm">Size: {item.size}</p>
                  </div>
                  <div className="flex justify-center md:justify-start lg:justify-center items-center">
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        className="px-3 lg:px-2 xl:px-3 py-2 text-gray-600 text-lg cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        readOnly
                        value={item.quantity}
                        className="w-10 lg:w-9 xl:w-10 text-center text-base"
                      />
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        className="px-3 lg:px-2 xl:px-3 py-2 text-gray-600 text-lg cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-800 text-base text-center">
                    ₹{item.price.toFixed(2)}
                  </div>
                  <div className="text-gray-800 text-base text-center">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="flex justify-center">
                    <Trash2
                      className="text-gray-600 cursor-pointer hover:text-red-500"
                      onClick={() => removeItem(item.id)}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link to="/products">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm text-gray-600">
                  <ArrowLeft size={16} />
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[25%] h-fit border border-gray-300 rounded-lg p-6 space-y-6 mt-4 lg:mt-0">
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
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <Link to="/checkout">
              <button className="w-full bg-[#558AFF] text-white py-3 rounded text-center cursor-pointer transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
