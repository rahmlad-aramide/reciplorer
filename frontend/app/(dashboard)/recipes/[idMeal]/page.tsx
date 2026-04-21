"use client";
import { useEffect, useState } from "react";
import { getSingleData } from "../data";
import { IRecipe } from "@/types";
import { getRecipeByIdFromSessionStorage } from "@/lib/helper";
import { RecipeDetail } from "./recipe-detail";
import { useParams } from "next/navigation";
import { RecipeDetailSkeleton } from "./skeletons";

export default function RecipeDetails() {
  const params = useParams<{idMeal: string}>();
  const { idMeal } = params;

  const [data, setData] = useState<IRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isLocalId = idMeal.startsWith("local_");
    if (isLocalId) {
      const localData = getRecipeByIdFromSessionStorage(idMeal);
      if (localData) {
        setData(localData);
        setIsLoading(false);
      } else {
        setError("Recipe not found.");
      }
      return;
    }
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await getSingleData(idMeal);
        setData(fetchedData);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idMeal]);

  return (
    <main className="py-10 bg-neutral-100 font-[family-name:var(--font-geist-sans)]">
      <section className="sm:container mx-auto p-4 sm:p-5 mt-7 rounded-lg">
        {isLoading ? (
          <RecipeDetailSkeleton />
        ) : error ? (
          <div>{error}</div>
        ) : !data ? (
          <div>Recipe not found.</div>
        ) : (
          <>
            <RecipeDetail recipe={data} />
          </>
        )}
      </section>
    </main>
  );
}
