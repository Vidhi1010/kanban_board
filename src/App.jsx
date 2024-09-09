import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Header from './components/Header';
import ActionList from './components/ActionList';
import TodoList from './components/TodoList';
import { TodoProvider } from './context/TodoContext';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [todos, setTodos] = useState([]);

  // Show the task creation form
  const handleCreateTaskClick = () => {
    setShowTaskForm(true);
  };

  // Close the modal form
  const handleCloseModal = () => {
    setShowTaskForm(false);
  };

  // Add new todo and save to Firestore
  const addTodo = async (todo) => {
    try {
      await addDoc(collection(db, "todos"), {
        ...todo,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Update todo in Firestore
  const updateTodo = async (id, updatedTodo) => {
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, updatedTodo);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Delete todo from Firestore
  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  // Sync todos from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      const todosList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todosList);
    });
    return () => unsubscribe();
  }, []);

  // Filter todos by status
  const todoTasks = todos.filter((todo) => todo.status === 'Todo');
  const inProgressTasks = todos.filter((todo) => todo.status === 'InProgress');
  const completedTasks = todos.filter((todo) => todo.status === 'Complete');

  return (
    <>
      <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo }}>
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
            <div className="w-1/3 bg-white h-full">
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

            <div className="w-1/3 bg-white h-full">
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

            <div className="w-1/3 bg-white h-full">
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
