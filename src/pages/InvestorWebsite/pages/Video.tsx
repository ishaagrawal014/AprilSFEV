import React, { useState, useRef } from "react";
import { Eye, X, Play, Pause } from "lucide-react";

// Video card component with play/pause functionality
const VideoCard = ({ videoSrc, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="relative h-64 w-full rounded-2xl border border-gray-200 bg-black shadow-lg transition-shadow duration-300 hover:shadow-2xl overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute inset-0 h-full w-full object-cover"
        onEnded={handleVideoEnd}
        playsInline
      />
      
      {/* Play/Pause Overlay */}
      <div
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-0 hover:bg-opacity-10 transition-all"
      >
        {!isPlaying && (
          <div className="bg-blue-500 rounded-full p-4 shadow-xl transform transition-transform hover:scale-110">
            <Play className="w-8 h-8 text-white fill-white" />
          </div>
        )}
      </div>

      {/* Video Controls Bar (shows when playing) */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 text-white text-sm"
          >
            <Pause className="w-4 h-4" />
            <span>Pause</span>
          </button>
        </div>
      )}
    </div>
  );
};

// Video gallery component
const VideoGallery = () => {
  const videos = [
       "images/Video/Vid1.webm",
    "images/Video/Vid2.webm",
    "images/Video/Vid3.webm",
  ];

  return (
    <div className="w-full px-4 py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((videoSrc, index) => (
          <VideoCard key={index} videoSrc={videoSrc} index={index} />
        ))}
      </div>
    </div>
  );
};

const ResponsiveVideoSection = () => {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <section id="video" className="bg-blue-50 text-center">
      {/* Desktop - Always show gallery */}
      <div className="hidden lg:block">
        <div className="pt-8">
          <h3 className="text-2xl font-bold text-gray-900">
            View Our <span className="text-blue-500">Tracking System</span>
          </h3>
        </div>
        <VideoGallery />
      </div>

      {/* Mobile - Toggle gallery */}
      <div className="lg:hidden">
        {!showGallery ? (
          <div className="px-4 py-8">
            <button
              onClick={() => setShowGallery(true)}
              className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-blue-600 transition-colors active:scale-95"
            >
              <Eye className="w-5 h-5" />
              See Our Tracking System
            </button>
          </div>
        ) : (
          <div>
            <div className="pt-8">
              <h3 className="text-2xl font-bold text-gray-900">
                View Our <span className="text-blue-500">Tracking System</span>
              </h3>
            </div>
            <VideoGallery />
            
            <div className="mt-6 pb-8">
              <button
                onClick={() => setShowGallery(false)}
                className="inline-flex items-center gap-2 rounded-full bg-gray-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-gray-700 transition-colors active:scale-95"
              >
                <X className="w-4 h-4" />
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResponsiveVideoSection;