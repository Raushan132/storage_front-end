import {SHARE_BTN_VISIBLE,SHARE_BTN_NOT_VISIBLE} from './shareBtnTypes'


const shareBtnVisible = ()=>{
    return {
        type:SHARE_BTN_VISIBLE,
        payload:true
    }
}

const shareBtnNotVisible = ()=>{
    return {
        type:SHARE_BTN_NOT_VISIBLE,
        payload:false
    }
}

export const shareVisible = (val)=>{

    return (dispatch)=>{
        val? dispatch(shareBtnVisible()) : dispatch(shareBtnNotVisible())
    }

}
