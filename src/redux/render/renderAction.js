import {RENDER_TRUE,RENDER_FALSE}  from './renderType'


export const renderTrue = ()=>{
    return {
        type:RENDER_TRUE,
        payload: true
    }
}


export const renderFalse = ()=>{
    return {
        type:RENDER_FALSE,
        payload: false
    }
}


export const reRender = (val)=>{
    console.log(val)
    return (dispatch)=>{
         val? dispatch(renderFalse()) : dispatch(renderTrue());
    }
}