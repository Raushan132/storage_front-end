import {FETCH_FILE_REQUEST,FETCH_FILE_SUCCESS,FETCH_FILE_FAILURE} from './fileTypes'
import { baseUrl, getCookie,getUserId } from '../baseUrl'
import axios from 'axios'

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


export const fetchFiles = (path) => {
    
    return (dispatch) => {
        dispatch(fetchFilesRequest)
    axios.get(`${baseUrl}/allFilesOrFolder/${path}`, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': getCookie()
      }}).then(res=>{
        const files = res.data
        dispatch(fetchFilesSuccess(files))
      }).catch(err => {
        const errMsg = err.message
        dispatch(fetchFilesFailure(errMsg))
    })
}
}


export const fetchFilesWithStar = () => {
 
    return (dispatch) => {
        dispatch(fetchFilesRequest)
    axios.get(`${baseUrl}/allFilesOrFolderWithStar`, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': getCookie()
      }}).then(res=>{
        const files = res.data
        dispatch(fetchFilesSuccess(files))
      }).catch(err => {
        const errMsg = err.message
        dispatch(fetchFilesFailure(errMsg))
    })
}
}

