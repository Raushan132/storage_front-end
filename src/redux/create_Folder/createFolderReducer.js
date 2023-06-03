import { CREATE_FOLDER_VISIBLE,CREATE_FOLDER_NOT_VISIBLE } from "./createFolderType";

const initialState = false;

const isCreateFolderVisible =(state=initialState, action)=>{
     
     switch(action.type){
        case CREATE_FOLDER_VISIBLE:  return state= CREATE_FOLDER_VISIBLE
        case CREATE_FOLDER_NOT_VISIBLE:  return state= CREATE_FOLDER_NOT_VISIBLE
        default: return state
     }
}

export default isCreateFolderVisible;