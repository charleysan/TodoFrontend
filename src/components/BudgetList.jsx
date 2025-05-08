import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BudgetList = ({ refreshTrigger }) => {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    income: '',
    spent: '',
    category: '',
    date: '',
    notes: '',
  });

  const fetchItems = () => {
    axios.get('http://localhost:3000/api/v1/budget_items')
      .then(res => {
        if (Array.isArray(res.data.budget_items)) {
          setItems(res.data.budget_items);
        } else {
          console.error('API response is not an array:', res.data);
        }
      })
      .catch(err => console.error('Failed to load budget items:', err));
  };

  useEffect(() => {
    fetchItems();
  }, [refreshTrigger]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/v1/budget_items/${id}`)
      .then(() => {
        setItems(prev => prev.filter(item => item.id !== id));
      })
      .catch(err => console.error('Failed to delete item:', err));
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditForm({
      title: item.title,
      income: item.income || '',
      spent: item.spent || '',
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
    const updatedItem = {
      ...editForm,
      income: editForm.income ? parseFloat(editForm.income) : null,
      spent: editForm.spent ? -Math.abs(parseFloat(editForm.spent)) : null, // Ensure spent is always negative
    };

    axios.put(`http://localhost:3000/api/v1/budget_items/${editingId}`, { budget_item: updatedItem })
      .then(() => {
        fetchItems();
        setEditingId(null);
      })
      .catch(err => console.error('Failed to update item:', err));
  };

  const totalIncome = items.reduce((sum, item) => {
    const income = parseFloat(item.income) || 0;
    return sum + income;
  }, 0).toFixed(2);

  const totalSpent = items.reduce((sum, item) => {
    const spent = parseFloat(item.spent) || 0;
    return sum + spent;
  }, 0).toFixed(2);

  return (
    <div>
      <h3>Budget List</h3>
      <p><strong>Total Income:</strong> ${totalIncome}</p>
      <p><strong>Total Spent:</strong> ${Math.abs(totalSpent)}</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.length > 0 ? (
          items.map(item => {
            const isIncome = parseFloat(item.income) >= 0;
            const color = isIncome ? '#2e7d32' : '#c62828'; // green/red for income/spent
            const icon = isIncome ? '🔺' : '🔻';

            return (
              <li
                key={item.id}
                style={{
                  backgroundColor: '#f9f9f9',
                  border: `2px solid ${color}`,
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                }}
              >
                {editingId === item.id ? (
                  <form onSubmit={handleEditSubmit}>
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      required
                    />
                    <input
                      type="number"
                      step="0.01"
                      name="income"
                      value={editForm.income}
                      onChange={handleEditChange}
                      placeholder="Income"
                    />
                    <input
                      type="number"
                      step="0.01"
                      name="spent"
                      value={editForm.spent}
                      onChange={handleEditChange}
                      placeholder="Spent"
                    />
                    <input
                      type="text"
                      name="category"
                      value={editForm.category}
                      onChange={handleEditChange}
                      required
                    />
                    <input
                      type="date"
                      name="date"
                      value={editForm.date}
                      onChange={handleEditChange}
                      required
                    />
                    <textarea
                      name="notes"
                      value={editForm.notes}
                      onChange={handleEditChange}
                      placeholder="Notes (optional)"
                    />
                    <div style={{ marginTop: '0.5rem' }}>
                      <button type="submit">Save</button>
                      <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h4 style={{ margin: 0, color }}>
                      {icon} {item.title}
                    </h4>
                    <p style={{ margin: '0.25rem 0' }}>
                      <strong>Income:</strong> ${Math.abs(item.income)} ({item.category})
                    </p>
                    {item.spent && (
                      <p style={{ margin: '0.25rem 0' }}>
                        <strong>Spent:</strong> ${Math.abs(item.spent)}
                      </p>
                    )}
                    <p style={{ margin: '0.25rem 0' }}>
                      <strong>Date:</strong> {item.date?.slice(0, 10)}
                    </p>
                    {item.notes && (
                      <p style={{ margin: '0.25rem 0' }}>
                        <em>{item.notes}</em>
                      </p>
                    )}
                    <button onClick={() => startEditing(item)} style={{ marginRight: '0.5rem' }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </>
                )}
              </li>
            );
          })
        ) : (
          <p>No budget items available.</p>
        )}
      </ul>
    </div>
  );
};

export default BudgetList;
