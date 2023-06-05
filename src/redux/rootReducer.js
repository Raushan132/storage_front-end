import { combineReducers } from "redux";
import viewLayoutReducer from "./view_layout/view_reducer";
import isCreateFolderVisible from "./create_Folder/createFolderReducer"
import isDetailsVisible from "./view_details/detailsReducer";

const rootReducer = combineReducers({viewLayout:viewLayoutReducer,isCreateFolderVisible, isDetailsVisible})

export default rootReducer;