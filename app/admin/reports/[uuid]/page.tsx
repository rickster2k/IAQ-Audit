import { notFound } from 'next/navigation'
import Link from 'next/link'
import AssessmentReport from '@/components/ai_studio_components/AssessmentReport'
import { Submission } from '@/lib/types'

interface PageProps {
  params: {
    uuid: string
  },
  submissionsDict: Record<string, Submission>
}

export default async function AdminReportPage({ params, submissionsDict }: PageProps) {

  const submission: Submission = submissionsDict[params.uuid]

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

        <Link
          href="/admin"
          className="text-sm text-slate-600 hover:underline"
        >
          ← Back to dashboard
        </Link>
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
          result={submission.result}
          contact={submission.contact}
          reportId={submission.reportId}
          isDashboardView={true}
          activeSubmission={submission}
        />
      </div>

      {/* Professional Review (optional section) */}
      {submission.premiumDoc && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h2 className="font-bold mb-2">Professional Review</h2>
          <p>{submission.premiumDoc.name}</p>
           <p>{submission.premiumDoc.data}</p>
        </div>
      )}
    </div>
  )
}
