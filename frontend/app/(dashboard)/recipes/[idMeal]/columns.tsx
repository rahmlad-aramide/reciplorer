"use client";
import { Button } from "@/components/ui/button";
import { ISimilarCategory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import placeholderImage from '@/assets/placeholder.png';

export const columns: ColumnDef<ISimilarCategory>[] = [
  {
    accessorKey: 'idMeal',
    header: () => null,
    cell: () => null,
  },
  {
    accessorKey: "strMealThumb",
    header: () => null,
    cell: ({ row }) => {
      return <div>
          <Image src={row.getValue('strMealThumb') || placeholderImage} alt={row.getValue('strMeal') || "Reciplorer Logo"} width={700} height={700} className="w-10 h-10 rounded" />
        </div>;
    },
  },
  {
    accessorKey: "strMeal",
    header: ({ column }) => {
      return (
        <Button
          size={"xs"}
          variant="link"
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Meal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
