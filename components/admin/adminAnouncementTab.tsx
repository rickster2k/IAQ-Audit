'use client'

import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/services/firebase'
import { GlobalStats } from '@/lib/types'

interface AdminAnnouncementTabProps {
  globalStats: GlobalStats
}

export default function AdminAnnouncementTab({ globalStats }: AdminAnnouncementTabProps) {
  const [announcementText, setAnnouncementText] = useState(globalStats.announcement?.text || '')
  const [announcementUrl, setAnnouncementUrl] = useState(globalStats.announcement?.url || '')
  const [isSaving, setIsSaving] = useState(false)
  const [settingsSaved, setSettingsSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSettingsSaved(false)

    try {
      const statsRef = doc(db, 'globalStats', 'stats')

      // Update only the announcement field
      await updateDoc(statsRef, {
        'announcement.text': announcementText,
        'announcement.url': announcementUrl,
      })

      setSettingsSaved(true)
      setTimeout(() => setSettingsSaved(false), 3000)
    } catch (err) {
      console.error('Failed to save announcement:', err)
      setError('Failed to save announcement. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-[#1e3a5f]">Global Announcement</h2>

      <form onSubmit={handleSaveAnnouncement} className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2 text-slate-700">
            Announcement Text
          </label>
          <input
            type="text"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
            placeholder="Announcement text..."
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-slate-700">
            Link URL
          </label>
          <input
            type="url"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
            placeholder="https://example.com"
            value={announcementUrl}
            onChange={(e) => setAnnouncementUrl(e.target.value)}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSaving}
          className="bg-[#1e3a5f] hover:bg-[#2d5485] text-white px-8 py-3 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? 'Broadcasting...' : 'Broadcast'}
        </button>

        {settingsSaved && (
          <p className="text-green-600 font-bold mt-2 animate-fade-in">
            ✓ Announcement saved!
          </p>
        )}
      </form>
    </div>
  )
}
