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
import { TablePagination } from "./../pagination";
import { Search, ShoppingBasket } from "lucide-react";
import { DesktopTable } from "./../desktop-table";
import placeholderImage from "@/assets/placeholder.png";
import Image from "next/image";
import Link from "next/link";
// import Link from "next/link";

interface RecipeTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function SimilarRecipeTable<TData, TValue>({
  columns,
  data,
}: RecipeTableProps<TData, TValue>) {
  const [sorting, setSortByName] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
        </div>

        <div className="hidden md:flex mt-4">
          <DesktopTable columns={columns} table={table} />
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-8 md:hidden mt-4">
          {/* Mobile table */}
          {table.getRowModel().rows.map((row, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md">
              <div className="flex">
                <Image
                  src={row.getValue("strMealThumb") || placeholderImage}
                  alt={row.getValue("strMeal") || "Reciplorer Logo"}
                  width={700}
                  height={700}
                  className="w-full h-full max-w-[700px] max-h-[700px] border rounded-t-lg"
                />
              </div>
              <div className="flex flex-col gap-4 p-4">
                <p className="text-xl font-semibold line-clamp-1 overflow-ellipsis text-neutral-800">
                  {row.getValue("strMeal")}
                </p>
                <Link
                  href={`/recipes/${row.getValue("idMeal")}`}
                  className="flex justify-center items-center w-full bg-secondary text-white shadow-sm hover:bg-secondary/80 gap-1 rounded-md px-4 h-10 transition duration-200 leading-none"
                >
                  <ShoppingBasket size={20} />
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <TablePagination table={table} />
      </div>
    </>
  );
}
