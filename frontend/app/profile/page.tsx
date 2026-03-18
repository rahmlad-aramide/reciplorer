"use client";
import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';

export default function ProfilePage() {
  const { user, token } = useUser();
  const [preferences, setPreferences] = useState(user?.preferences || '');
  const [dietary, setDietary] = useState(user?.dietaryRestrictions || '');

  const handleUpdate = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ preferences, dietaryRestrictions: dietary }),
      });
      if (response.ok) alert('Profile updated!');
    } catch {
      alert('Update failed');
    }
  };

  if (!user) return <div className="p-20 mt-20 text-black">Please login to view profile.</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="w-full max-w-sm space-y-4">
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <div>
          <label>Preferences (e.g. vegan):</label>
          <input
            type="text" value={preferences} onChange={(e) => setPreferences(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Dietary Restrictions:</label>
          <input
            type="text" value={dietary} onChange={(e) => setDietary(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button onClick={handleUpdate} className="w-full bg-green-500 text-white p-2 rounded">Update Profile</button>
      </div>
    </div>
  );
}
