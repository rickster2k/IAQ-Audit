import { notFound } from 'next/navigation'
import AssessmentReport from '@/components/ai_studio_components/AssessmentReport'
import { Announcement, Submission } from '@/lib/types'

interface AdminReportClientProps {
  submission: Submission
  announcement: Announcement
  friends: Submission[],
  updateViewState: (view:'AuditList'| 'AuditView' ) => void,
  setFocusedSubmissionId: (id: string | null ) => void
}

export default function AdminReportClient({ submission, announcement, friends, updateViewState, setFocusedSubmissionId }: AdminReportClientProps) {

  if (!submission) {
    notFound()
  }

 

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          IAQ Assessment Report
        </h1>

        <button
          onClick={() => {

            updateViewState("AuditList")
            setFocusedSubmissionId(null)
          }}
          className="text-sm text-slate-600 hover:underline"
        >
          ← Back to Audit List
        </button>
      </div>

      {/* Metadata */}
      <div className="bg-slate-50 rounded-xl p-4 text-sm grid grid-cols-2 gap-4">
        <div>
          <strong>Report ID:</strong> {submission.reportId}
        </div>
        <div>
          <strong>Created At:</strong>{' '}
          {new Date(submission.timestamp).toLocaleString()}
        </div>
        <div>
          <strong>Name:</strong>{' '}
          {submission.contact.firstName} {submission.contact.lastName}
        </div>
        <div>
          <strong>Email:</strong> {submission.contact.email}
        </div>
      </div>

      {/* Assessment Report */}
      <div className="bg-white rounded-3xl shadow p-6">
        <AssessmentReport
         submission={submission}
          result={submission.result}
          contact={submission.contact}
          reportId={submission.reportId}
          announcement={announcement}
          friends={friends}
          isDashboardView={true}
          activeSubmission={submission}
        />
      </div>

      {/* Professional Review (optional section) */}
      {submission.premiumDoc && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h2 className="font-bold mb-2">Professional Review</h2>
          <p>{submission.premiumDoc.name}</p>
           <p>{submission.premiumDoc.url}</p>
        </div>
      )}
    </div>
  )
}
