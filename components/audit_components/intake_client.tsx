'use client'

import { useState } from "react";
import ContactForm from "@/components/ai_studio_components/ContactForm";
import ThankYouClient from "@/components/audit_components/thank_you_client";
import { ContactInfo, Submission, UserResponse, AssessmentResult } from "@/lib/types";
import { useAuditStore } from "@/lib/auditStore";
import { analyzeIAQAssessment} from "@/lib/services/geminiService";

interface IntakeClientProps {
  referringReportId?: string;
}

export default function IntakeClient({ referringReportId }: IntakeClientProps) {
  const responses = useAuditStore((state) => state.responses); // audit responses
  const [activeSubmission, setActiveSubmission] = useState<Submission | null>(null);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({} as ContactInfo);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = async (info: ContactInfo) => {
    setContactInfo(info);
    setIsAnalyzing(true);

    try {
      // Step 1: Analyze audit responses using Gemini AI
      const result: AssessmentResult = await analyzeIAQAssessment(responses as UserResponse[]);

      // Step 2: Build submission object
      const submission: Submission = {
        id: crypto.randomUUID(),
        reportId: `IAQ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        timestamp: new Date().toISOString(),
        contact: info,
        result,
        responses,
        referredBy: referringReportId || null
      };

      

      // Step 3: Update parent with active submission
      setActiveSubmission(submission);

      // Step 4: Save to Firebase 
      //await saveSubmission(submission);
      //await incrementGlobalStat('reports');

      // Step 5: Clear audit store for next session
      useAuditStore.getState().clearResponses();

      setSubmitted(true);

    } catch (err) {
      console.error("Error submitting audit & contact info:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (submitted) {
    return <ThankYouClient contactInfo={contactInfo} />;
  }

  return <ContactForm onSubmit={handleContactSubmit} isAnalyzing={isAnalyzing} />;
}
