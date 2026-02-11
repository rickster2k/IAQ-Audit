'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAnnouncement, getFriends } from '@/app/actions/getters'
import UserAssessmentReport from "@/components/user/userAssessmentReport"
import { Announcement, Submission } from "@/lib/types"

export default function UserReportClient() {
  const router = useRouter()
  const [auditData, setAuditData] = useState<Submission | null>(null)
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [friends, setFriends] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      // Get audit from sessionStorage (doesn't change often)
      const storedAudit = sessionStorage.getItem('audit')
      
      if (!storedAudit) {
        router.push('/user/login')
        return
      }

      const audit = JSON.parse(storedAudit)
      setAuditData(audit)

      // Fetch fresh announcement and friends from database
      const [announcementRes, friendsRes] = await Promise.all([
        getAnnouncement(),
        getFriends(audit.reportId)
      ])

      if (announcementRes.success) {
        setAnnouncement(announcementRes.announcement)
      }

      if (friendsRes.success) {
        setFriends(friendsRes.friends)
      }

      setLoading(false)
    }

    loadData()
  }, [router])

  if (loading) {
    return (
      <div className="p-6 w-full flex items-center justify-center">
        <p>Loading your report...</p>
      </div>
    )
  }

  if (!auditData) return null

  return (
    <div className="p-6 w-full">
      <UserAssessmentReport 
        submission={auditData} 
        announcement={announcement} 
        friends={friends}
      />
    </div>
  )
}