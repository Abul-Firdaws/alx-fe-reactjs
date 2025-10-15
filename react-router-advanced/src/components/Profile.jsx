import { Link, Routes, Route, useLocation } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

function Profile() {
  const location = useLocation();

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '30px' }}>User Profile</h1>
      
      {/* Navigation for nested routes */}
      <div style={{ marginBottom: '30px', borderBottom: '2px solid #ecf0f1', paddingBottom: '10px' }}>
        <Link
          to="/profile/details"
          style={{
            ...tabStyle,
            backgroundColor: location.pathname === '/profile/details' ? '#3498db' : 'transparent',
            color: location.pathname === '/profile/details' ? 'white' : '#3498db'
          }}
        >
          Profile Details
        </Link>
        <Link
          to="/profile/settings"
          style={{
            ...tabStyle,
            backgroundColor: location.pathname === '/profile/settings' ? '#3498db' : 'transparent',
            color: location.pathname === '/profile/settings' ? 'white' : '#3498db'
          }}
        >
          Profile Settings
        </Link>
      </div>

      {/* Nested Routes */}
      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
        <Route path="/" element={
          <div style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>
            <p>Select a tab above to view profile information</p>
          </div>
        } />
      </Routes>
    </div>
  );
}

const tabStyle = {
  padding: '10px 20px',
  marginRight: '10px',
  textDecoration: 'none',
  borderRadius: '4px',
  border: '2px solid #3498db',
  display: 'inline-block',
  fontWeight: 'bold'
};

export default Profile;