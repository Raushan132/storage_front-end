import React, { useEffect } from 'react'
import Layout from '../../layout/layout'
import View from '../../components/activity/View'
import { useSearchParams } from 'react-router-dom';
import { baseUrl, getCookie } from '../../redux/fetch/baseUrl';
import axios from 'axios';

const Search = () => {
   
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
 
    useEffect(()=>{
        const fatchFile=async()=>{
         try{
               await axios.get(`${baseUrl}/search`,{
                params: {
                    request: query,
                },
                  headers:{
                    'Content-Type': 'application/json',
                    'Authorization': getCookie()
                  }
               })
         }catch(err){

         }
        }

        fatchFile(query)

    },[query])

    return (
        <>
            <Layout>
                <View pathname={''} />

                <div className='mt-8'>

                    <div className="w-full min-h-[550px]  overflow-y-auto">

                        {/* {currentView === LISTVIEW ? <TrashListView data={file} /> : <TrashGridView trashFiles={file} />} */}

                    </div>

                </div>
            </Layout>

        </>

    )
}

export default Search