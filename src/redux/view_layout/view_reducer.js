import { GRIDVIEW,LISTVIEW } from "./viewTypes";

const initialState= GRIDVIEW

const viewLayoutReducer= (state=initialState, action)=>{
     switch(action.type){
        case GRIDVIEW: return state= GRIDVIEW
        case LISTVIEW: return state= LISTVIEW
        default: return state= GRIDVIEW
     }
}

export default viewLayoutReducer