import { useRecipeStore } from './recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this recipe? This action cannot be undone.'
    );
    
    if (isConfirmed) {
      deleteRecipe(recipeId);
      alert('Recipe deleted successfully!');
      navigate('/'); // Redirect to home page after deletion
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;