'use client'

import { incrementStarts, incrementVisits } from '@/app/actions/updateGlobalStats'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import WhyIAQMatters from './whyIAQMatters'
import { HowItWorks } from './howItWorks'
import AboutIAQ from './aboutIAQ'
import { useSearchParams } from 'next/navigation'
import IAQHeroGraphic from './IAQHeroGraphic'

interface LandingPageProps {
  reportCount?: number
}

export default function LandingPageMain({  reportCount = 0,}: LandingPageProps) {
  const searchParams = useSearchParams()

  const baseCount:number = 53221
  const totalReports = (baseCount + reportCount)


  const avatars = [
    'https://i.pravatar.cc/150?u=iaq1',
    'https://i.pravatar.cc/150?u=iaq2',
    'https://i.pravatar.cc/150?u=iaq3',
    'https://i.pravatar.cc/150?u=iaq4',
    'https://i.pravatar.cc/150?u=iaq5',
  ]


  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited')

    if (!hasVisited) {
      incrementVisits()
      sessionStorage.setItem('hasVisited', 'true')
    }

    const ref = searchParams.get('ref')
    if (ref) sessionStorage.setItem('referredBy', ref)

  }, [searchParams])

  const handleStartAudit = async () => {
    await incrementStarts()
  }

  return (
    <div className="w-full fade-in">
      <section className="relative overflow-hidden bg-white pt-10 pb-12 lg:pt-16 lg:pb-20 px-6">
        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-[#0d9488] font-bold text-xs uppercase tracking-widest mb-4">
              Professional Grade Audit
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
              <div className="flex -space-x-3">
                {avatars.map((url, i) => (
                  <Image
                    key={i}
                    src={url}
                    alt="User avatar"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white shadow-sm"
                  />
                ))}
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                  <span className="text-sm font-bold text-[#1e3a5f]"> Excellent Global Reviews </span>
                  <div className='flex flex-row'>
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
              </div>
              
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-[#1e3a5f] mb-4 tracking-tight leading-tight">
              Is Your Home&apos;s Air <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0d9488] to-cyan-600">
                Silently Harming Your Family?
              </span>
            </h1>

            <p className="text-base lg:text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Discover hidden pollutants, mold risks, and ventilation issues affecting your home&lsquo;s air
              - in just 5 minutes. Get your personalized home health and risk score plus expert recommendations delivered instantly.
            </p>

            <div className="flex flex-col items-center lg:items-start gap-4">
              
                <Link href="/audit" onClick={handleStartAudit} className="bg-[#0d9488] hover:bg-teal-700 text-white text-xl font-bold py-4 px-10 rounded-xl shadow-lg transition-transform hover:-translate-y-1">Start Free Audit</Link>
                <p className='text-slate-600'> 100% Free service. No credit card required</p>
                <div className="text-[#1e3a5f] font-bold text-sm bg-blue-50 px-4 py-2 rounded-full border border-blue-100 inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                  10,000+ IAQ Audit Reports Generated Daily!
                </div>
            </div>
          </div>

          {/* Right preview card */}
         < IAQHeroGraphic />

        </div>
      </section>

      <WhyIAQMatters />
      <HowItWorks />
      <AboutIAQ/>
    </div>
  )
}
