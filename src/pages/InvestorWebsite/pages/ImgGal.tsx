interface CarouselImage {
  src: string;
  alt?: string;
}

export default function ImgGallery() {
  // ✅ ALL images from public/images/Gallery/ - just add your filenames here
  const images: CarouselImage[] = [
    { src: "/images/Gallery/1.jpg", alt: "Electric delivery van" },
    { src: "/images/Gallery/2.jpg", alt: "Speed Force EV fleet" },
    { src: "/images/Gallery/3.jpg", alt: "EV charging station" },
    { src: "/images/Gallery/4.jpg", alt: "EV fleet operations" },
    { src: "/images/Gallery/5.jpg", alt: "Electric vehicle delivery" },
    { src: "/images/Gallery/6.jpg", alt: "Speed Force infrastructure" },
   
    // ✅ ADD YOUR ACTUAL FILENAMES HERE:
    // { src: "/images/Gallery/IMG_001.jpg", alt: "Your image 1" },
    // { src: "/images/Gallery/IMG_002.jpg", alt: "Your image 2" },
    // { src: "/images/Gallery/photo1.png", alt: "Your image 3" },
  ].filter(img => img.src); // Remove empty entries

  if (images.length === 0) {
    return (
      <div className="w-full h-64 bg-muted flex items-center justify-center rounded-lg">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  const duplicatedImages = [...images, ...images, ...images];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3 text-[#050505]">
            Our <span className="text-green-500">EV Fleet</span> in Action
          </h2>
          <p className="text-center text-[#1b1b1b] mb-10">
            Discover our growing fleet of electric vehicles delivering excellence every day.
          </p>

          <div className="w-full overflow-hidden rounded-3xl">
            <style>{`
              @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .scroll-container {
                display: flex;
                gap: 16px;
                animation: scroll 50s linear infinite;
                width: max-content;
              }
              .scroll-container:hover {
                animation-play-state: paused;
              }
              .scroll-item {
                width: 160px;
                height: 280px;
                flex-shrink: 0;
              }
              .scroll-item img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 14px;
                border: 1px solid #e4e7ec;
                transition: transform 0.3s ease;
              }
              .scroll-item:hover img {
                transform: scale(1.05);
              }
            `}</style>

            <div className="scroll-container">
              {duplicatedImages.map((image, index) => (
                <div key={`${image.src}-${index}`} className="scroll-item">
                  <img
                    src={image.src}
                    alt={image.alt || `Fleet image ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
