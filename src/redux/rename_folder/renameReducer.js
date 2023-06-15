import { RENAME_IS_VISIBLE, RENAME_IS_NOT_VISIBLE } from "./renameTypes";

const initialState = {
    visible:false
}

const renameVisibleReduce = (state=initialState,action)=>{
       
    switch(action.type){
        case RENAME_IS_VISIBLE: return {
            visible:true
        }
        case RENAME_IS_NOT_VISIBLE: return {
            visible:false
        }

        default: return state
    }
}


export default renameVisibleReduce
