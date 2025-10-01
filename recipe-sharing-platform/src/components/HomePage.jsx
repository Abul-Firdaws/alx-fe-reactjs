import {Link} from "react-router-dom";
import { useState, useEffect } from "react";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error loading recipes:", err));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-blue-300">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Recipe Sharing Platform
      </h1>

      {/* Grid layout for recipes */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden 
            hover:shadow-xl transform hover:scale-105 transition duration-200"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                {recipe.title}
              </h2>
              <p className="text-gray-600">{recipe.summary}</p>
              <button className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
                View Recipe →
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
