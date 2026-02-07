'use client'
import { useState, useRef, useEffect } from "react";


type SliderProps = {
    onVerify: () => void,
    sliderWidth?: number,
    handleSize?: number,
    maxPosition?: number,
}
export default function Slider({onVerify,sliderWidth=300,handleSize=56}: SliderProps){
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(0);
    const [isVerified, setIsVerified] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);

    //const sliderWidth = 300;
    //const handleSize = 56;
    const MAX_POSITION = sliderWidth - handleSize - 8; // 8px for padding

    const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isVerified) return;
    setIsDragging(true);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || isVerified) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    if (sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        let newPos = clientX - rect.left - handleSize / 2;
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
        <>
        {/* Custom Slider Component */}
        <div 
          ref={sliderRef}
          className="relative h-16 bg-slate-100 rounded-full border border-slate-200 p-1 mx-auto overflow-hidden select-none"
          style={{ width: sliderWidth }}
        >
          {/* Progress Overlay */}
          <div className="absolute left-0 top-0 h-full bg-teal-500/10 transition-all pointer-events-none"
            style={{ width: position + handleSize / 2 }} />
            
         
          
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
        </>
    )
}