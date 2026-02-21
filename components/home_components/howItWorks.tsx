import Link from "next/link";


export function HowItWorks() {
  return (
    <section className="py-12 bg-white px-3">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-5xl font-black text-[#1e3a5f] mb-4">How It Works</h2>
          <p className="text-slate-500 font-medium">Simple, Scientific, and 100% Free.</p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            <div className="bg-white flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-xl border-8 border-white">1</div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">Complete the Audit</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Answer 60+ targeted questions about your home environment, habits, and systems.</p>
            </div>

            <div className="bg-white flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#0d9488] text-white rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-xl border-8 border-white">2</div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">Gemini AI Analysis</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Our advanced AI cross-references your data with industry health standards to find hidden risks.</p>
            </div>

            <div className="bg-white flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-xl border-8 border-white">3</div>
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">Get Your Action Plan</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Receive a Health Risk Score and a professional recommendation list instantly.</p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <Link
                href='/audit' className="bg-[#1e3a5f] hover:bg-[#2d5485] text-white text-xl font-bold py-4 px-12 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            Start My Home Audit Now
          </Link>
        </div>
      </div>
    </section>
  );
}