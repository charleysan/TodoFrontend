import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BudgetList = ({ refreshTrigger }) => {
  const [items, setItems] = useState([]);

  // Fetch budget items from the API
  const fetchItems = () => {
    axios.get('http://localhost:3000/api/v1/budget_items')
      .then(res => setItems(res.data))
      .catch(err => console.error('Failed to load budget items:', err));
  };

  // Re-fetch budget items when refreshTrigger changes
  useEffect(() => {
    fetchItems();
  }, [refreshTrigger]);

  // Delete a budget item
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/v1/budget_items/${id}`)
      .then(() => setItems(prev => prev.filter(item => item.id !== id)))
      .catch(err => console.error('Failed to delete item:', err));
  };

  // Calculate total amount
  const total = items.reduce((sum, item) => sum + parseFloat(item.amount), 0).toFixed(2);

  return (
    <div>
      <h3>Budget List</h3>
      <p><strong>Total:</strong> ${total}</p>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>{item.title}</strong> — ${item.amount} ({item.category}) on {item.date?.slice(0, 10)}
            <p>{item.notes}</p>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetList;
