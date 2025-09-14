import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(recipeId))
  );

  if (!recipe) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Recipe not found</h2>
        <Link 
          to="/"
          style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Back to Recipe List
        </Link>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      <Link 
        to="/"
        style={{
          display: 'inline-block',
          marginBottom: '20px',
          padding: '8px 16px',
          backgroundColor: '#6c757d',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}
      >
        ← Back to Recipe List
      </Link>
      
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '30px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          color: '#333', 
          marginBottom: '20px',
          borderBottom: '2px solid #007bff',
          paddingBottom: '10px'
        }}>
          {recipe.title}
        </h1>
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#555', marginBottom: '10px' }}>Description:</h3>
          <p style={{ 
            lineHeight: '1.6', 
            color: '#666',
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '4px',
            border: '1px solid #e9ecef'
          }}>
            {recipe.description}
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '20px',
          marginTop: '30px',
          borderTop: '1px solid #eee',
          paddingTop: '20px'
        }}>
          <div style={{ flex: '1' }}>
            <EditRecipeForm recipe={recipe} />
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start',
            paddingTop: '10px'
          }}>
            <DeleteRecipeButton recipeId={recipe.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;