import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DropdownFilter } from "./dropdown-filter";
import { ColumnFiltersState } from "@tanstack/react-table";
import { getAreas, getCategories } from "./data";
import { IArea, ICategory } from "@/types";
import { DropdownFilterSkeleton } from "./skeletons";

type DropdownFiltersProps = {
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
};

export const DropdownFilters: React.FC<DropdownFiltersProps> = ({
  setColumnFilters,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [areas, setAreas] = useState<IArea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const transformedCategories = categories.map((category) => ({
    value: category.strCategory,
  }));
  const transformedAreas = areas.map((area) => ({
    value: area.strArea,
  }));

  const difficultyOptions = [
    { value: "All Difficulties" },
    { value: "Easy" },
    { value: "Medium" },
    { value: "Hard" },
  ];

  const updateFilter = (id: string, value: string) => {
    setColumnFilters((prev) => {
      if (value.startsWith("All ")) {
        return prev.filter((filter) => filter.id !== id);
      }
      const existingFilter = prev.find((filter) => filter.id === id);
      if (existingFilter) {
        return prev.map((filter) =>
          filter.id === id ? { id, value } : filter
        );
      }
      return [...prev, { id, value }];
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [fetchedCategories, fetchedAreas] = await Promise.all([
          getCategories(),
          getAreas(),
        ]);

        setCategories([
          { strCategory: "All Categories" },
          ...fetchedCategories,
        ]);
        setAreas([{ strArea: "All Areas" }, ...fetchedAreas]);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
            <DropdownFilterSkeleton />
            <DropdownFilterSkeleton />
            <DropdownFilterSkeleton />
        </>
      ) : error ? (
        <div>Error loading filters, try later.</div>
      ) : (
        <>
          <div>
            <DropdownFilter
              options={transformedCategories}
              placeholder="All Categories"
              onFilterChange={(value) => updateFilter("strCategory", value)}
            />
          </div>
          <div>
            <DropdownFilter
              options={transformedAreas}
              placeholder="All Areas"
              onFilterChange={(value) => updateFilter("strArea", value)}
            />
          </div>
          <div>
            <DropdownFilter
              options={difficultyOptions}
              placeholder="All Difficulties"
              onFilterChange={(value) => updateFilter("difficulty", value)}
            />
          </div>
        </>
      )}
    </>
  );
};
