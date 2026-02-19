'use client'

import { useState } from "react"
import ContactForm from "@/components/ai_studio_components/ContactForm"
import ThankYouClient from "@/components/audit_components/thank_you_client"
import { ContactInfo, Submission, UserResponse, AssessmentResult } from "@/lib/types"
import { useAuditStore } from "@/lib/auditStore"
//import { analyzeIAQAssessment } from "@/lib/services/geminiService"
import { saveSubmission } from "@/app/actions/saveSubmission"
import { getAnnouncement, getFriends } from "@/app/actions/getters"
import { analyzeIAQAssessment } from "@/app/actions/analyzeAssesmentGemini"
import { getAuditPdfBase64 } from "@/lib/utils/generateAuditPdf"
import { sendAuditEmail } from "@/app/actions/sendAuditEmail"
import { toast } from "sonner"

export default function IntakeClient() {
  const responses:UserResponse[] = useAuditStore((state) => state.responses)
  const [activeSubmission, setActiveSubmission] = useState<Submission | null>(null)
  const [contactInfo, setContactInfo] = useState<ContactInfo>({} as ContactInfo)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)


  

  const handleContactSubmit = async (info: ContactInfo) => {
    setContactInfo(info)
    setIsAnalyzing(true)
    setError(null)

    try {
      const referredBy:string | null = sessionStorage.getItem('referredBy')
      // Deduplicate responses by questionId before processing
      // (guards against double-saves from conditional question re-renders)
      const uniqueResponses = responses.filter(
        (r, index, self) => index === self.findIndex(x => x.questionId === r.questionId)
      )

      // Step 1: Analyze audit responses using Gemini AI
      const result: AssessmentResult = await analyzeIAQAssessment(uniqueResponses)

      // Step 2: Build submission object
      const submission: Submission = {
        id: crypto.randomUUID(),
        reportId: `IAQ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        timestamp: new Date().toISOString(),
        contact: info,
        result,
        responses: uniqueResponses,
        referredBy: referredBy
      }
     
      // Step 3: Save to Firestore via server action
      const saveResult = await saveSubmission(submission)

      if (!saveResult.success) {
        throw new Error(saveResult.error || 'Failed to save submission')
      }

      // Step 3b: Generate PDF and email it to the user
      // Non-blocking — we don't want a failed email to block the user seeing results
      getAuditPdfBase64(submission)
        .then((pdfBase64) =>
          sendAuditEmail({
            toEmail:   info.email,
            firstName: info.firstName,
            reportId:  submission.reportId,
            score:     result.score,
            riskLevel: result.riskLevel,
            pdfBase64,
          })
        )
        .then((emailResult) => {
          if (!emailResult.success) {
            console.error('Email send failed:', emailResult.error)
            toast.error('Your report is ready but we could not send the confirmation email. You can still download it from your report page.')
          }
        })
        .catch((emailErr) => {
          console.error('Email error details:', emailErr)
          toast.error('Your report is ready but we could not send the confirmation email. You can still download it from your report page.')
        })
      /*sendAuditEmailClient(submission).catch((emailErr) => {
        console.error('Email error details:', emailErr) 
        toast.error('Failed to send audit email. You can still download it online')
      })*/
      
      // Step 4: Get announcement and friends data
      const [announcementResponse, friendsResponse] = await Promise.all([
        getAnnouncement(),
        getFriends(submission.reportId)
      ])

      const announcement = announcementResponse.success ? announcementResponse.announcement : null
      const friends = friendsResponse.success ? friendsResponse.friends : []

      // Step 5: Save to sessionStorage (for immediate viewing)
      sessionStorage.setItem('audit', JSON.stringify(submission))
      sessionStorage.setItem('announcement', JSON.stringify(announcement))
      sessionStorage.setItem('friends', JSON.stringify(friends))

      // Notify header about session change
      window.dispatchEvent(new Event('audit-session-change'))
      // Step 6: Update local state
      setActiveSubmission(submission)

      // Step 7: Clear audit store for next session
      useAuditStore.getState().clearResponses()

      setSubmitted(true)

    } catch (err) {
      console.error("Error submitting audit & contact info:", err)
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (submitted && activeSubmission) {
    return <ThankYouClient contactInfo={contactInfo} submission={activeSubmission} />
  }

  return (
    <>
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
          {error}
        </div>
      )}
      <ContactForm onSubmit={handleContactSubmit} isAnalyzing={isAnalyzing} />
    </>
  )
}