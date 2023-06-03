import { CREATE_FOLDER_VISIBLE, CREATE_FOLDER_NOT_VISIBLE } from "./createFolderType";

export const createFolderVisible = ()=>{
    return {
         type: CREATE_FOLDER_VISIBLE,
         payload: true
    }
}

export const createFolderNotVisible = ()=>{
    return {
         type: CREATE_FOLDER_NOT_VISIBLE,
         payload: false
    }
}