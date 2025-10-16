import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders TodoList component', () => {
    render(<TodoList />);
    const headingElement = screen.getByText(/My Todo List/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('displays initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Master Testing')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText(/Add a new todo/i);
    const button = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    fireEvent.click(button);

    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
  });

  test('toggles todo completion status', () => {
    render(<TodoList />);
    
    const todoItem = screen.getByText('Learn React');
    
    // Initially not completed
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle
    fireEvent.click(todoItem);
    
    // Should be completed now
    expect(todoItem).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back
    fireEvent.click(todoItem);
    
    // Should not be completed
    expect(todoItem).toHaveStyle('text-decoration: none');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    
    const todoItem = screen.getByText('Learn React');
    expect(todoItem).toBeInTheDocument();
    
    // Find the delete button for this todo
    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButtons[0]);
    
    expect(todoItem).not.toBeInTheDocument();
  });

  test('does not add empty todos', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText(/Add a new todo/i);
    const button = screen.getByRole('button', { name: /Add/i });
    
    const initialTodos = screen.getAllByRole('listitem');
    const initialCount = initialTodos.length;

    // Try to add empty todo
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);

    const todosAfter = screen.getAllByRole('listitem');
    expect(todosAfter.length).toBe(initialCount);
  });

  test('clears input after adding todo', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText(/Add a new todo/i);
    const button = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(button);

    expect(input.value).toBe('');
  });
});