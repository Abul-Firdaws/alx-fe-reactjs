function ProfileDetails() {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Profile Details</h2>
      <div style={{ lineHeight: '2', color: '#555' }}>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
        <p><strong>Member Since:</strong> January 2024</p>
        <p><strong>Location:</strong> Kumasi, Ghana</p>
        <p><strong>Bio:</strong> Passionate React developer learning advanced routing techniques</p>
      </div>
    </div>
  );
}

export default ProfileDetails;