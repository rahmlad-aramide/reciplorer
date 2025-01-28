"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { getData } from "./data";
import { RecipeTable } from "./recipe-table";
import { useRecipeContext } from "@/contexts/RecipeContext";
import { getRecipesFromSessionStorage } from "@/lib/helper";
import { PlusCircle } from "lucide-react";
import { RecipeTableSkeleton } from "./skeletons";
import { ChevronLeft } from "lucide-react";

export default function Recipes() {
  const { recipes: data, setRecipes: setData } = useRecipeContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await getData();
        const storedRecipes = getRecipesFromSessionStorage();
        const combinedData = [...fetchedData, ...storedRecipes];
        setData(combinedData);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="py-10 bg-neutral-100 font-[family-name:var(--font-geist-sans)]">
      <section className="sm:container w-full mx-auto p-4 sm:p-5 mt-10 rounded-lg">
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between">
            <div className="flex gap-1 items-center"> 
              <Link
                href={"/"}
                className="flex justify-center items-center hover:scale-110 transition duration-200"
              >
                <ChevronLeft size={22} color="#292D32" />
                <span className="sr-only">Go back</span>
              </Link>
              <h1 className="text-xl/normal font-semibold">Recipes</h1>
            </div>
            <Link href={'/recipes/new'} className="flex justify-center items-center bg-secondary text-white shadow-sm hover:bg-secondary/80 gap-1 rounded-md px-4 h-9 transition duration-200 leading-none">
              <PlusCircle size={20} />
              Add New
            </Link>
          </div>
          {isLoading ? (
            <RecipeTableSkeleton />
          ) : error ? (
            <div>{error}</div>
          ) : (
            <RecipeTable columns={columns} data={data} />
          )}
        </div>
      </section>
    </main>
  );
}
