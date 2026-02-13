// app/actions/updateAnnouncement.ts
'use server'

import { getAdminDb } from '@/lib/services/firebaseAdmin'

export async function updateAnnouncement(text: string, url: string) {
  try {
    const adminDb = getAdminDb()
    const statsRef = adminDb.collection('globalStats').doc('stats')
    
    await statsRef.update({
      'announcement.text': text,
      'announcement.url': url,
    })

    return {
      success: true,
      message: 'Announcement updated successfully'
    }
  } catch (error) {
    console.error('Error updating announcement:', error)
    
    return {
      success: false,
      error: 'Failed to update announcement. Please try again.'
    }
  }
}