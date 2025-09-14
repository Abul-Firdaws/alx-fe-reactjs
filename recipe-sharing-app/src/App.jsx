import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Router>
      <div style={{ 
        padding: '20px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
      }}>
        <Routes>
          {/* Home route - shows recipe list and add form */}
          <Route path="/" element={
            <>
              <h1 style={{ 
                textAlign: 'center', 
                color: '#333',
                marginBottom: '30px',
                fontSize: '2.5em',
                borderBottom: '3px solid #007bff',
                paddingBottom: '10px'
              }}>
                Recipe Sharing Application
              </h1>
              
              <div style={{ 
                display: 'grid', 
                gap: '40px',
                gridTemplateColumns: '1fr 1fr',
                marginBottom: '30px'
              }}>
                <AddRecipeForm />
                <RecipeList />
              </div>
            </>
          } />
          
          {/* Recipe details route */}
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App