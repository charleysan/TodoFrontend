// src/pages/TaskPage.js
import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const TaskPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleTaskCreated = () => {
    setRefreshTrigger(!refreshTrigger); // Refresh task list when a task is created
  };

  return (
    <div>
      <h1>📝 Task Management</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default TaskPage;
