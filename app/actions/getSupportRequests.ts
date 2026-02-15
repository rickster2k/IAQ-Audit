'use server'

import {  getAdminDb } from '@/lib/services/firebaseAdmin'
import { SupportSubmission } from '@/lib/types'

export async function getSupportRequest( ) {
  try {
    const adminDb = getAdminDb()
    const snapshot = await adminDb.collection('helpDesk').get()
    

    if (snapshot.empty) {
      return {
        success: false,
        error: 'Help Desk Submissions not found.',
      }
    }

    const helpDeskSubmissions: SupportSubmission[] = snapshot.docs.map(doc => {
        const data = doc.data() as SupportSubmission;
        return {
            ...data,
            id: doc.id,
        }
    })
    return {
      success: true,
      helpDeskSubmissions: helpDeskSubmissions,
    }
  } catch (error) {
    console.error('Error adding support request:', error)

    return {
      success: false,
      error: 'Failed to get help desk submissions',
    }
  }
}
