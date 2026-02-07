import React, { useState, useEffect } from 'react';
import { Question, Option } from '../types.ts';

interface QuestionCardProps {
  question: Question;
  onAnswer: (value: string, label: string) => void;
  onBack: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, onBack }) => {
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    setTextValue('');
  }, [question.id]);

  const isTextType = question.type === 'text';

  const handleTextSubmit = () => {
    if (textValue.trim()) {
      onAnswer(textValue, textValue);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto fade-in">
      <h2 className="text-3xl font-bold text-[#1e3a5f] mb-2 leading-tight">
        {question.text}
      </h2>
      <p className="text-sm text-slate-500 mb-8 uppercase tracking-wide font-semibold">
        {question.category}
      </p>

      {isTextType ? (
        <div className="space-y-4">
          <div className="relative">
            <textarea
              autoFocus
              className="w-full h-40 p-5 rounded-xl border-2 border-slate-200 bg-white focus:border-[#0d9488] focus:ring-4 focus:ring-teal-50 outline-none transition-all duration-200 text-lg text-slate-700 resize-none"
              placeholder={question.placeholder || "Enter your concerns here..."}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value.slice(0, question.maxLength || 350))}
            />
            <div className="absolute bottom-4 right-4 text-xs font-bold text-slate-400">
              {textValue.length} / {question.maxLength || 350}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleTextSubmit}
              disabled={!textValue.trim()}
              className="bg-[#0d9488] hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:transform-none flex items-center gap-2"
            >
              Continue
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {question.options?.map((option: Option) => (
            <button
              key={option.value}
              onClick={() => onAnswer(option.value, option.label)}
              className="w-full text-left p-5 rounded-xl border-2 border-slate-200 bg-white hover:border-[#0d9488] hover:bg-teal-50 hover:shadow-md transition-all duration-200 group flex items-center justify-between"
            >
              <span className="text-lg font-medium text-slate-700 group-hover:text-[#0d9488]">
                {option.label}
              </span>
              <div className="h-6 w-6 rounded-full border-2 border-slate-300 group-hover:border-[#0d9488] flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-[#0d9488] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-400 hover:text-[#1e3a5f] transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-100"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go Back
        </button>
      </div>
    </div>
  );
};