import { HumanVerification } from "../ai_studio_components/HumanVerification"

type VerificationComponentProps = {
    setter: (value: boolean) => void
}
export default function VerificationComponent({setter}:VerificationComponentProps){

    
    const onVerify =() => {
        //TODO call to something?
        console.log("Verified! ")
        setter(false)
    }
   return (
        <div>
            
            <HumanVerification onVerify={onVerify}/>

        </div>    
   ) 
}