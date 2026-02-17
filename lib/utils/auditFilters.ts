import { AuditFilters } from '@/lib/types'

export const EMPTY_FILTERS: AuditFilters = {
  searchType: '',
  searchValue: '',
  riskLevel: '',
  dateFrom: '',
  dateTo: '',
}

export function hasActiveFilters(filters: AuditFilters): boolean {
  return (
    (filters.searchType === 'name' && filters.searchValue.trim() !== '') ||
    (filters.searchType === 'email' && filters.searchValue.trim() !== '') ||
    (filters.searchType === 'reportId' && filters.searchValue.trim() !== '') ||
    (filters.searchType === 'riskLevel' && filters.riskLevel !== '') ||
    (filters.searchType === 'dateRange' && (filters.dateFrom !== '' || filters.dateTo !== ''))
  )
}