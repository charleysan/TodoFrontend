import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      category,
      due_date: dueDate,
      completed,
    };

    // Send the new task to Rails API
    axios.post('http://localhost:3000/api/v1/tasks', { task: newTask })
      .then(response => {
        console.log('Task created:', response.data);
        // Optionally, update the state of the parent component or reload the tasks
        onTaskCreated();
      })
      .catch(error => {
        console.error('There was an error creating the task!', error);
      });

    // Reset form fields
    setTitle('');
    setDescription('');
    setCategory('');
    setDueDate('');
    setCompleted(false);
  };

  return (
    <div>
      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input 
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Completed:</label>
          <input 
            type="checkbox" 
            checked={completed} 
            onChange={() => setCompleted(!completed)} 
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
