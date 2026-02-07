
import React, { useState } from 'react';
import { PartnerProfile } from '../types';

interface PartnerLoginProps {
  onLoginSuccess: (partner: PartnerProfile) => void;
  onBack: () => void;
  onGoToSignup: () => void;
}

export const PartnerLogin: React.FC<PartnerLoginProps> = ({ onLoginSuccess, onBack, onGoToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const existingStr = localStorage.getItem('iaq_partners');
      const partners: PartnerProfile[] = existingStr ? JSON.parse(existingStr) : [];
      
      const partner = partners.find(p => p.email.toLowerCase() === email.toLowerCase() && p.password === password);

      if (partner) {
        onLoginSuccess(partner);
      } else {
        setError('Invalid email or password.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-md mx-auto fade-in p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Partner Sign In</h1>
        <button 
          onClick={onBack}
          className="text-slate-500 hover:text-[#1e3a5f] flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Home
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1e3a5f] hover:bg-[#2d5485] text-white font-bold py-3 rounded-xl shadow-lg transition-all disabled:opacity-70"
          >
            {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="mt-6 text-center pt-6 border-t border-slate-100">
          <p className="text-sm text-slate-500">Don't have an account?</p>
          <button 
            onClick={onGoToSignup}
            className="text-[#0d9488] font-bold hover:underline mt-1"
          >
            Create Partner Account
          </button>
        </div>
      </div>
    </div>
  );
};
