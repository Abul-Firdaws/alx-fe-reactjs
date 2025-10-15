import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '15px 30px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/profile" style={linkStyle}>Profile</Link>
          <Link to="/blog/1" style={linkStyle}>Blog Post 1</Link>
          <Link to="/blog/2" style={linkStyle}>Blog Post 2</Link>
        </div>
        
        <div>
          {isAuthenticated ? (
            <button onClick={logout} style={buttonStyle}>
              Logout
            </button>
          ) : (
            <Link to="/login" style={buttonStyle}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '16px',
  padding: '8px 12px',
  borderRadius: '4px',
  transition: 'background-color 0.3s'
};

const buttonStyle = {
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  textDecoration: 'none',
  fontSize: '16px'
};

export default Navbar;