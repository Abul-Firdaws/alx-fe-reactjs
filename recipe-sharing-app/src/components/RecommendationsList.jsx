import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
  // FIXED: Separate state selection from action selection
  const recommendations = useRecipeStore(state => state.recommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  const handleGenerateRecommendations = () => {
    generateRecommendations();
  };

  return (
    <div>
      <h2>Recommended for You</h2>
      
      <button
        onClick={handleGenerateRecommendations}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '16px',
          fontSize: '14px'
        }}
      >
        Get New Recommendations
      </button>

      {recommendations.length === 0 ? (
        <p>No recommendations available. Click the button above to generate recommendations based on your favorites!</p>
      ) : (
        recommendations.map(recipe => (
          <div key={recipe.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
            backgroundColor: '#f8f9fa'
          }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <div style={{
              fontSize: '12px',
              color: '#666',
              backgroundColor: '#e9ecef',
              padding: '4px 8px',
              borderRadius: '4px',
              display: 'inline-block'
            }}>
              Recommended
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecommendationsList;