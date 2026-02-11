import { AssessmentResult, Submission } from "@/lib/types"

const backUp = {
        score: 85,
        summary: "The system has detected a moderate level of risk in your IAQ. We recommend that you take immediate action",
        recommendations: ["We recommend that you take immediate action", "Seek Professional help"],
        riskLevel: "Moderate" as const,
    }
const assessmentResult: AssessmentResult  = backUp
const reportId: string = "12345"
const contactInfo = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    zipCode: "80303",
    country: "United States",
}

export const announcementExample = {
    text: "Japan is cool",
    url: "https//target.com",
}
export const submissionExample: Submission =  {
    id: "bob",
    reportId: reportId,
    timestamp: "2026-02-07T21:45:12.345Z",
    contact: contactInfo,
    result: assessmentResult,
    responses: [],
    referredBy: null,
    premiumDoc: {
        name: "string",
        data: "string",
    }
};