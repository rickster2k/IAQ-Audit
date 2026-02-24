import { GetGlobalStats } from "@/app/actions/getGlobalStats";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import  ProfessionalReview  from "@/components/ai_studio_components/ProfessionalReview";
import { GlobalStats } from "@/lib/types";
import { verifyUserIsValid } from "@/lib/utils/verifyUserIsValid";
import { getServerSession } from "next-auth";

export default async function Review(){
    await verifyUserIsValid()
    let globalStats:GlobalStats | null = null


    
    const response = await GetGlobalStats()
    const session = await getServerSession(authOptions);
    
    if(response.success && response.globalStats){
        globalStats = response.globalStats
    }
    else{
        console.error("Failed to fetch global stats")
    }


    let isAdmin = false;
    
    if(session?.user.admin){
        isAdmin = session?.user?.admin 
    }
    
    
    
    return (
         <div className="w-full p-6">
           <ProfessionalReview shop={globalStats?.shop} isAdmin={isAdmin}/> 
        </div>
    )
}