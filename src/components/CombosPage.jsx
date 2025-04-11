import { PiShoppingCart } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Multi-Surface Eco Cleaner",
    price: 1299,
    image: "/images/Product1.png",
  },
  {
    id: 2,
    name: "Multi-Surface Eco Cleaner",
    price: 1299,
    image: "/images/Product1.png",
  },
  {
    id: 3,
    name: "Multi-Surface Eco Cleaner",
    price: 1299,
    image: "/images/Product1.png",
  },
  {
    id: 4,
    name: "Multi-Surface Eco Cleaner",
    price: 1299,
    image: "/images/Product1.png",
  },
  {
    id: 5,
    name: "Multi-Surface Eco Cleaner",
    price: 1299,
    image: "/images/Product1.png",
  },
  {
    id: 6,
    name: "Multi-Surface Eco Cleaner",
    price: 1299,
    image: "/images/Product1.png",
  },
];

const CombosPage = () => {
  return (
    <section className="container mx-auto px-2 py-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">
        Combos
      </h2>
      <p className="text-lg md:text-xl text-gray-500 mb-6">Home / Combos</p>

      {/* 4-column layout: 1 for sidebar, 3 for products */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 space-y-4 md:space-y-0 md:gap-4">
        {/* Sidebar (1 column on large screens) */}
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
          <div className="pb-2 px-4 ">
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
                    placeholder="₹2000"
                    className="border border-gray-400 rounded px-2 py-2 lg:py-3 w-full text-base lg:text-lg"
                  />
                </div>
              </div>
              <button className="bg-[#558AFF] text-white py-2 lg:py-3 rounded text-base lg:text-lg">
                Apply
              </button>
            </div>
          </div>

          {/* Rating */}
          <div className="pb-4 px-4 ">
            <h3 className="font-semibold mb-2 text-xl lg:text-2xl">Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3].map((stars) => (
                <label key={stars} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
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

        {/* Products Grid (3 columns on large screens) */}
        <div className="col-span-2 lg:col-span-4 xl:col-span-6 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="group relative rounded-xl border border-blue-200 overflow-hidden transition"
            >
              {/* Product Image with Black Shade on Hover */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full bg-blue-100"
                />

                {/* Black shade overlay */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-15 transition-opacity duration-300" />

                {/* Icons on Hover */}
                <div
                  className={`absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity`}
                >
                  <button
                    onClick={(e) => e.preventDefault()} // Prevent navigation when clicking icons
                    className="text-[#fff] p-3 bg-[#558AFF] text-2xl rounded-full focus:outline-none cursor-pointer"
                  >
                    <GoHeart />
                  </button>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="text-[#fff] p-3 bg-[#558AFF] text-2xl rounded-full focus:outline-none cursor-pointer"
                  >
                    <PiShoppingCart />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-black">
                  {product.name}
                </h3>
                <p className="text-blue-500 text-sm font-semibold mt-1">
                  ${product.price.toFixed(2)}
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
