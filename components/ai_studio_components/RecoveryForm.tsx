
import React, { useState } from 'react';

interface RecoveryFormProps {
  onBack: () => void;
  onSubmitRecovery: (email: string) => Promise<boolean>;
}

export const RecoveryForm: React.FC<RecoveryFormProps> = ({ onBack, onSubmitRecovery }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Attempt recovery via App.tsx logic
    await onSubmitRecovery(email);
    
    // Show success message regardless of whether it was found (security best practice)
    setSuccessMessage(true);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto fade-in bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 mt-10">
      <div className="w-16 h-16 bg-[#1e3a5f] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-[#1e3a5f] text-center mb-2 uppercase tracking-tight">IAQ Audit Report ID # Recovery</h2>
      <p className="text-slate-500 text-center mb-8 text-sm leading-relaxed px-4">
        Enter the email address associated with your most current IAQ Audit Report.
      </p>

      {successMessage ? (
        <div className="animate-fade-in text-center py-6">
            <div className="bg-teal-50 border border-teal-200 text-[#0d9488] p-6 rounded-2xl font-bold text-sm leading-relaxed mb-6">
                If you submitted a valid email address associated with an active IAQ Audit Report, then your IAQ Audit Report Welcome email with your ID # has been resent to you.
            </div>
            <button
                onClick={onBack}
                className="bg-[#1e3a5f] hover:bg-[#2d5485] text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all transform hover:-translate-y-1"
            >
                Back to Sign In
            </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none transition-all"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0d9488] hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
          >
            {isSubmitting ? 'Resending Email...' : 'Recover Audit ID #'}
          </button>
          
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onBack}
              className="text-slate-400 hover:text-slate-600 text-sm font-medium underline"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
