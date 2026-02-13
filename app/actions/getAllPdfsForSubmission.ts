'use server'

import { getAdminStorage } from "@/lib/services/firebaseAdmin";



export async function getUploadedPdfsForSubmission(submissionId: string) {
    console.log("Searching for pdfs with submissionId: ", submissionId)
  try {
    const bucketName = process.env.FIREBASE_STORAGE_BUCKET;
    const adminStorage = getAdminStorage()
    const bucket = adminStorage.bucket(bucketName)
    const [files] = await bucket.getFiles({
      prefix: `premium-docs/${submissionId}/`,
    })

    // Generate signed URLs for each PDF
    const pdfs = await Promise.all(
      files
        .filter(file => file.name.endsWith('.pdf'))
        .map(async (file) => {
          // Generate a signed URL that expires in 1 hour
          const [signedUrl] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 60 * 60 * 1000, // 1 hour from now
          })

          return {
            name: file.name.split('/').pop() || '',
            url: signedUrl,
            uploadedAt: file.metadata.timeCreated,
          }
        })
    )

    console.log('Found PDFs:', pdfs.length)

    return {
      success: true,
      pdfs: pdfs
    }
  } catch (error) {
    console.error('Error fetching PDFs:', error)
    return {
      success: false,
      error: 'Failed to fetch PDFs',
      pdfs: []
    }
  }
}