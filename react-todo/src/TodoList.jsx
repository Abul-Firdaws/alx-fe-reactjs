import React, { useState } from 'react';

export function addTodo(text, todos, setTodos) {
  if (text.trim().length > 0) {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    return newTodo;
  }
  return null;
}

export function toggleTodo(id, todos, setTodos) {
  setTodos(
    todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
}

export function deleteTodo(id, todos, setTodos) {
  setTodos(todos.filter((todo) => todo.id !== id));
}

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Master Testing', completed: false },
  ]);

  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    const result = addTodo(inputValue, todos, setTodos);
    if (result) {
      setInputValue('');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Todo List</h1>

      <form onSubmit={handleAddTodo} style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new todo"
            data-testid="todo-input"
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
            data-testid="add-button"
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
        </div>
      </form>

      <div data-testid="todo-list-container">
        {todos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#95a5a6' }} data-testid="empty-message">
            No todos yet. Add one above!
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }} data-testid="todo-list">
            {todos.map((todo) => (
              <li
                key={todo.id}
                data-testid={`todo-item-${todo.id}`}
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
                  onClick={() => toggleTodo(todo.id, todos, setTodos)}
                  data-testid={`todo-text-${todo.id}`}
                  style={{
                    flex: 1,
                    cursor: 'pointer',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#95a5a6' : '#2c3e50',
                  }}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id, todos, setTodos)}
                  data-testid={`delete-btn-${todo.id}`}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodoList;