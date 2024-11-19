import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="grid sm:grid-cols-4 w-full justify-items-center p-4">
      {/* Image Skeleton */}
      <div className="relative bg-gray-300 animate-pulse rounded-lg w-64 h-48 mb-4 sm:mb-0">
        <div className="absolute inset-0 bg-gray-400 rounded-lg"></div>
      </div>

      {/* Content Skeleton */}
      <div className="col-span-2 grid gap-y-8 w-full">
        <div className="grid gap-4">
          {/* Product Title Skeleton */}
          <div className="w-3/4 bg-gray-300 animate-pulse h-8 rounded"></div>

          <div className="flex w-11/12 justify-center">
            {/* Rating Skeleton */}
            <div className="rounded-md bg-gray-300 animate-pulse h-8 px-2 py-1 mr-4 w-16"></div>
            <div className="flex justify-center gap-2">
              {/* Star Skeletons */}
              <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-full"></div>
              <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-full"></div>
              <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-full"></div>
              <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-full"></div>
              <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-full"></div>
            </div>
            {/* Reviews Count Skeleton */}
            <div className="w-1/3 bg-gray-300 animate-pulse h-6 rounded"></div>
          </div>

          {/* Price Skeleton */}
          <div className="w-2/3 bg-gray-300 animate-pulse h-8 rounded"></div>
        </div>

        {/* Product Details Skeleton */}
        <div className="hidden sm:flex sm:flex-col place-self-start pt-4 px-10 start-0">
          <p className="text-2xl font-semibold place-self-center pb-5 bg-gray-300 animate-pulse h-8 w-32 rounded"></p>
          <ul className="w-[90%] place-self-center text-left">
            <li className="grid grid-cols-2 justify-between justify-items-center font-medium text-left text-lg pb-5">
              <div className="w-24 h-6 bg-gray-300 animate-pulse rounded"></div>
              <div className="w-32 h-6 bg-gray-300 animate-pulse rounded"></div>
            </li>
            <li className="grid grid-cols-2 justify-between justify-items-center font-normal text-lg text-left">
              <div className="w-24 h-6 bg-gray-300 animate-pulse rounded"></div>
              <div className="w-32 h-6 bg-gray-300 animate-pulse rounded"></div>
            </li>
          </ul>
        </div>
      </div>

      {/* Add to Cart Skeleton */}
      <div className="w-screen bg-transparent/10 sm:w-full sm:h-[75vh] rounded-large">
        <div className="gap-y-10 justify-evenly sm:h-[75vh] sm:w-full flex flex-col py-3 pb-10 pt-9">
          <div className="flex justify-evenly pt-5">
            <div className="w-20 h-8 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
          <div className="flex flex-col gap-y-10">
            <div className="w-full h-12 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse rounded-lg"></div>
            <div className="w-full h-12 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
