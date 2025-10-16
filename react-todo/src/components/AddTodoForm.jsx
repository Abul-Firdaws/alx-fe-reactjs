import { useState } from 'react';

function AddTodoForm({ addTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
      }}
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo"
        style={{
          flex: 1,
          padding: '12px',
          fontSize: '16px',
          border: '2px solid #ddd',
          borderRadius: '4px',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '12px 24px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        Add Todo
      </button>
    </form>
  );
}

export default AddTodoForm;