"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { TablePagination } from "./pagination";
import placeholderImage from "@/assets/placeholder.png";
import { Filter, FilterX, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownFilters } from "./dropdown-filters";
import { DesktopTable } from "./desktop-table";
import { MobileTable } from "./mobile-table";

interface RecipeTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function RecipeTable<TData, TValue>({
  columns,
  data,
}: RecipeTableProps<TData, TValue>) {
  const [sorting, setSortByName] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openFilter, setOpenFilter] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSortByName,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <div className="rounded-md transition duration-200">
        <div className="flex items-center justify-between md:justify-start gap-4 py-4">
          <div className="relative flex items-center w-full">
            <Input
              placeholder="Search by name..."
              value={
                (table.getColumn("strMeal")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("strMeal")?.setFilterValue(event.target.value)
              }
              className="w-full md:max-w-xs pl-8"
            />
            <Search
              size={20}
              className="absolute left-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
            />
          </div>
          <div className="flex gap-4">
            <Button
              variant={"outline"}
              size={"lg"}
              onClick={() => setOpenFilter(!openFilter)}
              className="flex md:hidden text-neutral-800 px-4"
            >
              {openFilter ? <FilterX /> : <Filter />}
            </Button>
            <div className="hidden md:flex gap-4">
              <DropdownFilters setColumnFilters={setColumnFilters} />
            </div>
          </div>
        </div>
        {openFilter && (
          <div className="flex md:hidden gap-4">
            <DropdownFilters setColumnFilters={setColumnFilters} />
          </div>
        )}

        <div className="hidden md:flex mt-4">
          <DesktopTable columns={columns} table={table} />
        </div>
        <div className="flex md:hidden mt-4">
          {/* Mobile table */}
          <MobileTable 
            rows={table.getRowModel().rows}
            getRowKey={(row) => row.id}
            getLinkHref={(row) => `/recipes/${row.getValue("idMeal")}`}
            getThumbnail={(row) => row.getValue("strMealThumb") || placeholderImage}
            getName={(row) => row.getValue("strMeal")}
            getCategory={(row) => row.getValue("strCategory")}
            getArea={(row) => row.getValue("strArea")}
            getTags={(row) => row.getValue("strTags") || null}
          />
        </div>
      </div>
      <div className="mt-4">
        <TablePagination table={table} />
      </div>
    </>
  );
}
