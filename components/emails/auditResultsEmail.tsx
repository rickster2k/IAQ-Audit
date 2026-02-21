
interface AuditResultsEmailProps {
  firstName: string
  reportId: string
  score: number
  riskLevel: string,
  email: string,
}

export function AuditResultsEmail({
  firstName,
  reportId,
  score,
  riskLevel,
  email,
}: AuditResultsEmailProps) {
  const riskColor =
    riskLevel === 'Low'      ? '#16a34a' :
    riskLevel === 'Moderate' ? '#ca8a04' :
    riskLevel === 'High'     ? '#ea580c' :
                               '#dc2626'

  return (
    <html>
      <head />
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f1f5f9', fontFamily: 'system-ui, sans-serif, Arial', fontSize: '16px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 0 32px 0' }}>

          {/* Header */}
          <div style={{ backgroundColor: '#1e3a5f', padding: '24px 32px' }}>
            <a href={`${process.env.NEXT_PUBLIC_APP_URL}`} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${process.env.NEXT_PUBLIC_APP_URL}/icon1.png`}                alt="IAQ Audit"
                height={40}
                style={{ height: '40px', verticalAlign: 'middle' }}
              />
              <span style={{ color: '#ffffff', fontSize: '35px', fontWeight: 700, letterSpacing: '-0.3px' }}>
                    IAQ 
                    <span style={{ color: '#0d9488'}}>
                        Audit
                    </span>
              </span>
            </a>
          </div>

          {/* Teal accent bar */}
          <div style={{ backgroundColor: '#0d9488', height: '5px' }} />

          {/* Body */}
          <div style={{ backgroundColor: '#ffffff', padding: '36px 32px', borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>

            <p style={{ margin: '0 0 20px 0', color: '#1e3a5f', fontSize: '22px', fontWeight: 700 }}>
              Hi {firstName}, your IAQ Audit Report is ready.
            </p>

            <p style={{ margin: '0 0 16px 0', color: '#475569', lineHeight: 1.6 }}>
              Thank you for completing your IAQ Audit. Your full Q&A transcript can be accessed using the link below.
            </p>

            {/* Score card */}
            <div style={{ backgroundColor: '#f1f5f9', borderLeft: '4px solid #0d9488', borderRadius: '4px', padding: '20px 24px', margin: '24px 0' }}>
              <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Your Results
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '6px 0', color: '#64748b', fontSize: '14px', width: '140px' }}>Health Risk Score</td>
                    <td style={{ padding: '6px 0', color: '#1e3a5f', fontWeight: 700, fontSize: '14px' }}>{score} / 100</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 0', color: '#64748b', fontSize: '14px' }}>Risk Level</td>
                    <td style={{ padding: '6px 0', color: riskColor, fontWeight: 700, fontSize: '14px' }}>{riskLevel}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 0', color: '#64748b', fontSize: '14px' }}>Report ID</td>
                    <td style={{ padding: '6px 0', color: '#0d9488', fontWeight: 700, fontSize: '14px', fontFamily: 'monospace' }}>{reportId}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ margin: '0 0 8px 0', color: '#475569', lineHeight: 1.6 }}>
              If you want a copy of your Audit, you can download your own Audit Summary PDF which contains:
            </p>
            <ul style={{ margin: '0 0 24px 0', paddingLeft: '20px', color: '#475569', lineHeight: 2 }}>
              <li>Your complete Q&A transcript</li>
              <li>A professional summary of your home&apos;s air quality</li>
              <li>Critical recommendations tailored to your results</li>
            </ul>

            {/* CTA Button */}
            <div style={{ margin: '0 0 28px 0' }}>
              <a
                href={`${process.env.NEXT_PUBLIC_APP_URL}/login/user?email=${encodeURIComponent(email)}&reportId=${encodeURIComponent(reportId)}`}
                style={{
                  display: 'inline-block',
                  textDecoration: 'none',
                  color: '#ffffff',
                  backgroundColor: '#0d9488',
                  padding: '12px 28px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '15px',
                }}
              >
                Visit IAQ Audit to View Your Report Online
              </a>
            </div>

            <p style={{ margin: '0 0 16px 0', color: '#475569', lineHeight: 1.6 }}>
              If you have any questions about your results or would like a detailed professional review,{' '}
              <a href={`${process.env.NEXT_PUBLIC_APP_URL}/support`} style={{ textDecoration: 'none', color: '#0d9488', fontWeight: 600 }}>
                visit here to get in touch with our support team
              </a>.
            </p>

            <p style={{ margin: 0, color: '#475569', lineHeight: 1.6 }}>
              Best regards,<br />
              <span style={{ color: '#1e3a5f', fontWeight: 700 }}>The IAQ Network Team</span>
            </p>
          </div>

          {/* Footer */}
          <div style={{ backgroundColor: '#1e3a5f', padding: '20px 32px' }}>
            <p style={{ margin: '0 0 4px 0', color: '#94a3b8', fontSize: '11px', textAlign: 'center' }}>
              This report is for informational purposes only and does not constitute professional advice.
            </p>
            <p style={{ margin: 0, color: '#64748b', fontSize: '11px', textAlign: 'center' }}>
              © 2026 IAQ Network |{' '}
              <a href="https://www.iaq.network" style={{ color: '#0d9488', textDecoration: 'none' }}>
                iaq.network
              </a>
            </p>
          </div>

        </div>
      </body>
    </html>
  )
}