
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';

interface HumanVerificationProps {
  onVerify: () => void;
}

export const HumanVerification: React.FC<HumanVerificationProps> = ({ onVerify }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const SLIDER_WIDTH = 300;
  const HANDLE_SIZE = 56;
  const MAX_POSITION = SLIDER_WIDTH - HANDLE_SIZE - 8; // 8px for padding

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isVerified) return;
    setIsDragging(true);
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || isVerified) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      let newPos = clientX - rect.left - HANDLE_SIZE / 2;
      newPos = Math.max(0, Math.min(newPos, MAX_POSITION));
      setPosition(newPos);

      if (newPos >= MAX_POSITION * 0.98) {
        setIsVerified(true);
        setIsDragging(false);
        setPosition(MAX_POSITION);
        setTimeout(onVerify, 800);
      }
    }
  };

  const handleEnd = () => {
    if (isVerified) return;
    setIsDragging(false);
    if (!isVerified) {
      setPosition(0);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);


  

  return (
    <div className="w-full max-w-md mx-auto fade-in">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 text-center">
        <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 transition-colors duration-500 ${isVerified ? 'text-green-500' : 'text-[#0d9488]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isVerified ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            )}
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-2">Security Verification</h2>
        <p className="text-slate-500 mb-8 text-sm">Please verify you are a human to start the IAQ Audit assessment.</p>

        {/* Custom Slider Component */}
        <div 
          ref={sliderRef}
          className="relative h-16 bg-slate-100 rounded-full border border-slate-200 p-1 mx-auto overflow-hidden select-none"
          style={{ width: SLIDER_WIDTH }}
        >
          {/* Progress Overlay */}
          <div 
            className="absolute left-0 top-0 h-full bg-teal-500/10 transition-all pointer-events-none"
            style={{ width: position + HANDLE_SIZE / 2 }}
          />
          
          {/* Label Text */}
          <div className={`absolute inset-0 flex items-center justify-center text-sm font-bold tracking-wide transition-opacity duration-300 ${isDragging ? 'opacity-20' : 'opacity-60'} ${isVerified ? 'text-green-600' : 'text-slate-400'}`}>
            {isVerified ? 'VERIFIED' : 'SLIDE TO START'}
          </div>

          {/* Draggable Handle */}
          <div
            ref={handleRef}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            className={`absolute top-1 left-1 h-14 w-14 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing transition-shadow shadow-md z-10 ${isVerified ? 'bg-green-500' : 'bg-[#0d9488]'} ${isDragging ? 'shadow-lg shadow-teal-500/20' : ''}`}
            style={{ 
              transform: `translateX(${position}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28), background-color 0.5s' 
            }}
          >
            {isVerified ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-slate-400 hover:text-[#1e3a5f] text-sm font-medium transition-colors"> Cancel and return home</Link>
        </div>
      </div>
    </div>
  );
};
