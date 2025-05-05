import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BudgetList = ({ refreshTrigger }) => {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
    notes: '',
  });

  const fetchItems = () => {
    axios.get('http://localhost:3000/api/v1/budget_items')
      .then(res => setItems(res.data))
      .catch(err => console.error('Failed to load budget items:', err));
  };

  useEffect(() => {
    fetchItems();
  }, [refreshTrigger]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/v1/budget_items/${id}`)
      .then(() => setItems(prev => prev.filter(item => item.id !== id)))
      .catch(err => console.error('Failed to delete item:', err));
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditForm({
      title: item.title,
      amount: item.amount,
      category: item.category,
      date: item.date?.slice(0, 10),
      notes: item.notes || '',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/v1/budget_items/${editingId}`, {
      budget_item: editForm
    })
      .then(() => {
        fetchItems();
        setEditingId(null);
      })
      .catch(err => console.error('Failed to update item:', err));
  };

  const total = items.reduce((sum, item) => sum + parseFloat(item.amount), 0).toFixed(2);

  return (
    <div>
      <h3>Budget List</h3>
      <p><strong>Total:</strong> ${total}</p>
      <ul>
        {items.map(item => {
          const isIncome = parseFloat(item.amount) >= 0;
          const color = isIncome ? 'green' : 'red';
          const icon = isIncome ? '🔺' : '🔻';

          return (
            <li key={item.id} style={{ color }}>
              {editingId === item.id ? (
                <form onSubmit={handleEditSubmit}>
                  <input type="text" name="title" value={editForm.title} onChange={handleEditChange} required />
                  <input type="number" name="amount" step="0.01" value={editForm.amount} onChange={handleEditChange} required />
                  <input type="text" name="category" value={editForm.category} onChange={handleEditChange} required />
                  <input type="date" name="date" value={editForm.date} onChange={handleEditChange} required />
                  <textarea name="notes" value={editForm.notes} onChange={handleEditChange} />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <strong>{icon} {item.title}</strong> — ${item.amount} ({item.category}) on {item.date?.slice(0, 10)}
                  <p>{item.notes}</p>
                  <button onClick={() => startEditing(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BudgetList;
