export interface Recipe {
  id: number;
  name: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  image: string;
  rating: number;
  cuisine: string;
  cookTimeMinutes?: string;
  tags?: string[];
}

export interface RouterConfig {
  path: string;
  component: () => Promise<string>;
}
