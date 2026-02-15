import AdminDashboard from '@/components/admin/fbAdminDashboard'
import { GlobalStats, Submission, SupportSubmission } from '@/lib/types'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { GetGlobalStats } from '../actions/getGlobalStats';
import { getSupportRequestsPagination } from '../actions/getSupportRequestsPagination';
import { getAuditSubmissionsPagination } from '../actions/getAuditSubmissionsPagination';


const defaultStats: GlobalStats = {
    visits: 0,
    starts: 0,
    reports: 0,
    avgScore: 0,
    announcement: { text: '', url: '' },
    shop: {paymentUrl: "",  pricePoint: 0}
  
}


export default async function AdminPage() {
    //Check if authenticated
    const session = await getServerSession(authOptions);
      

    if (!session) {
      redirect('/');
    }

      
    const auditResponse = await getAuditSubmissionsPagination()//await getAllSubmissions();
    const globResponse = await GetGlobalStats();
    const helpDeskResponse = await getSupportRequestsPagination();

    let globalStats: GlobalStats | null = null
    let audits:Submission[] = []
    let nextCursor_audits: string = ""
    let hasMore_audits: boolean = false
    let helpDeskSubmissions: SupportSubmission[] = []
    let nextCursor_helpDesk: string = ""
    let hasMore_helpDesk: boolean = false
    if(globResponse.success && globResponse.globalStats)
        globalStats = globResponse.globalStats

    if(helpDeskResponse.success){
      helpDeskSubmissions = helpDeskResponse.data
      nextCursor_helpDesk = helpDeskResponse.nextCursor ?? ""
      hasMore_helpDesk = helpDeskResponse.hasMore
    }

    if(auditResponse.success){
      audits = auditResponse.data
      nextCursor_audits = auditResponse.nextCursor ?? ""
      hasMore_audits = auditResponse.hasMore
    }
      
    //console.log("helpdesub: ", helpDeskSubmissions)
    //console.log("nextCursor: ", nextCursor)
    //console.log("hasMore: ", hasMore)


    return (
      <AdminDashboard 
        submissions={audits}
        stats={globalStats || defaultStats}
        helpDeskList={helpDeskSubmissions}
        nextCursor_helpDesk={nextCursor_helpDesk}
        hasMore_helpDesk={hasMore_helpDesk}
        nextCursor_audits={nextCursor_audits}
        hasMore_audits={hasMore_audits}
      />
    )
}
