           {/* Why IAQ Matters Section */}
export default function WhyIAQMatters() {

    return (
      <section className="py-20 bg-slate-50 border-y border-slate-200 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-[#1e3a5f] mb-4 uppercase tracking-tight">Why Indoor Air Quality Matters</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
              The EPA reports that indoor air can be <span className="text-[#1e3a5f] font-bold">2 to 5 times more polluted</span> than outdoor air. Since most people spend 90% of their time indoors, IAQ is the single most important factor for long-term health.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow group">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">Health & Respiratory</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Poor IAQ is a leading trigger for asthma, chronic allergies, and persistent coughs, especially in children and the elderly.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow group">
              <div className="w-16 h-16 bg-blue-100 text-[#1e3a5f] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#1e3a5f] group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">Cognitive Function</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                High CO2 levels and VOCs can decrease productivity, impair decision-making, and cause "Brain Fog" and fatigue during the day.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow group">
              <div className="w-16 h-16 bg-teal-100 text-[#0d9488] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#0d9488] group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">Long-term Safety</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Unseen hazards like Radon and invisible mold spores are linked to serious long-term health complications if left unaddressed.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
}
