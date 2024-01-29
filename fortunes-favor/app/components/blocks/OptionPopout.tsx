import { Dispatch, SetStateAction, useState } from "react";

type popoutProps = {
    child : JSX.Element | undefined;
    showPopout: Dispatch<SetStateAction<boolean>>;
    isSelected?:boolean;
    setSelectedSlug: Dispatch<SetStateAction<string | undefined>>;
}

const OptionPopout = ({child, showPopout, isSelected=false, setSelectedSlug}: popoutProps) => {
    if(!child)
        return;
    const [selected, setSelected] = useState(isSelected);
    const popoutStyle = "w-1/2 h-1/2 mt-40 bg-slate-700 p-4 items-start border-2 relative ".concat(!selected? "border-amber-700 " : "border-emerald-600");
    console.log("child - ", child.props.id);

    return(
        <div className="justify-center items-top flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none container mx-auto"
            onClick={()=> {showPopout(false)}}>
            <div className="w-80"></div>
            <div id={"popout-"+child.props.id} className={popoutStyle}
            onClick={(e)=> {e.stopPropagation(); 
                console.log("clicked - ",e, child.props.id);
                setSelected(true);
                setSelectedSlug(child.props.id);
            }}>
                {child}
                <div className="absolute bottom-0 right-0 m-10">
                    <button 
                        className="p-3 bg-emerald-600 hover:bg-emerald-500 mx-3 rounded-md"
                        onClick={(e)=> {e.stopPropagation(); 
                            console.log("clicked - ",e, child.props.id);
                            setSelected(true);
                            setSelectedSlug(child.props.id);
                    }}>
                        Select
                    </button>
                    <button 
                        className="p-3 bg-red-600 hover:bg-red-500 mx-3 rounded-md"
                        onClick={(e)=> {
                            e.stopPropagation();
                            showPopout(false);
                    }}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OptionPopout;