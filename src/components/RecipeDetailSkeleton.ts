export class RecipeDetailSkeleton {
  render(): string {
    return `
      <div class="animate-fade-in">
        <!-- Main Content Grid -->
        <div class="container mx-auto px-4 py-8">
          <div class="max-w-7xl mx-auto">
            <!-- Back Button Skeleton -->
            <div class="mb-6">
              <div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Left Column: Image and Stats -->
              <div class="lg:col-span-1 space-y-6">
                <!-- Recipe Image Skeleton -->
                <div class="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <div class="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                  
                  <!-- Favorite Button Skeleton -->
                  <div class="absolute top-4 right-4">
                    <div class="w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full animate-pulse shadow-lg"></div>
                  </div>
                </div>

                <!-- Recipe Stats Skeleton -->
                <div class="grid grid-cols-3 gap-4">
                  ${Array(3).fill(`
                    <div class="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
                      <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-2 animate-pulse"></div>
                      <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto mb-2 animate-pulse"></div>
                      <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto animate-pulse"></div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Right Column: Recipe Details -->
              <div class="lg:col-span-2 space-y-8">
                <!-- Title and Rating Skeleton -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                  <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-4 animate-pulse"></div>
                  <div class="flex items-center gap-4">
                    <div class="flex gap-1">
                      ${Array(5).fill(`
                        <div class="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      `).join('')}
                    </div>
                    <div class="w-12 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>

                <!-- Ingredients Skeleton -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                  <div class="h-7 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4 animate-pulse"></div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${Array(6).fill(`
                      <div class="flex items-center gap-3 p-3 rounded-xl">
                        <div class="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Instructions Skeleton -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                  <div class="h-7 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-6 animate-pulse"></div>
                  <div class="space-y-6">
                    ${Array(4).fill(`
                      <div class="flex gap-4 p-4 rounded-xl">
                        <div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0 animate-pulse"></div>
                        <div class="space-y-2 flex-1">
                          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                        </div>
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
} 