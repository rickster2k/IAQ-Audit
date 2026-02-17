'use client'
import React, { useState } from 'react';
import { SupportSubmission } from '@/lib/types';
import Link from 'next/link';
import Slider from '../shared/slider';
import { addSupportRequest } from '@/app/actions/addSupportRequest';
import { toast } from 'sonner';



export default function ContactSupport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reportId: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);


  const subjects = [
    "Technical Issue With This Website",
    "Regarding My IAQ Audit Report",
    "Partnership/Sales Inquiry",
    "Other"
  ];
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) return;
    
    const request: SupportSubmission = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...formData,
      status: 'new'
    };

    const res = await addSupportRequest(request);
    if( res.success){
      toast.success("Your request has been submitted successfully!")
    }
    else{
      toast.error("It seems the website is having an issue. Please try again later.")
    }
    setIsSubmitted(true);
    
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto text-center bg-white p-10 rounded-3xl shadow-xl mt-10">
        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-4">Request Sent</h2>
        <p className="text-slate-600 mb-8">We will review your support ticket and respond via email within 2 business days.</p>
        <Link href="/" className="bg-[#1e3a5f] text-white py-3 px-8 rounded-xl">Return Home</Link >
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-2xl border my-10">
      <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">Contact Support</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <input type="text" required className="w-full p-3 border rounded-xl" placeholder="Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="email" required className="w-full p-3 border rounded-xl" placeholder="Email *" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <select required className="w-full p-3 border rounded-xl" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}>
          <option value="">Select a subject...</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <textarea required className="w-full h-32 p-3 border rounded-xl" placeholder="Message..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
        
        <Slider onVerify={() => {setIsVerified(true)}}/>

        <button type="submit" disabled={!isVerified} className={`w-full py-4 rounded-xl font-bold ${isVerified ? 'bg-[#1e3a5f] text-white' : 'bg-slate-200 text-slate-400'}`}>Submit Request</button>
      </form>
    </div>
  );
};