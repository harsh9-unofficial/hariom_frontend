import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { USER_BASE_URL } from "../config";

const SingleProductPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const [activeTab, setActiveTab] = useState("description");
  const [mainImage, setMainImage] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${USER_BASE_URL}/api/products/${id}`);
        console.log("Product data:", response.data);
        console.log("Images raw:", response.data.images);
        console.log("Images type:", typeof response.data.images);

        // Normalize images
        let images = response.data.images;
        if (typeof images === "string") {
          try {
            images = JSON.parse(images); // Parse stringified JSON array
            console.log("Parsed images:", images);
          } catch (e) {
            console.error("Error parsing images:", e);
            images = [];
          }
        }
        images = Array.isArray(images) ? images : images ? [images] : [];
        console.log("Normalized images:", images);

        // Normalize features
        let features = response.data.features;
        if (typeof features === "string") {
          try {
            features = JSON.parse(features.replace(/'/g, '"'));
          } catch (e) {
            console.error("Error parsing features:", e);
            features = [];
          }
        }
        features = Array.isArray(features)
          ? features
          : features
          ? [features]
          : [];

        const normalizedProduct = {
          ...response.data,
          images,
          features,
        };
        console.log("Final normalized product:", normalizedProduct);

        // Remove duplicates from features
        normalizedProduct.features = [...new Set(normalizedProduct.features)];
        setProduct(normalizedProduct);

        // Set main image
        const firstImage = normalizedProduct.images[0]
          ? `${USER_BASE_URL}/${normalizedProduct.images[0]}`
          : "/images/Product1.png";
        console.log("Setting main image to:", firstImage);
        setMainImage(firstImage);
      } catch (err) {
        setError("Failed to load product data.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="py-12 px-2 md:px-4 lg:px-10 xl:px-8 container mx-auto">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        Home / Product /{" "}
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Images */}
        <div className="flex flex-col gap-4 w-full lg:w-2/5">
          <div className="rounded-2xl">
            <img
              src={mainImage}
              alt={product.name}
              className="rounded-xl w-full object-contain"
              onError={(e) => {
                e.target.src = "/images/Product1.png"; // Fallback image
              }}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array.isArray(product.images) && product.images.length > 0 ? (
              product.images.map((img, i) => {
                const imageUrl = `${USER_BASE_URL}/${img}`;
                // console.log(`Attempting to load image: ${imageUrl}`); // Debug log
                return (
                  <img
                    key={i}
                    src={imageUrl}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-24 h-24 object-contain border rounded-lg mx-1 cursor-pointer hover:shadow"
                    onClick={() => {
                      // console.log(`Setting main image to: ${imageUrl}`); // Debug log
                      setMainImage(imageUrl);
                    }}
                    onError={(e) => {
                      // console.warn(`Failed to load image: ${imageUrl}`); // Debug log
                      e.target.src = "/images/Product1.png"; // Fallback image
                    }}
                    loading="lazy" // Improve performance
                  />
                );
              })
            ) : (
              <div className="text-gray-500">
                No additional images available.
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="w-full lg:w-3/5 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">{product.name}</h2>

          <div className="flex items-center gap-1 text-[#558AFF]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                fill={i < product.rating ? "currentColor" : "none"}
                className={i < product.rating ? "" : "text-gray-800"}
              />
            ))}
            <span className="ml-2 text-gray-600">
              {product.reviewCount} Reviews
            </span>
          </div>

          <p className="text-xl md:text-3xl font-bold text-gray-800">
            ₹{product.price.toFixed(2)}
          </p>
          <p className="text-lg md:text-xl text-gray-600">
            {product.description}
          </p>

          <ul className="text-gray-600 list-disc list-inside space-y-1">
            <li>Free shipping on orders over ₹1500</li>
            <li>In stock: {product.stock} units</li>
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
            {Array.isArray(product.features) && product.features.length > 0 ? (
              product.features.map((feature, i) => <li key={i}>{feature}</li>)
            ) : (
              <li>No features available.</li>
            )}
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
              <p className="text-gray-700 py-3">{product.fullDescription}</p>
              <div className="py-3">
                <span className="font-semibold text-xl">How to Use</span>
                <ol className="text-gray-700 list-decimal pl-4 mt-2">
                  {product.howToUse?.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
              <div className="py-3">
                <span className="font-semibold text-xl">Suitable Surfaces</span>
                <p className="text-gray-700 py-3">{product.suitableSurfaces}</p>
              </div>
            </div>
          )}

          {activeTab === "specification" && (
            <div className="w-full">
              <div className="grid grid-cols-2 text-sm md:text-lg text-gray-500 border-gray-200">
                {Object.entries(product.specifications || {}).map(
                  ([key, value], i) => (
                    <React.Fragment key={i}>
                      <div className="py-3 px-4 border-b border-gray-200 mr-4">
                        {key}
                      </div>
                      <div className="py-3 px-4 border-b border-gray-200">
                        {value}
                      </div>
                    </React.Fragment>
                  )
                )}
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
