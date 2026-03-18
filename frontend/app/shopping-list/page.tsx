"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';

export default function ShoppingListPage() {
  const { token } = useUser();
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    if (token) fetchItems();
  }, [token]);

  const fetchItems = async () => {
    const res = await fetch('http://localhost:8080/api/shopping-list', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    setItems(data);
  };

  const addItem = async () => {
    if (!newItem) return;
    await fetch('http://localhost:8080/api/shopping-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: newItem, quantity: '1' }),
    });
    setNewItem('');
    fetchItems();
  };

  const toggleItem = async (id: string, isPurchased: boolean) => {
    await fetch(`http://localhost:8080/api/shopping-list/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ isPurchased: !isPurchased }),
    });
    fetchItems();
  };

  return (
    <div className="p-20 mt-10 text-black">
      <h1 className="text-3xl font-bold mb-6">Your Shopping List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add item..." className="border p-2 rounded flex-1"
        />
        <button onClick={addItem} className="bg-primary text-white px-4 py-2 rounded">Add</button>
      </div>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id} className="flex items-center gap-2 border-b pb-2">
            <input
              type="checkbox" checked={item.isPurchased}
              onChange={() => toggleItem(item.id, item.isPurchased)}
            />
            <span className={item.isPurchased ? 'line-through text-gray-400' : ''}>
              {item.name} ({item.quantity})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
