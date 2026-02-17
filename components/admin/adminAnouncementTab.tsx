'use client'

import { useState } from 'react'
import { GlobalStats } from '@/lib/types'
import { updateAnnouncement } from '@/app/actions/updateAnouncement'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface AdminAnnouncementTabProps {
  globalStats: GlobalStats
}

export default function AdminAnnouncementTab({ globalStats }: AdminAnnouncementTabProps) {
  const [announcementText, setAnnouncementText] = useState(globalStats.announcement?.text || '')
  const [announcementUrl, setAnnouncementUrl] = useState(globalStats.announcement?.url || '')
  const [saving, setSaving] = useState(false)
  const router = useRouter() 


  const handleSave = async () => {
    setSaving(true)
    
    const result = await updateAnnouncement(announcementText, announcementUrl)
    
    if (result.success) {
      toast.success('Announcement updated successfully!')
      router.refresh() 
    } else {
      toast.error(result.error || 'Failed to update announcement')
    }
    
    setSaving(false)
  }

  const resetAnnouncement = async () => {
      setSaving(true)
      
      // Call the server action directly with empty strings
      const result = await updateAnnouncement("", "")
      
      if (result.success) {
        // Then update the local state
        setAnnouncementText("")
        setAnnouncementUrl("")
        toast.success('Announcement reset successfully!')
        router.refresh()
      } else {
        toast.error(result.error || 'Failed to reset announcement')
      }
      
      setSaving(false)
  }

  return (
   <div className="bg-white rounded-2xl shadow-lg border p-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-[#1e3a5f]">Global Announcement</h2>

      
    
    <div className='flex flex-col gap-4'>
        <input
          type="text"
          value={announcementText}
          className='w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0d9488] focus:border-transparent'
          onChange={(e) => setAnnouncementText(e.target.value)}
          placeholder="Announcement text" />
        <input
          type="url"
          value={announcementUrl}
          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
          onChange={(e) => setAnnouncementUrl(e.target.value)}
          placeholder="Announcement URL" />
        <button onClick={handleSave} disabled={saving} className='bg-[#1e3a5f] hover:bg-[#2d5485] text-white px-8 py-3 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
          {saving ? 'Saving...' : 'Update Announcement'}
        </button>

        <button 
            onClick={resetAnnouncement} 
            disabled={saving} 
            className='bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Reset
          </button>
    </div>

    </div>
      
       
  )
}
