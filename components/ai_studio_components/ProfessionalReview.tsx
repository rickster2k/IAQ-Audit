'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Shop } from '@/lib/types';



const PROFILE_IMAGE = "https://i.postimg.cc/bw4T48HH/Profile.png";
const FALLBACK_IMAGE = "https://i.pravatar.cc/300?u=ericsnyder";

type ProfessionalReviewProps = {
  shop: Shop | undefined,
  isAdmin: boolean
}

export default function ProfessionalReview ({shop, isAdmin = false}: ProfessionalReviewProps ) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const pricePoint = '$'+ shop?.pricePoint || '$49'

  const handleOrder = () => {
    if (shop?.paymentUrl) {
      window.open(shop?.paymentUrl, '_blank');
    } else {
      alert("The ordering system is currently being configured by the administrator. Please check back soon or contact support@iaqaudit.com.");
    }
  };

  const benefits = [
    {
      title: "1. Personally & Professionally Reviewed",
      description: "Every IAQ Audit answer you provided is reviewed by a real IAQ industry professional who analyzes your specific responses and risk indicators.",
      color: "bg-blue-50 text-blue-600",
      hover: "group-hover:bg-blue-600"
    },
    {
      title: "2. Detailed Action Plan",
      description: "Specific steps you can take yourself to resolve identified issues and to maintain a healthy indoor environment affordably and effectively.",
      color: "bg-teal-50 text-teal-600",
      hover: "group-hover:bg-teal-600"
    },
    {
      title: "3. Product & Service Guidance",
      description: "Money-saving solutions and recommendations matching your specific conditions, habits, and systems.",
      color: "bg-orange-50 text-orange-600",
      hover: "group-hover:bg-orange-600"
    },
    {
      title: "4. Delivered as a Multi-page, Personalized PDF",
      description: "A clear, organized downloadable file posted directly to your IAQ Audit Report page within two business days. Comparable to an $300+ Onsite IAQ Consultation Service.",
      color: "bg-indigo-50 text-indigo-600",
      hover: "group-hover:bg-indigo-600"
    },
    {
      title: "5. Continuing Support",
      description: "Your Reviewer's contact info provided for follow-up questions and future guidance.",
      color: "bg-purple-50 text-purple-600",
      hover: "group-hover:bg-purple-600"
    },
    {
      title: "6. EXCLUSIVE BONUSES",
      description: "Free printable IAQ Maintenance Checklist and the Top 10 IAQ Mistakes Homeowners Make.",
      color: "bg-yellow-50 text-yellow-600",
      hover: "group-hover:bg-yellow-600"
    }
  ];

  const bonuses = [
    {
      title: "Printable Homeowner's IAQ Maintenance Checklist",
      description: "Monthly / seasonal IAQ tasks, reminders, and \"red flags\" to watch for.",
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "List of the Top 10 IAQ Mistakes Homeowners Make",
      description: "How to avoid the most common IAQ mistakes costing homeowners time, money, and peace of mind.",
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: "The HVAC 'Insider' Script",
      description: "A specialized guide on what to ask (and what to watch for) when hiring HVAC contractors or mold remediation experts.",
      icon: (
        <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    }
  ];

  const faqs = [
    {
      q: "How is a Personalized Review Report different from the free audit report?",
      a: "The free IAQ audit helps identify potential risk areas and provides general guidance. The personalized IAQ Action Plan goes deeper by having an IAQ industry professional review your specific responses, patterns, and risk indicators. The result is a clear, prioritized plan tailored to your home—rather than general recommendations meant for broad situations."
    },
    {
      q: "Is this report really reviewed by a person, or is it automated?",
      a: "Every personalized report is reviewed by an assigned IAQ industry professional. While your initial audit is automated, the premium report involves a human review of your data to ensure the recommendations make sense for your specific conditions, systems, and habits. This added layer helps prevent generic or unnecessary guidance."
    },
    {
      q: "Who exactly is providing me with my Personalized IAQ Review Report?",
      a: "The IAQ Audit app was designed and built by the founders and contributors of the IAQ Network, which is made of a collective of HVAC professionals, Indoor Environmental Hygienists (IEH), Home and mold inspectors, IAC2-certified consultants, and other IAQ-related professionals. Your personalized report will be assigned and reviewed by one of our many valued IAQ Network contributors."
    },
    {
      q: "How long until I see my Personalized Review Report?",
      a: "Since your current IAQ Audit Report will be personally reviewed by a real, IAQ Industry professional, your reviewer's turnaround time to put your personalized report together is two business days."
    },
    {
      q: "Is this a subscription?",
      a: "No. It's a one-time fee. Your personalized report will be accessible and downloadable from your IAQ Audit Report page at any time."
    },
    {
      q: "Will this report try to sell me products or services?",
      a: "No. The report is designed to educate and guide—not to sell. Any product or service recommendations are included only when relevant to your specific IAQ conditions, and you are never required to purchase anything. The goal is to help you make informed decisions, not push solutions you don’t need."
    },
    {
      q: "What if I already have an HVAC company?",
      a: "Perfect. This report helps you ask better questions and make informed decisions with the professionals you already trust."
    },
    {
      q: "I already have an air purifier (or modern HVAC system). Do I really need this?",
      a: "Possibly—but owning a purifier or modern HVAC system doesn't guarantee clean air. In fact, over 60% of homeowners use the wrong type of filter for their specific pollutants. This report analyzes your specific pollutant sources and tells you if your current equipment is working, or if you need to switch strategies to actually protect your family."
    },
    {
      q: "Is this report just going to tell me I need $10,000 in HVAC repairs?",
      a: "Absolutely not. While we flag major issues, our philosophy is 'Habits First, Purchases Second.' We focus on immediate, low-cost behavioral changes and affordable product solutions that make a massive difference. We show you how to optimize what you already have before suggesting any major upgrades."
    },
    {
      q: "Are you just trying to sell me expensive home services and equipment?",
      a: "No. We are independent IAQ auditors, not service & equipment salespeople. Our recommendations are unbiased and based on performance data. When we recommend a product or service, it’s because it is the best functional match for your specific home’s profile and your budget."
    },
    {
      q: "My home is very old (or brand new). Will this still work for me?",
      a: "Yes. The audit algorithm analyzes the 'Building Envelope' of all home types. The air quality risks in a drafty 1920s Victorian are completely different from a tightly sealed 2024 new build. Your customized plan accounts for your home's age, your HVAC type, and your local climate."
    },
    {
      q: "Why should I pay for this when the audit was free?",
      a: "Think of the free audit as a Check Engine Light—it alerts you that something is wrong. The Personalized Report is the Mechanic who tells you exactly how it needs to be fixed. An in-home inspection by a certified Environmental Hygienist typically costs $300 to $800. This report gives you the same level of diagnostic insight for a tiny fraction of the price."
    },
    {
      q: "What if I need professional help?",
      a: "The report flags when to bring in experts and gives you exact questions to ask them. You will also be provided with the contact info of your IAQ Audit Report reviewer for any follow-up questions."
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto fade-in p-6 bg-white rounded-3xl shadow-xl border border-slate-100 my-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
        <div className="flex items-center gap-3">
            <div className="bg-teal-50 p-2 rounded-lg text-[#0d9488]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#1e3a5f]">Your Personalized Professional Review</h1>
        </div>
        <Link
          href={isAdmin ? "/admin" : "/user/report"}
          className="text-slate-500 hover:text-[#1e3a5f] flex items-center gap-2 font-medium px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Report
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-[#1e3a5f] mb-6 leading-tight">
                Take the Guesswork Out of Fixing Your Home’s Air Quality Issues
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Your IAQ Audit Report provided the diagnosis—now get the prescription. Order your Personalized Home IAQ Review provided by a real indoor environmental industry professional.
            </p>
            
            <div className="space-y-8 mb-10">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-4 group">
                      <div className={`shrink-0 w-10 h-10 rounded-xl ${benefit.color} flex items-center justify-center font-black ${benefit.hover} group-hover:text-white transition-all shadow-sm`}>{i + 1}</div>
                      <div>
                          <h3 className="font-bold text-[#1e3a5f] text-lg leading-snug">{benefit.title}</h3>
                          <p className="text-sm text-slate-600 leading-relaxed mt-1">{benefit.description}</p>
                      </div>
                  </div>
                ))}
            </div>
        </div>

        <div className="flex flex-col">
          {/* Sales Card */}
          <div className="bg-[#1e3a5f] text-white px-8 py-6 lg:px-12 lg:py-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center border-4 border-white/5 h-fit mb-8">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[#0d9488] rounded-full blur-[80px] opacity-20"></div>
              
              <div className="relative z-10 text-center">
                  <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/10">
                      Premium Service
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black mb-3 tracking-tighter text-white">Get Your Detailed Review</h3>

                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 mb-8 text-left space-y-3 border border-white/10 shadow-inner">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                          <span className="text-slate-200 text-sm font-medium">Audit Data Analysis</span>
                          <span className="text-[#4ade80] text-sm font-bold">Included</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                          <span className="text-slate-200 text-sm font-medium">Personalized Action Plan</span>
                          <span className="text-[#4ade80] text-sm font-bold">Included</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                          <span className="text-slate-200 text-sm font-medium">Product Recommendations</span>
                          <span className="text-[#4ade80] text-sm font-bold">Included</span>
                      </div>
                      
                      {/* Price Section */}
                      <div className="flex justify-between items-center font-black text-xl pt-2 mt-2">
                          <span className="text-white">Total Value</span>
                          <span className="text-[#4ade80]">$300+</span>
                      </div>
                      <div className="flex justify-between items-center font-black text-3xl pt-1">
                          <span className="text-white">Our Price</span>
                          <span className="text-slate-400 line-through decoration-slate-400 decoration-4 ml-auto">$97</span>
                      </div>
                      <div className="flex justify-between items-center font-black text-3xl pt-1 text-white border-t border-white/10 mt-2">
                          <span className="text-sm uppercase tracking-[0.2em] text-slate-300">Today&lsquo;s Price</span>
                          <span className="text-[#4ade80]">{pricePoint}</span>
                      </div>
                  </div>

                  <button 
                      onClick={handleOrder}
                      className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white font-black py-4 px-8 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3 text-lg animate-cta-pulse"
                  >
                      Order Now
                  </button>
              </div>
          </div>
          
          {/* Founder Testimonial Block */}
          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 relative overflow-hidden flex flex-col items-center shadow-xl shadow-slate-200/50">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                <svg className="h-32 w-32 text-slate-900" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>

              <div className="flex flex-col items-center gap-4 mb-6 relative z-10">
                <div className="relative group">
                    <div className="absolute inset-0 bg-teal-500 blur-2xl opacity-10 rounded-full group-hover:opacity-20 transition-opacity"></div>
                    <Image 
                        src={PROFILE_IMAGE} 
                        alt="Eric Snyder"
                        width={128}
                        height={128}
                        className="w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-white relative z-10 bg-slate-100"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                        }}
                    />
                </div>
                <div className="text-center">
                    <span className="text-xl font-black text-[#1e3a5f] block">Eric Snyder</span>
                    <span className="text-[10px] font-bold text-[#0d9488] uppercase tracking-[0.2em] mt-1 block">IAQ Audit & IAQ Network Founder</span>
                </div>
              </div>

              <div className="relative z-10 max-w-sm">
                <p className="text-base text-slate-600 leading-relaxed italic text-center px-4">
                    &ldquo;I built this tool and created the personalized review service because I was tired of seeing families suffer from preventable air quality issues simply because professional testing and assessment services are too expensive. I’ve distilled years of field experience into this diagnostic tool and service.&ldquo;
                </p>
              </div>
          </div>
        </div>
      </div>

      {/* --- BONUSES SECTION --- */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Free With Your Order</span>
          <h2 className="text-3xl font-bold text-[#1e3a5f]">Exclusive Premium Bonuses</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {bonuses.map((bonus, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -mr-12 -mt-12 group-hover:bg-teal-50 transition-colors"></div>
              <div className="relative z-10">
                <div className="mb-6 bg-white w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  {bonus.icon}
                </div>
                <h3 className="font-bold text-[#1e3a5f] text-lg mb-3 leading-tight">{bonus.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{bonus.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- FAQ SECTION --- */}
      <div className="mb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Frequently Asked Questions</h2>
          <div className="h-1 w-16 bg-[#0d9488] mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all hover:border-[#0d9488]/30">
              <button 
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                className="w-full text-left px-8 py-5 flex justify-between items-center transition-colors group"
              >
                <span className="font-bold text-[#1e3a5f] group-hover:text-[#0d9488] transition-colors pr-8">{faq.q}</span>
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ${openFaqIndex === i ? 'bg-[#1e3a5f] text-white rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === i ? 'max-h-200 border-t border-slate-100' : 'max-h-0'}`}
              >
                <div className="px-8 py-6 text-slate-600 text-sm leading-relaxed bg-slate-50/50">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Footer CTA */}
      <div className="text-center pt-8 border-t border-slate-100 mt-12 flex flex-col items-center">
        <button 
          onClick={handleOrder}
          className="bg-[#0d9488] hover:bg-[#0f766e] text-white font-black py-4 px-12 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-[0.98] inline-block text-lg"
        >
          Secure My Personalized Review - {pricePoint}
        </button>
        <div className="mt-4 flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
            <svg className="w-4 h-4 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            SSL Secure Order Processing • 2-Day Turnaround
        </div>
      </div>
    </div>
  );
};
