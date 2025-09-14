import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'

function App() {
  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#333',
        marginBottom: '30px' 
      }}>
        Recipe Sharing Application
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gap: '30px',
        gridTemplateColumns: '1fr 1fr',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr'
        }
      }}>
        <AddRecipeForm />
        <RecipeList />
      </div>
    </div>
  )
}

export default App