'use client'

import { toast } from 'sonner';

interface ShareInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralUrl: string;
  inviteTextTop: string;
  inviteTextBottom: string;
  inviteLinkLabel: string;
  onCopySuccess: () => void;
  mode?: 'invite' | 'share';
  score?: number;
  riskLevel?: string;
}

export default function ShareInviteModal({
  isOpen,
  onClose,
  referralUrl,
  inviteTextTop,
  inviteTextBottom,
  inviteLinkLabel,
  onCopySuccess,
  mode = 'invite',
  score,
  riskLevel,
}: ShareInviteModalProps) {
  if (!isOpen) return null;

  const isShare = mode === 'share';

  const getFullMessage = () => {
    if (isShare) {
      return `I just completed my Indoor Air Quality Audit!\n\nMy Health Risk Score is ${score}/100 — Risk Level: ${riskLevel}.\n\n${inviteTextTop} ${inviteTextBottom}\n\n${inviteLinkLabel}\n${referralUrl}`;
    }
    return `${inviteTextTop}\n\n${inviteTextBottom}\n\n${inviteLinkLabel}\n${referralUrl}`;
  };

  const modalTitle = isShare ? 'Share Your Results' : 'Share Your Invitation';
  const modalSubtitle = isShare
    ? "Choose where you'd like to share your results:"
    : "Choose how you'd like to invite your friends:";
  const emailSubject = isShare
    ? 'My Home IAQ Audit Results'
    : "Check Your Home's Indoor Air Quality!";

  const handleShareViaGmail = () => {
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(getFullMessage());
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`,
      '_blank'
    );
    onClose();
  };

  const handleShareViaEmailClient = () => {
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(getFullMessage());
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    onClose();
  };

  const handleShareViaFacebook = () => {
    const url = encodeURIComponent(referralUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      '_blank',
      'width=600,height=400'
    );
    onClose();
  };

  const handleShareViaX = () => {
    const tweetText = isShare
      ? `I just took the IAQ Audit! My Health Risk Score is ${score}/100 (${riskLevel}). ${inviteTextBottom}`
      : `${inviteTextTop}\n\n${inviteTextBottom}\n\n${inviteLinkLabel}`;
    const text = encodeURIComponent(tweetText);
    const url = encodeURIComponent(referralUrl);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      '_blank',
      'width=600,height=400'
    );
    onClose();
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getFullMessage());
      onCopySuccess();
      toast.success(isShare ? 'Results copied to clipboard!' : 'Invitation copied to clipboard!');
    } catch {
      toast.error('Clipboard failed');
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 relative animate-fade-in">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold leading-none transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        <h3 className="text-lg font-bold text-[#1e3a5f] mb-1">{modalTitle}</h3>
        <p className="text-sm text-slate-500 mb-5">{modalSubtitle}</p>

        {/* Score badge — only in share mode */}
        {isShare && score !== undefined && riskLevel && (
          <div className="mb-5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="text-2xl font-black text-[#1e3a5f]">
              {score}
              <span className="text-sm font-semibold text-slate-400">/100</span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-sm font-semibold text-slate-600">
              Risk Level: <span className="text-[#1e3a5f] font-bold">{riskLevel}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">

          {/* Gmail */}
          <button
            onClick={handleShareViaGmail}
            className="flex items-center gap-3 bg-white border border-slate-200 hover:border-red-300 hover:bg-red-50 px-4 py-3 rounded-xl transition-all font-semibold text-slate-700 text-sm"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
              <path
                d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
                fill="#EA4335"
              />
            </svg>
            Share via Gmail
          </button>

          {/* Default Email Client */}
          <button
            onClick={handleShareViaEmailClient}
            className="flex items-center gap-3 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 px-4 py-3 rounded-xl transition-all font-semibold text-slate-700 text-sm"
          >
            <svg className="w-5 h-5 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Share via My Email App
          </button>

          {/* Facebook */}
          <button
            onClick={handleShareViaFacebook}
            className="flex items-center gap-3 bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50 px-4 py-3 rounded-xl transition-all font-semibold text-slate-700 text-sm"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
            </svg>
            Post to Facebook
          </button>

          {/* X / Twitter */}
          <button
            onClick={handleShareViaX}
            className="flex items-center gap-3 bg-white border border-slate-200 hover:border-slate-800 hover:bg-slate-50 px-4 py-3 rounded-xl transition-all font-semibold text-slate-700 text-sm"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Post to X (Twitter)
          </button>

          {/* Copy to Clipboard */}
          <button
            onClick={handleCopyToClipboard}
            className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 px-4 py-3 rounded-xl transition-all font-semibold text-slate-700 text-sm"
          >
            <svg className="w-5 h-5 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy to Clipboard
          </button>

        </div>
      </div>
    </div>
  );
}