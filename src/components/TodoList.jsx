import React, { useState, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';

function TodoList({ todo }) {
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [date, setDate] = useState(todo.date);
    const [status, setStatus] = useState(todo.status);
    const [priority, setPriority] = useState(todo.priority);
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    const { updateTodo, deleteTodo } = useTodo();

    const handlePriorityChange = (newPriority) => {
        setPriority(newPriority);
        setShowPriorityDropdown(false);
        updateTodo(todo.id, {
            ...todo,
            priority: newPriority,
        });
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setShowStatusDropdown(false);
        updateTodo(todo.id, {
            ...todo,
            status: newStatus,
        });
    };

    const handleDelete = () => {
        deleteTodo(todo.id);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.priority-dropdown')) {
                setShowPriorityDropdown(false);
            }
            if (!event.target.closest('.status-dropdown')) {
                setShowStatusDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getPriorityStyles = (prio) => {
        switch (prio) {
            case 'High':
                return 'bg-[#FFECE1] text-[#FF5C00]';
            case 'Medium':
                return 'bg-[#FFECE1] text-[#FF00B8]';
            case 'Low':
                return 'bg-[#F0FFDD] text-[#8A8A8A]';
            default:
                return '';
        }
    };

    return (
        <div className={`flex flex-col border border-black/10 rounded-lg px-3 py-2 gap-y-2 shadow-sm duration-300 text-black ${todo.completed ? 'bg-[#c6e9a7]' : 'bg-white'} mt-3`} style={{ maxWidth: '300px', padding: '1rem' }}>
            
            <div>
                <div className="flex items-center gap-x-2 mb-2 justify-between">
                    <div className="relative flex items-center gap-x-2 priority-dropdown">
                        <button
                            className={`outline-none px-2 py-1 rounded-lg ${getPriorityStyles(priority)} ${todo.completed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            onClick={() => !todo.completed && setShowPriorityDropdown(prev => !prev)}
                            disabled={todo.completed}
                        >
                            {priority}
                        </button>

                        {showPriorityDropdown && (
                            <ul className="absolute mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-24">
                                {["Low", "Medium", "High"].map((priority) => (
                                    <li
                                        key={priority}
                                        className={`cursor-pointer px-2 py-1 hover:bg-gray-100 ${getPriorityStyles(priority)} ${priority === priority ? 'font-bold' : ''}`}
                                        onClick={() => handlePriorityChange(priority)}
                                    >
                                        {priority}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-x-2 mb-2">
                    <input
                        type="text"
                        className={`font-semibold text-lg outline-none w-full bg-transparent rounded-lg ${todo.completed ? 'line-through' : ''}`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        readOnly={todo.completed}
                    />

                    <div className="relative flex items-center gap-x-2 status-dropdown">
                        <button
                            className={`outline-none px-2 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 ${todo.completed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            onClick={() => !todo.completed && setShowStatusDropdown(prev => !prev)}
                            disabled={todo.completed}
                        >
                            ▼
                        </button>

                        {showStatusDropdown && (
                            <ul className="absolute mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-24">
                                <li className="px-2 py-1 font-bold text-gray-700">Change Status</li>
                                {["Todo", "InProgress", "Complete"].map((status) => (
                                    <li
                                        key={status}
                                        className={`cursor-pointer px-2 py-1 hover:bg-gray-100 ${status === status ? 'font-bold' : ''}`}
                                        onClick={() => handleStatusChange(status)}
                                    >
                                        {status}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <textarea
                    className={`outline-none w-full bg-transparent rounded-lg ${todo.completed ? 'line-through' : ''}`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    readOnly={todo.completed}
                />
            </div>

            <hr className="border-gray-200 my-2" />

            <div>
                <div className="flex items-center gap-x-2 mb-2">
                    <label className="font-semibold"></label>
                    <input
                        type="date"
                        className={`outline-none rounded-lg ${todo.completed ? 'border-transparent' : 'px-2'}`}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        readOnly={todo.completed}
                    />
                </div>

                <div className="flex flex-col mt-2 gap-y-1">
                    <button
                        className="inline-flex w-full h-8 rounded-lg text-sm text-white bg-red-600 hover:bg-red-700 justify-center items-center"
                        onClick={handleDelete}
                        disabled={todo.completed}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;
