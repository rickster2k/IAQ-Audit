import AdminDashboard from '@/components/admin/fbAdminDashboard'
import { GlobalStats, Submission } from '@/lib/types'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getAllSubmissions } from '../actions/getAllSubmissions';
import { GetGlobalStats } from '../actions/getGlobalStats';
//import { getSubmissions, getSupport, getGlobalStats, getAppSettings } from '@/lib/server/adminQueries'

export default async function AdminPage() {
  //Check if authenticated
    const session = await getServerSession(authOptions);
    

    if (!session) {
      redirect('/');
    }
    
    
    const auditResponse = await getAllSubmissions();
    const audits:Submission[] = auditResponse.submissions
    const globResponse = await GetGlobalStats();
    let globalStats: GlobalStats | null = null
    if(globResponse.success && globResponse.globalStats)
       globalStats = globResponse.globalStats

    const defaultStats: GlobalStats = {
        visits: 0,
        starts: 0,
        reports: 0,
        avgScore: 0,
        announcement: { text: '', url: '' },
        shop: {paymentUrl: "",  pricePoint: 0}
      
    }
  return (
    <AdminDashboard 
      submissions={audits}
      stats={globalStats || defaultStats}
      helpDeskList={[]}
    />
  )
}
