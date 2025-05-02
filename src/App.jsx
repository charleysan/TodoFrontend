import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import BudgetForm from './BudgetForm';
import BudgetList from './BudgetList';

const App = () => {
  const [view, setView] = useState('todo'); // 'todo' or 'budget'

  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [budgetRefreshTrigger, setBudgetRefreshTrigger] = useState(false);

  const refreshTasks = () => setRefreshTrigger(prev => !prev);
  const refreshBudget = () => setBudgetRefreshTrigger(prev => !prev);

  return (
    <div style={{ padding: '20px' }}>
      <h1>To-Do & Budget Tracker</h1>

      {/* 🔁 View Toggle */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setView('todo')} disabled={view === 'todo'}>
          📝 To-Do List
        </button>
        <button onClick={() => setView('budget')} disabled={view === 'budget'}>
          💰 Budget Tracker
        </button>
      </div>

      {/* 🔀 Conditional Rendering */}
      {view === 'todo' && (
        <div>
          <TaskForm onTaskCreated={refreshTasks} />
          <TaskList refreshTrigger={refreshTrigger} />
        </div>
      )}

      {view === 'budget' && (
        <div>
          <BudgetForm onAdded={refreshBudget} />
          <BudgetList refreshTrigger={budgetRefreshTrigger} />
        </div>
      )}
    </div>
  );
};

export default App;
