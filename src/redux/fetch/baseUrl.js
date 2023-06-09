export const baseUrl ='http://localhost:8081'

export const getCookie = ()=>{
    const cookies= document.cookie
    console.log()
    if(cookies!=''){
     const  token = cookies.split(';').find((row) => row.startsWith(`token=`))?.split('=')[1];
     
       return token
    }
}