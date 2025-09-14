import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore(state => 
    state.favorites.map(id =>
      state.recipes.find(recipe => recipe.id === id)
    ).filter(recipe => recipe !== undefined) // Filter out any undefined recipes
  );
  
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet. Add some recipes to your favorites!</p>
      ) : (
        favorites.map(recipe => (
          <div key={recipe.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
            backgroundColor: '#fff'
          }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <button
              onClick={() => removeFavorite(recipe.id)}
              style={{
                padding: '6px 12px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Remove from Favorites
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;