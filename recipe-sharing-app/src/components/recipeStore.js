// src/components/recipeStore.js
import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  // State
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

  // --- Basic CRUD ---
  setRecipes: (recipes) => {
    // Replaces entire recipes array (used by tests / initializers)
    set(() => ({ recipes, filteredRecipes: recipes }));
  },

  addRecipe: (newRecipe) => {
    set((state) => {
      const newRecipes = [...state.recipes, newRecipe];
      return {
        recipes: newRecipes,
        // keep filteredRecipes in sync with searchTerm
        filteredRecipes: state.searchTerm
          ? newRecipes.filter(r =>
              r.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
              r.description.toLowerCase().includes(state.searchTerm.toLowerCase())
            )
          : newRecipes
      };
    });
  },

  updateRecipe: (id, updates) => {
    // updates: partial object with fields to update
    set((state) => {
      const newRecipes = state.recipes.map(r => r.id === id ? { ...r, ...updates } : r);
      return {
        recipes: newRecipes,
        filteredRecipes: state.searchTerm
          ? newRecipes.filter(r =>
              r.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
              r.description.toLowerCase().includes(state.searchTerm.toLowerCase())
            )
          : newRecipes
      };
    });
  },

  deleteRecipe: (id) => {
    set((state) => {
      const newRecipes = state.recipes.filter(r => r.id !== id);
      const newFavorites = state.favorites.filter(fid => fid !== id);
      const newRecommendations = state.recommendations.filter(rec => rec.id !== id);
      return {
        recipes: newRecipes,
        filteredRecipes: state.searchTerm
          ? newRecipes.filter(r =>
              r.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
              r.description.toLowerCase().includes(state.searchTerm.toLowerCase())
            )
          : newRecipes,
        favorites: newFavorites,
        recommendations: newRecommendations
      };
    });
  },

  // --- Search & Filtering ---
  setSearchTerm: (term) => {
    set((state) => {
      const normalized = term || '';
      const filtered = normalized
        ? state.recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(normalized.toLowerCase()) ||
            recipe.description.toLowerCase().includes(normalized.toLowerCase())
          )
        : state.recipes;
      return { searchTerm: normalized, filteredRecipes: filtered };
    });
  },

  initializeFilters: () => {
    set((state) => ({ filteredRecipes: state.recipes }));
  },

  // --- Favorites & Recommendations ---
  addFavorite: (recipeId) => {
    set((state) => {
      if (state.favorites.includes(recipeId)) return {};
      return { favorites: [...state.favorites, recipeId] };
    });
  },

  removeFavorite: (recipeId) => {
    set((state) => ({ favorites: state.favorites.filter(id => id !== recipeId) }));
  },

  generateRecommendations: () => {
    // Simple deterministic recommendation: first 3 recipes not in favorites
    set((state) => {
      const recs = state.recipes
        .filter(r => !state.favorites.includes(r.id))
        .slice(0, 3);
      return { recommendations: recs };
    });
  }
}));