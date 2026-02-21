'use client'

import { AuditFilters, RiskLevel } from '@/lib/types';
import { useState } from 'react'

type SearchType = AuditFilters['searchType']

const SEARCH_TYPES: { value: SearchType; label: string }[] = [
  { value: 'name',      label: 'Name'       },
  { value: 'email',     label: 'Email'       },
  { value: 'reportId',  label: 'Report ID'   },
  { value: 'riskLevel', label: 'Risk Level'  },
  { value: 'dateRange', label: 'Date Range'  },
]

const RISK_LEVELS: RiskLevel[] = ['Low', 'Moderate', 'High', 'Severe']

const RISK_STYLES: Record<RiskLevel, string> = {
  Low:      'text-emerald-700',
  Moderate: 'text-amber-600',
  High:     'text-orange-600',
  Severe:   'text-red-700',
}

interface Props {
  onSearch: (filters: AuditFilters) => void
  onClear: () => void
  onExport: () => void
  isSearching: boolean
  isExporting: boolean
}

export default function AdminAuditSearchBar({ onSearch, onClear, onExport, isSearching, isExporting }: Props) {
  const [searchType, setSearchType] = useState<SearchType>('name')
  const [searchValue, setSearchValue] = useState('')
  const [riskLevel, setRiskLevel] = useState<RiskLevel | ''>('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [isActive, setIsActive] = useState(false)

  const handleSearch = () => {
    const filters: AuditFilters = {
      searchType,
      searchValue,
      riskLevel,
      dateFrom,
      dateTo,
    }
    setIsActive(true)
    onSearch(filters)
  }

  const handleClear = () => {
    setSearchValue('')
    setRiskLevel('')
    setDateFrom('')
    setDateTo('')
    setIsActive(false)
    onClear()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  const canSearch = (() => {
    if (searchType === 'name' || searchType === 'email' || searchType === 'reportId') {
      return searchValue.trim().length > 0
    }
    if (searchType === 'riskLevel') return riskLevel !== ''
    if (searchType === 'dateRange') return dateFrom !== '' || dateTo !== ''
    return false
  })()

  return (
    <div className="border-b border-slate-100">
      {/* Filter type selector row */}
      <div className="flex items-center gap-0 border-b border-slate-100 bg-slate-50/60">
        <span className="text-xs font-semibold text-slate-400 px-3 py-2 uppercase tracking-wide whitespace-nowrap">
          Filter by
        </span>
        {SEARCH_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => {
              setSearchType(type.value)
              setSearchValue('')
              setRiskLevel('')
              setDateFrom('')
              setDateTo('')
            }}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              searchType === type.value
                ? 'border-[#1e3a5f] text-[#1e3a5f] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            {type.label}
          </button>
        ))}

        {/* Active filter badge */}
        {isActive && (
          <span className="ml-2 px-2 py-0.5 rounded-full bg-[#1e3a5f] text-white text-xs font-semibold">
            Filtered
          </span>
        )}

        {/* CSV Export Button - right-aligned */}
        <div className="ml-auto px-3">
          <button
            onClick={onExport}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title="Export current results to CSV"
          >
            {isExporting ? (
              <>
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Exporting…
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export CSV
              </>
            )}
          </button>
        </div>
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2 px-3 py-2.5">

        {/* Text input: name, email, reportId */}
        {(searchType === 'name' || searchType === 'email' || searchType === 'reportId') && (
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              searchType === 'name'     ? 'Search by first or last name…' :
              searchType === 'email'    ? 'Exact email address…' :
                                          'Exact report ID…'
            }
            className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-all placeholder:text-slate-400"
          />
        )}

        {/* Risk level dropdown */}
        {searchType === 'riskLevel' && (
          <select
            value={riskLevel}
            onChange={(e) => setRiskLevel(e.target.value as RiskLevel | '')}
            className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-all"
          >
            <option value="">Select risk level…</option>
            {RISK_LEVELS.map((level) => (
              <option key={level} value={level} className={RISK_STYLES[level]}>
                {level}
              </option>
            ))}
          </select>
        )}

        {/* Date range inputs */}
        {searchType === 'dateRange' && (
          <div className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-1.5">
              <label className="text-xs text-slate-500 whitespace-nowrap">From</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-all"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <label className="text-xs text-slate-500 whitespace-nowrap">To</label>
              <input
                type="date"
                value={dateTo}
                min={dateFrom || undefined}
                onChange={(e) => setDateTo(e.target.value)}
                className="text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-all"
              />
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleSearch}
            disabled={!canSearch || isSearching}
            className="px-3 py-1.5 bg-[#1e3a5f] text-white text-xs font-semibold rounded-lg hover:bg-[#2d5485] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {isSearching ? (
              <span className="flex items-center gap-1.5">
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Searching…
              </span>
            ) : 'Search'}
          </button>

          {isActive && (
            <button
              onClick={handleClear}
              className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  )
}