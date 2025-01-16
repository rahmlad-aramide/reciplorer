import { ISimilarCategory } from "@/types";
import { getSimilarCategories } from "../data";
import { useEffect, useState } from "react";
import { SimilarRecipeTable } from "./similar-recipe-table";
import { columns } from "./columns";

export function SimilarRecipe ({category}: {category: string}) {
    const [data, setData] = useState<ISimilarCategory[]>([])
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true);
            const fetchedData = await getSimilarCategories(category);
            setData(fetchedData);
          } catch (error) {
            console.error(error);
            setError("Failed to fetch data. Please try again later.");
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, [category]);

    return (
        <section className="container mx-auto bg-white p-5 mt-4 rounded-lg">
            <div className="flex justify-between">
            <h2 className="text-xl/normal font-semibold">Similar Recipes</h2>
            </div>
            {isLoading ? (
            <div>Loading...</div>
            ) : error ? (
            <div>{error}</div>
            ) : (
            <SimilarRecipeTable columns={columns} data={data} />
            )}
      </section>
    )
}