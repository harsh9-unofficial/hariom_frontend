import React, { useState } from "react";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Example product data
  const products = [
    { id: 1, name: "Revitalizing Hair Serum", price: 120, quantity: 1 },
    { id: 2, name: "Nourishing Face Cream", price: 200, quantity: 1 },
  ];

  // Calculate subtotal, shipping, tax, and total
  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const shipping = 20; // Flat shipping cost
  const tax = (subtotal * 0.1).toFixed(2); // Tax as 10% of subtotal
  const total = (
    parseFloat(subtotal) +
    parseFloat(shipping) +
    parseFloat(tax)
  ).toFixed(2);

  return (
    <div className="container mx-auto px-2 md:px-4 lg:px-10 xl:px-8 py-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
        Check Out
      </h2>
      <p className="text-lg md:text-xl text-gray-500 mb-6">Home / Check Out</p>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT SIDE - Contact, Address, Payment */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="input border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#558AFF]"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="input border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#558AFF]"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#558AFF]"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="input border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#558AFF]"
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-4 border-t border-gray-300 pt-6">
            <h3 className="text-lg font-semibold">Shipping Address</h3>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">Address</label>
              <input
                type="text"
                placeholder="Enter your address"
                className="input border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#558AFF]"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">
                Apartment, suite, etc. (optional)
              </label>
              <input
                type="text"
                placeholder="Apartment, suite, etc."
                className="input border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#558AFF]"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">City</label>
                <input
                  type="text"
                  placeholder="Enter your City"
                  className="input border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#558AFF]"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">State</label>
                <select className="input border border-gray-300 text-gray-500 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#558AFF]">
                  <option>Select State</option>
                  <option>Selected State</option>
                  <option>Selecteddd State</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">ZIP Code</label>
                <input
                  type="text"
                  placeholder="Enter ZIP Code"
                  className="input border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#558AFF]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-6 border-t border-gray-300 pt-6">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <div className="space-y-4">
              {/* Credit/Debit Card option */}
              <label
                className={`flex items-center gap-2 border border-gray-300 p-3 ${
                  paymentMethod === "card" ? "text-black" : "text-gray-500"
                }`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="accent-black"
                />
                <span>Credit/Debit Card</span>
              </label>

              {paymentMethod === "card" && (
                <div className="grid md:grid-cols-2 gap-4 px-4 border border-gray-300 p-3">
                  <div className="md:col-span-2 flex flex-col">
                    <label className="mb-1 text-sm font-medium">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000"
                      className="input border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#558AFF]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="input border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#558AFF]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">CVC</label>
                    <input
                      type="text"
                      placeholder="CVC"
                      className="input border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#558AFF]"
                    />
                  </div>
                </div>
              )}

              {/* Online Payment option */}
              <label
                className={`flex items-center gap-2 border border-gray-300 p-3 ${
                  paymentMethod === "online" ? "text-black" : "text-gray-500"
                }`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="accent-black"
                />
                <span>Online payment</span>
              </label>

              {/* Cash on Delivery option */}
              <label
                className={`flex items-center gap-2 border border-gray-300 p-3 ${
                  paymentMethod === "cod" ? "text-black" : "text-gray-500"
                }`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-black"
                />
                <span>Cash on delivery</span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Order Summary */}
        <div className="border border-gray-300 p-3 rounded-lg h-fit bg-white">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="/images/Product1.png"
                    className="w-14 h-14 rounded-md"
                    alt="Product"
                  />
                  <div>
                    <p className="text-md font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {product.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-md font-medium">₹{product.price}</p>
              </div>
            ))}
            <div className="border-t border-gray-300 pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between font-semibold border-t border-gray-300 pt-3">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
            <button className="w-full bg-[#558AFF] text-white py-2 rounded-md mt-3 text-lg cursor-pointer transition-all">
              Place Order
            </button>
            <p className="text-sm text-gray-500 text-center mt-2 w-[62%] mx-auto">
              By placing your order, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
