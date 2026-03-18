"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useUser } from '../../context/UserContext';

interface MealPlan {
  id: string;
  date: string;
  mealType: string;
  notes: string;
}

export default function MealPlannerPage() {
  const { token } = useUser();
  const [plans, setPlans] = useState<MealPlan[]>([]);
  const [date, setDate] = useState('');
  const [mealType, setMealType] = useState('lunch');
  const [notes, setNotes] = useState('');

  const fetchPlans = useCallback(async () => {
    const res = await fetch('http://localhost:8080/api/meal-plans', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    setPlans(data);
  }, [token]);

  useEffect(() => {
    if (token) fetchPlans();
  }, [token, fetchPlans]);

  const addPlan = async () => {
    if (!date) return;
    await fetch('http://localhost:8080/api/meal-plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ date, mealType, notes }),
    });
    setDate('');
    setNotes('');
    fetchPlans();
  };

  const deletePlan = async (id: string) => {
    await fetch(`http://localhost:8080/api/meal-plans/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchPlans();
  };

  return (
    <div className="p-20 mt-10 text-black">
      <h1 className="text-3xl font-bold mb-6">Meal Planner</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6 bg-gray-50 p-4 rounded-lg">
        <input
          type="date" value={date} onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
        <select value={mealType} onChange={(e) => setMealType(e.target.value)} className="border p-2 rounded">
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
        <input
          type="text" value={notes} onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes..." className="border p-2 rounded"
        />
        <button onClick={addPlan} className="bg-primary text-white p-2 rounded">Plan Meal</button>
      </div>
      <div className="space-y-4">
        {plans.map(plan => (
          <div key={plan.id} className="border-l-4 border-primary p-4 bg-white shadow-sm flex justify-between items-center">
            <div>
              <p className="font-bold text-lg capitalize">{plan.mealType} - {plan.date}</p>
              <p className="text-gray-600 italic">&quot;{plan.notes}&quot;</p>
            </div>
            <button onClick={() => deletePlan(plan.id)} className="text-red-500 hover:underline">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
