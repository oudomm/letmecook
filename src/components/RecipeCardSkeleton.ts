export class RecipeCardSkeleton {
  constructor(private index: number) {}

  render(): string {
    return `
      <div class="group transform transition-all duration-500 animate-fade-in-up" 
           style="animation-delay: ${this.index * 100}ms">
        <!-- Card Container -->
        <div class="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
          
          <!-- Image Container -->
          <div class="relative overflow-hidden h-56">
            <div class="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            
            <!-- Cuisine Badge Skeleton -->
            <div class="absolute top-4 left-4">
              <div class="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>

            <!-- Favorite Button Skeleton -->
            <div class="absolute top-4 right-4">
              <div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Title Skeleton -->
            <div class="h-7 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-3 animate-pulse"></div>
            
            <!-- Rating and Stats Skeleton -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <div class="flex gap-1">
                  ${Array(5).fill(`
                    <div class="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  `).join('')}
                </div>
                <div class="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div class="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>

            <!-- Description Skeleton -->
            <div class="space-y-2 mb-4">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
            </div>

            <!-- Tags Skeleton -->
            <div class="flex gap-2">
              <div class="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              <div class="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
} 