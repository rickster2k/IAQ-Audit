import { Submission } from "@/lib/types"
import Link from "next/link"

type AdminAuditTabProps = {
    submissions: Submission[]
}
export default function AdminAuditTab({submissions}: AdminAuditTabProps) {
    return (
        <>
            {/* Submissions Table */}
            <div className="bg-white rounded-xl border overflow-hidden">
                <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b">
                    <tr>
                    <th className="text-left p-3">Report</th>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Score</th>
                    <th className="p-3" />
                    </tr>
                </thead>
                <tbody>
                    {submissions.map(sub => (
                    <tr key={sub.id} className="border-b last:border-0">
                        <td className="p-3 font-mono">{sub.reportId}</td>
                        <td className="p-3">
                        {sub.contact.firstName} {sub.contact.lastName}
                        </td>
                        <td className="p-3">{sub.contact.email}</td>
                        <td className="p-3 font-semibold">
                        {sub.result.score}
                        </td>
                        <td className="p-3 text-right">
                        <Link
                            href={`/admin/reports/${sub.reportId}`}
                            className="text-blue-600 hover:underline"
                        >
                            View
                        </Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>

                {!submissions.length && (
                <div className="p-6 text-center text-slate-500">
                    No reports found.
                </div>
                )}
                </div>
        
        
        </>
    )
}