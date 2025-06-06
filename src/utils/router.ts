import { RouterConfig } from "../types";
import { Theme } from "./theme";
import { RecipeList } from "../pages/RecipeList";
import { NotFound } from "../pages/NotFound";

export class Router {
  private static instance: Router;
  private routes: RouterConfig[] = [];

  private constructor() {
    window.addEventListener("popstate", () => this.handleRoute());
    this.setupNavigationListeners();
  }

  private setupNavigationListeners() {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const path = anchor.pathname;
        this.navigateTo(path);
      }
    });
  }

  public static getInstance(): Router {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  public addRoute(route: RouterConfig): void {
    this.routes.push(route);
  }

  public navigateTo(path: string): void {
    window.history.pushState(null, "", path);
    this.handleRoute();
  }

  public async handleRoute(): Promise<void> {
    const path = window.location.pathname;
    const route = this.routes.find((route) => {
      const pattern = route.path
        .replace(/:\w+/g, "([^/]+)")
        .replace(/\//g, "\\/");
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(path);
    });

    if (route) {
      try {
        const content = await route.component();
        document.getElementById("app")!.innerHTML = content;
        
        // Initialize the current page component
        const currentPath = window.location.pathname;
        if (currentPath === "/recipes") {
          const recipeList = new RecipeList();
          recipeList.initializeEventListeners();
          recipeList.initializeIntersectionObserver();
        }
        
        // Re-initialize theme after route change
        Theme.init();
      } catch (error) {
        console.error('Error loading route:', error);
        this.showNotFound();
      }
    } else {
      this.showNotFound();
    }
  }

  private showNotFound(): void {
    const notFound = new NotFound();
    document.getElementById("app")!.innerHTML = notFound.render();
    Theme.init();
  }
}

// Make router available globally for onclick handlers
declare global {
  interface Window {
    router: Router;
  }
}

export const router = Router.getInstance();
window.router = router;
