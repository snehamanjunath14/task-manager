import { useState } from 'react';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  // State: stores our list of tasks
  const [tasks, setTasks] = useState([]);
  
  // State: stores what the user is typing
  const [inputValue, setInputValue] = useState('');

  // Function: Add a new task
  const addTask = () => {
    if (inputValue.trim() === '') return; // Don't add empty tasks
    
    const newTask = {
      id: Date.now(), // Unique ID using timestamp
      text: inputValue,
      completed: false
    };
    
    setTasks([...tasks, newTask]); // Add new task to the list
    setInputValue(''); // Clear the input box
  };

  // Function: Toggle task completion
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function: Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <h1>My Task Manager</h1>
      
      {/* Input section */}
      <div className="input-section">
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Enter a task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Tasks list */}
      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks yet! Add one above.</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-item">
              <input 
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span className={task.completed ? 'completed' : ''}>
                {task.text}
              </span>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
