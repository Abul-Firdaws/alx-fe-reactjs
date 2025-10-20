import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList, { addTodo, toggleTodo, deleteTodo } from './TodoList';

describe('TodoList Component', () => {
  test('renders TodoList component', () => {
    render(<TodoList />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();
  });

  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Master Testing')).toBeInTheDocument();
  });

  test('renders input field', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    expect(input).toBeInTheDocument();
  });

  test('renders add button', () => {
    render(<TodoList />);
    const button = screen.getByTestId('add-button');
    expect(button).toBeInTheDocument();
  });

  test('adds a new todo', async () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-button');

    await userEvent.type(input, 'New Todo');
    fireEvent.click(button);

    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('clears input after adding todo', async () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-button');

    await userEvent.type(input, 'Test Todo');
    fireEvent.click(button);

    expect(input.value).toBe('');
  });

  test('toggles todo completion', () => {
    render(<TodoList />);
    const todoText = screen.getByTestId('todo-text-1');

    fireEvent.click(todoText);
    expect(todoText).toHaveStyle('text-decoration: line-through');

    fireEvent.click(todoText);
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();

    const deleteButton = screen.getByTestId('delete-btn-1');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });

  test('displays empty state', () => {
    render(<TodoList />);
    
    const deleteButtons = screen.getAllByTestId(/delete-btn-/);
    deleteButtons.forEach((btn) => fireEvent.click(btn));

    expect(screen.getByTestId('empty-message')).toBeInTheDocument();
  });

  test('does not add empty todo', async () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-button');

    const initialCount = screen.getAllByTestId(/todo-item-/).length;

    await userEvent.type(input, '   ');
    fireEvent.click(button);

    const finalCount = screen.queryAllByTestId(/todo-item-/).length;
    expect(finalCount).toBe(initialCount);
  });

  test('renders todo list container', () => {
    render(<TodoList />);
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  });

  test('addTodo function exports correctly', () => {
    const todos = [];
    const setTodos = jest.fn();
    
    addTodo('Test', todos, setTodos);
    expect(setTodos).toHaveBeenCalled();
  });

  test('toggleTodo function exports correctly', () => {
    const todos = [{ id: 1, text: 'Test', completed: false }];
    const setTodos = jest.fn();
    
    toggleTodo(1, todos, setTodos);
    expect(setTodos).toHaveBeenCalled();
  });

  test('deleteTodo function exports correctly', () => {
    const todos = [{ id: 1, text: 'Test', completed: false }];
    const setTodos = jest.fn();
    
    deleteTodo(1, todos, setTodos);
    expect(setTodos).toHaveBeenCalled();
  });
});