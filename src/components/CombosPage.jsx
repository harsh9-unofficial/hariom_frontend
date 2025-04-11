import React, { useState } from "react";
import { PiShoppingCart } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { Link } from "react-router-dom";

// Product List (2–3 per category)
const products = [
  // Kitchen Cleaners
  {
    id: 1,
    name: "Multi-Surface Eco Cleaner",
    price: 1299,
    rating: 5,
    category: "Kitchen Cleaners",
    image: "/images/Product1.png",
  },
  {
    id: 2,
    name: "Grease Buster Gel",
    price: 899,
    rating: 4,
    category: "Kitchen Cleaners",
    image: "/images/Product1.png",
  },

  // Bathroom Cleaners
  {
    id: 3,
    name: "Bathroom Sparkle Wash",
    price: 999,
    rating: 4,
    category: "Bathroom Cleaners",
    image: "/images/Product1.png",
  },
  {
    id: 4,
    name: "Tile Grime Remover",
    price: 849,
    rating: 3,
    category: "Bathroom Cleaners",
    image: "/images/Product1.png",
  },

  // Floor Cleaners
  {
    id: 5,
    name: "Floor Fresh Shine",
    price: 1099,
    rating: 4,
    category: "Floor Cleaners",
    image: "/images/Product1.png",
  },
  {
    id: 6,
    name: "Herbal Floor Sparkle",
    price: 999,
    rating: 5,
    category: "Floor Cleaners",
    image: "/images/Product1.png",
  },

  // Glass Cleaners
  {
    id: 7,
    name: "Glass Gleam Pro",
    price: 899,
    rating: 3,
    category: "Glass Cleaners",
    image: "/images/Product1.png",
  },
  {
    id: 8,
    name: "Crystal Clear Spray",
    price: 799,
    rating: 4,
    category: "Glass Cleaners",
    image: "/images/Product1.png",
  },

  // Laundry Products
  {
    id: 9,
    name: "Laundry Liquid Bliss",
    price: 1499,
    rating: 5,
    category: "Laundry Products",
    image: "/images/Product1.png",
  },
  {
    id: 10,
    name: "Eco Wash Detergent",
    price: 1199,
    rating: 4,
    category: "Laundry Products",
    image: "/images/Product1.png",
  },

  // All Products (generic)
  {
    id: 11,
    name: "Universal Eco Cleaner",
    price: 1299,
    rating: 4,
    category: "All Products",
    image: "/images/Product1.png",
  },
];

const CombosPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [selectedRatings, setSelectedRatings] = useState([]);

  const handleCategoryToggle = (cat) => {
    if (cat === "All Products") {
      setSelectedCategories((prev) =>
        prev.includes(cat) ? [] : ["All Products"]
      );
    } else {
      setSelectedCategories((prev) => {
        const withoutAll = prev.filter((c) => c !== "All Products");
        return prev.includes(cat)
          ? withoutAll.filter((c) => c !== cat)
          : [...withoutAll, cat];
      });
    }
  };

  const handleRatingToggle = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const filteredProducts = products.filter((product) => {
    const allSelected = selectedCategories.includes("All Products");

    const inCategory =
      selectedCategories.length === 0 ||
      allSelected ||
      selectedCategories.includes(product.category);

    const inPriceRange =
      product.price >= priceRange.min && product.price <= priceRange.max;

    const inRating =
      selectedRatings.length === 0 ||
      selectedRatings.some((r) => product.rating >= r);

    return inCategory && inPriceRange && inRating;
  });

  return (
    <section className="container mx-auto px-2 py-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
        Combos
      </h2>
      <p className="text-lg md:text-xl text-gray-500 mb-6">
        Home / Combos
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
              {[
                "All Products",
                "Kitchen Cleaners",
                "Bathroom Cleaners",
                "Floor Cleaners",
                "Glass Cleaners",
                "Laundry Products",
              ].map((cat, index) => (
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
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        min: parseInt(e.target.value) || 0,
                      })
                    }
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
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: parseInt(e.target.value) || "00",
                      })
                    }
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
          {filteredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="group relative rounded-xl border border-[#558bffb3] overflow-hidden transition h-fit"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full bg-blue-100"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-15 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="text-white p-3 bg-[#558AFF] text-2xl rounded-full focus:outline-none cursor-pointer"
                  >
                    <GoHeart />
                  </button>
                  <button
                    onClick={(e) => e.preventDefault()}
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CombosPage;
