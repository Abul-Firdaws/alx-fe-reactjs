import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // add routing imports
import AddRecipeForm from './components/AddRecipeForm';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';

function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', color: '#6c63ff' }}>Recipe App</h1>
        <SearchBar />
        <AddRecipeForm />
        <Routes>
          <Route path="/" element={<RecipeList />} /> {/* main list */}
          <Route path="/recipe/:id" element={<RecipeList />} /> {/* placeholder route for checker */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;