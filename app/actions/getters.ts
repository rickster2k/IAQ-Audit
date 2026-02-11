'use server'

import { adminDb } from '@/lib/services/firebaseAdmin'
import { Announcement } from '@/lib/types'
import { Submission } from '@/lib/types'

export async function getAnnouncement() {
  try {
    const doc = await adminDb
      .collection('globalStats')
      .doc('stats')
      .get()

    if (!doc.exists) {
      return {
        success: false,
        error: 'Global stats not found.',
        announcement: null
      }
    }

    const globalStats = doc.data()
    const announcement = globalStats?.announcement as Announcement

    if (!announcement || !announcement.text) {
      return {
        success: false,
        error: 'No announcement available.',
        announcement: null
      }
    }

    return {
      success: true,
      announcement
    }
  } catch (error) {
    console.error('Error fetching announcement:', error)

    return {
      success: false,
      error: 'An error occurred while fetching the announcement.',
      announcement: null
    }
  }
}




export async function getFriends(reportId: string) {
  try {
    const normalizedReportId = reportId.trim().toUpperCase()

    // Query all submissions where referredBy equals the given reportId
    const snapshot = await adminDb
      .collection('submissions')
      .where('referredBy', '==', normalizedReportId)
      .get()

    if (snapshot.empty) {
      return {
        success: true,
        friends: [],
        count: 0
      }
    }

    // Map the documents to Submission objects
    const friends = snapshot.docs.map(doc => doc.data() as Submission)

    return {
      success: true,
      friends,
      count: friends.length
    }
  } catch (error) {
    console.error('Error fetching friends:', error)

    return {
      success: false,
      error: 'An error occurred while fetching referrals.',
      friends: [],
      count: 0
    }
  }
}