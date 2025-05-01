import React, { useState } from 'react';
import axios from 'axios';

const BudgetForm = ({ onAdded }) => {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/v1/budget_items', { budget_item: form })
      .then(() => {
        setForm({ title: '', amount: '', category: '', date: '', notes: '' });
        onAdded?.();
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Budget Item</h3>
      <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input type="number" step="0.01" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" required />
      <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />
      <button type="submit">Add</button>
    </form>
  );
};

export default BudgetForm;
