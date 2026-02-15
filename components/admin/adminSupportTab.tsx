'use client'

import { useState } from 'react'
import { SupportSubmission } from '@/lib/types'
import { updateSupportRequestStatus } from '@/app/actions/updateSupportRequestStatus'
import { deleteSupportRequest } from '@/app/actions/deleteSupportRequest'
import { getSupportRequestsPagination } from '@/app/actions/getSupportRequestsPagination'
import { usePagination } from '@/lib/hooks/usePagination'
import PaginationControls from '@/components/shared/paginationControls'

const STATUS_OPTIONS = ['new', 'viewed', 'handled', 'important', 'flagged'] as const
type SubmissionStatus = typeof STATUS_OPTIONS[number]

const STATUS_STYLES: Record<SubmissionStatus, string> = {
  new:       'bg-emerald-100 text-emerald-700 border-emerald-200',
  viewed:    'bg-slate-100 text-slate-600 border-slate-200',
  handled:   'bg-blue-100 text-blue-700 border-blue-200',
  important: 'bg-amber-100 text-amber-700 border-amber-200',
  flagged:   'bg-red-100 text-red-700 border-red-200',
}

interface AdminSupportTabProps {
  helpDeskList: SupportSubmission[]
  initialNextCursor: string | null
  initialHasMore: boolean
}

export default function AdminSupportTab({ helpDeskList, initialNextCursor, initialHasMore }: AdminSupportTabProps) {
  const [selectedTicket, setSelectedTicket] = useState<SupportSubmission | null>(null)
  const [statuses, setStatuses] = useState<Record<string, SubmissionStatus>>(
    () => Object.fromEntries(helpDeskList.map(t => [t.id, (t.status as SubmissionStatus) ?? 'new']))
  )

  const { data: tickets, currentPage, hasMore, loading, handleNext, handlePrevious } = usePagination<SupportSubmission>({
    initialData: helpDeskList,
    initialNextCursor,
    initialHasMore,
    pageSize: 5,
    fetchPage: getSupportRequestsPagination,
    onPageChange: (newTickets) => {
      setSelectedTicket(null)
      setStatuses(prev => ({
        ...prev,
        ...Object.fromEntries(newTickets.map(t => [t.id, (t.status as SubmissionStatus) ?? 'new']))
      }))
    },
  })

  const handleStatusChange = async (id: string, status: SubmissionStatus) => {
    setStatuses(prev => ({ ...prev, [id]: status }))
    const response = await updateSupportRequestStatus(id, status)
    if (!response.success) console.error(response.error)
  }

  const handleReply = (ticket: SupportSubmission) => {
    const subject = encodeURIComponent(`Re: ${ticket.subject}${ticket.reportId ? ` (Report ID: ${ticket.reportId})` : ''}`)
    const body = encodeURIComponent(`Hello ${ticket.name},\n\n`)
    window.location.href = `mailto:${ticket.email}?subject=${subject}&body=${body}`
  }

  const handleDelete = async (id: string) => {
    const response = await deleteSupportRequest(id)
    if (response.success) {
      setStatuses(prev => {
        const next = { ...prev }
        delete next[id]
        return next
      })
    } else {
      console.error(response.error)
    }
  }
  

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-8 max-w-3xl">
      <h2 className="text-2xl font-bold mb-6 text-[#1e3a5f]">Support Inbox</h2>

      {tickets.length === 0 ? (
        <p className="text-slate-500">No support requests at the moment.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {tickets.map((ticket) => {
            const status = statuses[ticket.id] ?? 'new'
            const isExpanded = selectedTicket?.id === ticket.id

            return (
              <div key={ticket.id} className="border border-slate-200 rounded-xl overflow-hidden transition-all">
                <div className="p-4 flex justify-between items-center hover:bg-slate-50 transition">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-700">{ticket.name}</span>
                      {status === 'new' && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500 text-white tracking-wide shrink-0">
                          NEW
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-slate-500">{ticket.email}</span>
                    <span className="text-sm text-slate-600">Subject: <strong>{ticket.subject}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={status}
                      onChange={e => handleStatusChange(ticket.id, e.target.value as SubmissionStatus)}
                      className={`text-xs font-semibold px-2 py-1.5 rounded-lg border cursor-pointer focus:outline-none ${STATUS_STYLES[status]}`}
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s} className="bg-white text-slate-700 font-normal">
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => {
                        setSelectedTicket(isExpanded ? null : ticket) 
                        handleStatusChange(ticket.id, 'viewed')
                      }}
                      className="bg-[#0d9488] hover:bg-[#0b766d] text-white px-4 py-2 rounded-xl font-bold text-sm"
                    >
                      {isExpanded ? 'Hide' : 'View'}
                    </button>

                    <button
                      onClick={() => handleReply(ticket)}
                      className="bg-[#1e3a5f] hover:bg-[#2d5485] text-white px-4 py-2 rounded-xl font-bold text-sm"
                    >
                      Reply
                    </button>

                    <button
                      onClick={() => handleDelete(ticket.id)}
                      disabled={status !== 'handled'}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-slate-200 bg-slate-50 p-5 flex flex-col gap-2">
                    <p className="text-slate-700">
                      <strong>From:</strong> {ticket.name} ({ticket.email})
                    </p>
                    <span className="text-sm text-slate-600">Subject: <strong>{ticket.subject}</strong></span>
                    {ticket.phone && (
                      <p className="text-slate-700"><strong>Phone:</strong> {ticket.phone}</p>
                    )}
                    {ticket.reportId && (
                      <p className="text-slate-700"><strong>Report ID:</strong> {ticket.reportId}</p>
                    )}
                    <p className="text-slate-600 whitespace-pre-wrap mt-1">{ticket.message}</p>
                  </div>
                )}
              </div>
            )
          })}

          <PaginationControls
            currentPage={currentPage}
            hasMore={hasMore}
            loading={loading}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </div>
      )}
    </div>
  )
}