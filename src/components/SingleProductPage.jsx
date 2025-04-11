import React, { useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [mainImage, setMainImage] = useState("/images/Product1.png");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [reviews, setReviews] = useState([
    {
      name: "Sarah J.",
      rating: 4,
      text: "This cleaner is amazing! It cleaned my kitchen counters better than any other product I've tried, and I love that it's eco-friendly. The scent is pleasant but not overwhelming.",
      time: "2 Month ago",
    },
    {
      name: "Michael T.",
      rating: 4,
      text: "I've been using this on almost everything in my house. Works great on counters, sinks, and tables. Struggled a bit with really tough grease stains, but overall very happy with it.",
      time: "2 Month ago",
    },
  ]);

  const tabClass = (tab) =>
    `py-2 px-4 text-lg font-medium transition-colors duration-200 ease-in-out cursor-pointer ${
      activeTab === tab
        ? "border-b-2 border-[#558AFF] text-[#558AFF]"
        : "text-gray-600 hover:text-[#558AFF]"
    }`;

  const handleSave = () => {
    if (rating > 0 && feedback.trim()) {
      const newReview = {
        name: "You",
        rating,
        text: feedback,
        time: "Just now",
      };
      setReviews([newReview, ...reviews]);
      setShowModal(false);
      setRating(0);
      setFeedback("");
    }
  };

  const renderStars = (selectedRating) =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        onClick={() => setRating(i + 1)}
        onMouseEnter={() => setHoverRating(i + 1)}
        onMouseLeave={() => setHoverRating(0)}
        className={`cursor-pointer text-3xl ${
          (hoverRating || rating) > i ? "text-blue-500" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));

  return (
    <div className="py-12 px-2 container mx-auto">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        Home / Product /{" "}
        <span className="text-gray-900 font-medium">Gold Infinity Ring</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Images */}
        <div className="flex flex-col gap-4 w-full lg:w-2/5">
          <div className="rounded-2xl">
            <img
              src={mainImage}
              alt="Product"
              className="rounded-xl w-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((_, i) => {
              const thumbnailSrc = `/images/Category${i + 1}.png`;
              return (
                <img
                  key={i}
                  src={thumbnailSrc}
                  alt={`Thumb ${i}`}
                  className="rounded-lg border object-contain w-full cursor-pointer hover:shadow"
                  onClick={() => setMainImage(thumbnailSrc)}
                />
              );
            })}
          </div>
        </div>

        {/* Details */}
        <div className="w-full lg:w-3/5 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Gold Infinity Ring 1
          </h2>

          <div className="flex items-center gap-1 text-[#558AFF]">
            {[1, 2, 3, 4].map((_, i) => (
              <Star key={i} fill="currentColor" />
            ))}
            <Star className="text-gray-800" />
            <span className="ml-2 text-gray-600">42 Reviews</span>
          </div>

          <p className="text-xl md:text-3xl font-bold text-gray-800">
            ₹1,222.99
          </p>
          <p className="text-lg md:text-xl text-gray-600">
            Our premium eco-friendly multi-surface cleaner effectively removes
            dirt, grime, and bacteria from all washable surfaces without harsh
            chemicals. Safe for use around children and pets.
          </p>

          <ul className="text-gray-600 list-disc list-inside space-y-1">
            <li>Free shipping on orders over $35</li>
            <li>In stock: 35 units</li>
          </ul>

          <div className="flex flex-col items-start gap-2">
            <span className="font-semibold text-lg md:text-xl">Quantity</span>
            <div className="flex items-center border rounded-md overflow-hidden">
              <button className="px-3 py-1">-</button>
              <input
                type="text"
                value="1"
                readOnly
                className="w-12 text-center border-l border-r"
              />
              <button className="px-3 py-1">+</button>
            </div>
          </div>

          <div className="w-full flex gap-2">
            <Link
              to="/cart"
              className="w-1/2 bg-[#558AFF] text-white px-4 py-2 md:py-3 rounded-md md:text-lg cursor-pointer text-center"
            >
              Add to Cart
            </Link>

            <Link
              to="/checkout"
              className="border border-[#558AFF] text-[#558AFF] px-4 py-2 md:py-3 rounded-md w-1/2 md:text-lg cursor-pointer text-center"
            >
              Buy Now
            </Link>
          </div>

          <ul className="md:text-lg text-gray-500 list-disc list-inside space-y-1 mt-4">
            <li>Plant-based ingredients</li>
            <li>No harsh chemicals</li>
            <li>Pleasant natural scent</li>
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex md:space-x-4 border-b border-gray-200 mb-4">
          <button
            className={`${tabClass("description")} text-sm md:text-lg`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`${tabClass("specification")} text-sm md:text-lg`}
            onClick={() => setActiveTab("specification")}
          >
            Specifications
          </button>
          <button
            className={`${tabClass("review")} text-sm md:text-lg`}
            onClick={() => setActiveTab("review")}
          >
            Reviews
          </button>
        </div>

        <div className="transition-opacity duration-300 ease-in-out md:text-lg">
          {activeTab === "description" && (
            <div>
              <p className="text-gray-700 py-3">
                Our Multi-Surface Eco Cleaner is a versatile, powerful cleaning
                solution designed to tackle dirt, grime, and bacteria on
                virtually any washable surface in your home. Made with
                plant-based ingredients, this eco-friendly formula effectively
                cleans without harsh chemicals, making it safe for use around
                children, pets, and those with sensitivities.
              </p>

              <p className="text-gray-700 py-3">
                The biodegradable formula leaves no harmful residues and breaks
                down naturally in the environment. With a pleasant, natural
                lemon and eucalyptus scent derived from essential oils, it
                leaves your home smelling fresh without artificial fragrances.
              </p>
              <div className="py-3">
                <span className="font-semibold text-xl">How to Use</span>
                <ol className="text-gray-700 list-decimal pl-4 mt-2">
                  <li>
                    For general cleaning, spray directly onto the surface.
                  </li>
                  <li>
                    Let sit for 30 seconds for tough stains or disinfecting.{" "}
                  </li>
                  <li>Wipe clean with a cloth or paper towel.</li>
                  <li>No rinsing required for most surfaces.</li>
                </ol>
              </div>

              <div className="py-3">
                <span className="font-semibold text-xl">Suitable Surfaces</span>
                <p className="text-gray-700 py-3">
                  Countertops, sinks, stovetops, microwaves, refrigerators,
                  bathroom fixtures, tile, sealed stone, glass, stainless steel,
                  and most other washable surfaces. Not recommended for use on
                  unsealed wood or natural marble.
                </p>
              </div>
            </div>
          )}

          {activeTab === "specification" && (
            <div>
              <div className="w-full">
                <div className="grid grid-cols-2 text-sm md:text-lg text-gray-500 border-gray-200">
                  {/* Row 1 */}
                  <div className="py-3 px-4 border-b border-gray-200  mr-4">
                    Volume
                  </div>
                  <div className="py-3 px-4 border-b border-gray-200">
                    32 fl oz (946 ml)
                  </div>

                  {/* Row 2 */}
                  <div className="py-3 px-4 border-b border-gray-200  mr-4">
                    Ingredients
                  </div>
                  <div className="py-3 px-4 border-b border-gray-200">
                    Water, Plant-Based Surfactants, Natural Fragrance, Citric
                    Acid
                  </div>

                  {/* Row 3 */}
                  <div className="py-3 px-4 border-b border-gray-200  mr-4">
                    Scent
                  </div>
                  <div className="py-3 px-4 border-b border-gray-200">
                    Lemon & Eucalyptus
                  </div>

                  {/* Row 4 */}
                  <div className="py-3 px-4 border-b border-gray-200  mr-4">
                    pH Level
                  </div>
                  <div className="py-3 px-4 border-b border-gray-200">
                    7.2 (Neutral)
                  </div>

                  {/* Row 5 */}
                  <div className="py-3 px-4 border-b border-gray-200  mr-4">
                    Shelf Life
                  </div>
                  <div className="py-3 px-4 border-b border-gray-200">
                    24 months unopened, 12 months after opening
                  </div>

                  {/* Row 6 */}
                  <div className="py-3 px-4 border-b border-gray-200  mr-4">
                    Made In
                  </div>
                  <div className="py-3 px-4 border-b border-gray-200">
                    INDIA
                  </div>

                  {/* Row 7 */}
                  <div className="py-3 px-4 border-b border-gray-200  mr-4">
                    Packaging
                  </div>
                  <div className="py-3 px-4 border-b border-gray-200">
                    100% Recycled Plastic
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "review" && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button
                  className="bg-[#558AFF] text-white px-4 md:px-8 py-2 md:py-4 rounded cursor-pointer"
                  onClick={() => setShowModal(true)}
                >
                  Write a Review
                </button>
              </div>

              {reviews.map((review, i) => (
                <div key={i}>
                  <div className="flex justify-between">
                    <div className="font-semibold text-xl md:text-3xl">
                      {review.name}
                    </div>
                    <div className="text-gray-500 mt-1">{review.time}</div>
                  </div>
                  <div className="flex items-center space-x-1 text-[#558AFF] md:text-2xl">
                    {[...Array(5)].map((_, idx) => (
                      <span
                        key={idx}
                        className={
                          idx < review.rating
                            ? "text-[#558AFF]"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="md:text-xl text-gray-700 mt-1">{review.text}</p>
                  <hr className="border-t border-gray-200 mt-4" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Write a Review</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 text-xl cursor-pointer hover:text-gray-800"
              >
                ×
              </button>
            </div>
            <div className="flex justify-center mb-4">{renderStars()}</div>
            <textarea
              className="w-full border rounded p-2 h-24 mb-4"
              placeholder="Write your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button
              onClick={handleSave}
              className="bg-[#558AFF] text-white w-full py-2 rounded cursor-pointer transition"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductPage;
