"use client"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import useAlert from "../hooks/useAlert";

const handleLinkClick = (path: string, setAlert: Function) => {
    navigator.clipboard.writeText(path);
    setAlert("Link copied", "none")
}
// TODO: add alert that link was added to clipboard.
const CopyLink =({target}: {target: string}) => {
    const { setAlert } = useAlert();
    const linkPath = `${usePathname()}#${target}`;
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';
    const size = '1.25rem'
    return(
        <Link href={linkPath} className="" onClick={()=> {handleLinkClick(origin+linkPath, setAlert)}}>
            <svg className="fill-teal-500 dark:hover:fill-teal-300 hover:fill-teal-700 inline" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
                width={size} height={size} viewBox="0 0 24 24"><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="ic_fluent_copy_24_regular"> <path d="M5.50280381,4.62704038 L5.5,6.75 L5.5,17.2542087 C5.5,19.0491342 6.95507456,20.5042087 8.75,20.5042087 L17.3662868,20.5044622 C17.057338,21.3782241 16.2239751,22.0042087 15.2444057,22.0042087 L8.75,22.0042087 C6.12664744,22.0042087 4,19.8775613 4,17.2542087 L4,6.75 C4,5.76928848 4.62744523,4.93512464 5.50280381,4.62704038 Z M17.75,2 C18.9926407,2 20,3.00735931 20,4.25 L20,17.25 C20,18.4926407 18.9926407,19.5 17.75,19.5 L8.75,19.5 C7.50735931,19.5 6.5,18.4926407 6.5,17.25 L6.5,4.25 C6.5,3.00735931 7.50735931,2 8.75,2 L17.75,2 Z M17.75,3.5 L8.75,3.5 C8.33578644,3.5 8,3.83578644 8,4.25 L8,17.25 C8,17.6642136 8.33578644,18 8.75,18 L17.75,18 C18.1642136,18 18.5,17.6642136 18.5,17.25 L18.5,4.25 C18.5,3.83578644 18.1642136,3.5 17.75,3.5 Z" id="🎨-Color"> </path> </g>
            </svg>
        </Link>
    )
  }
export default CopyLink;