import { FETCH_FILE_REQUEST, FETCH_FILE_SUCCESS,FETCH_FILE_FAILURE } from "./fileTypes"; 

const initialstate = {
    loading:false,
    file:[],
    error:''
}

const fileReducer =(state=initialstate, action)=>{
    switch(action.type){
        case FETCH_FILE_REQUEST: return {
            ...state,
            loading:true
        }
        case FETCH_FILE_SUCCESS : return {
            ...state,
            loading:false,
            file: action.payload
        }
        case FETCH_FILE_FAILURE : return {
            ...state,
            loading:false,
            error: action.payloade
        }
        default: return state
    }

}

export default fileReducer;