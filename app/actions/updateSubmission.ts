'use server'

import { getAdminDb } from '@/lib/services/firebaseAdmin'

export async function updateSubmission(
  submissionId: string,
  pdfUrl: string,
  pdfName: string
) {
  try {
    const adminDb = getAdminDb()
    const submissionRef = adminDb.collection('submissions').doc(submissionId)
    
    await submissionRef.update({
      premiumDoc: {
        name: pdfName,
        url: pdfUrl
      }
    })

    return {
      success: true,
      message: 'PDF uploaded successfully'
    }
  } catch (error) {
    console.error('Error updating submission with PDF:', error)

    return {
      success: false,
      error: 'Failed to upload PDF. Please try again.'
    }
  }
}