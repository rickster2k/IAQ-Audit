
import UserReportClient from "@/components/user/userReportClient";
import { verifyUserIsValid } from "@/lib/utils/verifyUserIsValid";





export default async function UserReportPage(){
    await verifyUserIsValid()
    
    return (
        <div className="p-6 w-full">

            <UserReportClient />
          </div>
    )
}