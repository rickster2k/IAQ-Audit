import { ContactInfo, Submission } from "@/lib/types";
import  ThankYou  from "../ai_studio_components/ThankYou";


type ThankYouClientProps = {
    contactInfo: ContactInfo,
    submission: Submission
}
export default function ThankYouClient({contactInfo, submission}: ThankYouClientProps) {
    return (
        <div className="p-6 w-full"><ThankYou contact={contactInfo} submission={submission}/></div>
    )
}