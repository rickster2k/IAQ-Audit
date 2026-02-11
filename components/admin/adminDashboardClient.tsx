import { GlobalStats, Submission } from "@/lib/types";
import { signOut } from 'next-auth/react'


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
        <Stat label="Visits" value={stats.visits} />
        <Stat label="Starts" value={stats.starts} />
        <Stat label="Reports" value={stats.reports} />
        <Stat label="Avg Risk Score" value={stats.avgScore} />
      </div>

        
      </div>
    )
}


function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <div className="text-xs uppercase text-slate-500">{label}</div>
      <div className="text-2xl font-bold text-orange-600">
        {value}
      </div>
    </div>
  )
}