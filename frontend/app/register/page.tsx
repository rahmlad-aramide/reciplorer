"use client";
import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) throw new Error('Registration failed');
      const data = await response.json();
      login(data.token, data.user);
      router.push('/recipes');
    } catch {
      alert('Registration failed. Try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-4">Register for Reciplorer</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded" required
        />
        <input
          type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded" required
        />
        <input
          type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded" required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
