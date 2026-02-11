'use client'

import React, { useState } from 'react'
import { verifyAuditAccess } from '@/app/actions/verifyAuditAccess'
import Link from 'next/link'
import { getAnnouncement, getFriends } from '@/app/actions/getters'
import { Announcement, Submission } from '@/lib/types'
import { useRouter } from 'next/navigation'



export default function UserLogin() {
  const [email, setEmail] = useState('')
  const [reportId, setReportId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Call server action to verify access
      const result = await verifyAuditAccess(email, reportId)

      const announcementResponse = await getAnnouncement()

      const friendsResponse = await getFriends(reportId)

      if(announcementResponse.error){
        setError("Error: No announcement found for this report ID.")
      }
      if(friendsResponse.error){
        setError("Error: No announcement found for this report ID.")
      }

      let announcement: Announcement | null  = null
      let friends: Submission[] = []


      if(announcementResponse.success ) {
        announcement = announcementResponse.announcement
      }
      if (friendsResponse.success){
        friends = friendsResponse.friends
      }

      
      if (result.success && result.submission) {
        // Store in sessionStorage (cleared when browser closes)
        sessionStorage.setItem('audit', JSON.stringify(result.submission))
        sessionStorage.setItem('anouncement', JSON.stringify(announcement))
        sessionStorage.setItem('friends', JSON.stringify(friends))

        // Notify header about session change
        window.dispatchEvent(new Event('audit-session-change'))
        // Call user/report
        //onLoginSuccess(result.submission)
        //changeState("report")
        router.push('/user/report')
      } else {
        setError(result.error || 'An error occurred. Please try again.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto fade-in bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 mt-10">
      <div className="w-16 h-16 bg-[#0d9488] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-[#1e3a5f] text-center mb-2">Sign In to Your Audit</h2>
      <p className="text-slate-500 text-center mb-8 text-sm">Access your active IAQ Audit Report instantly.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
          <input
            type="email"
            required
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Audit Report ID #</label>
          <input
            type="text"
            required
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0d9488] focus:border-transparent outline-none transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="IAQ-XXXXXX"
            value={reportId}
            onChange={(e) => setReportId(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0d9488] hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Verifying...' : 'View My Report'}
        </button>

        <div className="text-center pt-2">
          <Link 
            href="/user/recovery"
            className={`text-sm font-bold text-[#1e3a5f] hover:text-[#0d9488] underline transition-colors ${loading ? 'opacity-50 pointer-events-none' : ''}'} `}
          >
            Recover Your Audit ID #
          </Link>
        </div>
      </form>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className={`text-sm font-medium underline ${loading ? 'opacity-50 pointer-events-none' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Cancel and return home
        </Link>
      </div>
    </div>
  )
}