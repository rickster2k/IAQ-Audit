'use client'

import { useState, useRef, useEffect } from 'react'
import { Submission } from '@/lib/types'
import { routerServerGlobal } from 'next/dist/server/lib/router-utils/router-server-context'
import { useRouter } from 'next/navigation'

type Props = {
  submission: Submission
  isUploading: boolean
  focusedSubmissionId: string | null
  onView: () => void
  onUploadClick: () => void
  onViewPdf: () => void
  onSetPremium: () => void
  onDeletePremium: () => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AdminAuditActionsDropdown({  submission,  isUploading,  focusedSubmissionId,  onView,  onUploadClick,  onViewPdf,  onSetPremium,  onDeletePremium,  onFileChange}: Props) {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setOpen(false)
        }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
            onClick={() => setOpen(prev => !prev)}
            className="bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded text-sm font-medium"
        >
            Actions ▾
        </button>

        {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50 text-sm">
            
            <button
                onClick={() => {
                onView()
                setOpen(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-100"
            >
                View Audit
            </button>



            {/* Add PDF */}
            <label
                htmlFor={`pdf-upload-${submission.id}`}
                className="block px-4 py-2 hover:bg-slate-100 cursor-pointer"
                onClick={() => {
                onUploadClick()
                }}
            >
                {isUploading && focusedSubmissionId === submission.id
                ? 'Uploading...'
                : 'Add PDF'}
            </label>

            <input
                id={`pdf-upload-${submission.id}`}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={onFileChange}
                disabled={isUploading}
            />

            {submission.premiumDoc?.url && (
                <button
                onClick={() => {
                    onViewPdf()
                    setOpen(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-100"
                >
                View Premium PDF
                </button>
            )}

            <button
                onClick={() => {
                onSetPremium()
                router.refresh()
                setOpen(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-100 "
            >
                Set Premium PDF
            </button>

            <button
                onClick={() => {
                onDeletePremium()
                router.refresh()
                setOpen(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-100"
            >
                Delete Premium PDF
            </button>

            </div>
        )}
        </div>
    )
    }
