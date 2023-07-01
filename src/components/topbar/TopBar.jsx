import { useSignOut } from "react-auth-kit"
import { Link, useNavigate } from "react-router-dom"
import { baseUrl, getUserId } from "../../redux/fetch/baseUrl"
import { BsFilter } from 'react-icons/bs'
import { useRef, useState } from "react"
import SearchMenu from "./SearchMenu"
import moment from "moment"



const TopBar = () => {

    const signOut = useSignOut()
    const navigate = useNavigate()

    const userId = getUserId()

    const [query,setQuery] = useState({
        word:"",
        type:"",
        isTrash:"",
        isShare:"",
        before:"",
        after:"",
        dateOption:""
    });
  
   const handleSearchBtn = ()=>{

        let q= "";
        for(let keys of Object.keys(query)){
            if(keys==='word' && query[keys]!==''){
                q+=query[keys]+" "
            }
            else if(keys!=='dateOption' && query[keys] !='')
                q+=`${keys}:`+query[keys]+" "
        }
        

        if(q!=''){
            navigate(`/user/search?q=${q.trim()}`)
        }
        



   }

   
  
    const handleQuery = (e)=>{
       
        

        if(e.target.name==="dateOption" && e.target.value !=='' && e.target.value !=='Custom'){

           
            var days= parseInt(e.target.value)
            let afterDate=""
            let beforeDate=""
   
   
            if(days!==0) beforeDate=moment(new Date()).format("YYYY-MM-DD")
             afterDate= moment(new Date()).subtract(days,"days").format("YYYY-MM-DD")
   
             setQuery(prev=>({...prev,after:afterDate,before:beforeDate}))
             
            
    
            
   
         } else if(e.target.name==="dateOption" && (e.target.value ==='' || e.target.value ==='Custom')){            
            setQuery(prev=>({...prev,after:'',before:''}))
        }



        if(e.target.name=== "isShare" || e.target.name==="isTrash"){
           const val= e.target.checked? e.target.value : ""
           setQuery(prev=>prev={...prev,[e.target.name]:val})
        }else
            setQuery(prev=>prev={...prev,[e.target.name]:e.target.value})
      
        
    }
    

    const handleLogout = () => {

        signOut()
        navigate("/auth?logout=true")
    }

    return (
        <>

            <div className="navbar bg-base-200 fixed z-10">

                <div className="flex-grow justify-between  pl-72 gap-2">
                    <div className=" flex flex-row items-center gap-5 form-control">
                        <div className="input-group">
                            <input type="text" placeholder="Search by name" name="word" defaultValue={query.word} onChange={handleQuery} className="input input-bordered" />
                            <button className="btn btn-square" onClick={handleSearchBtn}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                        {/* filter below */}
                        <div>

                            <SearchMenu handleQuery={handleQuery} query={query} handleSearchBtn={handleSearchBtn} />

                        </div>
                    </div>
                    <div>

                        <div className="dropdown dropdown-end pr-6">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img draggable={false} src={`${baseUrl + '/img/' + userId}`} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52">
                                <li>
                                    <Link to="/user/profile" className="justify-between">
                                        Profile

                                    </Link>
                                </li>
                                <li>  <label htmlFor="custom_themes">Themes</label></li>
                                <li><div className="cursor-pointer" onClick={handleLogout}>Logout</div></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopBar