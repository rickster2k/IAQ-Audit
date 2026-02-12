'use server'

import { adminDb } from '@/lib/services/firebaseAdmin'
import { SupportSubmission } from '@/lib/types'

export async function addSupportRequest(  supportRequest: SupportSubmission) {
  try {
    const docRef = await adminDb.collection('helpDesk').add({
      ...supportRequest,
    })

    return {
      success: true,
      id: docRef.id,
    }
  } catch (error) {
    console.error('Error adding support request:', error)

    return {
      success: false,
      error: 'Failed to submit support request.',
    }
  }
}
