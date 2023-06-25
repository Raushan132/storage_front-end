import axios from 'axios'
import {FETCH_SHARE_FILE_USER_REQUEST,FETCH_SHARE_FILE_USER_SUCCESS,FETCH_SHARE_FILE_USER_FAILURE} from './shareFileTypes'
import { baseUrl, getCookie } from '../fetch/baseUrl'


export const fetchShareFileUserRequest = () => {
    return {
        type: FETCH_SHARE_FILE_USER_REQUEST
    }
}

export const fetchShareFileUserSuccess = (files) => {
    return {
        type: FETCH_SHARE_FILE_USER_SUCCESS,
        payload: files
    }
}

export const fetchShareFileUserFailure = (error) => {
    return {
        type: FETCH_SHARE_FILE_USER_FAILURE,
        payload: error
    }
}

export const fetchShareFileAndUser = (fileId)=>{
    return (dispatch)=>{
        dispatch(fetchShareFileUserRequest)
        axios.get(`${baseUrl}/share/${fileId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie()
        }}).then(res=>{
            const shareInfo = res.data
            dispatch(fetchShareFileUserSuccess(shareInfo))
        }).catch(err=>{
            const error =err.message;
            dispatch(fetchShareFileUserFailure(error))
        })
    }
}



// share file and folder to other user

export const shareFileAndFolder = async(fileId,email)=>{
    const formData = new FormData()
    formData.append("fileId",fileId)
    formData.append("email",email)
    await axios.post(`${baseUrl}/share`,formData,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie()
    }
    })
}
