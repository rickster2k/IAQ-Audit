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

type AdminAuditTabProps = {
    submissions: Submission[],
    submissionSelected: Submission | null,
    setSubmissionSelected: (submission: Submission | null) => void,
    friendsOfSelected: Submission[],
    announcement: Announcement
}
export default function AdminAuditTab({submissions, submissionSelected, setSubmissionSelected, friendsOfSelected, announcement}: AdminAuditTabProps) {

    const [viewState, updateViewState] = useState<'AuditList'| 'AuditView'>('AuditList')
    const [focusedSubmissionId, setFocusedSubmissionId] = useState<string | null> (null)
    const [isUploading, setIsUploading] = useState(false)

    const [showPdfModal, setShowPdfModal] = useState(false)
    const [showPdfDeleteModal, setShowPdfDeleteModal] = useState(false)
    const [modalSubmissionId, setModalSubmissionId] = useState<string | null>(null)
    const router = useRouter()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !focusedSubmissionId) return

        setIsUploading(true)

        try {
            // Upload file directly to Firebase Storage
            console.log("Started upload process")
            const downloadUrl = await uploadPdfToStorage(file, focusedSubmissionId)
            console.log("Uploaded success fiel to storage url is : ", downloadUrl)
            // Update Firestore with the download URL
            const result = await updateSubmission(
                focusedSubmissionId, 
                downloadUrl, 
                file.name
            )

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
            // Reset the file input
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
            {/* Submissions Table */}
            {viewState === "AuditList" && (

                <div className="bg-white rounded-xl border">
                    <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b">
                        <tr>
                        <th className="text-left p-3">Report</th>
                        <th className="text-left p-3">Name</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Score</th>
                        <th className="text-right p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map(sub => (
                        <tr key={sub.id} className="border-b last:border-0">
                            <td className="p-3 font-mono">{sub.reportId}</td>
                            <td className="p-3">
                            {sub.contact.firstName} {sub.contact.lastName}
                            </td>
                            <td className="p-3">{sub.contact.email}</td>
                            <td className="p-3 font-semibold">
                            {sub.result.score}
                            </td>
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

                    {!submissions.length && (
                    <div className="p-6 text-center text-slate-500">
                        No reports found.
                    </div>
                    )}
                </div>

            )}
            
        
            {(viewState === "AuditView" && submissionSelected) && <AdminReportClient submission={submissionSelected} announcement={announcement} friends={friendsOfSelected} updateViewState={updateViewState} setFocusedSubmissionId={setFocusedSubmissionId}/>}
            {/* PDF Selection Modal */}
            {showPdfModal && modalSubmissionId && (
                <PdfSelectionModal
                    submissionId={modalSubmissionId}
                    currentPdfName={submissions.find(s => s.id === modalSubmissionId)?.premiumDoc?.name}
                    onClose={() => {
                        setShowPdfModal(false)
                        setModalSubmissionId(null)
                    }}
                />
            )}

            { showPdfDeleteModal && modalSubmissionId && (
                <PdfDeleteSelectorModal
                    submissionId={modalSubmissionId}
                    currentPdfName={submissions.find(s => s.id === modalSubmissionId)?.premiumDoc?.name}
                    onClose={() => {
                        setShowPdfDeleteModal(false)
                        setModalSubmissionId(null)
                    }}
                />

            )}
        </>
    )
}