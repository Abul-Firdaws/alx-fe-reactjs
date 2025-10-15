import { Navigate } from 'react-router-dom';

function Login({ login, isAuthenticated }) {
  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      maxWidth: '400px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Login</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Click the button below to simulate login
      </p>
      <button
        onClick={login}
        style={{
          backgroundColor: '#27ae60',
          color: 'white',
          border: 'none',
          padding: '12px 30px',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;