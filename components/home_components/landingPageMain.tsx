'use client'

import { incrementStarts, incrementVisits } from '@/app/actions/updateGlobalStats'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

interface LandingPageProps {
  reportCount?: number
}

export default function LandingPageMain({  reportCount = 0,}: LandingPageProps) {
  const baseCount = 53_221
  const totalReports = (baseCount + reportCount).toLocaleString()


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
  }, [])

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
              <span className="text-sm font-bold text-[#1e3a5f]">
                Excellent Global Reviews
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-[#1e3a5f] mb-4 tracking-tight leading-tight">
              Is Your Home&apos;s Air <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0d9488] to-cyan-600">
                Silently Harming Your Family?
              </span>
            </h1>

            <p className="text-base lg:text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Discover hidden pollutants, mold risks, and ventilation issues
              currently in your home in just 5 minutes.
            </p>

            <div className="flex flex-col items-center lg:items-start gap-4">
              
                <Link href="/audit" onClick={handleStartAudit} className="bg-[#0d9488] hover:bg-teal-700 text-white text-xl font-bold py-4 px-10 rounded-xl shadow-lg transition-transform hover:-translate-y-1">Start Free Audit</Link>
                <div className="text-[#1e3a5f] font-bold text-sm bg-blue-50 px-4 py-2 rounded-full border border-blue-100 inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                {totalReports} IAQ Audit Reports Generated Globally!
                </div>
            </div>
          </div>

          {/* Right preview card */}
          <div className="relative hidden lg:block bg-linear-to-br from-[#1e3a5f] to-[#162e4d] rounded-2xl p-8 shadow-2xl">
            <div className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-4">
              IAQ Health Score Preview
            </div>
            <div className="text-5xl font-bold text-white mb-2">
              45/100
            </div>
            <div className="text-slate-400 text-sm">
              Risk Assessment:{' '}
              <span className="text-orange-400 font-bold">Moderate</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
