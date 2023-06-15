import { RENAME_IS_VISIBLE,RENAME_IS_NOT_VISIBLE } from "./renameTypes";

const renameIsVisible = ()=>{
    return{
        type: RENAME_IS_VISIBLE,
        payload:true

    }
}

const renameIsNotVisible =() =>{
     return{
        type:RENAME_IS_NOT_VISIBLE,
        payload:false
     }
}


export const renameVisible = (val)=>{
    return (dispatch) =>{
       
        val? dispatch(renameIsVisible()): dispatch(renameIsNotVisible())
    }

}



