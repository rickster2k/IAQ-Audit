import AdminDashboard from '@/components/admin/fbAdminDashboard'
import { GlobalStats, Submission } from '@/lib/types'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { handler } from '../api/auth/[...nextauth]/route';
//import { getSubmissions, getSupport, getGlobalStats, getAppSettings } from '@/lib/server/adminQueries'

export default async function AdminPage() {
  //Check if authenticated
    const session = await getServerSession(handler);

    if (!session) {
      redirect('/');
    }
  /*const [
    submissions,
    stats,
  ] = await Promise.all([
    getSubmissions(),
    getSupport(),
    getGlobalStats(),
    getAppSettings()
  ])*/
    const submissions: Submission[] = []
    const stats: GlobalStats = {
        visits: 0,
        starts: 0,
        reports: 0,
        avgScore: 5,
        announcement: { text: '', url: '' },
        shop: {paymentUrl: "",  pricePoint: 45}
      
    }
  return (
    <AdminDashboard 
      submissions={submissions}
      stats={stats}
      helpDeskList={[]}
    />
  )
}
