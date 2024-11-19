"use client";

import React, { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { title } from "@/components/primitives";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProductGallery({ products, category }: any) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.8; // Scroll 80% of container width

      current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      // Check if we're at the start
      setIsLeftVisible(scrollLeft > 0);

      // Check if we're at the end
      setIsRightVisible(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  return (
    <div className="w-full relative bg-foreground-100 bg-opacity-40 rounded-md p-4 px-16 mb-6 ">
      <h1 className="text-xl sm:text-4xl font-semibold pb-10 mb-5 ">
        {category}
      </h1>

      {/* Left Navigation Button */}
      {isLeftVisible && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 
                     bg-white/80 hover:bg-white/90 
                     rounded-full shadow-md 
                     w-10 h-10 flex items-center justify-center"
        >
          <ChevronLeft className="text-gray-600" />
        </button>
      )}

      {/* Right Navigation Button */}
      {isRightVisible && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 
                     bg-white/80 hover:bg-white/90 
                     rounded-full shadow-md 
                     w-10 h-10 flex items-center justify-center"
        >
          <ChevronRight className="text-gray-600" />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-scroll scrollbar-hide  gap-x-6 space-x-20  pb-4"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {products.map((product: any) => (
          <div key={product?.id} className="flex-shrink-0 snap-start w-[280px]">
            <ProductCard
              product={product}
              imageurl={product?.imagePath}
              alter={product?.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
