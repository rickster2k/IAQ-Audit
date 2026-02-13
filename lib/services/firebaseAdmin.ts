// lib/services/firebaseAdmin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

// Lazy initialization - only runs when called, never at build time
function initializeFirebaseAdmin() {
  // Already initialized - return early
  if (getApps().length > 0) {
    return
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin credentials: FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY'
    )
  }

  initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, '\n'),
    }),
    storageBucket,
  })
}

// Functions instead of top-level exports
// Each function initializes Firebase Admin on demand
export function getAdminAuth() {
  initializeFirebaseAdmin()
  return getAuth()
}

export function getAdminDb() {
  initializeFirebaseAdmin()
  return getFirestore()
}

export function getAdminStorage() {
  initializeFirebaseAdmin()
  return getStorage()
}