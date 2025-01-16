"use client";
import { Usable, use, useEffect, useState } from "react";
import { getSingleData } from "../data";
import { IRecipe } from "@/types";
import { getRecipeByIdFromSessionStorage } from "@/lib/helper";
import { RecipeDetail } from "./recipe-detail";

export default function RecipeDetails({
  params,
}: {
  params: Usable<{ idMeal: string }>;
}) {
  const { idMeal } = use<{ idMeal: string }>(params);

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
      <section className="container mx-auto p-5 mt-5 rounded-lg">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : !data ? (
          <div>Recipe not found.</div>
        ) : (
          <RecipeDetail recipe={data} />
        )}
      </section>
    </main>
  );
}
