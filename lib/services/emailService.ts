'use client'

import emailjs from '@emailjs/browser'
import { Submission } from '@/lib/types'

let initialized = false

function initEmailJS() {
  if (initialized) return
  const key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  if (!key) throw new Error('EmailJS public key missing')
  emailjs.init(key)
  initialized = true
}

type BaseEmailParams = {
  to_name: string
  user_email: string
  report_id: string
  score: number
  risk_level: string
  summary: string
  report_link: string
}

function buildParams(submission: Submission): BaseEmailParams {
  const { contact, result, reportId } = submission

  return {
    to_name: `${contact.firstName} ${contact.lastName}`,
    user_email: contact.email,
    report_id: reportId,
    score: result.score,
    risk_level: result.riskLevel,
    summary: result.summary,
    report_link: `${window.location.origin}?reportId=${reportId}`,
  }
}

async function sendEmail(
  templateId: string,
  params: BaseEmailParams
) {
  initEmailJS()

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  if (!serviceId) throw new Error('EmailJS service ID missing')

  return emailjs.send(serviceId, templateId, params)
}

/* ───────────────────────────── */
/* Public API                    */
/* ───────────────────────────── */

export async function sendResultsEmail(submission: Submission) {
  const templateId =
    process.env.NEXT_PUBLIC_EMAILJS_RESULTS_TEMPLATE_ID

  if (!templateId) {
    console.warn('Results email template missing')
    return
  }

  return sendEmail(templateId, buildParams(submission))
}

export async function sendRecoveryEmail(submission: Submission) {
  const templateId =
    process.env.NEXT_PUBLIC_EMAILJS_RECOVERY_TEMPLATE_ID

  if (!templateId) {
    console.warn('Recovery email template missing')
    return
  }

  return sendEmail(templateId, buildParams(submission))
}
