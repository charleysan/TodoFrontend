import React, { useState} from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import BudgetForm from './BudgetForm';
import BudgetList from './BudgetList';

const App = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false); //helps to refresh the page aus ewas not loading new tasks automatically
  const refreshTasks = () => setRefreshTrigger(!refreshTrigger);

   // Budget refresh
   const [budgetRefreshTrigger, setBudgetRefreshTrigger] = useState(false);
   const refreshBudget = () => setBudgetRefreshTrigger(prev => !prev);

  return (
    <div>
      <h1>To-Do & Budget App</h1>

      <section>
      <TaskForm onTaskCreated={refreshTasks} />
      <TaskList refreshTrigger={refreshTrigger}/>
      </section>

      <hr/>

      <section>
      <BudgetForm onBudgetCreated={refreshBudget} />
      <BudgetList refreshTrigger={budgetRefreshTrigger}/>
      </section>
    </div>
  );
};

export default App;
