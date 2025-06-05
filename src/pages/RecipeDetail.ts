import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ApiService } from "../services/api";

export class RecipeDetail {
  private header = new Header();
  private footer = new Footer();

  async render(): Promise<string> {
    const id = parseInt(window.location.pathname.split("/").pop() || "1");
    const recipe = await ApiService.getRecipeById(id);

    if (!recipe) {
      return `
        <div class="min-h-screen flex items-center justify-center">
          <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Recipe not found</h1>
            <a href="/recipes" class="text-orange-500 hover:text-orange-600">Back to recipes</a>
          </div>
        </div>
      `;
    }

    return `
      ${this.header.render()}
      <main class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div class="container mx-auto px-4 py-12">
          <!-- Back Button -->
          <a href="/recipes" class="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 mb-8 group">
            <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
            </svg>
            <span>Back to recipes</span>
          </a>

          <!-- Recipe Content -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Left Column: Image and Quick Info -->
            <div>
              <div class="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
                <img 
                  src="${recipe.image}" 
                  alt="${recipe.name}" 
                  class="w-full h-[400px] object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div class="absolute bottom-6 left-6 right-6">
                  <span class="px-4 py-2 bg-white/90 dark:bg-gray-800/90 rounded-full text-sm font-medium text-gray-900 dark:text-white">
                    ${recipe.cuisine}
                  </span>
                </div>
              </div>

              <!-- Quick Info Cards -->
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">Cooking Time</div>
                      <div class="font-semibold text-gray-900 dark:text-white">${
                        recipe.cookTimeMinutes
                      }</div>
                    </div>
                  </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                      </svg>
                    </div>
                    <div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                      <div class="font-semibold text-gray-900 dark:text-white">${
                        recipe.rating
                      }/5</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Details -->
            <div>
              <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">${
                recipe.name
              }</h1>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                ${
                  recipe.description ||
                  `A delicious ${recipe.cuisine} recipe with ${recipe.ingredients.length} ingredients. Perfect for any occasion!`
                }
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-8">
                ${
                  recipe.tags
                    ?.map(
                      (tag) => `
                  <span class="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm font-medium">
                    ${tag}
                  </span>
                `
                    )
                    .join("") || ""
                }
              </div>

              <!-- Ingredients -->
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ingredients</h2>
                <ul class="space-y-3">
                  ${recipe.ingredients
                    .map(
                      (ingredient) => `
                    <li class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      ${ingredient}
                    </li>
                  `
                    )
                    .join("")}
                </ul>
              </div>

              <!-- Instructions -->
              <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Instructions</h2>
                <ol class="space-y-6">
                  ${recipe.instructions
                    .map(
                      (instruction, index) => `
                    <li class="flex gap-4">
                      <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-medium">
                        ${index + 1}
                      </div>
                      <p class="text-gray-600 dark:text-gray-300 flex-1">${instruction}</p>
                    </li>
                  `
                    )
                    .join("")}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
      ${this.footer.render()}
    `;
  }
}
