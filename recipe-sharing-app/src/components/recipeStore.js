import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],
  
  // Original CRUD actions
  addRecipe: (newRecipe) => set((state) => {
    const updatedRecipes = [...state.recipes, newRecipe];
    return {
      recipes: updatedRecipes,
      filteredRecipes: get().searchTerm ? 
        updatedRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(get().searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(get().searchTerm.toLowerCase())
        ) : updatedRecipes
    };
  }),
  
  deleteRecipe: (id) => set((state) => {
    const updatedRecipes = state.recipes.filter(recipe => recipe.id !== id);
    return {
      recipes: updatedRecipes,
      filteredRecipes: get().searchTerm ?
        updatedRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(get().searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(get().searchTerm.toLowerCase())
        ) : updatedRecipes,
      // Also remove from favorites if it was favorited
      favorites: state.favorites.filter(favId => favId !== id)
    };
  }),
  
  updateRecipe: (id, updatedRecipe) => set((state) => {
    const updatedRecipes = state.recipes.map(recipe =>
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    );
    return {
      recipes: updatedRecipes,
      filteredRecipes: get().searchTerm ?
        updatedRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(get().searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(get().searchTerm.toLowerCase())
        ) : updatedRecipes
    };
  }),
  
  setRecipes: (recipes) => set((state) => ({
    recipes,
    filteredRecipes: get().searchTerm ?
      recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(get().searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(get().searchTerm.toLowerCase())
      ) : recipes
  })),

  // Search and filtering actions
  setSearchTerm: (term) => set((state) => {
    const filteredRecipes = term
      ? state.recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(term.toLowerCase()) ||
          recipe.description.toLowerCase().includes(term.toLowerCase())
        )
      : state.recipes;
    
    return {
      searchTerm: term,
      filteredRecipes
    };
  }),

  filterRecipes: () => set((state) => ({
    filteredRecipes: state.searchTerm
      ? state.recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
      : state.recipes
  })),

  // Initialize filtered recipes (useful when the app starts)
  initializeFilters: () => set((state) => ({
    filteredRecipes: state.recipes
  })),

  // NEW: Favorites management actions
  addFavorite: (recipeId) => set(state => ({ 
    favorites: [...state.favorites, recipeId] 
  })),
  
  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),

  // NEW: Recommendations generation
  generateRecommendations: () => set(state => {
    // Mock implementation based on favorites
    const recommended = state.recipes.filter(recipe =>
      state.favorites.includes(recipe.id) && Math.random() > 0.5
    );
    return { recommendations: recommended };
  })
}));

export { useRecipeStore };