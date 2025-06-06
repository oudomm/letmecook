import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ApiService } from '../services/api';
import { Recipe } from '../types';
import { Router } from '../utils/router';
import { RecipeDetailSkeleton } from '../components/RecipeDetailSkeleton';

export class RecipeDetail {
  private header = new Header();
  private footer = new Footer();
  private recipe: Recipe | null = null;
  private isLoading: boolean = true;

  constructor() {
    // Start loading the recipe data immediately
    this.loadRecipe();
  }

  public async loadRecipe() {
    try {
      const pathParts = window.location.pathname.split('/');
      const recipeId = pathParts[pathParts.length - 1];
      if (!recipeId) {
        throw new Error('Recipe ID not found');
      }

      const parsedId = parseInt(recipeId);
      if (isNaN(parsedId)) {
        throw new Error('Invalid recipe ID');
      }

      const recipe = await ApiService.getRecipeById(parsedId);
      if (!recipe) {
        throw new Error('Recipe not found');
      }

      this.recipe = recipe;
      this.isLoading = false;
      
      // Update the content with the actual recipe
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.innerHTML = this.renderContent();
      }
    } catch (error) {
      console.error('Error loading recipe:', error);
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.innerHTML = `
          <div class="container mx-auto px-4 py-12">
            <div class="max-w-4xl mx-auto text-center">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Error Loading Recipe</h2>
              <p class="text-gray-600 dark:text-gray-400 mb-8">Sorry, we couldn't load the recipe. Please try again later.</p>
              <button 
                onclick="window.history.back()"
                class="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        `;
      }
    }
  }

  public render(): string {
    return `
      ${this.header.render()}
      <main class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div id="main-content">
          ${this.isLoading ? new RecipeDetailSkeleton().render() : this.renderContent()}
        </div>
      </main>
      ${this.footer.render()}
    `;
  }

  private renderContent(): string {
    if (!this.recipe) return '';

    const recipe = this.recipe;

    return `
      <div class="animate-fade-in">
        <!-- Main Content Grid -->
        <div class="container mx-auto px-4 py-8">
          <div class="max-w-7xl mx-auto">
            <!-- Back Button -->
            <button 
              onclick="window.history.back()"
              class="mb-6 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-md"
            >
              <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Left Column: Image and Stats -->
              <div class="lg:col-span-1 space-y-6">
                <!-- Recipe Image -->
                <div class="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="${recipe.image}" 
                    alt="${recipe.name}"
                    class="w-full h-full object-cover object-center"
                  >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  
                  <!-- Favorite Button -->
                  <button 
                    class="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg"
                  >
                    <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </button>
                </div>

                <!-- Recipe Stats -->
                <div class="grid grid-cols-3 gap-4">
                  <div class="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h3 class="text-sm text-gray-600 dark:text-gray-400 text-center">Prep Time</h3>
                    <p class="text-lg font-semibold text-gray-900 dark:text-white text-center">${recipe.prepTimeMinutes || 'N/A'} mins</p>
                  </div>
                  <div class="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h3 class="text-sm text-gray-600 dark:text-gray-400 text-center">Cook Time</h3>
                    <p class="text-lg font-semibold text-gray-900 dark:text-white text-center">${recipe.cookTimeMinutes || 'N/A'}</p>
                  </div>
                  <div class="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                      </svg>
                    </div>
                    <h3 class="text-sm text-gray-600 dark:text-gray-400 text-center">Servings</h3>
                    <p class="text-lg font-semibold text-gray-900 dark:text-white text-center">${recipe.servings || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <!-- Right Column: Recipe Details -->
              <div class="lg:col-span-2 space-y-8">
                <!-- Title and Rating -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                  <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">${recipe.name}</h1>
                  <div class="flex items-center gap-4">
                    <div class="flex gap-1">
                      ${Array(5).fill(0).map((_, i) => `
                        <svg class="w-5 h-5 ${i < Math.floor(recipe.rating) ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      `).join('')}
                    </div>
                    <span class="text-gray-600 dark:text-gray-400 font-medium">${recipe.rating.toFixed(1)}</span>
                  </div>
                </div>

                <!-- Ingredients -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Ingredients</h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${recipe.ingredients.map(ingredient => `
                      <div class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                        <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span class="text-gray-600 dark:text-gray-400">${ingredient}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Instructions -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Instructions</h2>
                  <div class="space-y-6">
                    ${recipe.instructions.map((instruction, index) => `
                      <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                        <div class="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex-shrink-0 flex items-center justify-center">
                          <span class="text-orange-500 font-semibold">${index + 1}</span>
                        </div>
                        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">${instruction}</p>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private initializeEventListeners(): void {
    // Add any event listeners here
  }
}
