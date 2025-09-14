import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add some recipes to get started!</p>
      ) : (
        recipes.map(recipe => (
          <div key={recipe.id} style={{ 
            border: '1px solid #ccc', 
            margin: '10px 0', 
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description.length > 100 
              ? `${recipe.description.substring(0, 100)}...` 
              : recipe.description
            }</p>
            <Link 
              to={`/recipe/${recipe.id}`}
              style={{
                display: 'inline-block',
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px'
              }}
            >
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;