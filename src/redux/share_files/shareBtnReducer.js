import {SHARE_BTN_VISIBLE,SHARE_BTN_NOT_VISIBLE} from './shareBtnTypes'

const initialState= {
     shareBtnVisible:false
}


const isShareBtnVisible = (state=initialState,action)=>{
    switch(action.type){
        case SHARE_BTN_VISIBLE: return { shareBtnVisible:action.payload}
        case SHARE_BTN_NOT_VISIBLE: return { shareBtnVisible:action.payload}
        default:return state
    }

}

export default isShareBtnVisible