import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ApiService } from "../services/api";
import { Recipe } from "../types";
import { Router } from "../utils/router";

export class RecipeList {
  private header = new Header();
  private footer = new Footer();
  private currentPage = 1;
  private recipesPerPage = 8;
  private activeFilter = "all";
  private searchQuery = "";

  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      this.initializeEventListeners();
      this.initializeIntersectionObserver();
    });
  }

  async render(): Promise<string> {
    const recipes = await ApiService.getRecipes();

    return `
      ${this.header.render()}
      <main class="pb-24 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <!-- Hero Section with Parallax -->
        <section class="relative h-[50vh] overflow-hidden mb-16">
          <div class="absolute inset-0">
            <img 
              src="https://staticg.sportskeeda.com/editor/2025/02/3662c-17389180452526-1920.jpg?w=640"
              alt="Eating Background"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/60"></div>
          </div>
          
          <!-- Floating Elements -->
          <div class="absolute inset-0">
            <div class="absolute top-20 right-20 w-72 h-72 bg-orange-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div class="absolute bottom-20 left-20 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse" style="animation-delay: 1s"></div>
          </div>

          <div class="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div class="max-w-3xl text-center">
              <h1 class="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                Discover
                <span class="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
                  Amazing Recipes
                </span>
              </h1>
              
              <!-- Enhanced Search Bar -->
              <div class="relative group animate-fade-in-up" style="animation-delay: 200ms">
                <div class="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div class="relative flex items-center">
                  <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="Search for recipes, cuisines, or ingredients..." 
                    class="w-full px-6 py-4 pl-14 text-lg rounded-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl focus:ring-4 focus:ring-orange-500/20 focus:outline-none transition-all duration-300 placeholder-gray-500 text-gray-900 dark:text-white"
                  >
                  <button 
                    id="searchButton"
                    class="absolute right-3 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl opacity-90 hover:opacity-100 transition-opacity"
                  >
                    Search
                  </button>
                  <div class="absolute left-5">
                    <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="container mx-auto px-4">
          <!-- Enhanced Filter Section -->
          <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div class="flex flex-wrap justify-center gap-3">
              ${this.renderFilterTags()}
            </div>
            
            <!-- Sort Dropdown -->
            <div class="relative group">
              <button id="sortButton" class="flex items-center gap-2 px-6 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/>
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Sort by</span>
              </button>
              <div id="sortMenu" class="hidden absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-10">
                <div class="p-2">
                  ${this.renderSortOptions()}
                </div>
              </div>
            </div>
          </div>

          <!-- Recipe Grid with Masonry Layout -->
          <div id="recipeGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-auto">
            ${this.renderRecipes(recipes)}
          </div>

          <!-- Loading Indicator -->
          <div id="loadingIndicator" class="hidden text-center py-12">
            <div class="inline-flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-orange-500 animate-bounce"></div>
              <div class="w-3 h-3 rounded-full bg-orange-500 animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-3 h-3 rounded-full bg-orange-500 animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </div>
        </div>
      </main>
      ${this.footer.render()}
    `;
  }

  private renderSortOptions(): string {
    const options = [
      { value: "rating", label: "Highest Rated" },
      { value: "newest", label: "Newest First" },
      { value: "cookTime", label: "Cooking Time" },
      { value: "popularity", label: "Most Popular" },
    ];

    return options
      .map(
        (option) => `
      <button 
        class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
        data-sort="${option.value}"
      >
        ${option.label}
      </button>
    `
      )
      .join("");
  }

  // Add new methods for infinite scroll
  private initializeIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadMoreRecipes();
        }
      });
    }, options);

    const loadingIndicator = document.getElementById("loadingIndicator");
    if (loadingIndicator) {
      observer.observe(loadingIndicator);
    }
  }

  private async loadMoreRecipes(): Promise<void> {
    const loadingIndicator = document.getElementById("loadingIndicator");
    if (loadingIndicator) {
      loadingIndicator.classList.remove("hidden");
    }

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.currentPage++;
    const newRecipes = await ApiService.getRecipes(this.currentPage);

    const recipeGrid = document.getElementById("recipeGrid");
    if (recipeGrid && newRecipes.length > 0) {
      const newRecipesHtml = this.renderRecipes(newRecipes);
      recipeGrid.insertAdjacentHTML("beforeend", newRecipesHtml);
    }

    if (loadingIndicator) {
      loadingIndicator.classList.add("hidden");
    }
  }

  // Update event listeners
  private initializeEventListeners(): void {
    this.initializeSearch();
    this.initializeFilters();
    this.initializeSortButton();
    this.initializeRecipeCards();
  }

  private initializeSearch(): void {
    const searchInput = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;
    const searchButton = document.getElementById("searchButton");

    if (searchInput && searchButton) {
      const debounceSearch = this.debounce((value: string) => {
        this.handleSearch({ target: { value } } as any);
      }, 300);
      searchInput.addEventListener("input", (e) => debounceSearch((e.target as HTMLInputElement).value));
      searchButton.addEventListener("click", () => debounceSearch(searchInput.value));
    }
  }

  private initializeFilters(): void {
    document.querySelectorAll("[data-filter]").forEach((button) => {
      button.addEventListener("click", this.handleFilterClick.bind(this));
    });
  }

  private initializeSortButton(): void {
    const sortButton = document.getElementById("sortButton");
    const sortMenu = document.getElementById("sortMenu");

    if (sortButton && sortMenu) {
      sortButton.addEventListener("click", () => {
        sortMenu.classList.toggle("hidden");
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!sortButton.contains(e.target as Node) && !sortMenu.contains(e.target as Node)) {
          sortMenu.classList.add("hidden");
        }
      });
    }
  }

  private initializeRecipeCards(): void {
    document.querySelectorAll("[data-recipe-id]").forEach((card) => {
      card.addEventListener("click", this.handleRecipeClick.bind(this));
    });
  }

  // Add debounce utility
  private debounce(func: Function, wait: number): (...args: any[]) => void {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  private renderFilterTags(): string {
    const tags = [
      "All",
      "Italian",
      "Asian",
      "Mexican",
      "Mediterranean",
      "American",
      "Quick & Easy",
    ];
    return tags
      .map(
        (tag) => `
      <button class="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 
                     ${
                       tag === "All"
                         ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg"
                         : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg"
                     } 
                     border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500"
            data-filter="${tag.toLowerCase()}">
        ${tag}
      </button>
    `
      )
      .join("");
  }

  private renderRecipes(recipes: Recipe[]): string {
    return recipes
      .map(
        (recipe, index) => `
          <div class="group transform transition-all duration-500 hover:-translate-y-2 animate-fade-in-up" 
               style="animation-delay: ${index * 100}ms"
               data-recipe-id="${recipe.id}">
            <!-- Card Container -->
            <div class="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 border border-gray-100 dark:border-gray-700">
              
              <!-- Image Container -->
              <div class="relative overflow-hidden h-56">
                <img src="${recipe.image}" 
                     alt="${recipe.name}" 
                     class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     loading="lazy">
                
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                <!-- Cuisine Badge -->
                <div class="absolute top-4 left-4">
                  <span class="px-3 py-1 text-xs font-semibold bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-800 dark:text-white shadow-lg">
                    ${recipe.cuisine}
                  </span>
                </div>

                <!-- Favorite Button -->
                <button class="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </button>

                <!-- View Recipe Button -->
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button class="cursor-pointer px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                    <span class="flex items-center gap-2">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                      View Recipe
                    </span>
                  </button>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6">
                <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 truncate">
                  ${recipe.name}
                </h3>
                
                <!-- Rating and Stats -->
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-2">
                    ${this.renderRating(recipe.rating)}
                    <span class="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      ${recipe.rating}/5
                    </span>
                  </div>
                  ${
                    recipe.cookTimeMinutes
                      ? `
                    <div class="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span class="text-sm">${recipe.cookTimeMinutes}</span>
                    </div>
                  `
                      : ""
                  }
                </div>

                <!-- Description -->
                ${
                  recipe.description
                    ? `
                  <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2 mb-4">
                    ${recipe.description}
                  </p>
                `
                    : ""
                }

                <!-- Tags -->
                ${
                  recipe.tags
                    ? `
                <div class="flex items-center h-6 overflow-hidden">
                  <div class="flex gap-2 flex-nowrap overflow-hidden">
                    ${recipe.tags
                      .slice(0, 2) // Reduce from 3 to 2 tags to ensure better fit
                      .map(
                        (tag) => `
                        <span class="inline-flex flex-shrink-0 px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-lg font-medium whitespace-nowrap">
                          ${tag}
                        </span>
                      `
                      )
                      .join("")}
                    ${
                      recipe.tags.length > 2
                        ? `
                        <span class="inline-flex flex-shrink-0 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg font-medium whitespace-nowrap">
                          +${recipe.tags.length - 2} more
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
        `
      )
      .join("");
  }

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

  private handleSearch(event: Event | { target: { value: string } }): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery = query;
    // Implement search logic here
    console.log("Searching for:", query);
  }

  private handleFilterClick(event: Event): void {
    const button = event.target as HTMLElement;
    const filter = button.dataset.filter;

    // Update active filter
    document.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.classList.remove(
        "bg-gradient-to-r",
        "from-orange-500",
        "to-red-600",
        "text-white",
        "shadow-lg"
      );
      btn.classList.add(
        "bg-white",
        "dark:bg-gray-800",
        "text-gray-700",
        "dark:text-gray-300"
      );
    });

    button.classList.add(
      "bg-gradient-to-r",
      "from-orange-500",
      "to-red-600",
      "text-white",
      "shadow-lg"
    );
    button.classList.remove(
      "bg-white",
      "dark:bg-gray-800",
      "text-gray-700",
      "dark:text-gray-300"
    );

    console.log("Filtering by:", filter);
  }

  private handleRecipeClick(event: Event): void {
    const target = event.target as HTMLElement;
    const recipeCard = target.closest("[data-recipe-id]");
    if (recipeCard) {
      const recipeId = recipeCard.getAttribute("data-recipe-id");
      if (recipeId) {
        // Use history API instead of direct location change
        history.pushState({}, "", `/recipe/${recipeId}`);
        Router.getInstance().handleRoute();
      }
    }
  }
}
