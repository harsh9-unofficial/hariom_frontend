const categories = [
  { name: "All-Purpose", image: "/images/Category1.png" },
  { name: "Kitchen", image: "/images/Category2.png" },
  { name: "Bathroom", image: "/images/Category3.png" },
  { name: "Floor", image: "/images/Category4.png" },
  { name: "Glass", image: "/images/Category5.png" },
  { name: "Laundry", image: "/images/Category6.png" },
];

export default function Categories() {
  return (
    <section className="py-8 md:py-12 container mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Browse Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 xl:gap-6 px-2 xl:px-0 justify-items-center">
        {categories.map((cat, idx) => (
          <div key={idx} className="text-center">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] lg:w-[250px] lg:h-[230px] rounded-xl mx-auto mb-2 hover:scale-105 transition-transform duration-300"
            />
            <p className="text-xl font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
