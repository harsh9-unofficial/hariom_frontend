import { PiShoppingCart } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";

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
];

export default function NewArrivals() {
  const navigate = useNavigate();

  return (
    <section className="py-8 px-2 lg:py-12 container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl md:text-4xl font-semibold">New Arrivals</h2>
        <button className="text-lg text-gray-600 hover:text-black">
          View All <span className="ml-1 text-xl">▾</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative rounded-xl border border-blue-200 overflow-hidden transition cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
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
                className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300 invisible md:visible"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => navigate("/wishlist")}
                  className="text-white p-3 bg-[#558AFF] text-2xl rounded-full focus:outline-none cursor-pointer"
                >
                  <GoHeart />
                </button>
                <button
                  onClick={() => navigate("/cart")}
                  className="text-white p-3 bg-[#558AFF] text-2xl rounded-full focus:outline-none cursor-pointer"
                >
                  <PiShoppingCart />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="py-4 px-3">
              <h3 className="text-sm font-medium text-black truncate whitespace-nowrap overflow-hidden">
                {product.name}
              </h3>
              <p className="text-blue-500 text-sm font-semibold mt-1">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
