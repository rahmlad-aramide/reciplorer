import { IRecipe } from "@/types";

const SESSION_STORAGE_KEY = "recipes";

export const getRecipesFromSessionStorage = (): IRecipe[] => {
  const recipes = sessionStorage.getItem(SESSION_STORAGE_KEY);
  return recipes ? JSON.parse(recipes) : [];
};

export const getRecipeByIdFromSessionStorage = (idMeal: string): IRecipe | null => {
  const recipes = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (recipes) {
    const parsedRecipes: IRecipe[] = JSON.parse(recipes);
    return parsedRecipes.find((recipe) => recipe.idMeal === idMeal) || null;
  }
  return null;
};

export const saveRecipeToSessionStorage = (recipe: IRecipe): void => {
  const currentRecipes = getRecipesFromSessionStorage();

  // Check if the recipe already exists based on the unique identifier (i.e, idMeal)
  const recipeExists = currentRecipes.some(
    (storedRecipe) => storedRecipe.idMeal === recipe.idMeal
  );

  if (!recipeExists) {
    sessionStorage.setItem(
      "recipes",
      JSON.stringify([...currentRecipes, recipe])
    );
  }
};

export const generateLocalId = (): string => {
  const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generate a random 5-digit number
  return `local_${randomNumber}`;
};

export const renderTags = (tags: string | null, maxVisibleTags: number = 2) => {
    if (!tags || tags === "null") return ["No tag"];
  
    const tagArray = tags.split(","); 
    if (tagArray.length <= maxVisibleTags) {
      return tagArray;
    }
  
    // Show the first maxVisibleTags and append a summary for the rest
    return [...tagArray.slice(0, maxVisibleTags), `+${tagArray.length - maxVisibleTags}`];
  };
  

  // Parse ingredients and measurements
export const getIngredientsWithMeasurements = (recipe: Record<string, string>): string[] => {
    return Object.keys(recipe)
      // Filter for ingredient keys with non-empty values
      .filter((key) => key.startsWith("strIngredient") && recipe[key])
      .map((key) => {
        const measurementKey = key.replace("strIngredient", "strMeasure");
        return `${recipe[key]} - ${recipe[measurementKey] || ""}`.trim();
      });
  };

  