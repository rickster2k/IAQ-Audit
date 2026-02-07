'use client'

import { useMemo, useState } from 'react'
import { GlobalStats, Submission, SupportSubmission } from '@/lib/types'
import AdminDashboardDisplay from './adminDashboardClient'
import AdminReportClient from './adminReportClient'
import AdminTabSelector from './adminTabSelector'
import AdminAuditTab from './adminAuditTab'
import AdminSettingsTab from './adminSettingsTab'
import AdminAnnouncementTab from './adminAnouncementTab'
import AdminSupportTab from './adminSupportTab'

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

  const [viewState, updateViewState] = useState<'audits'| 'support' | 'announcements' | 'settings'>('audits')


  const [submissionSelected, setSubmissionSelected] = useState<Submission | null>(null)

  const friendsOfSelected = useMemo(() => {
    if (!submissionSelected?.id) return []
    return submissions.filter(s => s.referredBy === submissionSelected.id)
  }, [submissionSelected, submissions])

  return (
    
    <div className='max-w-7xl mx-auto p-6 space-y-8'>
      <AdminDashboardDisplay stats={stats} submissions={submissions}/>
     
      <div className='flex flex-col'>
          <AdminTabSelector setter={(tab: string) => updateViewState(tab as 'audits'| 'support' | 'announcements' | 'settings')} activeTab={viewState} />

          {viewState === 'audits' && (<AdminAuditTab  submissions={submissions}/>) }
          {viewState ==='settings' && (<AdminSettingsTab globalStats={stats}/>) }
          {viewState === 'announcements' && (<AdminAnnouncementTab globalStats={stats}/>)}
          {viewState === 'support' && (<AdminSupportTab helpDeskList={helpDeskList}/>)}

      </div>
      


      
      { (
        submissionSelected ? (
          <AdminReportClient submission={submissionSelected} announcement={stats.announcement} friends={friendsOfSelected}/>
        ) : (
          <div className="p-6 text-center text-slate-500">
                    No report found.
          </div>
        )
      )}
    </div>
    
  )
}


