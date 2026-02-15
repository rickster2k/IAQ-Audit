'use server'

import { getAdminDb } from '@/lib/services/firebaseAdmin'
import { Submission } from '@/lib/types'
import { applyPagination, buildPaginatedResult, DEFAULT_PAGE_SIZE, PaginatedResult } from '@/lib/utils/paginationUtils'

export async function getAuditSubmissionsPagination(
  pageSize: number = DEFAULT_PAGE_SIZE,
  cursorId?: string
): Promise<{ success: true } & PaginatedResult<Submission> | { success: false; error: string }> {
  try {
    const adminDb = getAdminDb()
    const baseQuery = adminDb.collection('submissions').orderBy('timestamp', 'desc')

    let cursorDoc = undefined
    if (cursorId) {
      const cursorSnap = await adminDb.collection('submissions').doc(cursorId).get()
      if (cursorSnap.exists) cursorDoc = cursorSnap
    }

    const query = applyPagination(baseQuery, pageSize, cursorDoc)
    const snapshot = await query.get()

    if (snapshot.empty) {
      return { success: false, error: 'No audit submissions found.' }
    }

    const result = buildPaginatedResult<Submission>(
      snapshot.docs,
      pageSize,
      (doc) => {
        const data = doc.data() as Submission
        return {
          ...data,
          id: doc.id,
        }
      }
    )

    return { success: true, ...result }
  } catch (error) {
    console.error('Error fetching audit submissions:', error)
    return { success: false, error: 'Failed to get audit submissions.' }
  }
}