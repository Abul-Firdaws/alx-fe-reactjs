import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const { 
    recipes, 
    filteredRecipes, 
    searchTerm, 
    favorites,
    initializeFilters, 
    addFavorite, 
    removeFavorite 
  } = useRecipeStore(state => ({
    recipes: state.recipes,
    filteredRecipes: state.filteredRecipes,
    searchTerm: state.searchTerm,
    favorites: state.favorites,
    initializeFilters: state.initializeFilters,
    addFavorite: state.addFavorite,
    removeFavorite: state.removeFavorite
  }));

  // Initialize filtered recipes when component mounts
  useEffect(() => {
    initializeFilters();
  }, [initializeFilters]);

  // Determine which recipes to display
  const recipesToDisplay = searchTerm ? filteredRecipes : recipes;

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} style={{ 
          backgroundColor: '#fff3cd', 
          padding: '0 2px',
          borderRadius: '2px',
          fontWeight: 'bold'
        }}>
          {part}
        </mark>
      ) : part
    );
  };

  const handleFavoriteToggle = (recipeId) => {
    if (favorites.includes(recipeId)) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: 0 }}>
          {searchTerm ? 'Search Results' : 'All Recipes'}
        </h2>
        <div style={{ 
          fontSize: '14px',
          color: '#666',
          backgroundColor: '#f8f9fa',
          padding: '6px 12px',
          borderRadius: '20px',
          border: '1px solid #e9ecef'
        }}>
          {recipesToDisplay.length} recipe{recipesToDisplay.length !== 1 ? 's' : ''}
        </div>
      </div>

      {recipesToDisplay.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          {searchTerm ? (
            <>
              <h3 style={{ color: '#666', marginBottom: '10px' }}>
                No recipes found
              </h3>
              <p style={{ color: '#666', margin: 0 }}>
                Try adjusting your search term or add some recipes to get started!
              </p>
            </>
          ) : (
            <>
              <h3 style={{ color: '#666', marginBottom: '10px' }}>
                No recipes yet
              </h3>
              <p style={{ color: '#666', margin: 0 }}>
                Add some recipes to get started!
              </p>
            </>
          )}
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
        }}>
          {recipesToDisplay.map(recipe => {
            const isFavorite = favorites.includes(recipe.id);
            
            return (
              <div key={recipe.id} style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
              >
                {/* Favorite button */}
                <button
                  onClick={() => handleFavoriteToggle(recipe.id)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  {isFavorite ? '❤️' : '🤍'}
                </button>

                <h3 style={{ 
                  margin: '0 32px 12px 0',
                  color: '#333',
                  fontSize: '18px',
                  lineHeight: '1.4'
                }}>
                  {highlightSearchTerm(recipe.title, searchTerm)}
                </h3>
                
                <p style={{ 
                  margin: '0 0 16px 0',
                  color: '#666',
                  lineHeight: '1.5',
                  fontSize: '14px'
                }}>
                  {recipe.description.length > 120 ? (
                    <>
                      {highlightSearchTerm(recipe.description.substring(0, 120), searchTerm)}...
                    </>
                  ) : (
                    highlightSearchTerm(recipe.description, searchTerm)
                  )}
                </p>
                
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Link 
                    to={`/recipe/${recipe.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '8px 16px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                  >
                    View Details →
                  </Link>
                  
                  <div style={{
                    fontSize: '12px',
                    color: '#999',
                    backgroundColor: '#f8f9fa',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}>
                    ID: {recipe.id}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecipeList;