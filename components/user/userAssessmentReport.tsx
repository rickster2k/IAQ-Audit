'use client'

import { Announcement, Submission } from "@/lib/types"
import AssessmentReport from "../ai_studio_components/AssessmentReport"

type UserAssessmentReportProps = {
    submission: Submission,
    announcement: Announcement | null,
    friends: Submission[],
}
export default function UserAssessmentReport({submission, announcement, friends}: UserAssessmentReportProps){
    return (
    
            <AssessmentReport
                result={submission.result}
                contact={submission.contact}
                reportId={submission.reportId}
                announcement={announcement}
                friends={friends}
                isDashboardView={false}
                activeSubmission={submission}

            />
            
    )
}