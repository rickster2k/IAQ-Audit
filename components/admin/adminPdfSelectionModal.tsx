// components/admin/PdfSelectionModal.tsx
'use client'

import { useState, useEffect } from 'react'
import { updateSubmission } from '@/app/actions/updateSubmission'
import { getUploadedPdfsForSubmission } from '@/app/actions/getAllPdfsForSubmission'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type PdfOption = {
  name: string
  url: string
  uploadedAt: string | undefined
}

type PdfSelectionModalProps = {
  submissionId: string
  currentPdfName?: string
  onClose: () => void
}

export default function PdfSelectionModal({  submissionId,  currentPdfName,  onClose}: PdfSelectionModalProps) {
    const [pdfs, setPdfs] = useState<PdfOption[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedPdf, setSelectedPdf] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)
    const router = useRouter()
  useEffect(() => {
    async function loadPdfs() {
      setLoading(true)
      const result = await getUploadedPdfsForSubmission(submissionId)
      
      if (result.success) {
        setPdfs(result.pdfs)
        // Don't pre-select current PDF - user must choose a different one
      }
      setLoading(false)
    }

    loadPdfs()
  }, [submissionId, currentPdfName])

  const handleSave = async () => {
    if (!selectedPdf) return

    setSaving(true)
    const pdf = pdfs.find(p => p.url === selectedPdf)
    
    if (pdf) {
      const result = await updateSubmission(
        submissionId,
        pdf.url,
        pdf.name
      )

      if (result.success) {
        toast.success('Premium PDF updated successfully!')
        router.refresh()
        onClose()
      } else {
        toast.error(result.error || 'Failed to update PDF')
      }
    }
    setSaving(false)
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Unknown date'
    try {
      return new Date(dateString).toLocaleString()
    } catch {
      return 'Unknown date'
    }
  }

  const isCurrentPdf = (pdfName: string) => currentPdfName === pdfName

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select Premium PDF</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Loading PDFs...</div>
          </div>
        ) : pdfs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No PDFs uploaded for this submission yet. Upload a PDF first.
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-2">
              {pdfs.map((pdf) => {
                const isCurrent = isCurrentPdf(pdf.name)
                console.log("comparison: ", currentPdfName, " - ", pdf.name)
                console.log("pdf info:", pdf.name, pdf.url, "currently shown: ", isCurrent)
                const isDisabled = isCurrent

                return (
                  <div
                    key={pdf.url}
                    className={`border rounded-lg p-4 transition-all ${
                      isDisabled
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-75'
                        : selectedPdf === pdf.url
                        ? 'border-purple-600 bg-purple-50 cursor-pointer'
                        : 'border-gray-200 hover:border-purple-300 cursor-pointer'
                    }`}
                    onClick={() => !isDisabled && setSelectedPdf(pdf.url)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={selectedPdf === pdf.url}
                            onChange={() => !isDisabled && setSelectedPdf(pdf.url)}
                            disabled={isDisabled}
                            className="text-purple-600 disabled:cursor-not-allowed"
                          />
                          <span className={`font-medium ${isDisabled ? 'text-gray-500' : 'text-gray-900'}`}>
                            {pdf.name}
                          </span>
                          {isCurrent && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                              Visible to User
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 ml-6">
                          Uploaded: {formatDate(pdf.uploadedAt)}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(pdf.url, '_blank')
                        }}
                        className="text-blue-600 hover:underline text-sm ml-4"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!selectedPdf || saving || pdfs.length === 0}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Set as Premium PDF'}
          </button>
        </div>
      </div>
    </div>
  )
}