
import React, { useState, useEffect } from 'react';
import { PartnerProfile } from '../types';

interface PartnerDashboardProps {
  partner: PartnerProfile;
  onLogout: () => void;
  onUpdatePartner: (updated: PartnerProfile) => void;
}

export const PartnerDashboard: React.FC<PartnerDashboardProps> = ({ partner, onLogout, onUpdatePartner }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PartnerProfile>(partner);
  const [logoPreview, setLogoPreview] = useState<string>(partner.logoData);
  const [copySuccess, setCopySuccess] = useState('');

  // Update local state if prop changes
  useEffect(() => {
    setFormData(partner);
    setLogoPreview(partner.logoData);
  }, [partner]);

  const brandedUrl = `${window.location.origin}?partner=${partner.slug}`;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setFormData(prev => ({ ...prev, logoData: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, API call here.
    // We pass it up to App.tsx to handle localStorage persistence
    onUpdatePartner(formData);
    setIsEditing(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(brandedUrl);
    setCopySuccess('Link copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto fade-in p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1e3a5f]">Partner Dashboard</h1>
          <p className="text-slate-500">Manage your branded IAQ Assessment portal</p>
        </div>
        <button 
          onClick={onLogout}
          className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* URL Card */}
        <div className="bg-[#1e3a5f] text-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-4">Your Branded Link</h2>
          <p className="text-slate-300 text-sm mb-6">
            Share this URL with your clients. Assessments completed via this link will display your branding.
          </p>
          
          <div className="bg-black/30 p-4 rounded-lg mb-4 break-all font-mono text-sm border border-white/10">
            {brandedUrl}
          </div>

          <button 
            onClick={copyLink}
            className="bg-[#0d9488] hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {copySuccess ? (
              <span>{copySuccess}</span>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Link
              </>
            )}
          </button>
        </div>

        {/* Preview Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 flex flex-col items-center justify-center text-center">
            <h3 className="text-slate-400 text-sm uppercase tracking-wider font-bold mb-6">Live Branding Preview</h3>
            
            {/* Header Mockup */}
            <div className="w-full border-b border-slate-100 pb-4 mb-4 flex items-center gap-3 justify-center">
                {logoPreview ? (
                   <img src={logoPreview} alt="Logo" className="h-10 object-contain" />
                ) : (
                   <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center text-slate-500 font-bold">?</div>
                )}
                <div className="text-left">
                    <div className="text-[10px] text-slate-400 uppercase">Powered By IAQ Audit</div>
                    <div className="font-bold text-[#1e3a5f] text-lg leading-none">{formData.companyName}</div>
                </div>
            </div>
            <p className="text-xs text-slate-400">This is how your header looks to clients.</p>
        </div>
      </div>

      {/* Account Details Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mt-8">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-[#1e3a5f]">Account Details</h2>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-[#0d9488] font-bold hover:underline"
            >
              Edit Profile
            </button>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
              <input
                type="text"
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subdomain / Slug</label>
              <input
                type="text"
                disabled
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-100 text-slate-500 cursor-not-allowed"
                value={formData.slug}
                title="Subdomain cannot be changed after creation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
               <input
                type="password"
                disabled={!isEditing}
                placeholder="********"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 disabled:bg-slate-50 disabled:text-slate-500 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          {isEditing && (
            <div className="border-t border-slate-100 pt-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Update Logo</label>
              <div className="flex items-center gap-4">
                 <input type="file" accept="image/*" onChange={handleLogoUpload} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-[#0d9488] hover:file:bg-teal-100" />
              </div>
            </div>
          )}

          {isEditing && (
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="bg-[#0d9488] hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(partner); // Revert
                  setLogoPreview(partner.logoData);
                }}
                className="bg-white border border-slate-300 text-slate-600 font-bold py-3 px-8 rounded-xl hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
