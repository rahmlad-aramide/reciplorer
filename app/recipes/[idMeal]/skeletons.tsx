import React from "react";

export const RecipeDetailSkeleton: React.FC = () => {
  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        {/* Header Section */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-white p-5 rounded-lg">
            <div className="flex gap-1 md:col-span-2 items-center">
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-48 bg-gray-200 rounded-md"></div>
            </div>

            {/* Recipe Thumbnail */}
            <div className="w-full h-64 bg-gray-200 rounded"></div>

            {/* Recipe Details */}
            <div className="flex flex-col md:px-4 gap-3 md:gap-6 bg-white rounded-lg">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex justify-between items-center">
                <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
                <div className="h-4 w-36 bg-gray-200 rounded-md"></div>
                </div>
            ))}
            {/* Ingredients Section */}
            <div>
                <div className="h-4 w-32 bg-gray-200 rounded-md mb-2"></div>
                <ul className="list-circle pl-6">
                {Array.from({ length: 3 }).map((_, index) => (
                    <li key={index} className="h-4 w-48 bg-gray-200 rounded-md mb-2"></li>
                ))}
                </ul>
            </div>
            </div>
        </div>

        {/* Instructions Section */}
        <div className="col-span-2 lg:col-span-1 bg-white rounded-lg p-5">
            <div className="h-5 w-40 bg-gray-200 rounded-md mb-4"></div>
            <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-4 w-full bg-gray-200 rounded-md"></div>
            ))}
            </div>
        </div>

        {/* Video Tutorial Section */}
        <div className="col-span-2 lg:col-span-1 bg-white p-5 rounded-lg">
            <div className="h-5 w-40 bg-gray-200 rounded-md mb-4"></div>
            <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
            <div className="h-4 w-32 bg-gray-200 rounded-md mt-4 mx-auto"></div>
        </div>
        </div>
        <section className="sm:container mx-auto bg-white p-4 mt-4 rounded-lg">
            <div className="flex justify-between">
                <div className="h-6 w-48 bg-gray-200 rounded-md"></div>
            </div>
            <SimilarRecipeTableSkeleton />
        </section>
    </>
  );
};

import { DesktopTableSkeleton, TablePaginationSkeleton } from "../skeletons";

export const SimilarRecipeTableSkeleton: React.FC = () => {
  return (
    <div className="rounded-md animate-pulse">
      {/* Search Input Skeleton */}
      <div className="flex items-center justify-between md:justify-start gap-4 py-4">
        <div className="relative flex items-center w-full">
          <div className="w-full md:max-w-xs h-10 bg-gray-200 rounded-md pl-8"></div>
          <div className="absolute left-2 top-1/2 h-[18px] w-[18px] bg-gray-300 rounded-full -translate-y-1/2"></div>
        </div>
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden md:flex mt-4">
        <DesktopTableSkeleton columnCount={3} rowCount={10} />
      </div>

      {/* Mobile Table Skeleton */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-8 md:hidden mt-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md flex flex-col"
          >
            {/* Image Skeleton */}
            <div className="w-full h-40 bg-gray-200 rounded-t-lg"></div>
            {/* Text and Button Skeleton */}
            <div className="flex flex-col gap-4 p-4">
              <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
              <div className="h-10 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-4">
        <TablePaginationSkeleton />
      </div>
    </div>
  );
};
