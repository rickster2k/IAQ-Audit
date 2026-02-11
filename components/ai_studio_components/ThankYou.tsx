
import { ContactInfo, Submission } from '@/lib/types';
import Link from 'next/link';

interface ThankYouProps {
  contact: ContactInfo,
  submission: Submission
}

export default function ThankYou({ contact, submission }:ThankYouProps)  {
  return (
    <div className="max-w-2xl mx-auto text-center fade-in bg-white p-10 rounded-3xl shadow-xl border border-slate-100 mt-10">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-3xl font-bold text-[#1e3a5f] mb-6">
        Audit Complete
      </h2>
      
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8 text-left">
        <p className="text-slate-700 text-lg leading-relaxed">
          Thanks <span className="font-bold">{contact.firstName}</span>. Your Audit Report has been generated and has been emailed as an attachment to: <span className="font-bold text-[#0d9488]">{contact.email}</span>
        </p>

         <div className="bg-white p-4 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-600 mb-2">Your Report ID:</p>
          <p className="text-2xl font-mono font-bold text-[#1e3a5f]">{submission.reportId}</p>
          <p className="text-xs text-slate-500 mt-2">Save this ID to access your report later</p>
        </div>
        <p className="text-slate-700 text-lg mt-6 italic leading-relaxed">
          <span className="text-red-600 font-bold underline mr-1">IMPORTANT:</span> If you don't see the report in your inbox, please check your spam folder or promotions folder.
        </p>
      </div>

      <div className="border-t border-slate-100 pt-8">
        <p className="text-slate-500 mb-4">
          Want to view your results immediately?
        </p>
        <Link href="/user/report" 
          className="bg-[#1e3a5f] hover:bg-[#2d5485] text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all transform hover:-translate-y-1"
        >
          View Report in Browser
        </Link>
      </div>
    </div>
  );
};
