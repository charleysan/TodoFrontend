import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from Rails API
    axios.get('http://localhost:3000/api/v1/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Category: {task.category}</p>
            <p>Due Date: {task.due_date}</p>
            <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
