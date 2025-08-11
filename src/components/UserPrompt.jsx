import Avatar from "./Avatar"
import PropTypes from "prop-types"
import { useLoaderData } from "react-router-dom"
import { useToggle } from "../hooks/useToggle"
import { Iconbtn } from "./Button"
import { useRef,useEffect,useState } from "react"
const UserPrompt = ({text}) => {
    const{user}=useLoaderData()
    const textboxRef=useRef()
    const[hasMoreContent,setMoreContent]=useState(false)
    const[isExpanded,toggleExpand]=useToggle();
    useEffect(()=>{
      setMoreContent(
       textboxRef.current.scrollHeight>textboxRef.current.clientHeight,
      )
    },[textboxRef])
  return (
    
    <div className="grid grid-cols-1 items-center gap-1 py-4 md:grid-cols-[max-content,minmax(0,1fr),max-content] md:gap-5">
        <Avatar name={user?.name}/>
        <p className={`text-bodyLarge pt-1 whitespace-pre-wrap ${isExpanded?'line-clamp-4':''}`} ref={textboxRef}>
            {text}
            
        </p>

        {hasMoreContent &&(
            <Iconbtn 
            icon={!isExpanded?'keyboard_arrow_up':'keyboard_arrow_down'}
            onClick={toggleExpand}
            title={isExpanded?'Collapse text':'Expand text'}
            />
        )}
        
    </div>
  )
}
UserPrompt.propTypes={
    text:PropTypes.string,
}

export default UserPrompt