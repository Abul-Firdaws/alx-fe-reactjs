function Home() {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>
        Welcome to React Router Advanced
      </h1>
      <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#555' }}>
        This application demonstrates advanced routing techniques including:
      </p>
      <ul style={{ fontSize: '16px', lineHeight: '2', color: '#666', marginTop: '20px' }}>
        <li><strong>Protected Routes:</strong> Try accessing the Profile page without logging in</li>
        <li><strong>Nested Routes:</strong> Navigate to Profile Details and Settings</li>
        <li><strong>Dynamic Routes:</strong> Check out different blog posts with variable IDs</li>
        <li><strong>Authentication:</strong> Login to access protected content</li>
      </ul>
    </div>
  );
}

export default Home;