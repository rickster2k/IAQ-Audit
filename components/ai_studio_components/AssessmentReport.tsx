'use client'
import { useState, useMemo } from 'react';
import { AssessmentResult, ContactInfo, Submission } from '@/lib/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { sectionExplanations } from '../data/sectionInfo';
import { FileText, ExternalLink } from 'lucide-react'

interface AssessmentReportProps {
  result: AssessmentResult;
  contact: ContactInfo;
  reportId: string;
  announcement: {text:string, url:string} | null;
  friends: Submission[];
  isDashboardView?: boolean;
  activeSubmission?: Submission | null;
}

export default function AssessmentReport({ 
  result, 
  contact, 
  reportId, 
  announcement,
  friends,
  isDashboardView = false,
  activeSubmission = null
}: AssessmentReportProps){ 
  const router = useRouter()
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const friendsAverageScore = useMemo(() => {
    if (friends.length === 0) return 0;
    const total = friends.reduce((sum, friend) => sum + friend.result.score, 0);
    return Math.round(total / friends.length);
  }, [friends]);

  const liveUrl = process.env.NEXT_PUBLIC_APP_URL;
  
  const referralUrl = `${liveUrl}?ref=${reportId}`;
  const inviteTextTop = `I was really surprised by the Health Risk Score I received for my home's indoor air quality after taking this online IAQ Audit!`;
  const inviteTextBottom = `I thought you might want to know your home's Health Risk Score too.`;
  const inviteLinkText = `Click Here to Find Out if Your Home's Indoor Air Quality is Healthy`;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600';
      case 'Moderate': return 'text-yellow-600';
      case 'High': return 'text-orange-600';
      case 'Severe': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  const getScoreColor = (score: number) => {
    if (score <= 19) return 'border-green-500 text-green-600';
    if (score <= 49) return 'border-yellow-500 text-yellow-600';
    if (score <= 79) return 'border-orange-500 text-orange-600';
    return 'border-red-500 text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score <= 19) return "Good";
    if (score <= 49) return "Fair";
    if (score <= 79) return "Poor";
    return "Hazardous";
  };

  const handleShare = async () => {
    const shareData = {
        title: 'IAQ Audit Results',
        text: `I just completed my Indoor Air Quality Audit! My Health Risk Score is ${result.score}/100 (${result.riskLevel}). Report ID: ${reportId}. See how your home compares:`,
        url: window.location.origin
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('Share failed', err);
        }
    } else {
        try {
            await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
            alert('Result summary copied to clipboard!');
        } catch (err) {
            console.error('Clipboard failed', err);
        }
    }
  };

  const scrollToFriends = () => {
    const element = document.getElementById('friends-scores-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInviteFriends = async () => {
    const fullMessage = `${inviteTextTop}\n\n${inviteTextBottom}\n\n${inviteLinkText}:\n${referralUrl}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'IAQ Audit Invitation',
          text: `${inviteTextTop}\n\n${inviteTextBottom}\n\n${inviteLinkText}:`,
          url: referralUrl
        });
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(fullMessage);
        setInviteSuccess(true);
        setTimeout(() => setInviteSuccess(false), 3000);
      } catch (err) {
        console.error('Clipboard failed', err);
      }
    }
  };

  const handleDownloadPremium = () => {
    if (!activeSubmission?.premiumDoc) return;
    window.open(activeSubmission.premiumDoc.url, '_blank');
  };

  const handleSignOut = () => {
    
      // Clear audit session
      sessionStorage.removeItem('audit')
      sessionStorage.removeItem('announcement')
      sessionStorage.removeItem('friends')
      
      // Dispatch custom event for other components
      window.dispatchEvent(new Event('audit-session-change'))
      
      // Redirect to home
      router.push('/')
  }
  

  return (
    <div className="w-full max-w-4xl mx-auto fade-in pb-12">
      <div className="text-center mb-10 relative flex flex-col items-center">
        <h1 className="text-4xl font-bold text-[#1e3a5f] mb-2">IAQ Audit Report</h1>
        <div className="flex flex-col items-center gap-1 mb-4">
            <p className="text-slate-500">Prepared for {contact.firstName} {contact.lastName} | {contact.email}</p>
            <div className="bg-slate-100 px-3 py-1 rounded-md border border-slate-200 mt-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Audit Report ID:</span>
                <span className="text-sm font-mono font-bold text-[#1e3a5f]">{reportId}</span>
            </div>

            {announcement && (
              <div className="mt-4 w-full max-w-xl animate-fade-in">
                <div className="bg-teal-50 border border-teal-200 px-6 py-4 rounded-2xl shadow-sm flex items-center gap-3 justify-center">
                  <div className="bg-[#0d9488] text-white p-1.5 rounded-full shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[9px] font-bold text-[#0d9488] uppercase tracking-[0.2em] mb-0.5">Special Announcement</span>
                    <a href={announcement.url} target="_blank" rel="noopener noreferrer" className="text-[#1e3a5f] font-bold underline decoration-[#0d9488] decoration-2 underline-offset-4 hover:text-teal-700 transition-all text-lg md:text-xl text-left">
                      {announcement.text}
                    </a>
                  </div>
                </div>
              </div>
            )}
        </div>
        
      </div>

      {activeSubmission?.premiumDoc && (
        <div className="mb-8 w-full animate-fade-in">
          <div className="bg-linear-to-r from-[#1e3a5f] to-[#162e4d] p-1 rounded-2xl shadow-xl">
            <div className="bg-white rounded-[0.9rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5 text-center md:text-left">
                <div className="bg-[#0d9488] p-3 rounded-xl shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="inline-block bg-teal-100 text-[#0d9488] text-[10px] font-black px-2 py-0.5 rounded-full mb-1 tracking-wider">NEW PREMIUM ANALYSIS</div>
                  <h3 className="text-xl font-bold text-[#1e3a5f]">A Professional Document is Ready</h3>
                  <p className="text-sm text-slate-500">Your custom Home IAQ Action Plan has been uploaded by our expert.</p>
                </div>
              </div>
              <button onClick={handleDownloadPremium} className="bg-[#1e3a5f] hover:bg-[#2d5485] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 shrink-0 group">
                <FileText className="w-4 h-4" />
                View Premium Report
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold text-slate-500 mb-2">Health Risk Score</h3>
          <div className={`w-32 h-32 rounded-full border-8 flex flex-col items-center justify-center ${getScoreColor(result.score)}`}>
            <span className="text-4xl font-bold">{result.score}</span>
            <span className="text-xs font-semibold uppercase">{getScoreLabel(result.score)}</span>
          </div>
          <p className="mt-4 text-xs text-slate-400">0 (Good) - 100 (Hazardous)</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-semibold text-slate-500 mb-2">Overall Risk Level</h3>
            <span className={`text-3xl font-bold ${getRiskColor(result.riskLevel)}`}>{result.riskLevel}</span>
            <p className="mt-4 text-xs text-slate-600 px-4 italic leading-relaxed">Based on documented contaminants and home habits.</p>
        </div>

        <div className="bg-[#1e3a5f] rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center text-center text-white animate-cta-pulse">
            <h3 className="text-lg font-semibold opacity-90 mb-4 px-2">Get a Detailed, Personalized Review Now</h3>
            <p className="text-sm opacity-80 mb-6">Your results indicate a detailed, personalized review from an indoor environmental professional could be beneficial.</p>
            <Link href="/user/review" className="bg-[#0d9488] hover:bg-teal-600 px-6 py-2 rounded-lg font-bold transition-colors w-full shadow-lg text-sm">
                Get Detailed Review
            </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 mb-10">
        <button onClick={handleShare} className="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-teal-700 text-white px-8 py-3 rounded-full text-sm font-bold transition-all shadow-lg hover:-translate-y-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share My Results
        </button>
        <button onClick={scrollToFriends} className="text-[#1e3a5f] hover:text-[#0d9488] text-xl md:text-2xl font-black flex items-center gap-3 transition-all hover:scale-105 animate-shake text-center px-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            CLICK HERE to Discover Your Friends Home Health Risk Scores 
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
        <h3 className="text-xl font-bold text-[#1e3a5f] mb-4 border-b pb-2">Professional Summary</h3>
        <p className="text-slate-700 leading-relaxed text-lg">{result.summary}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
        <h3 className="text-xl font-bold text-[#1e3a5f] mb-6 border-b pb-2">Critical Recommendations</h3>
        <ul className="space-y-4 mb-8">
            {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-teal-100 text-[#0d9488] flex items-center justify-center font-bold">{index + 1}</div>
                    <p className="text-slate-700 font-medium pt-1">{rec}</p>
                </li>
            ))}
        </ul>
        <div className="border-t border-slate-100 pt-8 flex justify-center">
            <Link href="/user/review" className="bg-[#0d9488] hover:bg-teal-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg transform transition hover:-translate-y-1 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Order Personalized Professional Review
            </Link>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 mb-12">
        <h3 className="text-xl font-bold text-[#1e3a5f] mb-6">Understanding Your Audit</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
            {sectionExplanations.map((section) => (
                <div key={section.id} className="bg-white p-5 rounded-lg shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-[#0d9488] font-bold text-lg">{section.id}.</span>
                        <h4 className="font-bold text-slate-800">{section.title}</h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{section.description}</p>
                </div>
            ))}
        </div>
        <div className="border-t border-slate-200 pt-10 flex flex-col items-center">
            <Link href="/user/review" className="bg-[#0d9488] hover:bg-teal-700 text-white font-bold py-4 px-12 rounded-xl shadow-xl transform transition hover:-translate-y-1 flex items-center gap-3 scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                Order Personalized Professional Review
            </Link>
        </div>
      </div>

      {/* --- VIRAL FRIENDS SECTION --- */}
      <div id="friends-scores-section" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 overflow-hidden relative scroll-mt-20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -mr-16 -mt-16 z-0"></div>
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-[#1e3a5f] mb-4 border-b pb-2 uppercase tracking-tight">Your Friends&lsquo; IAQ Audit Scores</h3>
          
          <p className="text-slate-600 leading-relaxed mb-10 text-lg">
            Help your friends and family realize the importance of their homes&lsquo; health. Click the button below to invite your friends to take the IAQ Audit. Once your friends&lsquo; IAQ Health Scores are generated, you&lsquo;ll see their collective scores here, so you can compare them to your score.
          </p>

          <div className="mb-4 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200 shadow-inner">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Your Score</p>
              <div className={`text-4xl font-black ${getScoreColor(result.score).split(' ')[1]}`}>{result.score}</div>
            </div>
            <div className="hidden md:block h-12 w-px bg-slate-200"></div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Friends&lsquo; Avg</p>
              <div className={`text-4xl font-black ${getScoreColor(friendsAverageScore).split(' ')[1]}`}>{friendsAverageScore}</div>
            </div>
            <div className="hidden md:block h-12 w-px bg-slate-200"></div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Friends Joined</p>
              <div className="text-4xl font-black text-[#1e3a5f]">{friends.length}</div>
            </div>
          </div>

          <div className="text-center mb-10">
            <span className="inline-block bg-[#0d9488]/10 text-[#0d9488] px-4 py-1.5 rounded-full font-black text-sm border border-[#0d9488]/20">
              {friends.length} friends&lsquo; scores counted so far
            </span>
          </div>

          <div className="mb-10 p-6 bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm relative group">
            <span className="absolute -top-3 left-6 bg-[#1e3a5f] px-3 py-1 text-[10px] font-black text-white rounded-full uppercase tracking-widest">Your Invitation Message Preview</span>
            <div className="text-base text-slate-700 space-y-4 pt-2">
              <p>{inviteTextTop}</p>
              <p>{inviteTextBottom}</p>
              <div className="pt-2">
                <a href={referralUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">
                  {inviteLinkText}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <button onClick={handleInviteFriends} className="bg-[#1e3a5f] hover:bg-[#2d5485] text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-3 group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Invite Your Friends to Take the Audit
            </button>
            {inviteSuccess && (
              <p className="mt-4 text-[#0d9488] font-bold animate-fade-in text-sm text-center">
                Invitation message & link copied to clipboard!
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        {!isDashboardView && <button onClick={handleSignOut} className='text-slate-500 hover:text-[#1e3a5f] underline transition-colors'>Start New Audit (Warning Will Sign Out of Current Audit)</button>}
        {/*isDashboardView ? (<Link href="/admin" className='text-slate-500 hover:text-[#1e3a5f] underline transition-colors' >Back to Admin Dashboard </Link> ) : ( <button onClick={handleSignOut} className='text-slate-500 hover:text-[#1e3a5f] underline transition-colors'>Start New Audit (Warning Will Sign Out of Current Audit)</button>) */}
      </div>
    </div>
  );
};