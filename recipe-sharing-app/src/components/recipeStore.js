import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [
    { id: 1, title: 'Spaghetti', description: 'Classic Italian pasta' },
    { id: 2, title: 'Pancakes', description: 'Fluffy breakfast treat' },
  ],
  searchTerm: '',

  // Add a new recipe
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, recipe],
    })),

  // Update search term
  setSearchTerm: (term) => set({ searchTerm: term }),
}));