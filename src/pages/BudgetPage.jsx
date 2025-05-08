import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetForm from '../components/BudgetForm';
import BudgetList from '../components/BudgetList';

const BudgetPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [budgetItems, setBudgetItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshBudget = () => setRefreshTrigger(prev => !prev);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get('http://localhost:3000/api/v1/budget_items')
      .then(res => {
        const data = res.data;
        if (Array.isArray(data.budget_items)) {
          setBudgetItems(data.budget_items);
          setTotalAmount(parseFloat(data.total) || 0);
        } else {
          setError('Error: Budget data is not in the expected format.');
        }
      })
      .catch(err => {
        console.error('Error fetching budget data:', err);
        setError('There was an error fetching the budget data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refreshTrigger]);

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
            <p>Overall Budget Total: ${totalAmount}</p>
          </div>

          <BudgetList budgetItems={budgetItems} refreshTrigger={refreshTrigger} />
        </>
      )}
    </div>
  );
};

export default BudgetPage;
