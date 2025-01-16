import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DropdownFilter } from "./dropdown-filter";
import { ColumnFiltersState } from "@tanstack/react-table";
import { getAreas, getCategories } from "./data";
import { IArea, ICategory } from "@/types";

type DropdownFiltersProps = {
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
};

export const DropdownFilters: React.FC<DropdownFiltersProps> = ({
  setColumnFilters,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [areas, setAreas] = useState<IArea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const categories1 = ["All", "Seafood", "Side", "Beef"];
  // const areas1 = ["All", "American", "British", "Canadian"];

  const transformedCategories = categories.map((category) => ({
    value: category.strCategory,
  }));
  const transformedAreas = areas.map((area) => ({
    value: area.strArea,
  }));

  const updateFilter = (id: string, value: string) => {
    setColumnFilters((prev) => {
      if (value === "All Areas" || value === "All Categories") {
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

        // Fetch categories and areas in parallel
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
        <div>Loading filters...</div>
      ) : error ? (
        <div>Error loading filters, try later.</div>
      ) : (
        <>
          {/* Category Filter */}
          <div>
            <DropdownFilter
              options={transformedCategories}
              placeholder="All Categories"
              onFilterChange={(value) => updateFilter("strCategory", value)}
            />
          </div>
          {/* Area Filter */}
          <div>
            <DropdownFilter
              options={transformedAreas}
              placeholder="All Areas"
              onFilterChange={(value) => updateFilter("strArea", value)}
            />
          </div>
        </>
      )}
    </>
  );
};
