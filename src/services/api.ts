import { Recipe } from "../types";

const BASE_URL = process.env.PARCEL_API_URL;

export class ApiService {
  static async getRecipes(page: number = 1): Promise<Recipe[]> {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) throw new Error("Failed to fetch recipes");
      const data = await response.json();
      return data.recipes;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return [];
    }
  }

  static async getRecipeById(id: number): Promise<Recipe | null> {
    try {
      const recipes = await this.getRecipes();
      return recipes.find((recipe) => recipe.id === id) || null;
    } catch (error) {
      console.error("Error fetching recipe:", error);
      return null;
    }
  }
}
