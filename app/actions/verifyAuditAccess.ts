'use server'

import { getAdminDb } from '@/lib/services/firebaseAdmin'
import { Submission } from '@/lib/types'

export async function verifyAuditAccess(email: string, reportId: string) {
  try {
    const normalizedEmail = email.trim()
    const normalizedReportId = reportId.trim().toUpperCase()


    console.log("Checking audit access for email:", normalizedEmail)
    console.log("normalizedReportId:", normalizedReportId)
    console.log("Checking Firestore for matching submission...")

    const adminDb = getAdminDb()
    
    const snapshot = await adminDb
      .collection('submissions')
      .where('contact.email', '==', normalizedEmail)
      .where('reportId', '==', normalizedReportId)
      .limit(1)
      .get()

    if (snapshot.empty) {
      return {
        success: false,
        error: 'Invalid Email or Report ID. Please check your details and try again.'
      }
    }

    const submission = snapshot.docs[0].data() as Submission

    return {
      success: true,
      submission
    }
  } catch (error) {
    console.error('Audit verification error:', error)

    return {
      success: false,
      error: 'An error occurred. Please try again later.'
    }
  }
}
