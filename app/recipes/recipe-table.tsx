"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { TablePagination } from "./pagination";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import placeholderImage from '@/assets/placeholder.png';
import { Filter, FilterX, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownFilters } from "./dropdown-filters";

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
  const { push } = useRouter();
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

  const renderTags = (tags: string | null) => {
    if (!tags || tags === "null") return ["No tag"];
  
    const tagArray = tags.split(","); // Convert the tags string into an array
    if (tagArray.length <= 2) {
      return tagArray; // Return all tags if 3 or fewer
    }
  
    // Show the first 2 tags and append a summary for the rest
    return [...tagArray.slice(0, 2), `+${tagArray.length - 2}`];
  };

  return (
    <>
      <div className="rounded-md ">
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
            <Search size={20} className="absolute left-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div className="flex gap-4">
            <Button variant={'outline'} onClick={()=>setOpenFilter(!openFilter)} className="flex md:hidden text-neutral-800">
              {
                openFilter ? <FilterX />: <Filter />
              }
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
          <Table>
            <TableHeader className="bg-neutral-100 text-neutral-600 rounded py-4">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer"
                    onClick={() => push(`/recipes/${row.getValue("idMeal")}`)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex md:hidden mt-4">
          {/* Mobile table */}
          <div className="flex flex-col w-full">{table.getRowModel().rows.map((row) => (
            <Link
              href={`/recipes/${row.getValue("idMeal")}`}
              key={row.id}
              className="p-4 border-b-2 flex gap-2 cursor-pointer"
            >
              <div className="flex w-full">
                <div className="flex mr-4 w-20">
                  <Image src={row.getValue('strMealThumb') || placeholderImage} alt={row.getValue('strMeal') || "Reciplorer Logo"} width={700} height={700} className="w-20 h-20 border rounded-lg" />
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div className="flex flex-col">
                    <div className="font-medium text-xl">{row.getValue("strMeal")}</div>
                    <div className="flex text-neutral-600 items-center gap-2">
                      <div>{row.getValue("strCategory")}</div>
                      <div className="h-1 w-1 rounded-full bg-neutral-600"></div>
                      <div>{row.getValue("strArea")}</div>
                    </div>
                  </div>
                  <div className="flex flex-shrink justify-end">{renderTags(row.getValue("strTags")).map((tag, index) => (
                    <span
                        key={index}
                        className="inline-block whitespace-nowrap bg-blue-100 rounded-full px-2 py-1 text-blue-700 h-fit text-xs font-medium mr-1"
                      >
                        {tag === 'null'? "No tag": tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))
          }</div>
        </div>
      </div>
      <div>
        <TablePagination table={table} />
      </div>
    </>
  );
}
