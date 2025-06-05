export class Header {
  render(): string {
    const isDark = document.documentElement.classList.contains("dark");

    return `
      <header class="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50">
        <nav class="container mx-auto px-4 py-4">
          <div class="flex justify-between items-center">
            <a href="/" class="flex items-center space-x-2 group">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h1 class="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">LetMeCook</h1>
            </a>
            
            <div class="hidden md:flex items-center space-x-6">
              <a href="/" class="font-medium text-gray-700 hover:text-orange-500 dark:text-gray-200 dark:hover:text-orange-400 transition-colors">Home</a>
              <a href="/recipes" class="font-medium text-gray-700 hover:text-orange-500 dark:text-gray-200 dark:hover:text-orange-400 transition-colors">Recipes</a>
              <a href="/about" class="font-medium text-gray-700 hover:text-orange-500 dark:text-gray-200 dark:hover:text-orange-400 transition-colors">About</a>

             <button id="darkModeToggle" class="p-2 rounded-full hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500">
                ${
                  isDark
                    ? `
                  <svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                `
                    : `
                  <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                `
                }
              </button>
            </div>
          </div>
        </nav>
      </header>
    `;
  }
}
