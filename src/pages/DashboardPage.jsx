import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

function DashboardPage() {
  const { auth } = useContext(AuthContext);

  const [taskSummary, setTaskSummary] = useState({ pending: 0, completed: 0 });
  const [budgetSummary, setBudgetSummary] = useState({ total: 0, spent: 0 });

  const [recentTasks, setRecentTasks] = useState([]);
  const [recentBudgets, setRecentBudgets] = useState([]);

  useEffect(() => {
    if (!auth?.id) return;

    // Fetch tasks
    axios.get(`http://localhost:3000/api/v1/tasks?user_id=${auth.id}`)
      .then(res => {
        const tasks = res.data;
        const pending = tasks.filter(task => !task.completed).length;
        const completed = tasks.filter(task => task.completed).length;
        setTaskSummary({ pending, completed });

        // Show 3 most recent tasks
        const sortedTasks = tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRecentTasks(sortedTasks.slice(0, 3));
      })
      .catch(err => console.error("Error fetching tasks", err));

    // Fetch budgets with income and spent values
    axios.get(`http://localhost:3000/api/v1/budget_items?user_id=${auth.id}`)
      .then(res => {
        const budgets = res.data.budget_items;
        const total = budgets.reduce((sum, item) => sum + (parseFloat(item.income) || 0), 0).toFixed(2);
        const spent = budgets.reduce((sum, item) => sum + Math.abs(parseFloat(item.spent) || 0), 0).toFixed(2);
        setBudgetSummary({ total, spent });

        // Show 3 most recent budgets, include income and spent
        const sortedBudgets = budgets.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRecentBudgets(sortedBudgets.slice(0, 3));
      })
      .catch(err => console.error("Error fetching budgets", err));
  }, [auth]);

  return (
    <div>
      <h2>Dashboard</h2>

      {auth ? (
        <p>Welcome back, {auth.name || auth.email}!</p>
      ) : (
        <p>Loading user info...</p>
      )}

      <div className="dashboard-section">
        <h3>Task Summary</h3>
        <p>Pending: {taskSummary.pending}</p>
        <p>Completed: {taskSummary.completed}</p>

        <h4>Recent Tasks</h4>
        <ul>
          {recentTasks.map(task => (
            <li key={task.id}>
              {task.title} — {task.completed ? '✅ Completed' : '⏳ Pending'}
            </li>
          ))}
        </ul>
      </div>

      <div className="dashboard-section">
        <h3>Budget Overview</h3>
        <p>Total Budgeted: ${budgetSummary.total}</p>
        <p>Total Spent: ${budgetSummary.spent}</p>

        <h4>Recent Budget Entries</h4>
        <ul>
          {recentBudgets.map(budget => (
            <li key={budget.id}>
              {budget.category}: ${Math.abs(budget.income)} — Spent: ${Math.abs(budget.spent)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;
