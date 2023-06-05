import { VIEW_DETAIL_CLOSE, VIEW_DETAIL_OPEN } from "./detailsType";

const initialState = false

const isDetailsVisible = (state=initialState, action)=>{

    switch(action.type){
        case VIEW_DETAIL_OPEN : return state = VIEW_DETAIL_OPEN
        case VIEW_DETAIL_CLOSE : return state = VIEW_DETAIL_CLOSE
        default : return state
    }

}

export default isDetailsVisible;