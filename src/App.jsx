import React, { useState} from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const App = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const refreshTasks = () => 
    setRefreshTrigger(!refreshTrigger);

  return (
    <div>
      <h1>Todo App</h1>
      <TaskForm onTaskCreated={refreshTasks} />
      <TaskList refreshTrigger={refreshTrigger}/>
    </div>
  );
};

export default App;
