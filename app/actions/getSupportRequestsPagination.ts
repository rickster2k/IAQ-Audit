'use server'

import { getAdminDb } from '@/lib/services/firebaseAdmin'
import { SupportSubmission } from '@/lib/types'
import { applyPagination, buildPaginatedResult, DEFAULT_PAGE_SIZE, PaginatedResult } from '@/lib/utils/paginationUtils'

export async function getSupportRequestsPagination(
  pageSize: number = DEFAULT_PAGE_SIZE,
  cursorId?: string
): Promise<{ success: true } & PaginatedResult<SupportSubmission> | { success: false; error: string }> {
  try {
    const adminDb = getAdminDb()

    // First, check what a raw document looks like to verify field names
    /*const sampleSnap = await adminDb.collection('helpDesk').limit(1).get()
    if (!sampleSnap.empty) {
      console.log('Sample doc fields:', Object.keys(sampleSnap.docs[0].data()))
      console.log('Sample doc data:', sampleSnap.docs[0].data())
    } else {
      console.log('Collection is empty or does not exist')
    }*/

    // Use a simple query first without orderBy to confirm data exists
    const baseQuery = adminDb.collection('helpDesk').orderBy('timestamp', 'desc')

    let cursorDoc = undefined
    if (cursorId) {
      const cursorSnap = await adminDb.collection('helpDesk').doc(cursorId).get()
      if (cursorSnap.exists) cursorDoc = cursorSnap
    }

    const query = applyPagination(baseQuery, pageSize, cursorDoc)
    const snapshot = await query.get()

    if (snapshot.empty) {
      return { success: false, error: 'No help desk submissions found.' }
    }

    const result = buildPaginatedResult<SupportSubmission>(
      snapshot.docs,
      pageSize,
      (doc) => ({ ...(doc.data() as SupportSubmission), id: doc.id })
    )

    return { success: true, ...result }
  } catch (error) {
    console.error('Error fetching support requests:', error)
    return { success: false, error: 'Failed to get help desk submissions.' }
  }
}