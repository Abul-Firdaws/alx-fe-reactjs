import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    backgroundColor: '#2c3e50',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const navContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px'
  };

  const logoStyle = {
    color: '#ecf0f1',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    textDecoration: 'none'
  };

  const navLinksStyle = {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '30px'
  };

  const linkStyle = {
    color: '#ecf0f1',
    textDecoration: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease'
  };

  return (
    <nav style={navStyle}>
      <div style={navContainerStyle}>
        <Link to="/" style={logoStyle}>TechCorp Solutions</Link>
        <ul style={navLinksStyle}>
          <li><Link to="/" style={linkStyle}>Home</Link></li>
          <li><Link to="/about" style={linkStyle}>About</Link></li>
          <li><Link to="/services" style={linkStyle}>Services</Link></li>
          <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;