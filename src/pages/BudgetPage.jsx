import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetForm from '../components/BudgetForm';
import BudgetList from '../components/BudgetList';

const BudgetPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [budgetItems, setBudgetItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to trigger data refresh
  const refreshBudget = () => setRefreshTrigger(prev => !prev);

  useEffect(() => {
    // Fetch budget items whenever refreshTrigger changes
    setLoading(true); // Start loading state
    setError(null); // Reset error on new fetch

    axios.get('http://localhost:3000/api/v1/budget_items') // Update with correct endpoint
    .then(res => {
      const data = res.data;
      
      if (Array.isArray(data.budget_items)) {
        setBudgetItems(data.budget_items);
        setBudgetItems(data.budget_items);
setTotalAmount(parseFloat(data.total) || 0);
setTotalSpent(parseFloat(data.spent) || 0);
      } else {
        console.error('API response is not an array:', data);
        setError('Error: Budget data is not in the expected format.');
      }
    })
      .catch(err => {
        console.error('Error fetching budget data:', err);
        setError('There was an error fetching the budget data.');
      })
      .finally(() => {
        setLoading(false); // End loading state
      });
  }, [refreshTrigger]); // Trigger fetch on refreshTrigger change

  // Handle total and spent calculation safely
  const [totalAmount, setTotalAmount] = useState(0);
const [totalSpent, setTotalSpent] = useState(0);

  return (
    <div>
      <h1>💰 Budget Tracker</h1>

      <BudgetForm onAdded={refreshBudget} />

      {loading ? (
        <p>Loading budget data...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div>
            <h3>Budget Overview</h3>
            <p>Total Budgeted: ${totalAmount}</p>
            <p>Total Spent: ${totalSpent}</p>
          </div>

          <BudgetList budgetItems={budgetItems} refreshTrigger={refreshTrigger} />
        </>
      )}
    </div>
  );
};

export default BudgetPage;
