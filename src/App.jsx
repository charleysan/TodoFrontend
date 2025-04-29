import React from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const App = () => {
  return (
    <div>
      <h1>Todo App</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;
