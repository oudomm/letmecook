import { Recipe } from "../types";

export class RecipeCard {
  constructor(private recipe: Recipe, private index: number) {}

  private renderRating(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return `
      <div class="flex items-center gap-1">
        ${Array.from({ length: 5 }, (_, i) => {
          if (i < fullStars) {
            return `
              <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            `;
          } else if (i === fullStars && hasHalfStar) {
            return `
              <div class="relative">
                <svg class="w-4 h-4 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <div class="absolute inset-0 overflow-hidden w-1/2">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>
            `;
          } else {
            return `
              <svg class="w-4 h-4 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            `;
          }
        }).join("")}
      </div>
    `;
  }

  render(): string {
    return `
      <div class="group transform transition-all duration-500 hover:-translate-y-2 animate-fade-in-up cursor-pointer" 
           style="animation-delay: ${this.index * 100}ms"
           data-recipe-id="${this.recipe.id}">
        <!-- Card Container -->
        <div class="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 border border-gray-100 dark:border-gray-700">
          
          <!-- Image Container -->
          <div class="relative overflow-hidden h-56">
            <img src="${this.recipe.image}" 
                 alt="${this.recipe.name}" 
                 class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 loading="lazy">
            
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            
            <!-- Cuisine Badge -->
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 text-xs font-semibold bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-800 dark:text-white shadow-lg">
                ${this.recipe.cuisine}
              </span>
            </div>

            <!-- Favorite Button -->
            <button class="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white z-10">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>

            <!-- View Recipe Button -->
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div class="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <span class="flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  View Recipe
                </span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 truncate">
              ${this.recipe.name}
            </h3>
            
            <!-- Rating and Stats -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                ${this.renderRating(this.recipe.rating)}
                <span class="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  ${this.recipe.rating}/5
                </span>
              </div>
              ${
                this.recipe.cookTimeMinutes
                  ? `
                <div class="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="text-sm">${this.recipe.cookTimeMinutes}</span>
                </div>
              `
                  : ""
              }
            </div>

            <!-- Description -->
            ${
              this.recipe.description
                ? `
              <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2 mb-4">
                ${this.recipe.description}
              </p>
            `
                : ""
            }

            <!-- Tags -->
            ${
              this.recipe.tags
                ? `
            <div class="flex items-center h-6 overflow-hidden">
              <div class="flex gap-2 flex-nowrap overflow-hidden">
                ${this.recipe.tags
                  .slice(0, 2)
                  .map(
                    (tag) => `
                    <span class="inline-flex flex-shrink-0 px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-lg font-medium whitespace-nowrap">
                      ${tag}
                    </span>
                  `
                  )
                  .join("")}
                ${
                  this.recipe.tags.length > 2
                    ? `
                    <span class="inline-flex flex-shrink-0 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg font-medium whitespace-nowrap">
                      +${this.recipe.tags.length - 2} more
                    </span>
                  `
                    : ""
                }
              </div>
            </div>
          `
                : ""
            }
          </div>
        </div>
      </div>
    `;
  }
} 