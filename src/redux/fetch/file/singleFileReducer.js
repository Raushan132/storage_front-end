import { FETCH_SINGLE_FILE_FAILURE,  FETCH_SINGLE_FILE_REQUEST, FETCH_SINGLE_FILE_SUCCESS } from "./fileTypes";

const initialState ={
    loading:false,
    file:'',
    error:'',
}

const singleFileReducer =(state=initialState, action) =>{

    switch(action.type){
        case FETCH_SINGLE_FILE_REQUEST: return {
            ...state,
            loading:true
        }
        case FETCH_SINGLE_FILE_SUCCESS : return{
            ...state,
            loading:false,
            file:action.payload
        }
        case FETCH_SINGLE_FILE_FAILURE : return{
            ...state, 
            loading:false,
            error:action.payload
        }
        default: return state
    }


}

export default singleFileReducer