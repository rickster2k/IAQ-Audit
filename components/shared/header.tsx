'use client'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header() {
    const { data: session } = useSession()
    const isAdmin = session?.user?.admin === true
    const router = useRouter()


    // Track if user has audit data in sessionStorage
    const [hasAuditData, setHasAuditData] = useState(false)

    useEffect(() => {
      // Check if user has active audit session
      const checkAuditSession = () => {
        const auditData = sessionStorage.getItem('audit')
        setHasAuditData(!!auditData)
      }

      checkAuditSession()

      // Listen for storage changes (when user logs in/out)
      window.addEventListener('storage', checkAuditSession)
      
      // Custom event for same-tab updates
      window.addEventListener('audit-session-change', checkAuditSession)

      return () => {
        window.removeEventListener('storage', checkAuditSession)
        window.removeEventListener('audit-session-change', checkAuditSession)
      }
    }, [])

    const handleSignOut = () => {
      if (isAdmin) {
        signOut({ callbackUrl: '/' })
      } else if (hasAuditData) {
        // Clear audit session
        sessionStorage.removeItem('audit')
        sessionStorage.removeItem('announcement')
        sessionStorage.removeItem('friends')
        setHasAuditData(false)
        
        // Dispatch custom event for other components
        window.dispatchEvent(new Event('audit-session-change'))
        
        // Redirect to home
        router.push('/')
      }
    }

  return (
    <header className="bg-white border-b border-slate-100 py-3 px-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-4">

        {/* Logo / Home reset */}
        <Link
          href="/"
          onClick={handleSignOut}
          className="flex items-center cursor-pointer order-2 md:order-1"
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#1e3a5f] p-2 rounded-2xl shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-3xl font-black text-[#1e3a5f] tracking-tighter">
                IAQ <span className="text-[#0d9488]">Audit</span>
              </span>
            </div>
          </div>
        </Link>

        {/* Center attribution */}
        <div className="flex flex-col items-center order-1 md:order-2">
          <p className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-bold mb-1">
            Audit Courtesy of:
          </p>
          <a
            href="https://www.iaq.network"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:opacity-80 text-2xl font-black"
          >
            <span className="text-[#1E3A5F]">IAQ</span>
            <span className="text-[#0d9488]">.network</span>
          </a>
        </div>

        {/* Right side */}
        <div className="flex items-center justify-end gap-6 order-3">
          {!isAdmin && (
            <button
              onClick={() => (session || hasAuditData) ? handleSignOut() : router.replace('/login/user')}
              className="text-sm font-bold text-slate-400 hover:text-[#1e3a5f]"
            >
              {session || hasAuditData  ? 'Sign Out' : 'Sign In'}
            </button>
          )}
        </div>

      </div>
    </header>
  )
}
