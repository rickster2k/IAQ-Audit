
import React, { useState } from 'react';
import { PartnerProfile } from '../types';

interface PartnerSignupProps {
  onBack: () => void;
  onGoToLogin: () => void;
  onSignupSuccess: (partner: PartnerProfile) => void;
}

export const PartnerSignup: React.FC<PartnerSignupProps> = ({ onBack, onGoToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    subdomain: ''
  });
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow alphanumeric and hyphens, max 12 chars
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 12);
    setFormData({ ...formData, subdomain: val });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.subdomain.length < 3) {
      setError('Subdomain must be at least 3 characters.');
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      // Check for duplicate subdomain
      const existingStr = localStorage.getItem('iaq_partners');
      const partners: PartnerProfile[] = existingStr ? JSON.parse(existingStr) : [];
      
      if (partners.some(p => p.slug === formData.subdomain)) {
        setError('That subdomain is already taken. Please choose another.');
        setIsLoading(false);
        return;
      }

      const newPartner: PartnerProfile = {
        id: crypto.randomUUID(),
        slug: formData.subdomain,
        companyName: formData.companyName,
        email: formData.email,
        password: formData.password,
        logoData: logoFile || '', 
        createdAt: new Date().toISOString(),
      };

      partners.push(newPartner);
      localStorage.setItem('iaq_partners', JSON.stringify(partners));

      setIsLoading(false);
      onSignupSuccess(newPartner);
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto fade-in p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#1e3a5f]">Partner Program</h1>
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
        
        {/* Sign In Link Section */}
        <div className="mb-6 pb-6 border-b border-slate-100 flex justify-end items-center gap-2 text-sm">
            <span className="text-slate-500">Already a partner?</span>
            <button 
                onClick={onGoToLogin}
                className="text-[#0d9488] font-bold hover:underline"
            >
                Sign In to Account
            </button>
        </div>

        <div className="mb-8 text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Create Your Branded Assessment</h2>
            <p className="text-slate-500">
              Generate a unique version of the IAQ Assessment branded with your logo.
            </p>
        </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
                    placeholder="Acme Heating"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name Your Subdomain</label>
                  <div className="flex">
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-l-lg border border-slate-300 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
                        placeholder="acme"
                        value={formData.subdomain}
                        onChange={handleSubdomainChange}
                        maxLength={12}
                    />
                    <div className="bg-slate-100 border border-l-0 border-slate-300 text-slate-500 px-3 flex items-center rounded-r-lg text-sm">
                        .iaqaudit.com
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Max 12 characters. Alphanumeric only.</p>
                </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Business Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
                placeholder="contact@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
                        placeholder="********"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Re-submit Password</label>
                    <input
                        type="password"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
                        placeholder="********"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company Logo</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:bg-slate-50 transition-colors">
                <div className="space-y-1 text-center">
                  {logoFile ? (
                    <div className="relative">
                      <img src={logoFile} alt="Logo Preview" className="h-20 mx-auto object-contain mb-2" />
                      <button 
                        type="button" 
                        onClick={() => setLogoFile(null)}
                        className="text-xs text-red-500 underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-slate-600 justify-center">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#0d9488] hover:text-teal-600 focus-within:outline-none">
                          <span>Upload a file</span>
                          <input type="file" className="sr-only" accept="image/*" onChange={handleLogoUpload} />
                        </label>
                      </div>
                      <p className="text-xs text-slate-500">PNG, JPG, GIF up to 2MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !formData.companyName}
              className="w-full bg-[#1e3a5f] hover:bg-[#2d5485] text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Partner Account'}
            </button>
          </form>
      </div>
    </div>
  );
};
