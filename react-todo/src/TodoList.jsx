import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Master Testing', completed: false },
  ]);

  const [inputValue, setInputValue] = useState('');

  const addTodo = (text) => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Todo List</h1>
      
      {/* AddTodoForm inline */}
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

      {/* Todo List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '15px',
              marginBottom: '10px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #ddd',
            }}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                flex: 1,
                cursor: 'pointer',
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#95a5a6' : '#2c3e50',
                fontSize: '16px',
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#95a5a6', marginTop: '20px' }}>
          No todos yet. Add one above!
        </p>
      )}
    </div>
  );
}

export default TodoList;