import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import ProfileSettings from './components/ProfileSettings';
import BlogPost from './components/BlogPost';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Navbar isAuthenticated={isAuthenticated} logout={logout} />
        
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />
            
            {/* Login Route */}
            <Route path="/login" element={<Login login={login} isAuthenticated={isAuthenticated} />} />
            
            {/* Protected Profile Route with Nested Routes */}
            <Route
              path="/profile/*"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoute>
              }
            >
              <Route path="details" element={<ProfileDetails />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>
            
            {/* Dynamic Blog Post Route */}
            <Route path="/blog/:id" element={<BlogPost />} />
            
            {/* 404 Not Found Route */}
            <Route path="*" element={
              <div style={{ textAlign: 'center', padding: '50px' }}>
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;