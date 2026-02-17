'use server'

import { getAdminDb } from '@/lib/services/firebaseAdmin'
import { AuditFilters, Submission } from '@/lib/types'
import { applyPagination, buildPaginatedResult, DEFAULT_PAGE_SIZE, PaginatedResult } from '@/lib/utils/paginationUtils'


export async function getAuditSubmissionsFiltered(  filters: AuditFilters,  pageSize: number = DEFAULT_PAGE_SIZE,  cursorId?: string): Promise<{ success: true } & PaginatedResult<Submission> | { success: false; error: string }> {
  try {
    const adminDb = getAdminDb()
    let baseQuery: FirebaseFirestore.Query = adminDb
      .collection('submissions')
      .orderBy('timestamp', 'desc')

    const { searchType, searchValue, riskLevel, dateFrom, dateTo } = filters
    const trimmed = searchValue.trim()

    // Apply Firestore-side filters based on searchType
    if (searchType === 'email' && trimmed) {
      // Exact match on contact.email
      baseQuery = adminDb
        .collection('submissions')
        .where('contact.email', '==', trimmed)
        .orderBy('timestamp', 'desc')

    } else if (searchType === 'reportId' && trimmed) {
      // Exact match on reportId
      baseQuery = adminDb
        .collection('submissions')
        .where('reportId', '==', trimmed)
        .orderBy('timestamp', 'desc')

    } else if (searchType === 'riskLevel' && riskLevel) {
      // Exact match on result.riskLevel
      baseQuery = adminDb
        .collection('submissions')
        .where('result.riskLevel', '==', riskLevel)
        .orderBy('timestamp', 'desc')

    } else if (searchType === 'dateRange') {
      // Range filter on timestamp ISO string
      // YYYY-MM-DD strings sort correctly lexicographically
      if (dateFrom) {
        baseQuery = baseQuery.where('timestamp', '>=', dateFrom)
      }
      if (dateTo) {
        // Include the full "to" day by appending end-of-day marker
        baseQuery = baseQuery.where('timestamp', '<=', dateTo + 'T23:59:59.999Z')
      }

    } 
    else if (searchType === 'name' && trimmed) {
        const lower = trimmed.toLowerCase()

        // Run both queries in parallel
        const [firstSnap, lastSnap] = await Promise.all([
            adminDb.collection('submissions')
            .orderBy('contact.firstName')
            .startAt(lower)
            .endAt(lower + '\uf8ff')
            .limit(pageSize + 1)
            .get(),
            adminDb.collection('submissions')
            .orderBy('contact.lastName')
            .startAt(lower)
            .endAt(lower + '\uf8ff')
            .limit(pageSize + 1)
            .get(),
        ])

        // Merge, deduplicate by id, sort by timestamp desc
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

        // Manual pagination
        const startIndex = cursorId
            ? merged.findIndex(s => s.id === cursorId) + 1
            : 0
        const page = merged.slice(startIndex, startIndex + pageSize)

        return {
            success: true,
            data: page,
            nextCursor: page.length === pageSize ? page[page.length - 1].id : null,
            hasMore: startIndex + pageSize < merged.length,
        }
    }
    

    // Resolve cursor doc
    let cursorDoc: FirebaseFirestore.DocumentSnapshot | undefined = undefined
    if (cursorId) {
      const cursorSnap = await adminDb.collection('submissions').doc(cursorId).get()
      if (cursorSnap.exists) cursorDoc = cursorSnap
    }

    const query = applyPagination(baseQuery, pageSize, cursorDoc)
    const snapshot = await query.get()

    if (snapshot.empty) {
      return {
        success: true,
        data: [],
        nextCursor: null,
        hasMore: false,
      }
    }

    let result = buildPaginatedResult<Submission>(
      snapshot.docs,
      pageSize,
      (doc) => ({ ...(doc.data() as Submission), id: doc.id })
    )

    // Post-process: name search also checks lastName and full name match
    if (searchType === 'name' && trimmed) {
      const lower = trimmed.toLowerCase()
      result = {
        ...result,
        data: result.data.filter((sub) => {
          const full = `${sub.contact.firstName} ${sub.contact.lastName}`.toLowerCase()
          return (
            sub.contact.firstName.toLowerCase().startsWith(lower) ||
            sub.contact.lastName.toLowerCase().startsWith(lower) ||
            full.includes(lower)
          )
        }),
      }
    }

    return { 
        success: true, 
        ...result 
    }
  } catch (error) {
    console.error('Error fetching filtered audit submissions:', error)
    return { 
        success: false, 
        error: 'Failed to get audit submissions.' 
    }
  }
}