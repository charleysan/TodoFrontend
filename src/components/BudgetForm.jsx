import React, { useState } from 'react';
import axios from 'axios';

const BudgetForm = ({ onAdded }) => {
  const [form, setForm] = useState({
    title: '',
    income: '',
    spent: '',
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

    const payload = {
      ...form,
      income: form.income ? parseFloat(form.income) : null,
      spent: form.spent ? -Math.abs(parseFloat(form.spent)) : null, // Always negative
    };

    axios.post('http://localhost:3000/api/v1/budget_items', { budget_item: payload })
      .then(() => {
        setForm({ title: '', income: '', spent: '', category: '', date: '', notes: '' });
        onAdded?.();
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Budget Item</h3>
      <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input type="number" step="0.01" name="income" value={form.income} onChange={handleChange} placeholder="Income" />
      <input type="number" step="0.01" name="spent" value={form.spent} onChange={handleChange} placeholder="Spent (will be stored as negative)" />
      <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />
      <button type="submit">Add</button>
    </form>
  );
};

export default BudgetForm;
