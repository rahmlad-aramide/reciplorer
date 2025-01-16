import { Dispatch, SetStateAction } from "react";
import { DropdownFilter } from "./dropdown-filter"
import { ColumnFiltersState } from "@tanstack/react-table";

type DropdownFiltersProps = {
    setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  };

export const DropdownFilters: React.FC<DropdownFiltersProps> = ({setColumnFilters}) => {
    const categories = ["All", "Seafood", "Side", "Beef"];
      const areas = ["All", "American", "British", "Canadian"];

    const updateFilter = (id: string, value: string) => {
        setColumnFilters((prev) => {
          if (value === "All") {
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
    return (
        <>
            {/* Category Filter */}
            <div className="">
            <DropdownFilter
            options={categories}
            placeholder="All Categories"
            onFilterChange={(value) => updateFilter("strCategory", value)}
            />
        </div>
        {/* Area Filter */}
        <div className="">
            <DropdownFilter
            options={areas}
            placeholder="All Areas"
            onFilterChange={(value) => updateFilter("strArea", value)}
            />
        </div>
        </>
    )
}