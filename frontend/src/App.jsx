import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await axios.post(API_URL, taskData);
      setTasks([response.data, ...tasks]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, taskData);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleComplete = async (task) => {
    await updateTask(task._id, { ...task, completed: !task.completed });
  };

  return (
    <div className="App">
      <div className="container">
        <h1>📝 TaskFlow</h1>
        <p className="subtitle">Simple Task Management System</p>
        
        <TaskForm 
          createTask={createTask}
          updateTask={updateTask}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
        />
        
        <TaskList 
          tasks={tasks}
          deleteTask={deleteTask}
          setEditingTask={setEditingTask}
          toggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
}

export default App;
