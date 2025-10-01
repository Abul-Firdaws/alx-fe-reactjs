import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import recipesData from '../data.json';

function RecipeDetail() {
  const { id } = useParams(); // get recipe ID from URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = recipesData.find((r) => r.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return <p className="text-center text-red-500">Recipe not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-md mb-4" />
      <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
      <p className="text-gray-700 mb-4">{recipe.summary}</p>

      {/* Ingredients Section */}
      <h2 className="text-xl font-semibold mt-4 mb-2">Ingredients</h2>
      <ul className="list-disc list-inside text-gray-600">
        {recipe.ingredients && recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Instructions Section */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Instructions</h2>
      <ol className="list-decimal list-inside text-gray-600 space-y-2">
        {recipe.instructions && recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetail;