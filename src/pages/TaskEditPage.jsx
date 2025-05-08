// src/pages/TaskEditPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';

const TaskEditPage = ({ match }) => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const { id } = match.params; // get task ID from URL params
    axios.get(`http://localhost:3000/api/v1/tasks/${id}`)
      .then(res => setTask(res.data))
      .catch(err => console.error(err));
  }, [match.params]);

  const handleEdit = () => {
    // Handle task update logic here (similar to TaskForm)
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Task</h1>
      <TaskForm onTaskCreated={handleEdit} />
    </div>
  );
};

export default TaskEditPage;
