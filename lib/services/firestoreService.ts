import { getAdminDb } from '@/lib/services/firebaseAdmin' 
import { Submission, SupportSubmission } from '@/lib/types'

/**
 * Save a submission to Firestore
 */
export async function saveSubmission(submission: Submission): Promise<void> {
  try {
    const adminDb = getAdminDb()
    await adminDb
      .collection('submissions')
      .doc(submission.id)
      .set(submission)
    
    console.log('Submission saved:', submission.id)
  } catch (error) {
    console.error('Error saving submission:', error)
    throw new Error('Failed to save submission')
  }
}

/**
 * Increment a global stat counter
 */
export async function incrementGlobalStat(
  statName: 'visits' | 'starts' | 'reports'
): Promise<void> {
  try {
    const adminDb = getAdminDb()
    const docRef = adminDb.collection('globalStats').doc('stats')
    
    // Get current value
    const doc = await docRef.get()
    
    if (!doc.exists) {
      // Initialize if doesn't exist
      await docRef.set({
        visits: statName === 'visits' ? 1 : 0,
        starts: statName === 'starts' ? 1 : 0,
        reports: statName === 'reports' ? 1 : 0,
        avgScore: 0
      })
    } else {
      // Increment the specific stat
      const currentValue = doc.data()?.[statName] || 0
      await docRef.update({
        [statName]: currentValue + 1
      })
    }
    
    console.log(`Incremented ${statName}`)
  } catch (error) {
    console.error('Error incrementing global stat:', error)
    throw new Error('Failed to increment global stat')
  }
}

/**
 * Update average score in global stats
 */
export async function updateAverageScore(newScore: number): Promise<void> {
  try {
    const adminDb = getAdminDb()
    const docRef = adminDb.collection('globalStats').doc('stats')
    const doc = await docRef.get()
    
    if (!doc.exists) {
      await docRef.set({
        visits: 0,
        starts: 0,
        reports: 1,
        avgScore: newScore
      })
      return
    }
    
    const data = doc.data()
    const currentAvg = data?.avgScore || 0
    const totalReports = data?.reports || 0
    
    // Calculate new average
    const newAvg = ((currentAvg * totalReports) + newScore) / (totalReports + 1)
    
    await docRef.update({
      avgScore: Math.round(newAvg * 10) / 10 // Round to 1 decimal
    })
    
    console.log('Updated average score:', newAvg)
  } catch (error) {
    console.error('Error updating average score:', error)
    throw new Error('Failed to update average score')
  }
}

/**
 * Save support ticket to Firestore
 */
export async function saveSupportTicket(ticket: SupportSubmission): Promise<void> {
  try {
    const adminDb = getAdminDb()
    await adminDb
      .collection('helpdesk')
      .doc(ticket.id)
      .set(ticket)
    
    console.log('Support ticket saved:', ticket.id)
  } catch (error) {
    console.error('Error saving support ticket:', error)
    throw new Error('Failed to save support ticket')
  }
}