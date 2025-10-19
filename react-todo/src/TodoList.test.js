import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  // Test initial render
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Master Testing')).toBeInTheDocument();
  });

  // Test input field
  test('renders input field with correct placeholder', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Add a new todo');
  });

  // Test add todo button
  test('renders add todo button', () => {
    render(<TodoList />);
    const button = screen.getByTestId('add-todo-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Add Todo');
  });

  // Test adding a new todo
  test('adds a new todo when form is submitted', async () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-todo-button');

    await userEvent.type(input, 'New Test Todo');
    fireEvent.click(button);

    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  // Test input value change
  test('updates input value on change', async () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');

    await userEvent.type(input, 'Test Input');
    expect(input).toHaveValue('Test Input');
  });

  // Test todo list renders
  test('renders todo list', () => {
    render(<TodoList />);
    const todoList = screen.getByTestId('todo-list');
    expect(todoList).toBeInTheDocument();
  });

  // Test toggle todo completion
  test('toggles todo completion status when clicked', async () => {
    render(<TodoList />);
    const todoText = screen.getByTestId('todo-text-1');

    expect(todoText).not.toHaveStyle('text-decoration: line-through');
    fireEvent.click(todoText);
    expect(todoText).toHaveStyle('text-decoration: line-through');
    fireEvent.click(todoText);
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
  });

  // Test delete todo
  test('deletes todo when delete button is clicked', async () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();

    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });

  // Test empty state message
  test('displays message when no todos exist', () => {
    render(<TodoList />);
    
    // Delete all initial todos
    const deleteButtons = screen.getAllByTestId(/delete-button-/);
    deleteButtons.forEach(button => fireEvent.click(button));

    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
  });

  // Test does not add empty todo
  test('does not add todo with empty or whitespace text', async () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-todo-button');

    const initialTodoCount = screen.getAllByTestId(/todo-item-/).length;

    // Try adding empty todo
    fireEvent.click(button);
    expect(screen.getAllByTestId(/todo-item-/)).toHaveLength(initialTodoCount);

    // Try adding whitespace todo
    await userEvent.type(input, '   ');
    fireEvent.click(button);
    expect(screen.getAllByTestId(/todo-item-/)).toHaveLength(initialTodoCount);
  });

  // Test multiple todos can be added
  test('adds multiple todos sequentially', async () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-todo-button');

    const todos = ['First Todo', 'Second Todo', 'Third Todo'];

    for (const todo of todos) {
      await userEvent.type(input, todo);
      fireEvent.click(button);
      expect(screen.getByText(todo)).toBeInTheDocument();
      expect(input).toHaveValue('');
    }
  });
});