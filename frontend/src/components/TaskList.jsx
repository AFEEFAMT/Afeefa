function TaskList({ tasks, deleteTask, setEditingTask, toggleComplete }) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet. Add one above! 🎯</p>;
  }

  return (
    <div className="task-list">
      <h2>Tasks ({tasks.length})</h2>
      {tasks.map(task => (
        <div key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <div className="task-content">
            <div className="task-header">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task)}
              />
              <h3>{task.title}</h3>
            </div>
            {task.description && <p>{task.description}</p>}
          </div>
          
          <div className="task-actions">
            <button 
              className="btn-icon edit" 
              onClick={() => setEditingTask(task)}
              title="Edit"
            >
              ✏️
            </button>
            <button 
              className="btn-icon delete" 
              onClick={() => deleteTask(task._id)}
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
