
import React, { useState } from 'react';
import { Submission } from '../types';

interface UserLoginProps {
  onLoginSuccess: (submission: Submission) => void;
  onBack: () => void;
  onGoToRecovery: () => void;
}

export const UserLogin: React.FC<UserLoginProps> = ({ onLoginSuccess, onBack, onGoToRecovery }) => {
  const [email, setEmail] = useState('');
  const [reportId, setReportId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const storedSubmissions = localStorage.getItem('iaq_submissions');
    if (!storedSubmissions) {
      setError("No audit reports found. Please complete an audit first.");
      return;
    }

    try {
      const submissions: Submission[] = JSON.parse(storedSubmissions);
      const found = submissions.find(s => 
        s.contact.email.toLowerCase() === email.trim().toLowerCase() && 
        s.reportId.toUpperCase() === reportId.trim().toUpperCase()
      );

      if (found) {
        onLoginSuccess(found);
      } else {
        setError("Invalid Email or Report ID. Please check your details and try again.");
      }
    } catch (err) {
      console.error("Error searching for submission:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto fade-in bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 mt-10">
      <div className="w-16 h-16 bg-[#0d9488] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-[#1e3a5f] text-center mb-2">Sign In to Your Audit</h2>
      <p className="text-slate-500 text-center mb-8 text-sm">Access your active IAQ Audit Report instantly.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
          <input
            type="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none transition-all"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Audit Report ID #</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none transition-all font-mono"
            placeholder="IAQ-XXXXXX"
            value={reportId}
            onChange={(e) => setReportId(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0d9488] hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 mt-2"
        >
          View My Report
        </button>

        <div className="text-center pt-2">
            <button 
                type="button"
                onClick={onGoToRecovery}
                className="text-sm font-bold text-[#1e3a5f] hover:text-[#0d9488] underline transition-colors"
            >
                Recover Your Audit ID #
            </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-slate-600 text-sm font-medium underline"
        >
          Cancel and return home
        </button>
      </div>
    </div>
  );
};
