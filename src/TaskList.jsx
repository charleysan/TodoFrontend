import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    category: '',
    due_date: '',
    completed: false,
  });

  

  const fetchTasks = () => {
    axios.get('http://localhost:3000/api/v1/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/v1/tasks/${id}`)
      .then(() => fetchTasks())
      .catch(err => console.error(err));
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditForm({
      title: task.title,
      description: task.description,
      category: task.category,
      due_date: task.due_date,
      completed: task.completed,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/v1/tasks/${editingTask}`, {
      task: editForm,
    })
      .then(() => {
        fetchTasks();
        setEditingTask(null);
      })
      .catch(err => console.error(err));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div>
      <h2>Task List</h2>

      <div>
        <label>Filter:</label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            {editingTask === task.id ? (
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  required
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="text"
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="date"
                  name="due_date"
                  value={editForm.due_date}
                  onChange={handleEditChange}
                  required
                />
                <label>
                  Completed:
                  <input
                    type="checkbox"
                    name="completed"
                    checked={editForm.completed}
                    onChange={handleEditChange}
                  />
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingTask(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Category: {task.category}</p>
                <p>Due: {task.due_date}</p>
                <p>Status: {task.completed ? '✅ Completed' : '❌ Incomplete'}</p>
                <button onClick={() => startEditing(task)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </>
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
