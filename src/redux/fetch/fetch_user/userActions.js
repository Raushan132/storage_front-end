import axios from "axios";
import { baseUrl, getCookie } from "../baseUrl";
import { FETCH_USER_REQUEST,FETCH_USER_SUCCESS,FETCH_USER_FAILURE } from "./userTypes";



export const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

export const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

export const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}



export const fetchUsers = () => {
   
    return (dispatch) => {
        dispatch(fetchUserRequest)
        axios.get(`${baseUrl}/user`,{
            headers:{
                'Authorization': getCookie(),

            }
        })
            .then(res => {
                const user = res.data
                dispatch(fetchUserSuccess(user))

            }).catch(err => {
                const errMsg = err.message
                dispatch(fetchUserFailure(errMsg))
            })
    }
}

export const uploadUserImg = (userId,formData)=>{
   
    axios.post(`${baseUrl}/uploadImg/${userId}`,formData,{
        headers:{
          "Authorization": getCookie()
        }
      }).then(res=>{
        console.log(res.data)
      })
}
