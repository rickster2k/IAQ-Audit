'use client'
import VerificationComponent from "@/components/audit_components/verificationComponent";
import { useState } from "react";
import AuditQuestions from "./auditQuestions";
import { UserResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useAuditStore } from "@/lib/auditStore";

export default function AuditClient () {
    const router = useRouter();
    const [justEntered, setJustEntered] = useState(true);    //state to track if just entering page so on refresh it will reset back to 1 so the verification should be vissible again
    const setStoreResponses = useAuditStore((state) => state.setResponses);

    const onAuditComplete = (userResponses: UserResponse[]) =>{
        // Save responses to Zustand
        setStoreResponses(userResponses);


        //TODO save to firebase database - userResponses
        //pass audit questions along to to to audit/intake page so only if they fill the info out then we save the audit now wasting space then
        router.push('/audit/intake')
        console.log("Audit Complete! ", userResponses)

    }
    return (
        <div className="mt-[15vh] p-6 w-full ">

            {/*if just entered then show the verification component else show questions scroll} */ 
                justEntered ? <VerificationComponent setter={() => {setJustEntered(false)} } />  : <AuditQuestions onComplete={onAuditComplete}  setter={setJustEntered} />
            
            }
        </div>
        )
}