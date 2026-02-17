'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { Submission, UserResponse } from '@/lib/types'

// ─── Section map (derived from questionId prefix) ─────────────────────────────

const SECTION_TITLES: Record<string, string> = {
  A: 'General Home Information',
  B: 'HVAC & Furnace Systems',
  C: 'Ventilation & Airflow',
  D: 'Humidity & Moisture Control',
  E: 'Water Intrusion & Mold Risk',
  F: 'Cleaning Habits',
  G: 'VOC & Chemical Exposure',
  H: 'Pets & Biologicals',
  I: 'Indoor Activities',
  J: 'Basement, Crawlspace & Foundation',
  K: 'Odors & Health Indicators',
  L: 'Home Usage & Special Situations',
  M: 'Final Environmental Indicators',
}

interface Section {
  letter: string
  title: string
  questions: { question: string; answer: string }[]
}

/** Groups responses by the letter prefix of questionId (e.g. "b_hvac_type" → "B") */
function groupBySection(responses: UserResponse[]): Section[] {
  const map = new Map<string, { question: string; answer: string }[]>()

  for (const r of responses) {
    const letter = r.questionId.split('_')[0].toUpperCase()
    if (!map.has(letter)) map.set(letter, [])

    // Deduplicate: skip if the same questionId was already added
    const existing = map.get(letter)!
    const alreadyAdded = existing.some(
      (q) => q.question === r.questionText
    )
    if (!alreadyAdded) {
      existing.push({ question: r.questionText, answer: r.answerLabel })
    }
  }

  return Array.from(map.entries()).map(([letter, questions]) => ({
    letter,
    title: SECTION_TITLES[letter] ?? letter,
    questions,
  }))
}

// ─── Risk colour ──────────────────────────────────────────────────────────────

function riskRgb(riskLevel: string): [number, number, number] {
  switch (riskLevel) {
    case 'Low':      return [22, 163, 74]
    case 'Moderate': return [202, 138, 4]
    case 'High':     return [234, 88, 12]
    case 'Severe':   return [220, 38, 38]
    default:         return [100, 116, 139]
  }
}

// ─── PDF Generation ───────────────────────────────────────────────────────────

