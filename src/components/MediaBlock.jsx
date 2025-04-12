import { PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

const MediaBlock = () => {
  const videoRef = useRef(null);

  return (
    <section className="container mx-auto flex flex-col md:flex-row justify-center items-center md:items-end gap-4 lg:gap-12 xl:gap-16 2xl:gap-20 px-2 md:px-4 lg:px-10 xl:px-8  py-20">
      {/* Logo */}
      <div className="w-32 md:w-48 flex-shrink-0 pr-8">
        <Link to="/">
          <img
            src="/images/logo2.png"
            alt="Hari Om Chemicals Logo"
            className="w-full h-auto object-contain"
          />
        </Link>
      </div>

      {/* Static Image */}
      <div className="w-[250px] md:w-[320px] h-[390px] rounded-xl overflow-hidden ">
        <img
          src="/images/Product1.png"
          alt="Cleaner Product"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Video Block */}
      <div className="relative w-[250px] md:w-[380px] h-[550px] rounded-xl overflow-hidden">
        {/* Video Embed */}
        <video
          ref={videoRef} // Attach the ref to the video element
          className="w-full h-full object-cover"
          autoPlay // Start the video automatically when the page loads
          muted // Optional: Mute the video by default (most browsers require this for autoplay to work)
          loop // Make the video repeat infinitely
          controls={false} // Remove native controls, you control playback via the button
        >
          <source src="/MediaBlock2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default MediaBlock;
