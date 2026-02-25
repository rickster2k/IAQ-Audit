'use client'
import { Announcement, AuditFilters, Submission } from "@/lib/types"
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
import {    getAuditSubmissionsFiltered} from "@/app/actions/getAuditSubmissionsFiltered"
import AdminAuditSearchBar from "./adminAuditSearchBar"
import { formatTimestamp } from "@/lib/utils/helperUtil"
import { toast } from "sonner"
import { EMPTY_FILTERS, hasActiveFilters } from "@/lib/utils/auditFilters"
import { getAllAuditSubmissionsFiltered } from "@/app/actions/getAllAuditSubmissionFiltered"
import { downloadCsv, submissionsToCsvString } from "@/lib/utils/csvUtils"
import { getSignedPdfUrl } from "@/app/actions/getSignedPdfUrl"

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
    const [activeFilters, setActiveFilters] = useState<AuditFilters>(EMPTY_FILTERS)
    const [isSearching, setIsSearching] = useState(false)
    const [isExporting, setIsExporting] = useState(false)

    const router = useRouter()

    // Determines which fetch function the pagination hook uses.
    // When filters are active, we wrap the filtered action so it matches
    // the (pageSize, cursor?) signature that usePagination expects.
    const fetchPage = hasActiveFilters(activeFilters)
        ? (pageSize: number, cursor?: string) =>
              getAuditSubmissionsFiltered(activeFilters, pageSize, cursor)
        : getAuditSubmissionsPagination

    const {
        data: auditList,
        currentPage,
        hasMore,
        loading,
        handleNext,
        handlePrevious,
        resetToData,
    } = usePagination<Submission>({
        initialData: submissions,
        initialNextCursor,
        initialHasMore,
        pageSize: 5,
        fetchPage,
        onPageChange: () => {
            updateViewState('AuditList')
            setSubmissionSelected(null)
            setFocusedSubmissionId(null)
        }
    })

    // ── Search handlers ──────────────────────────────────────────────────────

    const handleSearch = async (filters: AuditFilters) => {
        setIsSearching(true)
        setActiveFilters(filters)
        updateViewState('AuditList')
        setSubmissionSelected(null)

        const result = await getAuditSubmissionsFiltered(filters)
        if (result.success) {
            resetToData(result.data, result.nextCursor, result.hasMore)
        } else {
            toast.error('Search failed. Please try again.')
        }
        setIsSearching(false)
    }

    const handleClearSearch = async () => {
        setIsSearching(true)
        setActiveFilters(EMPTY_FILTERS)
        updateViewState('AuditList')
        setSubmissionSelected(null)

        // Return to unfiltered first page
        const result = await getAuditSubmissionsPagination()
        if (result.success) {
            resetToData(result.data, result.nextCursor, result.hasMore)
        }
        setIsSearching(false)
    }
    // ── CSV Export handler ──────────────────────────────────────────────────

    const handleCsvExport = async () => {
        setIsExporting(true)
        try {
            const result = await getAllAuditSubmissionsFiltered(activeFilters)
            
            if (!result.success) {
                toast.error('Failed to export data')
                return
            }

            if (result.data.length === 0) {
                toast.info('No data to export')
                return
            }

            const csvString = submissionsToCsvString(result.data)
            const timestamp = new Date().toISOString().split('T')[0]
            const filterLabel = hasActiveFilters(activeFilters) 
                ? `-${activeFilters.searchType || 'filtered'}`
                : '-all'
            const filename = `audit-reports${filterLabel}-${timestamp}.csv`
            
            downloadCsv(csvString, filename)
            toast.success(`Exported ${result.data.length} reports`)
        } catch (error) {
            console.error('CSV export error:', error)
            toast.error('An error occurred during export')
        } finally {
            setIsExporting(false)
        }
    }

    // ── PDF / submission handlers ────────────────────────────────────────────

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !focusedSubmissionId) return

        setIsUploading(true)
        try {
            const downloadUrl = await uploadPdfToStorage(file, focusedSubmissionId)
            const result = await updateSubmission(focusedSubmissionId, downloadUrl, file.name)
            if (result.success) {
                toast.success('PDF uploaded successfully!')
                router.refresh()
            } else {
                toast.error(result.error || 'Failed to upload PDF')
            }
        } catch {
            toast.error('An error occurred while uploading the file')
        } finally {
            setIsUploading(false)
            setFocusedSubmissionId(null)
            e.target.value = ''
        }
    }

    const handleViewPdf = async (submission: Submission) => {
        if (!submission.premiumDoc?.name || !submission.id) {
            toast.info('No PDF attached to this submission')
            return
        }
        const result = await getSignedPdfUrl(submission.id, submission.premiumDoc.name)
        if (result.success) {
            window.open(result.url, '_blank')
        } else {
            toast.error('Failed to load PDF')
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

    const handleResetPremiumPdf = async (submissionId: string) => {
        if (!submissionId) return
        try {
            const response = await updateSubmission(submissionId, '', '')
            if (response.success) {
                toast.success('Premium PDF reset successfully')
                router.refresh()
            } else {
                toast.error('Premium PDF reset failed')
            }
        } catch {
            toast.error('An error occurred while resetting premium PDF')
        }
    }
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <>
            {viewState === "AuditList" && (
                <div className="bg-white rounded-xl border">
                    <table className="w-full text-sm">
                        <thead>
                            {/* ── Search bar row ── */}
                            <tr>
                                <td colSpan={7} className="p-0">
                                    <AdminAuditSearchBar
                                        onSearch={handleSearch}
                                        onClear={handleClearSearch}
                                        isSearching={isSearching}
                                        onExport={handleCsvExport}
                                        isExporting={isExporting}
                                    />
                                </td>
                            </tr>

                            {/* ── Column headers ── */}
                            <tr className="bg-slate-50 border-b">
                                <th className="text-left p-3">Count</th>
                                <th className="text-left p-3">Report</th>
                                <th className="text-left p-3">Name</th>
                                <th className="text-left p-3">Email</th>
                                <th className="text-left p-3">Date & Time</th>
                                <th className="text-left p-3">Score</th>
                                <th className="text-right p-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {isSearching ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-slate-400 text-sm">
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                                            </svg>
                                            Searching…
                                        </span>
                                    </td>
                                </tr>
                            ) : auditList.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-6 text-center text-slate-500">
                                        {hasActiveFilters(activeFilters)
                                            ? 'No reports match your search.'
                                            : 'No reports found.'}
                                    </td>
                                </tr>
                            ) : (
                                auditList.map((sub, index) => (
                                    <tr key={sub.id} className="border-b last:border-0">
                                        <td className="p-3">{currentPage * 5 + index + 1}</td>
                                        <td className="p-3 font-mono">{sub.reportId}</td>
                                        <td className="p-3">{capitalize(sub.contact.firstName)} {capitalize(sub.contact.lastName)}</td>
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
                                                onResetPremium={() => handleResetPremiumPdf(sub.id)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

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