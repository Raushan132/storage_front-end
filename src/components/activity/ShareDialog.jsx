import React, { useEffect, useRef, useState } from 'react'
import { baseUrl, getUserId } from '../../redux/fetch/baseUrl'
import { useDispatch, useSelector } from 'react-redux'
import { shareVisible } from '../../redux/share_files/shareBtnAction'
import { fetchShareFileAndUser, shareFileAndFolder } from '../../redux/share_files/shareFileActions'
import { reRender } from '../../redux/render/renderAction'
import { changePermission, removeSharedUser } from '../../util/Util'
import { PRIVATE, PUBLIC } from '../../util/constant'

const ShareDialog = () => {

    const { loading, sharedUserInfo, error } = useSelector(state => state.sharedFileAndUserReducer)
    const [updatePermission, setupdatePermission] = useState(false);
    const { render } = useSelector(state => state.isRender)
    

    const email = useRef('')

    const dispatch = useDispatch()

    const handleCancelBtn = () => {
        dispatch(shareVisible(false))

    }
    const handleAddBtn = () => {
        const fileId = sharedUserInfo?.file?.fileId;
        let validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const emailVal = email.current.value
        if (emailVal !== '' && emailVal!==sharedUserInfo?.owner?.email &&emailVal.match(validate)) {
            shareFileAndFolder(fileId, emailVal).then(() => {
                dispatch(fetchShareFileAndUser(fileId))
            })
        }
    }

    const handleRemoveUser = (userId) => {
        const fileId = sharedUserInfo?.file?.fileId
        console.log(userId)
        removeSharedUser(fileId, userId).then(() => {
            dispatch(fetchShareFileAndUser(fileId))
        })
    }

    const handleAccess = (e) => {
        setupdatePermission(true)
        changePermission(sharedUserInfo?.file?.fileId, e.target.value).then(() => {
            console.log("render",render)
            dispatch(fetchShareFileAndUser(sharedUserInfo?.file?.fileId))
            setupdatePermission(false);
            dispatch(reRender(render))
        }).catch((err) => {
            setupdatePermission(false);
        })

    }

    

    const handleGetLink = () => {
        if (sharedUserInfo !== '') {
           
            if (sharedUserInfo.file.public) {
                navigator.clipboard.writeText(`http://localhost:5173/share/public/file/${sharedUserInfo?.file?.fileId}`)
            } else {
                navigator.clipboard.writeText(`http://localhost:5173/share/private/file/${sharedUserInfo?.file?.fileId}`)
            }
        }
    }

      
    

    if (loading) {
        return (
            <div className='flex flex-col gap-4 z-[999] fixed left-1/2 top-1/2 border-2 bg-base-100 px-4 py-4 w-[450px] -translate-x-1/2 -translate-y-1/2 shadow-xl'>
                Loading...
            </div>
        )
    }

    return (
        <>
            <div className='flex flex-col gap-4 z-[999] fixed left-1/2 top-1/2 border-2 bg-base-100 px-4 py-4 w-[450px] -translate-x-1/2 -translate-y-1/2 shadow-xl'>

                <div className='flex gap-2'>
                    <span>Share</span><span>"{sharedUserInfo?.file?.fileName}"</span>
                </div>

                <div>
                    <label htmlFor='createFolder'>Add People</label>
                </div>
                <div className='flex gap-4 items-center '>
                    <input type="text" placeholder="User Email" ref={email} className="input input-bordered input-info w-full input-sm max-w-xs" />

                    <button className="btn btn-success btn-sm" onClick={handleAddBtn}>Add</button>
                </div>

                <div>
                    <div>People with access</div>
                    <div className={`${sharedUserInfo?.sharedWithUsers?.length > 0 ? 'max-h-24' : 'h-20'} overflow-y-auto`}>

                        <div className='flex justify-between px-4 my-2 w-full'>
                            <div className='flex items-center gap-4'>

                                <div className='w-8 h-8 rounded-full overflow-hidden'><img src={`${baseUrl + '/img/' + sharedUserInfo?.owner?.userId}`} className='w-full h-full' alt="" /></div>
                                <div className='text-sm'>
                                    <div>{sharedUserInfo?.owner?.name}</div>
                                    <div className='text-[11px]'>{sharedUserInfo?.owner?.email}</div>
                                </div>
                            </div>
                            <div>Owner</div>
                        </div>

                        {sharedUserInfo?.sharedWithUsers?.map(otherUser => {
                            return (
                                <div className='flex justify-between px-4 my-2 w-full'>
                                    <div className='flex items-center gap-4'>

                                        <div className='w-8 h-8 rounded-full overflow-hidden'><img src={`${baseUrl + '/img/' + otherUser.userId}`} className='w-full h-full' alt="" /></div>
                                        <div className='text-sm'>
                                            <div>{otherUser.name}</div>
                                            <div className='text-[11px]'>{otherUser.email}</div>
                                        </div>
                                    </div>
                                    <div className='cursor-pointer' onClick={() => handleRemoveUser(otherUser.userId)}>Remove</div>
                                </div>
                            );
                        })}

                    </div>
                </div>

                {!sharedUserInfo?.file?.folder && <div>
                    <div>General Access</div>
                    <div className={`${updatePermission ? 'flex justify-between items-center' : ''}`}>

                        <select className="select select-sm select-info  max-w-xs  my-2 " onChange={handleAccess} disabled={updatePermission}>
                            <option selected={sharedUserInfo?.file?.public ? false : true} value={PRIVATE}>Restricted</option>
                            <option selected={sharedUserInfo?.file?.public ? true : false} value={PUBLIC}>Anyone with the link</option>

                        </select>
                        {updatePermission && <div>Updating...</div>}
                    </div>
                </div>}
                <div className={`flex  ${sharedUserInfo?.file?.folder ? 'items-end justify-end' : 'justify-between items-center'}`}>
                    {!sharedUserInfo?.file?.folder && <div><button className='btn btn-sm' onClick={handleGetLink} >Get Link</button></div>}
                    <div><button className='btn btn-sm btn-primary' onClick={handleCancelBtn}>Done</button></div>
                </div>
            </div>
            <div className="fixed opacity-50 z-[990] bg-black w-full h-screen" onClick={handleCancelBtn}></div>

        </>
    )
}

export default ShareDialog