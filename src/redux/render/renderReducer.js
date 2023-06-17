import { RENDER_TRUE,RENDER_FALSE } from "./renderType";

const initialState = {
    render:true
} 

 const isRender=(state=initialState,action)=>{
        switch(action.type){
            case RENDER_TRUE: return {
                render:action.payload
            }
            case RENDER_FALSE: return {
                render:action.payload
            }
            default: return state
        }

}

export default isRender

