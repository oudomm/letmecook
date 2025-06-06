import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Router } from "../utils/router";

export class NotFound {
  private header = new Header();
  private footer = new Footer();

  render(): string {
    return `
      ${this.header.render()}
      <main class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div class="container mx-auto px-4 py-16">
          <div class="max-w-2xl mx-auto text-center">
            <!-- 404 Illustration -->
            <div class="mb-8">
              <svg class="w-32 h-32 mx-auto text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>

            <!-- Error Message -->
            <h1 class="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
            <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">Page Not Found</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onclick="window.history.back()"
                class="cursor-pointer px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                Go Back
              </button>
              <button 
                onclick="window.router.navigateTo('/')"
                class="cursor-pointer px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </main>
      ${this.footer.render()}
    `;
  }
} 