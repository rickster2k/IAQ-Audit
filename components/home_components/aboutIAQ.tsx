import Link from "next/link";
import Image from "next/image";

const PROFILE_IMAGE = "https://i.postimg.cc/bw4T48HH/Profile.png";
const FALLBACK_IMAGE = "https://i.pravatar.cc/300?u=ericsnyder";
{/* About IAQ Audit Section */}
export default function AboutIAQ(){
    return (
      <section className="py-24 bg-[#1e3a5f] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0d9488] rounded-full blur-[120px] opacity-10 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-[120px] opacity-10 -ml-48 -mb-48"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-[#0d9488] text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                Expert-Led Development
              </div>
              <h2 className="text-4xl font-black mb-6 leading-tight">About the IAQ Audit</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                The IAQ Audit was developed by the <Link href='https://www.iaq.network' className="text-white font-bold">IAQ Network</Link>, a collective of HVAC professionals, Indoor Environmental Hygienists, and IAC2 Certified Consultants.
              </p>
              <p className="text-slate-400 text-base leading-relaxed mb-10">
                We realized that most homeowners have no way of knowing if their air is safe without spending thousands on professional testing. We built this logic-engine to bridge that gap, providing professional-grade insights at no cost.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="border-l-4 border-[#0d9488] pl-4">
                  <div className="text-2xl font-black text-white">IAC2</div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Certified Protocols</div>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <div className="text-2xl font-black text-white">Gemini 3</div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Powered Intelligence</div>
                </div>
              </div>

              <Link href='/audit' className="bg-white text-[#1e3a5f] font-black py-4 px-10 rounded-xl hover:bg-slate-100 transition-colors shadow-lg">
                Begin My Assessment
              </Link>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-1 rounded-3xl shadow-2xl">
              <div className="bg-white rounded-[1.4rem] p-8">
                 <div className="flex items-center gap-4 mb-8">
                  <Image 
                    src={PROFILE_IMAGE}
                    alt="Expert"
                    width={128}
                    height={128}
                    className="w-30 h-30 rounded-full object-cover shadow-2xl border-4 border-white relative z-10 bg-slate-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                    }} 
                  />
                    <div>
                      <div className="text-[#1e3a5f] font-bold text-lg leading-none">Eric Snyder</div>
                      <div className="text-[#0d9488] text-[10px] font-black uppercase tracking-widest mt-1">Founder, IAQ Network</div>
                    </div>
                 </div>
                 <blockquote className="text-[#1e3a5f] font-medium text-lg leading-relaxed italic mb-6">
                   &ldquo;Our goal is to put professional indoor air tools into the hands of every homeowner. You can&lsquo;t fix what you haven&lsquo;t identified.&quot;
                 </blockquote>
                 <div className="flex items-center gap-2">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-slate-400 text-xs ml-2 font-bold uppercase tracking-widest">Industry Veteran Verified</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}