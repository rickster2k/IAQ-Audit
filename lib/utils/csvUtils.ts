import { Submission } from '@/lib/types'

export function submissionsToCsvString(submissions: Submission[]): string {
  // CSV headers
  const headers = ['Report ID', 'First Name', 'Last Name', 'Email', 'Date', 'Time', 'Score', 'Risk Level']
  
  // CSV rows
  const rows = submissions.map(sub => {
    const firstName = escapeCsvValue(sub.contact.firstName)
    const lastName = escapeCsvValue(sub.contact.lastName)
    const email = escapeCsvValue(sub.contact.email)
    const date = new Date(sub.timestamp)
    const dateOnly = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
    const timeOnly = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })
    const score = sub.result.score
    const riskLevel = sub.result.riskLevel

    return [sub.reportId, firstName, lastName, email, dateOnly,timeOnly, score, riskLevel]
  })

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  return csvContent
}

function escapeCsvValue(value: string): string {
  // Escape double quotes and wrap in quotes if contains comma, quote, or newline
  if (!value) return ''
  const needsQuotes = value.includes(',') || value.includes('"') || value.includes('\n')
  const escaped = value.replace(/"/g, '""')
  return needsQuotes ? `"${escaped}"` : escaped
}

export function downloadCsv(csvString: string, filename: string) {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}