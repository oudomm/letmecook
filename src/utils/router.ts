import { RouterConfig } from "../types";
import { Theme } from "./theme";

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
      const content = await route.component();
      document.getElementById("app")!.innerHTML = content;
      // Re-initialize theme after route change
      Theme.init();
    } else {
      window.location.href = "/";
    }
  }
}

export const router = Router.getInstance();
