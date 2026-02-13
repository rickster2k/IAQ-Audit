// app/actions/getFirebaseToken.ts
'use server'

import { getAdminAuth } from '@/lib/services/firebaseAdmin'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function getFirebaseCustomToken() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return { success: false, error: 'Not authenticated' }
    }

    // Get or create Firebase user
    let firebaseUser
    try {
        const adminAuth = getAdminAuth()
      
        firebaseUser = await adminAuth.getUserByEmail(session.user.email)

        // Set admin claim if user is admin
        if (session.user.admin) {
        await adminAuth.setCustomUserClaims(firebaseUser.uid, {
            admin: true
        })
        }

        // Generate custom token
        const customToken = await adminAuth.createCustomToken(firebaseUser.uid)
        
        return {
            success: true,
            token: customToken
        }
    } catch (error) {
        // User doesn't exist in Firebase Auth, create them
        console.log(`User does not have the correct permissions`, error)
        return {
            success: false,
            error: 'Failed to create Firebase token'
        }
      
    }

    

    
  } catch (error) {
    console.error('Error creating Firebase custom token:', error)
    return {
      success: false,
      error: 'Failed to create Firebase token'
    }
  }
}