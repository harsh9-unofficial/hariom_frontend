import { useState, useEffect } from "react";
import { Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { USER_BASE_URL } from "../config";

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 gap-5">
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
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${USER_BASE_URL}/api/cart/get/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(response.data);

      setCartItems(response.data);
    } catch (err) {
      setError("Failed to fetch cart items");
      toast.error("Error loading cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const incrementQuantity = async (cartId) => {
    // console.log(cartId);

    // Find the item in cartItems
    const item = cartItems.find((item) => item.cartId === cartId);
    if (!item) {
      toast.error("Item not found in cart");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${USER_BASE_URL}/api/cart/update/${cartId}`,
        { quantity: item.quantity + 1 }, // Send the incremented quantity
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Update frontend state
      setCartItems((prev) =>
        prev.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.success("Quantity updated");
    } catch (err) {
      console.error(err.response?.data || err.message); // Log detailed error
      toast.error("Error updating quantity");
    }
  };

  const decrementQuantity = async (cartId) => {
    const item = cartItems.find((item) => item.cartId === cartId);
    if (!item || item.quantity <= 1) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${USER_BASE_URL}/api/cart/update/${cartId}`,
        { quantity: item.quantity - 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCartItems((prev) =>
        prev.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      toast.success("Quantity updated");
    } catch (err) {
      toast.error("Error updating quantity");
    }
  };

  const removeItem = async (cartId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${USER_BASE_URL}/api/cart/remove/${cartId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prev) => prev.filter((item) => item.id !== cartId));
      fetchCartItems();
      toast.success("Item removed from cart");
    } catch (err) {
      toast.error("Error removing item");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.Product.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 20 : 0;
  const tax = cartItems.length > 0 ? 20 : 0;
  const total = subtotal + shipping + tax;

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#558AFF]"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={fetchCartItems}
          className="mt-4 bg-[#558AFF] text-white px-6 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="px-2 md:px-4 lg:px-10 xl:px-8 py-12 container mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold mb-2">Cart Page</h2>
      <p className="text-lg md:text-xl text-gray-500 mb-8">Home / Cart Page</p>

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="hidden lg:grid grid-cols-7 gap-4 font-medium border-b border-gray-300 pb-4 text-lg text-gray-600 text-center">
              <div>Product</div>
              <div className="col-span-2">Description</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Total</div>
              <div>Actions</div>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="border-b border-gray-300 py-4">
                <div className="hidden md:grid grid-cols-7 lg:gap-4 items-center text-center md:text-left">
                  <div className="flex justify-center md:justify-start">
                    <img
                      src={`${USER_BASE_URL}/${item.Product.images[0]}`} // Use the first image URL
                      alt={item.Product.name}
                      className="h-28 w-28 object-cover rounded"
                    />
                  </div>
                  <div className="md:col-span-2 md:pl-3 lg:pl-0">
                    <p className="font-medium text-lg">{item.Product.name}</p>
                    <p className="text-gray-500 text-sm">
                      Quantity: {item.Product.size}
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-start lg:justify-center items-center">
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                      <button
                        onClick={() => decrementQuantity(item.cartId)}
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
                        onClick={() => incrementQuantity(item.cartId)}
                        className="px-3 lg:px-2 xl:px-3 py-2 text-gray-600 text-lg cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-800 text-base text-center">
                    ₹{item.Product.price.toFixed(2)}
                  </div>
                  <div className="text-gray-800 text-base text-center">
                    ₹{(item.Product.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="flex justify-center">
                    <Trash2
                      className="text-gray-600 cursor-pointer hover:text-red-500"
                      onClick={() => removeItem(item.cartId)}
                    />
                  </div>
                </div>
                {/* Mobile layout remains similar, adjust as needed */}
              </div>
            ))}

            <div className="mt-6">
              <Link
                to="/products"
                className="flex items-center w-fit gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm text-gray-600"
              >
                <ArrowLeft size={16} /> Continue Shopping
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
