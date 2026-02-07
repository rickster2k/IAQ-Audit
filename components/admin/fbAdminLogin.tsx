'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return

    setError('')
    setLoading(true)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // we handle routing
    })

    if (result?.error) {
      setError('Invalid credentials or insufficient permissions.')
      setLoading(false)
      return
    }

    // ✅ Session now exists, middleware will allow access
    router.replace('/admin')
  }

  return (
    <div className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-xl mt-20">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          required
          placeholder="Admin Email"
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          required
          placeholder="Password"
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1e3a5f] hover:bg-[#2d5485] text-white py-3 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
