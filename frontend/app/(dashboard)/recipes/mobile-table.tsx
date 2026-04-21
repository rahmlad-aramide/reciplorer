import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import placeholderImage from "@/assets/placeholder.png";
import { Tags } from "./tags";

interface MobileTableProps<TData> {
  rows: TData[];
  getRowKey: (row: TData) => string; 
  getLinkHref: (row: TData) => string;
  getThumbnail: (row: TData) => string | StaticImageData; 
  getName: (row: TData) => string; 
  getCategory: (row: TData) => string; 
  getArea: (row: TData) => string;
  getTags: (row: TData) => string | null; 
}

export const MobileTable = <TData,>({
  rows,
  getRowKey,
  getLinkHref,
  getThumbnail,
  getName,
  getCategory,
  getArea,
  getTags,
}: MobileTableProps<TData>) => {
  return (
    <div className="flex flex-col w-full">
      {rows.map((row) => (
        <Link
          href={getLinkHref(row)}
          key={getRowKey(row)}
          className="py-4 md:px-4 border-b-2 flex gap-2 cursor-pointer hover:opacity-80 active:opacity-100 transition duration-200"
        >
          <div className="flex w-full">
            <div className="flex mr-4 w-20">
              <Image
                src={getThumbnail(row) || placeholderImage}
                alt={getName(row) || "Reciplorer Logo"}
                width={700}
                height={700}
                className="w-20 h-20 border rounded-lg"
              />
            </div>
            <div className="flex flex-col flex-1 justify-between">
              <div className="flex flex-col">
                <div className="font-medium text-xl">{getName(row)}</div>
                <div className="flex text-neutral-600 items-center gap-2">
                  <div>{getCategory(row)}</div>
                  <div className="h-1 w-1 rounded-full bg-neutral-600"></div>
                  <div>{getArea(row)}</div>
                </div>
              </div>
              <div className="flex flex-shrink justify-end">
                <Tags tags={getTags(row)} isMobile />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
