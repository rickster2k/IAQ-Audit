'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { getAdminStorage } from '@/lib/services/firebaseAdmin'

export async function getSignedPdfUrl(submissionId: string, fileName: string) {
  // Check admin session
  const session = await getServerSession(authOptions)
  const isAdmin = session?.user?.admin === true

  // Check user cookie
  let isValidUser = false
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('user-audit-token')
    if (token) {
      const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)
      await jwtVerify(token.value, secret)
      isValidUser = true
    }
  } catch {
    isValidUser = false
  }

  if (!isAdmin && !isValidUser) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    const bucket = getAdminStorage().bucket()
    const file = bucket.file(`premium-docs/${submissionId}/${fileName}`)

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 30 * 60 * 1000, // 30 minutes
    })

    return { success: true, url }
  } catch (err) {
    console.error('Failed to generate signed URL:', err)
    return { success: false, error: 'Failed to generate PDF link.' }
  }
}