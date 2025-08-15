import { useEffect,useState } from "react";
import { useNavigation } from "react-router-dom";
const userPromptPreloader=()=>{
    const navigation=useNavigation()
    const [promptPreloaderValue,setpromptPreloaderValue]=useState('')
    useEffect(()=>{
        if(navigation.formData){
          setpromptPreloaderValue(navigation.formData.get('user_prompt'))
        }else{
            setpromptPreloaderValue('')
        }
    },[navigation])

    return {promptPreloaderValue}

}
export {userPromptPreloader}