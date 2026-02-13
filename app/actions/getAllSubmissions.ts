
'use server'

import { getAdminDb } from '@/lib/services/firebaseAdmin'
import { Submission } from '@/lib/types'

export async function getAllSubmissions() {
  try {
    const adminDb = getAdminDb()

    // Query all submissions where referredBy equals the given reportId
    const snapshot = await adminDb
        .collection('submissions')
        .get()

    if (snapshot.empty) {
        return {
            success: false,
            error: 'An error occurred while fetching submissions.',
            submissions: [],
            count: 0
        }
    }

    // Map the documents to Submission objects
    const submissions:Submission[] = snapshot.docs.map(doc => doc.data() as Submission)

    return {
      success: true,
      submissions: submissions,
      count: submissions.length
    }
  } catch (error) {
    console.error('Error fetching friends:', error)

    return {
      success: false,
      error: 'An error occurred while fetching submissions.',
      submissions: [],
      count: 0
    }
  }
}