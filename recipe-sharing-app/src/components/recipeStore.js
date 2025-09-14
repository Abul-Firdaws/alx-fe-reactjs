import { create } from 'zustand'

// DIAGNOSTIC VERSION - Minimal store to identify the issue
const useRecipeStore = create((set, get) => {
  console.log('Store created');
  
  return {
    recipes: [],
    searchTerm: '',
    filteredRecipes: [],
    favorites: [],
    recommendations: [],
    
    // Minimal actions to test
    addRecipe: (newRecipe) => {
      console.log('addRecipe called');
      set((state) => {
        console.log('addRecipe set function called');
        return {
          recipes: [...state.recipes, newRecipe]
        };
      });
    },
    
    setSearchTerm: (term) => {
      console.log('setSearchTerm called with:', term);
      set((state) => {
        console.log('setSearchTerm set function called');
        return {
          searchTerm: term,
          filteredRecipes: term
            ? state.recipes.filter(recipe =>
                recipe.title.toLowerCase().includes(term.toLowerCase()) ||
                recipe.description.toLowerCase().includes(term.toLowerCase())
              )
            : state.recipes
        };
      });
    },
    
    addFavorite: (recipeId) => {
      console.log('addFavorite called with:', recipeId);
      set(state => {
        console.log('addFavorite set function called');
        return {
          favorites: [...state.favorites, recipeId]
        };
      });
    },
    
    removeFavorite: (recipeId) => {
      console.log('removeFavorite called with:', recipeId);
      set(state => {
        console.log('removeFavorite set function called');
        return {
          favorites: state.favorites.filter(id => id !== recipeId)
        };
      });
    },
    
    // Simple initialization
    initializeFilters: () => {
      console.log('initializeFilters called');
      set((state) => {
        console.log('initializeFilters set function called');
        return {
          filteredRecipes: state.recipes
        };
      });
    },
    
    // Simple recommendations
    generateRecommendations: () => {
      console.log('generateRecommendations called');
      set(state => {
        console.log('generateRecommendations set function called');
        return {
          recommendations: state.recipes.slice(0, 3) // Simple: first 3 recipes
        };
      });
    }
  };
});

export { useRecipeStore };