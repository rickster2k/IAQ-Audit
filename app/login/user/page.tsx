import UserLogin from "@/components/user/fbUserLogin";
import { Suspense } from "react";

export default function UserLoginPage(){
    return (
       <Suspense fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#0d9488] border-t-transparent rounded-full animate-spin" />
            </div>
            }>
            <UserLogin />
        </Suspense>
    )
}