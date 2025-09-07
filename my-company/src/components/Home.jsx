function Home() {
  return (
    <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{
        backgroundColor: '#3498db',
        color: 'white',
        padding: '80px 40px',
        borderRadius: '10px',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold' }}>
          Welcome to Our Company
        </h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
          We are dedicated to delivering excellence in all our services.
        </p>
      </div>
    </div>
  );
}

export default Home;