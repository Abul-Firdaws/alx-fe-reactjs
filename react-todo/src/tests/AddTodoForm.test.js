import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTodoForm from '../components/AddTodoForm';

describe('AddTodoForm Component', () => {
  test('renders input and button', () => {
    const mockAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    expect(screen.getByPlaceholderText(/Add a new todo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
  });

  test('calls onAddTodo with input value when form is submitted', () => {
    const mockAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const input = screen.getByPlaceholderText(/Add a new todo/i);
    const button = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);

    expect(mockAddTodo).toHaveBeenCalledWith('New Todo');
    expect(mockAddTodo).toHaveBeenCalledTimes(1);
  });

  test('does not call onAddTodo with empty input', () => {
    const mockAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const button = screen.getByRole('button', { name: /Add/i });
    fireEvent.click(button);

    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});