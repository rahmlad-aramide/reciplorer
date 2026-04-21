import { ISimilarCategory } from "@/types";
import { getSimilarCategories } from "../data";
import { useEffect, useState } from "react";
import { SimilarRecipeTable } from "./similar-recipe-table";
import { columns } from "./columns";
import { SimilarRecipeTableSkeleton } from "./skeletons";

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
        <section className="sm:container mx-auto bg-white p-4 mt-4 rounded-lg">
            <div className="flex justify-between">
            <h2 className="text-xl/normal font-semibold text-neutral-800">Similar Recipes</h2>
            </div>
            {isLoading ? (
            <SimilarRecipeTableSkeleton  />
            ) : error ? (
            <div>{error}</div>
            ) : (
              <>
                <SimilarRecipeTable columns={columns} data={data} />
              </>
            )}
      </section>
    )
}