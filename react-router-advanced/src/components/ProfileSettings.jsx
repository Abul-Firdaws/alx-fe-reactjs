function ProfileSettings() {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Profile Settings</h2>
      <form style={{ maxWidth: '400px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
            Username
          </label>
          <input
            type="text"
            defaultValue="johndoe"
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
            Email
          </label>
          <input
            type="email"
            defaultValue="john.doe@example.com"
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
            Notification Preferences
          </label>
          <select style={inputStyle}>
            <option>All Notifications</option>
            <option>Important Only</option>
            <option>None</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '14px'
};

export default ProfileSettings;