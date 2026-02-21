import { GlobalStats, Submission } from "@/lib/types";
import { signOut } from 'next-auth/react'
import HintTooltip from "../shared/toolTip";


type AdminDashboardDisplayProps = {
    stats: GlobalStats,
    submissions: Submission[]
}
export default function AdminDashboardClient({stats}: AdminDashboardDisplayProps){

    return (
    <div className="flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#1e3a5f]">
          Admin Dashboard
        </h1>
        <button
          onClick={() => signOut({ callbackUrl: '/login/adminLogin' })}
          className="text-slate-500 hover:text-[#1e3a5f]"
        >
          Sign out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Stat label="Visits" value={stats.visits} hint="Total number of unique visits to your landing page. This is your reach metric."/>
        <Stat label="Starts" value={stats.starts} hint="Tracks initial engagement when a user clicks 'Start Free Audit'. This is your top-of-funnel metric. Compare Visits→Starts to measure landing page effectiveness, and Starts→Reports to identify drop-off points."/>
        <Stat label="Reports" value={stats.reports} hint="Total completed assessments. This represents actual conversions from your funnel."/>
        <Stat label="Avg Risk Score" value={stats.avgScore} hint="Average risk score across all completed reports. Helps you understand the typical risk profile of your audience."/>
      </div>

        
      </div>
    )
}


function Stat({ label, value, hint }: { label: string; value: number | string , hint?: string }) {
  return (
  <div className="bg-white p-4 rounded-xl border">
    <div className="flex flex-row gap-4 items-center">
      <div className="text-xs uppercase text-slate-500">{label}</div>
      {hint && (
        <div className="ml-auto">
          <HintTooltip text={hint}/>
        </div>
      )}
    </div>
    
    <div className="text-2xl font-bold text-orange-600">
      {value}
    </div>
  </div>
  )
}