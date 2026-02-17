'use server'

import { AuditResultsEmail } from '@/components/emails/auditResultsEmail'
import { Resend } from 'resend'

interface SendAuditEmailParams {
  toEmail: string
  firstName: string
  reportId: string
  score: number
  riskLevel: string
  pdfBase64: string
}

export async function sendAuditEmail(
  params: SendAuditEmailParams
): Promise<{ success: boolean; error?: string }> {
  const { toEmail, firstName, reportId, score, riskLevel, pdfBase64 } = params

  const apiKey   = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL

  if (!apiKey || !fromEmail) {
    console.error('Missing Resend env vars')
    return { success: false, error: 'Email service not configured' }
  }

  const resend = new Resend(apiKey)

  try {
    const { error } = await resend.emails.send({
      from:    fromEmail,
      to:      toEmail,
      subject: `Your IAQ Audit Report is Ready — ${reportId}`,
      react:   AuditResultsEmail({ firstName, reportId, score, riskLevel }),
      attachments: [
        {
          filename: `IAQ_Audit_Script_${reportId}.pdf`,
          content:  pdfBase64,
        },
      ],
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('sendAuditEmail failed:', err)
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}