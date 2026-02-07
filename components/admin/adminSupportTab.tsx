'use client'

import { useState } from 'react'
import { SupportSubmission } from '@/lib/types'

interface AdminSupportTabProps {
  helpDeskList: SupportSubmission[]
}

export default function AdminSupportTab({ helpDeskList }: AdminSupportTabProps) {
  const [selectedTicket, setSelectedTicket] = useState<SupportSubmission | null>(null)

  const handleCloseModal = () => setSelectedTicket(null)

  const handleReply = (ticket: SupportSubmission) => {
    const subject = encodeURIComponent(`Re: ${ticket.subject}${ticket.reportId ? ` (Report ID: ${ticket.reportId})` : ''}`)
    const body = encodeURIComponent(`Hello ${ticket.name},\n\n`) // prefill body if needed
    window.location.href = `mailto:${ticket.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-8 max-w-3xl">
      <h2 className="text-2xl font-bold mb-6 text-[#1e3a5f]">Support Inbox</h2>

      {helpDeskList && helpDeskList.length === 0 ? (
        <p className="text-slate-500">No support requests at the moment.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {helpDeskList.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-slate-200 rounded-lg p-4 flex justify-between items-center hover:bg-slate-50 transition"
            >
              <div className="flex flex-col">
                <span className="font-bold text-slate-700">{ticket.name}</span>
                <span className="text-sm text-slate-500">{ticket.email}</span>
                <span className="text-sm text-slate-600 mt-1">Subject: {ticket.subject}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTicket(ticket)}
                  className="bg-[#0d9488] hover:bg-[#0b766d] text-white px-4 py-2 rounded-xl font-bold text-sm"
                >
                  View
                </button>
                <button
                  onClick={() => handleReply(ticket)}
                  className="bg-[#1e3a5f] hover:bg-[#2d5485] text-white px-4 py-2 rounded-xl font-bold text-sm"
                >
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for full message */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full relative">
            <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">{selectedTicket.subject}</h3>
            <p className="text-slate-700 mb-2">
              <strong>From:</strong> {selectedTicket.name} ({selectedTicket.email})
            </p>
            {selectedTicket.phone && (
              <p className="text-slate-700 mb-2">
                <strong>Phone:</strong> {selectedTicket.phone}
              </p>
            )}
            {selectedTicket.reportId && (
              <p className="text-slate-700 mb-4">
                <strong>Report ID:</strong> {selectedTicket.reportId}
              </p>
            )}
            <p className="text-slate-600 whitespace-pre-wrap">{selectedTicket.message}</p>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-slate-300 hover:bg-slate-400 text-slate-700 px-4 py-2 rounded-xl font-bold"
              >
                Close
              </button>
              <button
                onClick={() => handleReply(selectedTicket)}
                className="bg-[#1e3a5f] hover:bg-[#2d5485] text-white px-4 py-2 rounded-xl font-bold"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
