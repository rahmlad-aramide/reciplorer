"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useUser } from '../../context/UserContext';

interface PantryItem {
  id: string;
  name: string;
  quantity: string;
}

export default function PantryPage() {
  const { token } = useUser();
  const [items, setItems] = useState<PantryItem[]>([]);
  const [itemName, setItemName] = useState('');
  const [qty, setQty] = useState('');

  const fetchPantry = useCallback(async () => {
    const res = await fetch('http://localhost:8080/api/pantry', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    setItems(data);
  }, [token]);

  useEffect(() => {
    if (token) fetchPantry();
  }, [token, fetchPantry]);

  const addItem = async () => {
    if (!itemName) return;
    await fetch('http://localhost:8080/api/pantry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: itemName, quantity: qty }),
    });
    setItemName('');
    setQty('');
    fetchPantry();
  };

  const deleteItem = async (id: string) => {
    await fetch(`http://localhost:8080/api/pantry/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchPantry();
  };

  return (
    <div className="p-20 mt-10 text-black">
      <h1 className="text-3xl font-bold mb-6">Pantry Tracking</h1>
      <div className="grid grid-cols-3 gap-2 mb-6">
        <input
          type="text" value={itemName} onChange={(e) => setItemName(e.target.value)}
          placeholder="Item name..." className="border p-2 rounded"
        />
        <input
          type="text" value={qty} onChange={(e) => setQty(e.target.value)}
          placeholder="Quantity..." className="border p-2 rounded"
        />
        <button onClick={addItem} className="bg-primary text-white p-2 rounded">Add Item</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className="border p-4 rounded shadow-sm flex justify-between items-center bg-white">
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <button onClick={() => deleteItem(item.id)} className="text-red-500 hover:underline">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
