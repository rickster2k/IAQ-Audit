interface RecoveryEmailProps {
  reportId: string
  firstName: string
  submissionDate: string
}

export function RecoveryEmail({ reportId, firstName, submissionDate }: RecoveryEmailProps) {
  return (
    <html>
      <head />
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f1f5f9', fontFamily: 'system-ui, sans-serif, Arial', fontSize: '16px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 0 32px 0' }}>

          {/* Header */}
          <div style={{ backgroundColor: '#1e3a5f', padding: '24px 32px' }}>
            <a href="https://www.iaqaudit.com" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${process.env.NEXT_PUBLIC_APP_URL}/icon1.png`}
                alt="IAQ Audit"
                height={40}
                style={{ height: '40px', verticalAlign: 'middle' }}
              />
              <span style={{ color: '#ffffff', fontSize: '20px', fontWeight: 700, letterSpacing: '-0.3px' }}>
                IAQ Audit
              </span>
            </a>
          </div>

          {/* Teal accent bar */}
          <div style={{ backgroundColor: '#0d9488', height: '5px' }} />

          {/* Body */}
          <div style={{ backgroundColor: '#ffffff', padding: '36px 32px', borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>

            <p style={{ margin: '0 0 20px 0', color: '#1e3a5f', fontSize: '22px', fontWeight: 700 }}>
              Hi {firstName}, here is your Audit Report ID.
            </p>

            <p style={{ margin: '0 0 16px 0', color: '#475569', lineHeight: 1.6 }}>
              We received a request to recover your IAQ Audit Report ID. Your most recent report details are below.
            </p>

            {/* Report ID card */}
            <div style={{ backgroundColor: '#f1f5f9', borderLeft: '4px solid #0d9488', borderRadius: '4px', padding: '20px 24px', margin: '24px 0' }}>
              <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Your Most Recent Report
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '6px 0', color: '#64748b', fontSize: '14px', width: '140px' }}>Report ID</td>
                    <td style={{ padding: '6px 0', color: '#0d9488', fontWeight: 700, fontSize: '18px', fontFamily: 'monospace' }}>{reportId}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 0', color: '#64748b', fontSize: '14px' }}>Submitted</td>
                    <td style={{ padding: '6px 0', color: '#1e3a5f', fontWeight: 700, fontSize: '14px' }}>{submissionDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ margin: '0 0 24px 0', color: '#475569', lineHeight: 1.6 }}>
              Use your Report ID to sign in and view your full audit results, professional summary, and recommendations.
            </p>

            {/* CTA Button */}
            <div style={{ margin: '0 0 28px 0' }}>
              <a
                href="https://www.iaqaudit.com/user"
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
                Sign In With Your Report ID
              </a>
            </div>

            <p style={{ margin: '0 0 16px 0', color: '#475569', lineHeight: 1.6 }}>
              If you didn&apos;t request this, you can safely ignore this email. If you need further help,{' '}
              <a href="https://www.iaqaudit.com/support" style={{ textDecoration: 'none', color: '#0d9488', fontWeight: 600 }}>
                visit our support team
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
              <a href="https://iaq.network" style={{ color: '#0d9488', textDecoration: 'none' }}>
                iaq.network
              </a>
            </p>
          </div>

        </div>
      </body>
    </html>
  )
}