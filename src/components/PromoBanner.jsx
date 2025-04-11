export default function PromoBanner() {
  return (
    <section className="container mx-auto py-8 px-2">
      <div
        className="relative rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 md:p-10 lg:p-12 text-white h-[250px] md:h-[380px] lg:h-[435px] xl:h-[550px]"
        style={{
          backgroundImage: "url('/images/PromoBanner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Text Content */}
        <div className="z-10 md:w-sm text-left mb-6 md:mb-0 bg-opacity-50 py-6 xl:ml-6 rounded-lg lg:w-full ">
          <h2 className="text-2xl md:text-4xl xl:text-5xl font-bold mb-3">
            Spring Cleaning Sale!
          </h2>
          <p className="text-base md:text-lg xl:text-xl  mb-5">
            Get 20% off on all cleaning bundles. Limited time offer.
          </p>
          <button className="bg-white text-black text-sm sm:text-base font-medium px-5 py-2 rounded cursor-pointer transition">
            Shop Deals
          </button>
        </div>
      </div>
    </section>
  );
}
