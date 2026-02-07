import { ContactInfo } from "@/lib/types";
import { ThankYou } from "../ai_studio_components/ThankYou";


type ThankYouClientProps = {
    contactInfo: ContactInfo;
}
export default function ThankYouClient({contactInfo}: ThankYouClientProps) {
    return (
        <div className="p-6 w-full"><ThankYou contact={contactInfo} /></div>
    )
}