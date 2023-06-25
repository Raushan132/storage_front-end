import {FETCH_SHARE_FILE_USER_REQUEST,FETCH_SHARE_FILE_USER_SUCCESS,FETCH_SHARE_FILE_USER_FAILURE} from './shareFileTypes'

const initialState={
    loading:false,
    sharedUserInfo:"",
    error:""
}

const sharedFileAndUserReducer =(state=initialState, action)=>{
    switch(action.type){
        case FETCH_SHARE_FILE_USER_REQUEST: return {
            ...state,
            loading:true
        }
        case FETCH_SHARE_FILE_USER_SUCCESS : return {
            ...state,
            loading:false,
            sharedUserInfo: action.payload
        }
        case FETCH_SHARE_FILE_USER_FAILURE : return {
            ...state,
            loading:false,
            error: action.payloade
        }
        default: return state
    }

}



export default sharedFileAndUserReducer;