'use server'

import { saveSubmission as saveToFirestore } from '@/lib/services/firestoreService'
import { Submission } from '@/lib/types'
import { updateReportsAndRiskScore } from './updateGlobalStats'

export async function saveSubmission(submission: Submission) {
  try {
    // Save submission to Firestore
    await saveToFirestore(submission)
    
    // Increment reports counter
    //await incrementGlobalStat('reports')
    await updateReportsAndRiskScore()
    // Update average score
    //await updateAverageScore(submission.result.score)
    
    return {
      success: true,
      submissionId: submission.id
    }
  } catch (error) {
    console.error('Error in saveSubmission action:', error)
    
    return {
      success: false,
      error: 'Failed to save submission. Please try again.'
    }
  }
}