import React, { useState } from 'react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export default function AdminLogin({ onLoginSuccess, onBack }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Retrieve stored credentials or use defaults
    const storedUser = localStorage.getItem('iaq_admin_user') || 'admin';
    const storedPass = localStorage.getItem('iaq_admin_pass') || 'iaqaudit1600!';

    if (username === storedUser && password === storedPass) {
      onLoginSuccess();
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto fade-in bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 mt-10">
      <div className="w-16 h-16 bg-[#1e3a5f] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-[#1e3a5f] text-center mb-2">Admin Dashboard</h2>
      <p className="text-slate-500 text-center mb-8 text-sm">Please log in to manage your reports.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none transition-all"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
          <input
            type="password"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none transition-all"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#1e3a5f] hover:bg-[#2d5485] text-white font-bold py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 mt-2"
        >
          Sign In
        </button>
      </form>

      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-slate-600 text-sm font-medium underline"
        >
          Cancel and return to home
        </button>
      </div>
    </div>
  );
};
