import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  test('renders TodoList component', () => {
    render(<TodoList />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();
  });

  test('displays initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Master Testing')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a new todo');
    const button = screen.getByText('Add Todo');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);

    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('toggles todo completion', () => {
    render(<TodoList />);
    
    let todo = screen.getByText('Learn React'); // Use 'let' to allow reassignment

    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: line-through');

    // Re-query the element after the first toggle (optional but safer)
    todo = screen.getByText('Learn React'); 
    
    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: none');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    
    // CORRECTED: Use getByLabelText to target the specific button reliably
    const deleteButtonForReact = screen.getByLabelText('Delete Learn React');

    fireEvent.click(deleteButtonForReact);
    
    // Check that the todo text is gone
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});