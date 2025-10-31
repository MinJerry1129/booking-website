"use client";

import React from "react";

type Props = {
  images: string[];
  title?: string;
};

export default function PlantaCarousel({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? (images?.length || 1) - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === (images?.length || 1) - 1 ? 0 : prev + 1));
  };

  React.useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, images]);

  if (!images || images.length === 0) return null;

  return (
    <div id="carouselExampleIndicators" className="relative w-full">
      <ol className="flex justify-center gap-2 mb-4">
        {images.map((_, index) => (
          <li
            key={index}
            onClick={() => goToSlide(index)}
            className={`cursor-pointer h-2.5 w-2.5 rounded-full transition-all ${
              index === activeIndex
                ? "bg-blue-600 w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </ol>

      <div className="relative w-full overflow-hidden rounded-xl bg-gray-50">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${activeIndex * (100 / images.length)}%)`,
            width: `${images.length * 100}%`
          }}
        >
          {images.map((imageUrl, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 flex items-center justify-center px-8 md:px-10 lg:px-12"
              style={{ 
                width: `calc(100% / ${images.length})`,
                minWidth: `calc(100% / ${images.length})`
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={`${title || "Planta"} ${index + 1}`}
                className="w-full h-auto max-h-[300px] md:max-h-[500px] lg:max-h-[600px] object-contain rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/90 hover:bg-white rounded-full shadow-md border border-gray-200 transition-all hover:scale-110"
        aria-label="Previous slide"
      >
        <span className="sr-only">Previous</span>
        <svg
          className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/90 hover:bg-white rounded-full shadow-md border border-gray-200 transition-all hover:scale-110"
        aria-label="Next slide"
      >
        <span className="sr-only">Next</span>
        <svg
          className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}


