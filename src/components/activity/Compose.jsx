import {AiOutlineClose} from 'react-icons/ai'
import { motion } from "framer-motion"
import { useRef } from 'react'
import { sendMessage } from '../../redux/fetch/messages/messageAction'
import { useDispatch, useSelector } from 'react-redux'
import { reRender } from '../../redux/render/renderAction'

const Compose = ({composeVisible}) => {

    const {render} = useSelector(state=> state.isRender)
    const dispatch = useDispatch()
    const to = useRef('')
    const subject = useRef('')
    const description = useRef('')

    const handleSend= (e)=>{
            e.preventDefault()
            const msg={
                 to: to.current?.value,
                 subject: subject.current?.value,
                 description: description.current?.value
            }
            sendMessage(msg);

            dispatch(reRender(render))


    }
    
    return (
        <motion.div className='fixed z-10 right-16 bottom-10 w-96 bg-base-200 shadow-xl'
        initial={{ y: '150vw' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        >
            <div className='flex justify-between px-2 py-2 '>
                <div>New Message</div>
                <div className='cursor-pointer' onClick={composeVisible} ><AiOutlineClose /></div>
            </div>
            <form>
                <div className='flex flex-col justify-start gap-2 px-2 '>
                    <div><input type='text' ref={to} placeholder='To' className='w-full pl-2 bg-base-200 border-0 border-b-2 border-gray-500' /></div>
                    <div><input type='text' ref={subject} placeholder='Subject' className='w-full pl-2 bg-base-200 border-0 border-b-2 border-gray-500'  /></div>
                    <div><textarea placeholder='Write your message' ref={description} className='w-full pl-2 h-72 resize-none  bg-base-200 my-2' /></div>
                    <div className='flex justify-end px-8 py-2'><button className=' btn-primary px-8 py-2 text-sm  rounded-full' onClick={handleSend}>Send</button></div>
                </div>
            </form>
        </motion.div>
    )
}

export default Compose