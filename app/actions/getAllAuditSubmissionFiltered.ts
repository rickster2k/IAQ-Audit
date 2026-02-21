'use server'

import { getAdminDb } from '@/lib/services/firebaseAdmin'
import { AuditFilters, Submission } from '@/lib/types'

export async function getAllAuditSubmissionsFiltered(
  filters: AuditFilters
): Promise<{ success: true; data: Submission[] } | { success: false; error: string }> {
  try {
    const adminDb = getAdminDb()
    const { searchType, searchValue, riskLevel, dateFrom, dateTo } = filters
    const trimmed = searchValue.trim()

    // If no filters active, fetch everything
    if (!searchType) {
      const snapshot = await adminDb
        .collection('submissions')
        .orderBy('timestamp', 'desc')
        .get()

      const data = snapshot.docs.map(doc => ({
        ...(doc.data() as Submission),
        id: doc.id,
      }))

      return { success: true, data }
    }

    // Email filter
    if (searchType === 'email' && trimmed) {
      const snapshot = await adminDb
        .collection('submissions')
        .where('contact.email', '==', trimmed)
        .orderBy('timestamp', 'desc')
        .get()

      const data = snapshot.docs.map(doc => ({
        ...(doc.data() as Submission),
        id: doc.id,
      }))

      return { success: true, data }
    }

    // Report ID filter
    if (searchType === 'reportId' && trimmed) {
      const snapshot = await adminDb
        .collection('submissions')
        .where('reportId', '==', trimmed)
        .orderBy('timestamp', 'desc')
        .get()

      const data = snapshot.docs.map(doc => ({
        ...(doc.data() as Submission),
        id: doc.id,
      }))

      return { success: true, data }
    }

    // Risk level filter
    if (searchType === 'riskLevel' && riskLevel) {
      const snapshot = await adminDb
        .collection('submissions')
        .where('result.riskLevel', '==', riskLevel)
        .orderBy('timestamp', 'desc')
        .get()

      const data = snapshot.docs.map(doc => ({
        ...(doc.data() as Submission),
        id: doc.id,
      }))

      return { success: true, data }
    }

    // Date range filter
    if (searchType === 'dateRange') {
      let query: FirebaseFirestore.Query = adminDb
        .collection('submissions')
        .orderBy('timestamp', 'desc')

      if (dateFrom) {
        query = query.where('timestamp', '>=', dateFrom)
      }
      if (dateTo) {
        query = query.where('timestamp', '<=', dateTo + 'T23:59:59.999Z')
      }

      const snapshot = await query.get()
      const data = snapshot.docs.map(doc => ({
        ...(doc.data() as Submission),
        id: doc.id,
      }))

      return { success: true, data }
    }

    // Name filter - fetch both firstName and lastName matches, merge
    if (searchType === 'name' && trimmed) {
      const lower = trimmed.toLowerCase()

      const [firstSnap, lastSnap] = await Promise.all([
        adminDb
          .collection('submissions')
          .orderBy('contact.firstName')
          .startAt(lower)
          .endAt(lower + '\uf8ff')
          .get(),
        adminDb
          .collection('submissions')
          .orderBy('contact.lastName')
          .startAt(lower)
          .endAt(lower + '\uf8ff')
          .get(),
      ])

      const seen = new Set<string>()
      const merged: Submission[] = []

      for (const snap of [firstSnap, lastSnap]) {
        for (const doc of snap.docs) {
          if (!seen.has(doc.id)) {
            seen.add(doc.id)
            merged.push({ ...(doc.data() as Submission), id: doc.id })
          }
        }
      }

      merged.sort((a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )

      return { success: true, data: merged }
    }

    // Fallback: no valid filter
    return { success: false, error: 'Invalid filter configuration' }
  } catch (error) {
    console.error('Error fetching all filtered submissions:', error)
    return { success: false, error: 'Failed to fetch submissions for export' }
  }
}