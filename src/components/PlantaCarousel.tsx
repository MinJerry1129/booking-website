"use client";

import React from "react";

type Props = {
  images: string[];
  title?: string;
};

export default function PlantaCarousel({ images, title }: Props) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const visibleCount = 1; // Always one image per slide

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Build pages (groups of images)
  const pages = React.useMemo(() => {
    const result: string[][] = [];
    if (!Array.isArray(images)) return result;
    for (let i = 0; i < images.length; i += visibleCount) {
      result.push(images.slice(i, i + visibleCount));
    }
    return result;
  }, [images, visibleCount]);

  React.useEffect(() => {
    if (currentPage > Math.max(0, pages.length - 1)) {
      setCurrentPage(0);
    }
  }, [pages.length, currentPage]);

  // const goPrev = () => setCurrentPage((p) => Math.max(0, p - 1));
  // const goNext = () => setCurrentPage((p) => Math.min(pages.length - 1, p + 1));

  if (!images || images.length === 0) return null;

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center">
        {/* <button
          type="button"
          onClick={goPrev}
          aria-label="Anterior"
          className="hidden md:inline-flex absolute z-10 h-9 w-9 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow cursor-pointer border border-gray-400 top-1/2 -translate-y-1/2"
          style={{ left: "calc(50% - 195px)" }}
          disabled={currentPage === 0}
        >
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button> */}

        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {pages.map((group, idx) => (
              <div key={idx} className="min-w-full flex-shrink-0 flex justify-center">
                <div className="flex gap-4 justify-center items-center">
                  {group.map((url, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={`${idx}-${i}`}
                      src={url}
                      alt={`${title || "Planta"} ${idx * visibleCount + i + 1}`}
                      className="h-[600px] w-[600px] object-cover rounded-xl border mx-auto"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <button
          type="button"
          onClick={goNext}
          aria-label="Próximo"
          className="hidden md:inline-flex absolute z-10 h-9 w-9 items-center justify-center rounded-full bg-white/80 hover:bg-white shadow cursor-pointer border border-gray-400 top-1/2 -translate-y-1/2"
          style={{ left: "calc(50% + 160px)" }}
          disabled={currentPage === pages.length - 1}
        >
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
        </button> */}
      </div>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {pages.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir para slide ${i + 1}`}
            onClick={() => setCurrentPage(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${i === currentPage ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"}`}
          />)
        )}
      </div>
    </div>
  );
}


