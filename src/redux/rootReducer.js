import { combineReducers } from "redux";
import viewLayoutReducer from "./view_layout/view_reducer";
import isCreateFolderVisible from "./create_Folder/createFolderReducer"
import isDetailsVisible from "./view_details/detailsReducer";
import userReducer from "./fetch/fetch_user/userReducer";
import fileReducer from "./fetch/file/fileReducer";
import singleFileReducer from "./fetch/file/singleFileReducer";
import renameVisibleReduce from "./rename_folder/renameReducer";
import isRender from "./render/renderReducer";
import isShareBtnVisible from "./share_files/shareBtnReducer";
import sharedFileAndUserReducer from "./share_files/shareFileReducer";

const rootReducer = combineReducers({
    viewLayout:viewLayoutReducer,
    isCreateFolderVisible,
     isDetailsVisible,
     userReducer,
     fileReducer,
     singleFileReducer,
     renameVisibleReduce,
     isRender,
     isShareBtnVisible,
     sharedFileAndUserReducer
     
    })

export default rootReducer;