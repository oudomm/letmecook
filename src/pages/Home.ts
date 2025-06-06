import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export class Home {
  private header = new Header();
  private footer = new Footer();

  async render(): Promise<string> {
    return `
      ${this.header.render()}
      <main class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <!-- Hero Section - Reduced vertical padding -->
        <section class="relative py-12 md:py-16 lg:py-20 overflow-hidden">
          <!-- Background Elements - Adjusted positioning -->
          <div class="absolute inset-0 overflow-hidden">
            <div class="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-10 blur-3xl"></div>
            <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div class="container mx-auto px-4 relative z-10">
            <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <!-- Left Content - Adjusted spacing -->
              <div class="lg:w-1/2 text-center lg:text-left fade-in pt-4">
                <div class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-800 dark:text-orange-300 text-sm font-medium mb-4">
                  🍳 Welcome to LetMeCook
                </div>
                
                <!-- Reduced margins -->
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight dark:text-white">
                  Discover
                  <span class="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent ">
                    Delicious
                  </span>
                  <br>
                  Recipes From
                  <span class="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    Around The World
                  </span>
                </h1>
                
                <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Explore thousands of recipes, save your favorites, and learn new cooking techniques from expert chefs worldwide.
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="/recipes" class="group relative">
                    <div class="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                    <div class="relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                      <span class="text-lg">Explore Recipes</span>
                      <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </div>
                  </a>
                  
                  <a href="/popular" class="group relative">
                    <div class="relative px-8 py-4 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 font-semibold rounded-2xl shadow-lg hover:shadow-xl border-2 border-orange-500/20 hover:border-orange-500/40 dark:border-orange-400/20 dark:hover:border-orange-400/40 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                      <span class="text-lg">Popular Dishes</span>
                    </div>
                  </a>
                </div>
                
                <!-- Stats -->
                <div class="flex flex-wrap justify-center lg:justify-start gap-8 mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div class="text-center">
                    <div class="text-3xl font-bold text-gray-900 dark:text-white">10K+</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Recipes</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-gray-900 dark:text-white">50K+</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Users</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-gray-900 dark:text-white">4.9</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                  </div>
                </div>
              </div>
              
              <div class="lg:w-1/2 relative fade-in" style="animation-delay: 0.2s">
                <div class="relative">
                  <!-- Background Decorations - Move these behind -->
                  <div class="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 blur-xl z-0"></div>
                  <div class="absolute -top-12 -left-12 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-15 blur-xl z-0"></div>
                  
                  <!-- Main Image - Higher z-index -->
                  <div class="relative z-20 rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105">
                    <img 
                      src="https://i.pinimg.com/736x/7c/e3/3f/7ce33f172326d81fe3968d9d1fc305ca.jpg" 
                      alt="Delicious Food" 
                      class="w-full h-auto"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  </div>
                  
                  <!-- Floating Cards - Highest z-index -->
                  <div class="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl transform hover:scale-105 transition-transform duration-300 z-30">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <div>
                        <div class="font-semibold text-gray-900 dark:text-white">Easy to Follow</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Step-by-step guide</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl transform hover:scale-105 transition-transform duration-300 z-30">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                        </svg>
                      </div>
                      <div>
                        <div class="font-semibold text-gray-900 dark:text-white">Top Rated</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">5-star recipes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Section -->
        <section class="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div class="container mx-auto px-4">
            <div class="text-center mb-16">
              <h2 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Why Choose 
                <span class="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  LetMeCook?
                </span>
              </h2>
              <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Experience the ultimate cooking companion with features designed to make your culinary journey extraordinary
              </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <!-- Feature 1 -->
              <div class="group relative">
                <div class="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                <div class="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                    Smart Search
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Find the perfect recipe instantly with our AI-powered search. Filter by ingredients, dietary preferences, cooking time, and more.
                  </p>
                </div>
              </div>
              
              <!-- Feature 2 -->
              <div class="group relative">
                <div class="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                <div class="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                    Save & Organize
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Create personalized collections, save your favorite recipes, and organize them into custom categories for easy access.
                  </p>
                </div>
              </div>
              
              <!-- Feature 3 -->
              <div class="group relative">
                <div class="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                <div class="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    Step-by-Step Guide
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Follow detailed instructions with visual guides, timing alerts, and helpful tips to ensure perfect results every time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-purple-600"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div class="relative container mx-auto px-4 text-center">
            <h2 class="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Start Your 
              <span class="text-yellow-300">Culinary Journey?</span>
            </h2>
            <p class="text-xl text-orange-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of food enthusiasts discovering new flavors, mastering cooking techniques, and creating unforgettable meals every day.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/signup" class="group relative">
                <div class="absolute -inset-0.5 bg-white rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div class="relative px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7"/>
                  </svg>
                  <span class="text-lg">Get Started Free</span>
                </div>
              </a>
              
              <div class="flex items-center gap-2 text-white/80">
                <span class="text-sm">No credit card required</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
            
            <!-- Social Proof -->
            <div class="mt-12 flex flex-wrap justify-center gap-8 items-center opacity-80">
              <div class="flex items-center gap-2">
                <div class="flex -space-x-2">
                  <div class="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white"></div>
                  <div class="w-8 h-8 bg-green-400 rounded-full border-2 border-white"></div>
                  <div class="w-8 h-8 bg-blue-400 rounded-full border-2 border-white"></div>
                  <div class="w-8 h-8 bg-pink-400 rounded-full border-2 border-white"></div>
                </div>
                <span class="text-white text-sm ml-2">50,000+ happy cooks</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="flex text-yellow-400">
                  ${Array.from(
                    { length: 5 },
                    () => `
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  `
                  ).join("")}
                </div>
                <span class="text-white text-sm ml-1">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      ${this.footer.render()}
    `;
  }
}
