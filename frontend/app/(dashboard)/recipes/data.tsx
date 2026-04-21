import { IArea, ICategory, IRecipe, ISimilarCategory } from "@/types";

const API_BASE_URL = "http://localhost:8080/api";

export async function getData(): Promise<IRecipe[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Fallback to external API for demo if local backend fails
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    const data = await response.json();
    return data.meals || [];
  }
}

export async function getSeededData(): Promise<IRecipe[]> {
  return getData(); // Use actual data if possible
}

export async function getSingleData(idMeal: string): Promise<IRecipe> {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes/${idMeal}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching single recipe:", error);
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    const data = await response.json();
    return data.meals[0];
  }
}

export async function getSeededSingleData(idMeal: string): Promise<IRecipe> {
  return getSingleData(idMeal);
}

export async function getCategories(): Promise<ICategory[]> {
  try {
    // For now use the external list if backend doesn't have it seeded
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
    );
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
export async function getAreas(): Promise<IArea[]> {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error fetching areas:", error);
    return [];
  }
}

export async function getSimilarCategories(
  category: string
): Promise<ISimilarCategory[]> {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error fetching similar categories:", error);
    return [];
  }
}

export async function askAICooking(question: string, context: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/ai/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, context }),
    });
    if (!response.ok) throw new Error("AI Request failed");
    return await response.json();
  } catch (error) {
    console.error("AI Assistant error:", error);
    return { response: "Assistant is offline." };
  }
}
