import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  return (
    <div style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '30px', textAlign: 'center' }}>
        Contact Us
      </h1>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
      }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '15px',
            margin: '10px 0',
            border: '2px solid #ecf0f1',
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '15px',
            margin: '10px 0',
            border: '2px solid #ecf0f1',
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '15px',
            margin: '10px 0',
            border: '2px solid #ecf0f1',
            borderRadius: '8px',
            fontSize: '16px',
            height: '120px',
            boxSizing: 'border-box'
          }}
        />
        <button 
          type="submit"
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            padding: '15px 30px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            width: '100%',
            marginTop: '20px'
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;