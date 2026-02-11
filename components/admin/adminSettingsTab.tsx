'use client'

import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/services/firebase'
import { GlobalStats } from '@/lib/types'
import { updateAvgScore, updateShop } from '@/app/actions/updateGlobalStats'
import { useRouter } from 'next/navigation'

interface AdminSettingsTabProps {
  globalStats: GlobalStats
}

export default function AdminSettingsTab({ globalStats }: AdminSettingsTabProps) {
  const [paymentUrl, setPaymentUrl] = useState(globalStats.shop?.paymentUrl || '')
  const [pricePoint, setPricePoint] = useState(globalStats.shop?.pricePoint?.toString() || '')
  const [settingsSaved, setSettingsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    setSettingsSaved(false)

    try {
      const statsRef = doc(db, 'globalStats', 'stats')
      
      // Update only the shop field, not the entire document
      await updateDoc(statsRef, {
        'shop.paymentUrl': paymentUrl,
        'shop.pricePoint': parseFloat(pricePoint) || 0
      })

      setSettingsSaved(true)
      setTimeout(() => setSettingsSaved(false), 3000)
    } catch (err) {
      console.error('Failed to save settings:', err)
      setError('Failed to save settings. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }


  const handleUpdateAvgScoreClick = async () => {
    
    const res = await updateAvgScore()
    if (res.success){
      alert("Success Avg Risk Score (In Sync with DB)")
      router.refresh()
    }else{
      alert("Failed to sync avg risk")
    }
  }

  const handleUpdateShopClick = async () => {

    const res = await updateShop(paymentUrl, pricePoint)
    if (res.success){
      alert("Success Updated Shop Values")
      router.refresh()
    }else{
      alert("Failed to update shop values")
    }
  }
  return (
    <div className='flex flex-col gap-4'>
    
    <div className="bg-white rounded-2xl shadow-lg border p-8 max-w-2xl flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-[#1e3a5f]">System Settings</h2>
      <button onClick={handleUpdateAvgScoreClick} className='bg-[#1e3a5f] hover:bg-[#2d5485] text-white px-8 py-3 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
        Sync Avg Risk Score
      </button>
    </div>
    
    
  {/* Global Shop Configuration */}
      <div className="bg-white rounded-2xl shadow-lg border p-8 max-w-2xl flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-[#1e3a5f]">Global Shop Configuration</h2>
        <form onSubmit={handleUpdateShopClick} className="space-y-6">
          {/* Payment URL */}
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700">
              Payment/Checkout URL
            </label>
            <input
              type="url"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
              value={paymentUrl}
              onChange={(e) => setPaymentUrl(e.target.value)}
              placeholder="https://buy.stripe.com/..."
              required
            />
            <p className="text-xs text-slate-500 mt-2">
              Paste your Stripe Payment Link, PayPal checkout URL, Calendly booking link, or custom checkout page
            </p>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700">
              Price (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-slate-500">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                className="w-full p-3 pl-8 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0d9488] focus:border-transparent"
                value={pricePoint}
                onChange={(e) => setPricePoint(e.target.value)}
                placeholder="49.00"
                required
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              The price displayed on all &quot;Order Professional Review&quot; buttons (e.g., 49.00 for $49)
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Save Button */}
          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#1e3a5f] hover:bg-[#2d5485] text-white px-8 py-3 rounded-xl font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>

          {/* Success Message */}
          {settingsSaved && (
            <p className="text-green-600 font-bold mt-2 animate-fade-in">
              ✓ Settings saved to cloud!
            </p>
          )}
        </form>

        {/* Common Payment Options */}
        <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h3 className="font-bold text-sm text-slate-700 mb-2">Common Payment Options:</h3>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>• <strong>Stripe Payment Link:</strong> https://buy.stripe.com/...</li>
            <li>• <strong>PayPal:</strong> https://paypal.me/yourbusiness</li>
            <li>• <strong>Calendly:</strong> https://calendly.com/yourname/consultation</li>
            <li>• <strong>Custom Store:</strong> https://yourwebsite.com/iaq-review</li>
          </ul>
        </div>
      </div>
    </div>
  )
}