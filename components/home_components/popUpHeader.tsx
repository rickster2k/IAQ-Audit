import Link from "next/link";


export default function PopUpHeader(){
    return(
        <div className="bg-orange-500 text-white py-2.5 px-4 text-center text-sm font-bold z-60 relative">
          The EPA reports indoor air can be 2-5x more polluted than outdoor air.{" "}
          <Link href= "/verification" className="underline hover:text-orange-100 transition-colors">Check your home air now → </Link>
        </div>
    )
}