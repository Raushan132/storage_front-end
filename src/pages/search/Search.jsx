import React, { useEffect, useState } from 'react'
import Layout from '../../layout/layout'
import View from '../../components/activity/View'
import { useSearchParams } from 'react-router-dom';
import { baseUrl, getCookie } from '../../redux/fetch/baseUrl';
import axios from 'axios';
import SearchView from '../../components/view/SearchView';
import { useSelector } from 'react-redux';

const Search = () => {
   
    const{render} = useSelector(state=> state.isRender)
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [search,setSearch] = useState({
        files:[],
        sharedFileInfos:[],
        trashes:[]
    });
  
     console.log(search);
    useEffect(()=>{
        const fatchFile=async()=>{
         try{
             
         const response=      await axios.get(`${baseUrl}/search`,{
                params: {
                    request: query,
                },
                  headers:{
                    'Content-Type': 'application/json',
                    'Authorization': getCookie()
                  }
               })
            console.log("33",response.data)
            setSearch(response.data);


         }catch(err){

         }
        }

        fatchFile(query)

    },[query,render])

    return (
        <>
            <Layout>
                <View pathname={''} />

                <div className='mt-8'>

                    <div className="w-full min-h-[550px]  overflow-y-auto">

                        <SearchView search={search}/>

                    </div>

                </div>
            </Layout>

        </>

    )
}

export default Search