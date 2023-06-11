import { combineReducers } from "redux";
import viewLayoutReducer from "./view_layout/view_reducer";
import isCreateFolderVisible from "./create_Folder/createFolderReducer"
import isDetailsVisible from "./view_details/detailsReducer";
import userReducer from "./fetch/fetch_user/userReducer";
import fileReducer from "./fetch/file/fileReducer";

const rootReducer = combineReducers({
    viewLayout:viewLayoutReducer,
    isCreateFolderVisible,
     isDetailsVisible,
     userReducer,
     fileReducer,
     
    })

export default rootReducer;