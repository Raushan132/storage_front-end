import { combineReducers } from "redux";
import viewLayoutReducer from "./view_layout/view_reducer";
import isCreateFolderVisible from "./create_Folder/createFolderReducer"

const rootReducer = combineReducers({viewLayout:viewLayoutReducer,isCreateFolderVisible})

export default rootReducer;