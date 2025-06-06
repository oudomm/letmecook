import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ApiService } from "../services/api";
import { Recipe } from "../types";
import { Router } from "../utils/router";
import { RecipeCard } from "../components/RecipeCard";

export class RecipeList {
  private static recipes: Recipe[] = [];
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

  private async loadRecipes(): Promise<void> {
    if (RecipeList.recipes.length === 0) {
      RecipeList.recipes = await ApiService.getRecipes();
    }
  }

  async render(): Promise<string> {
    await this.loadRecipes();
    const filteredRecipes = this.filterRecipes(RecipeList.recipes);

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
            ${this.renderRecipes(filteredRecipes)}
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
      { value: "cookTime", label: "Cooking Time" },
      { value: "popularity", label: "Most Popular" },
      { value: "newest", label: "Newest First" },
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

  public initializeEventListeners(): void {
    this.initializeSearch();
    this.initializeFilters();
    this.initializeSortButton();
    this.initializeRecipeCards();
  }

  public initializeIntersectionObserver(): void {
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

      // Add click handlers for sort options
      sortMenu.querySelectorAll("[data-sort]").forEach((option) => {
        option.addEventListener("click", (e) => {
          const target = e.target as HTMLElement;
          const sortBy = target.getAttribute("data-sort");
          if (sortBy) {
            this.handleSort(sortBy);
            sortMenu.classList.add("hidden");
          }
        });
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
    const cards = document.querySelectorAll("[data-recipe-id]");
    
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        
        // Check if the click was on a button or its child elements
        const clickedButton = target.closest('button');
        if (clickedButton) {
          // Handle button click (favorite, etc.)
          return;
        }
        
        // If not a button, handle card navigation
        const recipeCard = target.closest("[data-recipe-id]");
        if (recipeCard) {
          const recipeId = recipeCard.getAttribute("data-recipe-id");
          if (recipeId) {
            Router.getInstance().navigateTo(`/recipe/${recipeId}`);
          }
        }
      });
    });
  }

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
      .map((recipe, index) => new RecipeCard(recipe, index).render())
      .join("");
  }

  private filterRecipes(recipes: Recipe[]): Recipe[] {
    if (this.activeFilter === "all") {
      return recipes;
    }

    return recipes.filter(recipe => 
      recipe.cuisine.toLowerCase() === this.activeFilter.toLowerCase()
    );
  }

  private handleFilterClick(event: Event): void {
    const target = event.target as HTMLElement;
    const button = target.closest('button');
    
    if (!button) return;
    
    const filter = button.getAttribute('data-filter');
    if (!filter) return;

    // Update active filter
    this.activeFilter = filter;

    // Update button styles
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

    // Filter and update the recipe grid
    const filteredRecipes = this.filterRecipes(RecipeList.recipes);
    
    const recipeGrid = document.getElementById("recipeGrid");
    if (recipeGrid) {
      if (filteredRecipes.length === 0) {
        recipeGrid.innerHTML = `
          <div class="col-span-full text-center py-12">
            <p class="text-gray-500 dark:text-gray-400">No recipes found for this cuisine.</p>
          </div>
        `;
      } else {
        recipeGrid.innerHTML = this.renderRecipes(filteredRecipes);
        // Re-initialize event listeners for the new cards
        this.initializeRecipeCards();
      }
    }
  }

  private handleSearch(event: Event | { target: { value: string } }): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery = query;

    // Filter recipes based on search query
    const filteredRecipes = RecipeList.recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(query) ||
      recipe.cuisine.toLowerCase().includes(query) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
    );

    // Update the recipe grid
    const recipeGrid = document.getElementById("recipeGrid");
    if (recipeGrid) {
      if (filteredRecipes.length === 0) {
        recipeGrid.innerHTML = `
          <div class="col-span-full text-center py-12">
            <p class="text-gray-500 dark:text-gray-400">No recipes found matching your search.</p>
          </div>
        `;
      } else {
        recipeGrid.innerHTML = this.renderRecipes(filteredRecipes);
        // Re-initialize event listeners for the new cards
        this.initializeRecipeCards();
      }
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
    
    // Add new recipes to static recipes array
    RecipeList.recipes = [...RecipeList.recipes, ...newRecipes];

    const recipeGrid = document.getElementById("recipeGrid");
    if (recipeGrid && newRecipes.length > 0) {
      const newRecipesHtml = this.renderRecipes(newRecipes);
      recipeGrid.insertAdjacentHTML("beforeend", newRecipesHtml);
    }

    if (loadingIndicator) {
      loadingIndicator.classList.add("hidden");
    }
  }

  private handleSort(sortBy: string): void {
    let sortedRecipes = [...RecipeList.recipes];

    switch (sortBy) {
      case "rating":
        sortedRecipes.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
        break;
      case "cookTime":
        sortedRecipes.sort((a, b) => {
          const aTime = Number(a.cookTimeMinutes || 0);
          const bTime = Number(b.cookTimeMinutes || 0);
          
          // If both have valid times, sort normally
          if (aTime > 0 && bTime > 0) {
            return aTime - bTime;
          }
          
          // If only one has a valid time, put the valid one first
          if (aTime > 0) return -1;
          if (bTime > 0) return 1;
          
          // If neither has a valid time, maintain original order
          return 0;
        });
        break;
      case "popularity":
        // Since we don't have reviewCount, we'll use rating as a proxy for popularity
        sortedRecipes.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
        break;
      case "newest":
        // Since we don't have createdAt, we'll use id as a proxy for newness
        sortedRecipes.sort((a, b) => Number(b.id) - Number(a.id));
        break;
    }

    // Update the recipe grid with sorted recipes
    const recipeGrid = document.getElementById("recipeGrid");
    if (recipeGrid) {
      recipeGrid.innerHTML = this.renderRecipes(sortedRecipes);
      // Re-initialize event listeners for the new cards
      this.initializeRecipeCards();
    }
  }
}
