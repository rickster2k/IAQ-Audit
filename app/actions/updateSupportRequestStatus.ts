'use server'

import { getAdminDb } from '@/lib/services/firebaseAdmin'

export async function updateSupportRequestStatus(id: string, status: string) {
  try {
    const adminDb = getAdminDb()
    const docRef = adminDb.collection('helpDesk').doc(id)
    const doc = await docRef.get()

    if (!doc.exists) {
      return {
        success: false,
        error: 'Support submission not found.',
      }
    }

    await docRef.update({ status })

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error updating support request status:', error)
    return {
      success: false,
      error: 'Failed to update support request status.',
    }
  }
}