import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export class About {
  private header = new Header();
  private footer = new Footer();

  async render(): Promise<string> {
    return `
      ${this.header.render()}
      <main class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <!-- Hero Section with Parallax -->
        <section class="relative h-[70vh] overflow-hidden">
          <div class="absolute inset-0">
            <img 
              src="https://kpopping.com/documents/1f/4/800/241219-NewJeans-Twitter-Update-Find-The-Cooking-Queen-Stills-documents-1(2).jpeg?v=d31db" 
              alt="Kitchen Background" 
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/60"></div>
          </div>
          
          <!-- Floating Elements -->
          <div class="absolute inset-0">
            <div class="absolute top-20 right-20 w-72 h-72 bg-orange-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <div class="absolute bottom-20 left-20 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse" style="animation-delay: 1s"></div>
          </div>

          <div class="relative container mx-auto px-4 h-full flex items-center">
            <div class="max-w-3xl animate-fade-in">
              <span class="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-800 dark:text-orange-300 text-sm font-medium mb-6">
                🏆 Trusted by 50,000+ Food Enthusiasts
              </span>
              <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
                About
                <span class="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
                  LetMeCook
                </span>
              </h1>
              <p class="text-xl text-gray-200 leading-relaxed mb-8">
                Your ultimate companion for discovering and sharing delicious recipes from around the world. 
                Join our community of passionate food lovers and culinary experts.
              </p>
            </div>
          </div>
        </section>

        <!-- Stats Section -->
        <section class="relative -mt-24 container mx-auto px-4 mb-24">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            ${[
              {
                number: "10K+",
                label: "Active Users",
                icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
              },
              {
                number: "5K+",
                label: "Recipes",
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
              },
              {
                number: "50+",
                label: "Cuisines",
                icon: "M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z",
              },
              {
                number: "4.9",
                label: "User Rating",
                icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
              },
            ]
              .map(
                (stat) => `
              <div class="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl transform hover:-translate-y-2 transition-all duration-300">
                <div class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${stat.icon}"/>
                  </svg>
                </div>
                <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">${stat.number}</div>
                <div class="text-gray-600 dark:text-gray-400">${stat.label}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </section>

        <!-- Mission & Vision Section -->
        <section class="container mx-auto px-4 py-16">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Mission -->
            <div class="group relative">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
              <div class="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                </svg>
                </div>
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  To inspire home cooks and food enthusiasts by providing a platform where they can discover, 
                  share, and celebrate the joy of cooking. We believe that great food brings people together 
                  and creates lasting memories.
                </p>
                <ul class="space-y-3">
                  ${[
                    "Empower home cooks with knowledge",
                    "Build a global culinary community",
                    "Preserve and share cultural recipes",
                    "Make cooking accessible to everyone",
                  ]
                    .map(
                      (item) => `
                    <li class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      ${item}
                    </li>
                  `
                    )
                    .join("")}
                </ul>
              </div>
            </div>

            <!-- Vision -->
            <div class="group relative">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
              <div class="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  To become the world's most trusted and comprehensive recipe platform, making cooking 
                  accessible and enjoyable for everyone, regardless of their skill level or culinary background.
                </p>
                <ul class="space-y-3">
                  ${[
                    "Create innovative cooking technologies",
                    "Connect food lovers worldwide",
                    "Preserve traditional cooking methods",
                    "Promote sustainable cooking practices",
                  ]
                    .map(
                      (item) => `
                    <li class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      ${item}
                    </li>
                  `
                    )
                    .join("")}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Team Section -->
        <section class="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div class="container mx-auto px-4">
            <div class="text-center mb-16">
              <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Meet Our 
                <span class="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  Expert Team
                </span>
              </h2>
              <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our diverse team of culinary experts and tech enthusiasts work together to bring you the best cooking experience
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              ${[
                {
                  name: "Sarah Johnson",
                  role: "Founder & Head Chef",
                  image:
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=60",
                  quote: "Cooking is about passion, creativity, and sharing",
                },
                {
                  name: "Michael Chen",
                  role: "Executive Chef",
                  image:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=60",
                  quote: "Food brings cultures and people together",
                },
                {
                  name: "Emily Rodriguez",
                  role: "Culinary Director",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=60",
                  quote: "Every recipe tells a unique story",
                },
              ]
                .map(
                  (member) => `
                <div class="group relative">
                  <div class="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                  <div class="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div class="relative rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform">
                      <img 
                        src="${member.image}" 
                        alt="${member.name}" 
                        class="w-full h-72 object-cover"
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${member.name}</h3>
                    <p class="text-orange-600 dark:text-orange-400 font-medium mb-4">${member.role}</p>
                    <p class="text-gray-600 dark:text-gray-300 italic">"${member.quote}"</p>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-purple-600"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div class="relative container mx-auto px-4 text-center">
            <h2 class="text-4xl md:text-5xl font-bold mb-6 text-white">
              Join Our Culinary Community
            </h2>
            <p class="text-xl text-orange-100 mb-10 max-w-3xl mx-auto">
              Be part of a growing community of food enthusiasts. Share recipes, learn from others, and explore the world of cooking together.
            </p>
            <a href="/signup" class="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              Get Started Today
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </section>
      </main>
      ${this.footer.render()}
    `;
  }
}
