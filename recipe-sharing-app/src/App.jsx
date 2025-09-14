import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <Router>
      <div style={{ 
        padding: '20px', 
        maxWidth: '1400px', 
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
      }}>
        <Routes>
          {/* Home route - shows recipe list with search, add form, favorites, and recommendations */}
          <Route path="/" element={
            <>
              <header style={{ marginBottom: '40px' }}>
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
                
                {/* Search functionality */}
                <SearchBar />
              </header>
              
              <main>
                <div style={{ 
                  display: 'grid', 
                  gap: '30px',
                  gridTemplateColumns: '300px 1fr 300px',
                  marginBottom: '30px',
                  '@media (max-width: 1200px)': {
                    gridTemplateColumns: '1fr'
                  }
                }}>
                  {/* Left Sidebar - Add Recipe Form */}
                  <aside style={{
                    backgroundColor: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef',
                    height: 'fit-content',
                    position: 'sticky',
                    top: '20px'
                  }}>
                    <AddRecipeForm />
                  </aside>
                  
                  {/* Main content area for recipe list */}
                  <section>
                    <RecipeList />
                  </section>

                  {/* Right Sidebar - Favorites and Recommendations */}
                  <aside style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}>
                    {/* Favorites Section */}
                    <div style={{
                      backgroundColor: '#fff3cd',
                      padding: '20px',
                      borderRadius: '8px',
                      border: '1px solid #ffeaa7',
                      height: 'fit-content'
                    }}>
                      <FavoritesList />
                    </div>

                    {/* Recommendations Section */}
                    <div style={{
                      backgroundColor: '#d1ecf1',
                      padding: '20px',
                      borderRadius: '8px',
                      border: '1px solid #bee5eb',
                      height: 'fit-content'
                    }}>
                      <RecommendationsList />
                    </div>
                  </aside>
                </div>
              </main>
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