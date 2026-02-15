'use server'

import { getAdminDb } from '@/lib/services/firebaseAdmin'

export async function deleteSupportRequest(id: string) {
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

    await docRef.delete()

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error deleting support request:', error)
    return {
      success: false,
      error: 'Failed to delete support request.',
    }
  }
}