async function generateAuditPDF(submission: Submission) {
  const { jsPDF } = await import('jspdf')

  const { reportId, contact, result, timestamp, responses } = submission
  const sections = groupBySection(responses)

  const doc     = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' })
  const PAGE_W  = doc.internal.pageSize.getWidth()
  const PAGE_H  = doc.internal.pageSize.getHeight()
  const MARGIN  = 48
  const CONTENT = PAGE_W - MARGIN * 2

  // Palette
  const NAVY:  [number, number, number] = [30,  58,  95]
  const TEAL:  [number, number, number] = [13, 148, 136]
  const WHITE: [number, number, number] = [255, 255, 255]
  const LIGHT: [number, number, number] = [241, 245, 249]
  const GREY:  [number, number, number] = [100, 116, 139]
  const DARK:  [number, number, number] = [30,  41,  59]

  let y = 0
  let pageNum = 1

  // ── Primitives ─────────────────────────────────────────────────────────────

  const setFont = (
    style: 'normal' | 'bold' | 'italic',
    size: number,
    color: [number, number, number] = DARK
  ) => {
    doc.setFont('helvetica', style)
    doc.setFontSize(size)
    doc.setTextColor(...color)
  }

  const fillRect = (
    x: number, yy: number, w: number, h: number,
    color: [number, number, number], radius = 0
  ) => {
    doc.setFillColor(...color)
    if (radius > 0) {
      doc.roundedRect(x, yy, w, h, radius, radius, 'F')
    } else {
      doc.rect(x, yy, w, h, 'F')
    }
  }

  // ── Footer ─────────────────────────────────────────────────────────────────

  const addFooter = () => {
    const fy = PAGE_H - 36
    doc.setDrawColor(...LIGHT)
    doc.setLineWidth(0.5)
    doc.line(MARGIN, fy - 6, PAGE_W - MARGIN, fy - 6)
    setFont('normal', 7, GREY)
    doc.text(
      'This report is for informational purposes only and does not constitute professional advice. ©  IAQ Network | iaq.network.com',
      MARGIN, fy + 4 
    )
    setFont('bold', 7, TEAL)
    doc.text(`Report ID: ${reportId}`, PAGE_W / 2, fy + 12, { align: 'center' })
    setFont('normal', 7, GREY)
    doc.text(`Page ${pageNum}`, PAGE_W - MARGIN, fy + 4, { align: 'right' })
  }

  // ── Running header ─────────────────────────────────────────────────────────

  const addRunningHeader = () => {
    fillRect(0, 0, PAGE_W, 36, NAVY)
    setFont('bold', 10, WHITE)
    doc.text('IAQ Audit — Q&A Transcript', MARGIN, 23)
    setFont('normal', 8, TEAL)
    doc.text(reportId, PAGE_W - MARGIN, 23, { align: 'right' })
    y = 52
  }

  // ── Page-break guard ───────────────────────────────────────────────────────

  const ensureSpace = (needed: number) => {
    if (y + needed > PAGE_H - 60) {
      addFooter()
      doc.addPage()
      pageNum++
      y = 0
      addRunningHeader()
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // COVER PAGE
  // ══════════════════════════════════════════════════════════════════════════

  fillRect(0, 0, PAGE_W, 110, NAVY)
  fillRect(0, 110, PAGE_W, 6, TEAL)

  setFont('bold', 22, WHITE)
  doc.text('IAQ Audit', MARGIN, 48)
  setFont('normal', 10, [180, 210, 230])
  doc.text('Indoor Air Quality Assessment', MARGIN, 66)

  // Report ID badge (top right)
  fillRect(PAGE_W - MARGIN - 160, 28, 160, 42, [20, 48, 80], 4)
  setFont('bold', 7, TEAL)
  doc.text('AUDIT REPORT ID', PAGE_W - MARGIN - 80, 44, { align: 'center' })
  setFont('bold', 11, WHITE)
  doc.text(reportId, PAGE_W - MARGIN - 80, 60, { align: 'center' })

  y = 136

  setFont('bold', 26, NAVY)
  doc.text('IAQ Audit', MARGIN, y + 18)
  setFont('normal', 12, GREY)
  doc.text('Q&A Transcript', MARGIN, y + 36)
  y += 56

  // ── Homeowner card ─────────────────────────────────────────────────────────

  fillRect(MARGIN, y, CONTENT, 96, LIGHT, 6)
  doc.setDrawColor(...TEAL)
  doc.setLineWidth(3)
  doc.line(MARGIN, y, MARGIN, y + 96)

  setFont('bold', 8, TEAL)
  doc.text('HOMEOWNER INFORMATION', MARGIN + 14, y + 18)

  const L = MARGIN + 14
  const R = MARGIN + CONTENT / 2 + 14

  const infoRow = (
    label: string, value: string,
    col: number, rowY: number,
    valueColor: [number, number, number] = DARK
  ) => {
    setFont('bold', 9, DARK)
    doc.text(label, col, rowY)
    setFont('normal', 9, valueColor)
    doc.text(value, col + 46, rowY)
  }

  infoRow('Name:',  `${contact.firstName} ${contact.lastName}`, L, y + 36)
  infoRow('Email:', contact.email,                              L, y + 52)
  infoRow('Zip:',   `${contact.zipCode}, ${contact.country}`,   L, y + 68)

  if (timestamp) {
    infoRow('Date:', new Date(timestamp).toLocaleDateString(), R, y + 36)
  }

  setFont('bold', 9, DARK)
  doc.text('Score:', R, y + 52)
  setFont('bold', 9, TEAL)
  doc.text(`${result.score}/100 — ${result.riskLevel} Risk`, R + 46, y + 52)

  y += 116

  // ── Risk strip ─────────────────────────────────────────────────────────────

  fillRect(MARGIN, y, CONTENT, 44, riskRgb(result.riskLevel), 6)
  setFont('bold', 11, WHITE)
  doc.text('Health Risk Score', MARGIN + 16, y + 17)
  setFont('bold', 20, WHITE)
  doc.text(`${result.score}`, MARGIN + 16, y + 36)
  setFont('normal', 11, WHITE)
  doc.text(`/ 100  ·  ${result.riskLevel} Risk`, MARGIN + 42, y + 36)
  y += 64

  // ── Professional Summary ───────────────────────────────────────────────────

  setFont('bold', 10, NAVY)
  doc.text('Professional Summary', MARGIN, y)
  y += 14
  doc.setDrawColor(...TEAL)
  doc.setLineWidth(1)
  doc.line(MARGIN, y, MARGIN + CONTENT, y)
  y += 12

  setFont('normal', 9, DARK)
  const summaryLines = doc.splitTextToSize(result.summary, CONTENT)
  doc.text(summaryLines, MARGIN, y)
  y += (summaryLines.length as number) * 13 + 16

  // ── Recommendations ────────────────────────────────────────────────────────

  setFont('bold', 10, NAVY)
  doc.text('Critical Recommendations', MARGIN, y)
  y += 14
  doc.setDrawColor(...TEAL)
  doc.setLineWidth(1)
  doc.line(MARGIN, y, MARGIN + CONTENT, y)
  y += 12

  for (let i = 0; i < result.recommendations.length; i++) {
    if (y > PAGE_H - 100) break
    const recLines = doc.splitTextToSize(
      `${i + 1}.  ${result.recommendations[i]}`, CONTENT - 10
    )
    setFont('normal', 9, DARK)
    doc.text(recLines, MARGIN, y)
    y += (recLines.length as number) * 13 + 6
  }

  setFont('italic', 8, GREY)
  doc.text('Full audit Q&A transcript follows on the next pages.', MARGIN, y + 8)

  addFooter()

  // ══════════════════════════════════════════════════════════════════════════
  // Q&A PAGES
  // ══════════════════════════════════════════════════════════════════════════

  doc.addPage()
  pageNum++
  y = 0
  addRunningHeader()

  let globalQ = 1

  for (const section of sections) {
    ensureSpace(48)

    // Section header band
    fillRect(MARGIN, y, CONTENT, 28, NAVY, 4)
    setFont('bold', 10, WHITE)
    doc.text(`${section.letter}.  ${section.title}`, MARGIN + 12, y + 18)
    y += 36

    for (const { question, answer } of section.questions) {
      const qLines = doc.splitTextToSize(`${globalQ}. ${question}`, CONTENT - 36)
      const aLines = doc.splitTextToSize(answer, CONTENT - 80)
      const blockH = (qLines.length as number) * 12 + (aLines.length as number) * 12 + 28

      ensureSpace(blockH)

      // Alternating row tint
      if (globalQ % 2 === 0) fillRect(MARGIN, y, CONTENT, blockH, LIGHT, 3)

      // Number badge
      fillRect(MARGIN + 6, y + 6, 20, 16, TEAL, 3)
      setFont('bold', 7, WHITE)
      doc.text(String(globalQ), MARGIN + 16, y + 17, { align: 'center' })

      // Question
      setFont('bold', 9, NAVY)
      doc.text(qLines, MARGIN + 32, y + 16)

      // Answer
      const ansY = y + (qLines.length as number) * 12 + 16
      setFont('bold', 7, TEAL)
      doc.text('Answer:', MARGIN + 32, ansY)
      setFont('normal', 9, DARK)
      doc.text(aLines, MARGIN + 76, ansY)

      y += blockH + 6
      globalQ++
    }

    y += 10
  }

  addFooter()

  doc.save(`IAQ_Audit_Script_${reportId}.pdf`)
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DownloadScriptButton({ submission }: { submission: Submission }) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      await generateAuditPDF(submission)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="
        inline-flex items-center gap-2
        bg-[#0d9488] hover:bg-teal-700
        disabled:opacity-60 disabled:cursor-not-allowed
        text-white px-8 py-3 rounded-full text-sm font-bold
        transition-all shadow-lg hover:-translate-y-1
      "
    >
      {loading ? (
        <>
          <svg
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          Generating PDF…
        </>
      ) : (
        <>
          <Download className="h-5 w-5" />
          Download My Audit Script
        </>
      )}
    </button>
  )
}