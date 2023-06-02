import { combineReducers } from "redux";
import viewLayoutReducer from "./view_layout/view_reducer";

const rootReducer = combineReducers({viewLayout:viewLayoutReducer})

export default rootReducer;