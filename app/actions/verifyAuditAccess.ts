'use server'

import { getAdminDb } from '@/lib/services/firebaseAdmin'
import { Submission } from '@/lib/types'
import { cookies } from 'next/headers'
import { SignJWT } from 'jose'
export async function verifyAuditAccess(email: string, reportId: string) {
  try {
    const normalizedEmail = email.trim()
    const normalizedReportId = reportId.trim().toUpperCase()


    //console.log("Checking audit access for email:", normalizedEmail)
    //console.log("normalizedReportId:", normalizedReportId)
    //console.log("Checking Firestore for matching submission...")

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

    // Create short lived token
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)
    const token = await new SignJWT({ reportId: submission.reportId, email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('2h')
      .sign(secret)

    const cookieStore = await cookies()
      cookieStore.set('user-audit-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 2, // 2 hours
        path: '/',
    })
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
