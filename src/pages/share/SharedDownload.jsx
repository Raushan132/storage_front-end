import React, { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { getDownloadFile, getDownloadPublicFile } from '../../util/Util';
import { baseUrl } from '../../redux/fetch/baseUrl';
import Preview from '../../components/activity/Preview';

const SharedDownload = () => {

    let params = useLocation();
    const url = params.pathname.split('/')
    if (url.length !== 5 || url[4] == '') {
        return (
            <div>404 Page Not Found</div>
        );

    }

    const isPublic = url[2].toLowerCase() === 'public'
    const fileId = url[4]
    useEffect(() => {

        if (isPublic) {
            getDownloadPublicFile(fileId)
        } else {
            getDownloadFile(fileId).catch(err => {

                if (err.status === 401) {
                    console.log("ForbbForbidden user")
                }
            })
        }

    }, [])

   const file_url = baseUrl+"/permission/download/"+fileId

    return (
        <div>
             
        </div>
    )
}

export default SharedDownload