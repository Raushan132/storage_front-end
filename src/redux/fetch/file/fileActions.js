import {FETCH_FILE_REQUEST,FETCH_FILE_SUCCESS,FETCH_FILE_FAILURE} from './fileTypes'
import { baseUrl, getCookie } from '../baseUrl'

export const fetchFilesRequest = () => {
    return {
        type: FETCH_FILE_REQUEST
    }
}

export const fetchFilesSuccess = (files) => {
    return {
        type: FETCH_FILE_SUCCESS,
        payload: files
    }
}

export const fetchFilesFailure = (error) => {
    return {
        type: FETCH_FILE_FAILURE,
        payload: error
    }
}


export const fetchFiles = (userId,path) => {
    const data={
        userId,
        path
    }
    return (dispatch) => {
        dispatch(fetchFilesRequest)
        axios.get(`${baseUrl}/user`,data,{
            headers:{
                'Authorization': getCookie("token"),

            }
        })
            .then(res => {
                const files = res.data
                dispatch(fetchFilesSuccess(files))

            }).catch(err => {
                const errMsg = err.message
                dispatch(fetchFilesFailure(errMsg))
            })
    }
}
