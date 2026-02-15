'use client'
import { Announcement, Submission } from "@/lib/types"
import { useState } from "react"
import AdminReportClient from "./adminReportClient"
import { updateSubmission } from "@/app/actions/updateSubmission"
import { uploadPdfToStorage } from "@/lib/services/firebaseStorage"
import PdfSelectionModal from "./adminPdfSelectionModal"
import PdfDeleteSelectorModal from "./adminPdfDeleteSelector"
import { useRouter } from "next/navigation"
import AdminAuditActionsDropdown from "./adminAuditActionDropdown"
import { usePagination } from "@/lib/hooks/usePagination"
import PaginationControls from "@/components/shared/paginationControls"
import { getAuditSubmissionsPagination } from "@/app/actions/getAuditSubmissionsPagination"
import { formatTimestamp } from "@/lib/utils/helperUtil"

type AdminAuditTabProps = {
    submissions: Submission[]
    submissionSelected: Submission | null
    setSubmissionSelected: (submission: Submission | null) => void
    friendsOfSelected: Submission[]
    announcement: Announcement
    initialNextCursor: string | null
    initialHasMore: boolean
}

export default function AdminAuditTab({
    submissions,
    submissionSelected,
    setSubmissionSelected,
    friendsOfSelected,
    announcement,
    initialNextCursor,
    initialHasMore
}: AdminAuditTabProps) {

    const [viewState, updateViewState] = useState<'AuditList' | 'AuditView'>('AuditList')
    const [focusedSubmissionId, setFocusedSubmissionId] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [showPdfModal, setShowPdfModal] = useState(false)
    const [showPdfDeleteModal, setShowPdfDeleteModal] = useState(false)
    const [modalSubmissionId, setModalSubmissionId] = useState<string | null>(null)
    const router = useRouter()

    const { data: auditList, currentPage, hasMore, loading, handleNext, handlePrevious } = usePagination<Submission>({
        initialData: submissions,
        initialNextCursor,
        initialHasMore,
        pageSize: 10,
        fetchPage: getAuditSubmissionsPagination,
        onPageChange: () => {
            // Collapse any open view when page changes
            updateViewState('AuditList')
            setSubmissionSelected(null)
            setFocusedSubmissionId(null)
        }
    })

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !focusedSubmissionId) return

        setIsUploading(true)
        try {
            const downloadUrl = await uploadPdfToStorage(file, focusedSubmissionId)
            const result = await updateSubmission(focusedSubmissionId, downloadUrl, file.name)
            if (result.success) {
                alert('PDF uploaded successfully!')
                router.refresh()
            } else {
                alert(result.error || 'Failed to upload PDF')
            }
        } catch (error) {
            console.error('Error uploading file:', error)
            alert('An error occurred while uploading the file')
        } finally {
            setIsUploading(false)
            setFocusedSubmissionId(null)
            e.target.value = ''
        }
    }

    const handleViewPdf = (submission: Submission) => {
        if (submission.premiumDoc?.url) {
            window.open(submission.premiumDoc.url, '_blank')
        } else {
            alert('No PDF attached to this submission')
        }
    }

    const handleOpenPdfModal = (submissionId: string) => {
        setModalSubmissionId(submissionId)
        setShowPdfModal(true)
    }

    const handleOpenPdfDeleteModal = (submissionId: string) => {
        setModalSubmissionId(submissionId)
        setShowPdfDeleteModal(true)
    }
  
    return (
        <>
            {viewState === "AuditList" && (
                <div className="bg-white rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b">
                            <tr>
                                <th className="text-left p-3">Report</th>
                                <th className="text-left p-3">Name</th>
                                <th className="text-left p-3">Email</th>
                                <th className="text-left p-3">Date & Time</th>
                                <th className="text-left p-3">Score</th>
                                <th className="text-right p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auditList.map(sub => (
                                <tr key={sub.id} className="border-b last:border-0">
                                    <td className="p-3 font-mono">{sub.reportId}</td>
                                    <td className="p-3">{sub.contact.firstName} {sub.contact.lastName}</td>
                                    <td className="p-3">{sub.contact.email}</td>
                                    <td className="p-3 text-slate-500 text-xs">{formatTimestamp(sub.timestamp)}</td>
                                    <td className="p-3 font-semibold">{sub.result.score}</td>
                                    <td className="p-3 text-right">
                                        <AdminAuditActionsDropdown
                                            submission={sub}
                                            isUploading={isUploading}
                                            focusedSubmissionId={focusedSubmissionId}
                                            onView={() => {
                                                setSubmissionSelected(sub)
                                                setFocusedSubmissionId(sub.id)
                                                updateViewState("AuditView")
                                            }}
                                            onUploadClick={() => setFocusedSubmissionId(sub.id)}
                                            onFileChange={handleFileChange}
                                            onViewPdf={() => handleViewPdf(sub)}
                                            onSetPremium={() => handleOpenPdfModal(sub.id)}
                                            onDeletePremium={() => handleOpenPdfDeleteModal(sub.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!auditList.length && (
                        <div className="p-6 text-center text-slate-500">
                            No reports found.
                        </div>
                    )}

                    {/* ── Pagination Controls ── */}
                    <div className="p-4 border-t border-slate-100">
                        <PaginationControls
                            currentPage={currentPage}
                            hasMore={hasMore}
                            loading={loading}
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                        />
                    </div>
                </div>
            )}

            {(viewState === "AuditView" && submissionSelected) && (
                <AdminReportClient
                    submission={submissionSelected}
                    announcement={announcement}
                    friends={friendsOfSelected}
                    updateViewState={updateViewState}
                    setFocusedSubmissionId={setFocusedSubmissionId}
                />
            )}

            {showPdfModal && modalSubmissionId && (
                <PdfSelectionModal
                    submissionId={modalSubmissionId}
                    currentPdfName={auditList.find(s => s.id === modalSubmissionId)?.premiumDoc?.name}
                    onClose={() => {
                        setShowPdfModal(false)
                        setModalSubmissionId(null)
                    }}
                />
            )}

            {showPdfDeleteModal && modalSubmissionId && (
                <PdfDeleteSelectorModal
                    submissionId={modalSubmissionId}
                    currentPdfName={auditList.find(s => s.id === modalSubmissionId)?.premiumDoc?.name}
                    onClose={() => {
                        setShowPdfDeleteModal(false)
                        setModalSubmissionId(null)
                    }}
                />
            )}
        </>
    )
}