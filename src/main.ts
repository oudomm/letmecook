import { Router } from "./utils/router";
import { Home } from "./pages/Home";
import { RecipeList } from "./pages/RecipeList";
import { RecipeDetail } from "./pages/RecipeDetail";
import { Theme } from "./utils/theme";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

// Initialize theme first
Theme.init();

const router = Router.getInstance();

// Add routes
router.addRoute({ path: "/", component: async () => new Home().render() });
router.addRoute({
  path: "/recipes",
  component: async () => new RecipeList().render(),
});
router.addRoute({
  path: "/recipe/:id",
  component: async () => new RecipeDetail().render(),
});
router.addRoute({
  path: "/about",
  component: async () => new About().render(),
});

// Initialize the router
router.handleRoute();

// Handle browser navigation
window.addEventListener("popstate", () => {
  router.handleRoute();
});
