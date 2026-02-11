
'use server'

import { adminDb } from '@/lib/services/firebaseAdmin'
import { GlobalStats, Submission } from '@/lib/types'

export async function GetGlobalStats() {
  try {
    

    // Query all submissions where referredBy equals the given reportId
    const snapshot = await adminDb
        .collection('globalStats')
        .doc('stats')
        .get()

   
    if (!snapshot.exists) {
      return {
        success: false,
        error: 'Global stats not found.',
        announcement: null
      }
    }

    const globalStats:GlobalStats = snapshot.data() as GlobalStats

    
    return {
      success: true,
      globalStats: globalStats,
    }
  } catch (error) {
    console.error('Error fetching friends:', error)

    return {
      success: false,
      error: 'An error occurred while fetching submissions.',
      globalStats: null,
    }
  }
}


