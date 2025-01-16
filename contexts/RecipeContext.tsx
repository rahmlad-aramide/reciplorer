'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";
import { IRecipe } from "@/types";
import { saveRecipeToSessionStorage } from "@/lib/helper";

interface RecipeContextType {
  recipes: IRecipe[];
  setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>;
  addRecipe: (recipe: IRecipe) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  const addRecipe = (recipe: IRecipe) => {
    setRecipes((prevRecipes) => {
      const updatedRecipes = [...prevRecipes, recipe];
      saveRecipeToSessionStorage(recipe);
      return updatedRecipes;
    });
  };

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipeContext must be used within a RecipeProvider");
  }
  return context;
};
