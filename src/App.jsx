import React, { useState } from 'react';
import Header from './components/Header';
import ActionList from './components/ActionList';
import TodoList from './components/TodoList';
import { TodoProvider } from './context/TodoContext';



const App = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [todos, setTodos] = useState([]);

  const handleCreateTaskClick = () => {
    setShowTaskForm(true);
  };

  const handleCloseModal = () => {
    setShowTaskForm(false);
  };

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) =>
      prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
    ));
  };

  // Filter todos by status
  const todoTasks = todos.filter((todo) => todo.status === 'Todo');
  const inProgressTasks = todos.filter((todo) => todo.status === 'InProgress');
  const completedTasks = todos.filter((todo) => todo.status === 'Complete');

  return (
    <>
      <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
        <Header />
        <div className="w-full min-h-screen flex flex-col items-center bg-slate-100">
          <div className="w-2/3 h-24 border bg-white mt-9 flex items-center justify-between px-4 rounded-xl">
            <div className='font-semibold text-xl'>
              Desktop & Mobile Application
            </div>
            <button
              className="ml-auto bg-violet-800 text-white px-4 py-2 rounded"
              onClick={handleCreateTaskClick}
            >
              Create Task
            </button>
          </div>

          {/* Main Page Content */}
          <div className='w-2/3 mt-4 flex gap-4'>
            <div className="w-1/3 bg-white">
              <div className='text-center flex items-center justify-center bg-violet-800 text-white p-3 rounded-t-lg'>
                TODO
              </div>
              <div className='p-4'>
                {todoTasks.length > 0 ? (
                  todoTasks.map((todo) => (
                    <TodoList key={todo.id} todo={todo} />
                  ))
                ) : (
                  <p className="text-center">No todos</p>
                )}
              </div>
            </div>

            <div className="w-1/3 bg-white">
              <div className='text-center flex items-center justify-center bg-yellow-300 text-white p-3 rounded-t-lg'>
                IN PROGRESS
              </div>
              <div className='p-4'>
                {inProgressTasks.length > 0 ? (
                  inProgressTasks.map((todo) => (
                    <TodoList key={todo.id} todo={todo} />
                  ))
                ) : (
                  <p className="text-center">No todos</p>
                )}
              </div>
            </div>

            <div className="w-1/3 bg-white">
              <div className='text-center flex items-center justify-center bg-green-600 text-white p-3 rounded-t-lg'>
                COMPLETED
              </div>
              <div className='p-4'>
                {completedTasks.length > 0 ? (
                  completedTasks.map((todo) => (
                    <TodoList key={todo.id} todo={todo} />
                  ))
                ) : (
                  <p className="text-center">No todos</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Popup */}
        {showTaskForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-2/3 rounded-lg shadow-lg">
              <ActionList handleCloseModal={handleCloseModal} />
            </div>
          </div>
        )}
      </TodoProvider>
    </>
  );
};

export default App;