'use client';

import { useEffect, useState } from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error('Failed to fetch todos:', err));
  }, []);

  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input.trim() }),
      });
      const newTodo: Todo = await res.json();
      setTodos([...todos, newTodo]);
      setInput('');
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  const toggleComplete = async (id: string, current: boolean) => {
    try {
      const res = await fetch('/api/todos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed: !current }),
      });
      const updated: Todo = await res.json();
      setTodos(todos.map(t => (t.id === id ? updated : t)));
    } catch (err) {
      console.error('Failed to toggle completion:', err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`/api/todos?id=${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const clearCompleted = () => {
    const completedIds = todos.filter(t => t.completed).map(t => t.id);
    completedIds.forEach(id => deleteTodo(id));
  };

  const filteredTodos = todos.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed
  );

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span className="ml-2 text-xl font-semibold text-gray-900">Todo App</span>
          </div>
        </div>
      </nav>

      <main className="flex-grow py-10 px-4 max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold mb-6">My Tasks</h1>

          <form onSubmit={addTodo} className="mb-8 flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task..."
              required
              className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="submit" className="btn-primary px-6 py-3 rounded-r-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700">
              Add Task
            </button>
          </form>

          <div className="flex space-x-2 mb-6">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as 'all' | 'active' | 'completed')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${filter === f ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {filteredTodos.length ? (
            <div className="space-y-3">
              {filteredTodos.map(todo => (
                <div key={todo.id} className={`todo-item flex justify-between items-center p-4 border rounded-lg bg-white ${todo.completed ? 'opacity-60' : ''}`}>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id, todo.completed)}
                      className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    />
                    <span className={`ml-3 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>{todo.title}</span>
                  </div>
                  <button onClick={() => deleteTodo(todo.id)} className="btn-delete p-2 rounded-full hover:bg-red-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">No tasks yet</h3>
              <p className="text-gray-500 mt-1">Add a new task to get started</p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between text-sm text-gray-500">
            <span>{activeCount} task{activeCount !== 1 ? 's' : ''} left</span>
            <button onClick={clearCompleted} className="text-indigo-600 hover:text-indigo-800 font-medium">
              Clear completed
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        Todo App - Built with modern web technologies
      </footer>
    </div>
  );
}
