import LandingPageMain from "@/components/home_components/landingPageMain";
import { GetGlobalStats } from "./actions/getGlobalStats";

export default async function Home() {

  const res = await GetGlobalStats()
  let reportCt:number = 0
  if(res.success){
    reportCt = res.globalStats?.reports ?? 0
    //console.log("grabbed stats successfully",reportCt)

  }else{
    console.error("failed to grab stats")
  }
  //const reportCt = res.success && res.globalStats?.reports ? res.globalStats.reports : 0


  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background font-sans">

          <LandingPageMain  reportCount={reportCt} />
          
         
    </div>
  );
}
