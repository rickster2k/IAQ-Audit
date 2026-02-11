'use client'

import { useEffect, useMemo, useState } from 'react'
import { GlobalStats, Submission, SupportSubmission } from '@/lib/types'
import AdminDashboardDisplay from './adminDashboardClient'
import AdminReportClient from './adminReportClient'
import AdminTabSelector from './adminTabSelector'
import AdminAuditTab from './adminAuditTab'
import AdminSettingsTab from './adminSettingsTab'
import AdminAnnouncementTab from './adminAnouncementTab'
import AdminSupportTab from './adminSupportTab'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { app } from '@/lib/services/firebase'
import { getFirebaseCustomToken } from '@/app/actions/getFirebaseAdminToken'

interface DashboardProps {
  submissions: Submission[],
  stats: GlobalStats,
  helpDeskList: SupportSubmission[],
}

export default function AdminDashboard({
  submissions,
  stats,
  helpDeskList
}: DashboardProps) {
  
  const [firebaseReady, setFirebaseReady] = useState(false)
  const [viewState, updateViewState] = useState<'audits'| 'support' | 'announcements' | 'settings'>('audits')
  const [submissionSelected, setSubmissionSelected] = useState<Submission | null>(null)

  const friendsOfSelected = useMemo(() => {
    if (!submissionSelected?.id) return []
    return submissions.filter(s => s.referredBy === submissionSelected.id)
  }, [submissionSelected, submissions])

  useEffect(() => {
    async function initFirebase() {
      try {
        const result = await getFirebaseCustomToken()
        
        if (result.success && result.token) {
          const auth = await getAuth(app)
          await signInWithCustomToken(auth, result.token)
          setFirebaseReady(true)
          console.log('Firebase Auth ready')
        }
      } catch (error) {
        console.error('Firebase auth error:', error)
      }
    }

    initFirebase()
  }, [])
  return (
    
    <div className='max-w-7xl mx-auto p-6 space-y-8'>
      <AdminDashboardDisplay stats={stats} submissions={submissions}/>
     
      <div className='flex flex-col'>
          <AdminTabSelector setter={(tab: string) => updateViewState(tab as 'audits'| 'support' | 'announcements' | 'settings')} activeTab={viewState} />

          {viewState === 'audits' && (<AdminAuditTab  submissions={submissions} submissionSelected={submissionSelected} setSubmissionSelected={setSubmissionSelected} announcement={stats.announcement} friendsOfSelected={friendsOfSelected}/>) }
          {viewState ==='settings' && (<AdminSettingsTab globalStats={stats}/>) }
          {viewState === 'announcements' && (<AdminAnnouncementTab globalStats={stats}/>)}
          {viewState === 'support' && (<AdminSupportTab helpDeskList={helpDeskList}/>)}

      </div>
      


    </div>
    
  )
}


