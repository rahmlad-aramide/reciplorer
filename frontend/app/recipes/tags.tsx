import { renderTags } from "@/lib/helper";
import React from "react";

interface TagsProps {
  tags: string | null;
  isMobile?: boolean;
  maxVisibleTags?: number; 
}

export const Tags: React.FC<TagsProps> = ({ tags, isMobile = false, maxVisibleTags = 2 }) => {
  // For mobile, use the ellipsed version; otherwise, show all tags
  const displayedTags = isMobile
    ? renderTags(tags, maxVisibleTags) 
    : tags?.split(",") || ["No tag"]; 

  return (
    <>
      {displayedTags.map((tag, index) => (
        <span
          key={index}
          className="inline-block whitespace-nowrap bg-secondary/10 rounded-full px-2 py-1 text-secondary h-fit text-xs font-medium mr-1"
        >
          {tag === "null" ? "No tag" : tag}
        </span>
      ))}
    </>
  );
};
