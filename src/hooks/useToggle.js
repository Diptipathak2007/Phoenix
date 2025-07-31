import { useState,useCallback, use } from "react";
const useToggle = (initialState = false) => {
    const[isOpen,setToggle]=useState(false)
    const toggle=useCallback(()=>{
        setToggle(prev => !prev);
       
    }
    
    ,[]);
    return [isOpen, toggle];
}

export{useToggle};