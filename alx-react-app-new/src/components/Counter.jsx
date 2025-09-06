import { useState } from 'react';

function Counter() {
  // Initialize state using useState hook - starting at 0
  const [count, setCount] = useState(0);

  return (
    <div style={{
      border: '2px solid #ccc',
      padding: '20px',
      margin: '20px auto',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      maxWidth: '400px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        color: '#333',
        marginBottom: '20px'
      }}>
        Counter Application
      </h2>
      
      {/* Display current count */}
      <p style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: count > 0 ? 'green' : count < 0 ? 'red' : 'black',
        margin: '20px 0'
      }}>
        Current Count: {count}
      </p>

      {/* Button container */}
      <div style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Increment button */}
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Increment
        </button>

        {/* Decrement button */}
        <button 
          onClick={() => setCount(count - 1)}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Decrement
        </button>

        {/* Reset button */}
        <button 
          onClick={() => setCount(0)}
          style={{
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;