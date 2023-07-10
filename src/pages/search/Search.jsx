import React, { useEffect, useState } from 'react'
import Layout from '../../layout/layout'
import View from '../../components/activity/View'
import { useSearchParams } from 'react-router-dom';
import { baseUrl, getCookie } from '../../redux/fetch/baseUrl';
import axios from 'axios';
import SearchView from '../../components/view/SearchView';
import { useSelector } from 'react-redux';
import View_details from '../../components/activity/View_details';
import { motion } from 'framer-motion'
import { VIEW_DETAIL_OPEN } from '../../redux/view_details/detailsType';

const Search = () => {

    const { render } = useSelector(state => state.isRender)
    const isViewDetailsVisible = useSelector(state => state?.isDetailsVisible) === VIEW_DETAIL_OPEN
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [search, setSearch] = useState({
        files: [],
        sharedFileInfos: [],
        trashes: []
    });

    console.log(search);
    useEffect(() => {
        const fatchFile = async () => {
            try {

                const response = await axios.get(`${baseUrl}/search`, {
                    params: {
                        request: query,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': getCookie()
                    }
                })
                console.log("33", response.data)
                setSearch(response.data);


            } catch (err) {

            }
        }

        fatchFile(query)

    }, [query, render])

    return (
        <>
            <Layout>
                <View pathname={''} />

                <div className='mt-8'>
                <div className="w-full h-full flex gap-2 ">
                    <div className="w-full min-h-[550px]  overflow-y-auto">

                        <SearchView search={search} />

                    </div>

                    {isViewDetailsVisible && <motion.div className=""
                        initial={{ width: 0 }}
                        animate={{ width: 'initial' }}
                        transition={{ duration: 0.2 }}
                    >
                        <View_details />
                    </motion.div>
                    }
                    </div>
                </div>
            </Layout>

        </>

    )
}

export default Search