import { FaInstagram } from "react-icons/fa";

const posts = [
  "/images/InstaFeed.png",
  "/images/InstaFeed.png",
  "/images/InstaFeed.png",
  "/images/InstaFeed.png",
  "/images/InstaFeed.png",
  "/images/InstaFeed.png",
];

export default function InstagramFeed() {
  return (
    <section className="py-12 px-2 container mx-auto text-center">
      {/* Header */}
      <h2 className="text-4xl font-semibold mb-1">Follow Us on Instagram</h2>
      <p className="text-xl text-gray-500 mb-8">@hariomchemical</p>

      {/* Grid of Posts */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4 mb-10">
        {posts.map((img, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow"
          >
            <img
              src={img}
              alt={`Instagram post ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay Icon on Hover */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <FaInstagram className="text-white w-8 h-8" />
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href="https://instagram.com/hariomchemical"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#558AFF] text-white text-sm px-20 py-3 rounded-md"
      >
        View Instagram
      </a>
    </section>
  );
}
