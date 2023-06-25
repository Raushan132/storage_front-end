import {
    FETCH_FILE_REQUEST,
    FETCH_FILE_SUCCESS,
    FETCH_FILE_FAILURE,
    FETCH_SINGLE_FILE_FAILURE,  
    FETCH_SINGLE_FILE_REQUEST,
    FETCH_SINGLE_FILE_SUCCESS
} from './fileTypes'
import { baseUrl, getCookie,getUserId } from '../baseUrl'
import axios from 'axios'


// all file and folder detail get 
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

// Single file and folder detail get 
export const fetchSingleFilesRequest = () => {
    return {
        type: FETCH_SINGLE_FILE_REQUEST
    }
}

export const fetchSingleFilesSuccess = (file) => {
    return {
        type: FETCH_SINGLE_FILE_SUCCESS,
        payload: file
    }
}

export const fetchSingleFilesFailure = (error) => {
    return {
        type: FETCH_SINGLE_FILE_FAILURE,
        payload: error
    }
}

export const fetchFiles = (path) => {
    console.log(getCookie())
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

export const fetchTrashFile = () => {
 
    return (dispatch) => {
        dispatch(fetchFilesRequest)
    axios.get(`${baseUrl}/trash`, {
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

export const fetchFileOrFolderDetail = (fileId) => {
 
    return (dispatch) => {
        dispatch(fetchSingleFilesRequest)
    axios.get(`${baseUrl}/share/${fileId}`, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': getCookie()
      }}).then(res=>{
        const file = res.data
        dispatch(fetchSingleFilesSuccess(file))
      }).catch(err => {
        const errMsg = err.message
        dispatch(fetchSingleFilesFailure(errMsg))
    })
}
}

export const getFolderDetails = async(folderId)=>{

    try{
       const response = await axios.get( `${baseUrl}/fileDetails/${folderId}`,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': getCookie()
        }
       })
       
       return response
    }catch(err){
         return err
    }

}
