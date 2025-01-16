import Image from "next/image";
import Link from "next/link";
import { VideoEmbed } from "./video-embed";
import { IRecipe } from "@/types";
import placeholderImage from "@/assets/placeholder.png";
import { ChevronLeft } from "lucide-react";
import { Tags } from "../tags";
import { FormatInstructions } from "./format-instructions";
import { getIngredientsWithMeasurements } from "@/lib/helper";
import { SimilarRecipe } from "./similar-recipe";

export const RecipeDetail = ({ recipe }: { recipe: IRecipe }) => {
    //@ts-expect-error passing recipe as an object
  const ingredients = getIngredientsWithMeasurements(recipe)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-white p-5 rounded-lg">
          <div className="flex gap-1 md:col-span-2">
            <Link
              href={"/recipes"}
              className="flex justify-center items-center hover:scale-110 transition duration-200"
            >
              <ChevronLeft size={20} color="#292D32" />
              <span className="sr-only">Go back</span>
            </Link>
            <h1 className="text-xl/normal font-semibold text-neutral-800">
              {recipe.strMeal}
            </h1>
          </div>
          {/* Recipe Thumbnail */}
          <div>
            <Image
              src={recipe.strMealThumb || placeholderImage}
              alt={recipe.strMeal || "Reciplorer Logo"}
              className="w-full h-auto rounded"
              width={700}
              height={700}
            />
          </div>
          {/* Recipe Details */}
          <div className="flex flex-col md:px-4 gap-3 md:gap-6 bg-white rounded-lg">
            <div className="flex justify-between">
              <h3 className="text-neutral-400 text-lg font-medium">
                Meal Name:
              </h3>
              <p className="text-neutral-800">{recipe.strMeal}</p>
            </div>
            <div className="flex justify-between">
              <h3 className="text-neutral-400 text-lg font-medium">
                Category:
              </h3>
              <p className="text-neutral-800">{recipe.strCategory}</p>
            </div>
            <div className="flex justify-between">
              <h3 className="text-neutral-400 text-lg font-medium">Area:</h3>
              <p className="text-neutral-800">{recipe.strArea}</p>
            </div>
            <div className="flex justify-between">
              <h3 className="text-neutral-400 text-lg font-medium">Tags:</h3>
              <div><Tags tags={recipe.strTags || 'null'} /></div>
            </div>
            {/* Ingredient measurement */}
            <div>
              <h3 className="text-neutral-400 text-lg font-medium mb-2">
                Ingredients:{" "}
              </h3>
              {ingredients.length ? (
                <ul className="list-circle pl-6 text-neutral-800">
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              ) : (
                <p>No Ingredient(s) found.</p>
              )}
            </div>
          </div>
        </div>
        {/* Instructions */}
        <div className="col-span-2 lg:col-span-1 bg-white rounded-lg p-5">
          <h2 className="text-neutral-400 font-medium text-xl">Instructions</h2>
          <div className="flex flex-col gap-2">
            <FormatInstructions instructions={(recipe.strInstructions)} />
          </div>
        </div>
        {/* Video Tutorial */}
        {recipe.strYoutube && (
          <div className="col-span-2 lg:col-span-1 bg-white p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-neutral-400">
              Video Tutorial
            </h3>
            <VideoEmbed url={recipe.strYoutube} />
            <div className="text-center mt-4">
              <Link
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Watch on YouTube
              </Link>
            </div>
          </div>
        )}
      </div>
      <SimilarRecipe category={recipe.strCategory} />
    </>
  );
};
