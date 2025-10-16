import { useState, useEffect } from 'react';

function TaskForm({ createTask, updateTask, editingTask, setEditingTask }) {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || ''
      });
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    if (editingTask) {
      updateTask(editingTask._id, formData);
    } else {
      createTask(formData);
    }

    setFormData({ title: '', description: '' });
  };

  const handleCancel = () => {
    setEditingTask(null);
    setFormData({ title: '', description: '' });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title *"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        required
      />
      
      <textarea
        placeholder="Task Description (optional)"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        rows="3"
      />
      
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
