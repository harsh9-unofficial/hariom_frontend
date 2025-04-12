import { PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

const MediaBlock = () => {
  const [isPlaying, setIsPlaying] = useState(false); // State to track if the video is playing
  const videoRef = useRef(null); // Ref to access the video element

  const handlePlayClick = () => {
    setIsPlaying(true);
    videoRef.current.play(); // Start the video when the play button is clicked
  };
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
          onPlay={() => setIsPlaying(true)} // Set to true when video starts playing
          onPause={() => setIsPlaying(false)} // Optional: reset if video is paused
          controls={false} // Remove native controls, you control playback via the button
        >
          <source src="/MediaBlock.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Play Icon Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition">
            <button onClick={handlePlayClick} className="text-white">
              <PlayCircle className="w-12 h-12 md:w-16 md:h-16" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaBlock;
