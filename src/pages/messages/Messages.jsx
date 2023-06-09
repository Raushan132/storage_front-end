import { BsFillPencilFill, BsFillInboxFill, BsFillSendFill } from 'react-icons/bs'
import Compose from '../../components/activity/Compose'
import { useEffect, useState } from 'react'
import Inbox from './Inbox';
import { getInboxMessage, getSentMessage } from '../../redux/fetch/messages/messageAction';
import Layout from '../../layout/layout';
import { useSelector } from 'react-redux';

const Messages = () => {

  const {render} = useSelector(state=> state.isRender)
  const[composeVisible,setComposeVisible]=useState(false);
  

  const[messageSendRecive,setMessageSendRecive]= useState('INBOX')


  const [messageData, setMessageData] = useState([])
   
  
  useEffect(()=>{
 
    messageSendRecive=='SENT' ?  getSentMessage().then(res=>{
      setMessageData(res.data) 
    }) : getInboxMessage(). then(res=>{
       setMessageData(res.data)
    })

   

  },[messageSendRecive,render])

  const handleComposeVisible =()=>{
      setComposeVisible(false)
  }

  return (
    <>
    <Layout>
       
        <div className='mt-8'>
      <div>
        {/* activities like compose btn inbox btn and sent btn */}
        <div className='flex gap-5'>

          <button className='btn flex gap-2' onClick={()=>setComposeVisible(true)}>
            <div><BsFillPencilFill /> </div>
            Compose
          </button>
        { messageSendRecive==='SENT' &&  <button className='btn flex gap-2' onClick={()=> setMessageSendRecive('INBOX')}>
            <div><BsFillInboxFill /></div>
            Inbox
            <div className="">+99</div>
          </button>}
          {messageSendRecive!=='SENT' && <button className='btn flex gap-2' onClick={()=> setMessageSendRecive('SENT')}>
            <div ><BsFillSendFill /> </div>
            Sent
          </button>}
        </div>

    
    {
      
     composeVisible &&   <div> <Compose composeVisible={handleComposeVisible} />  </div>
    }


       <div>
            <div className='mt-8 bg-base-200 px-4 py-2 lg:w-[90%]'>{messageSendRecive} MESSAGES</div>
              <Inbox data={messageData}  />

       </div>

      </div>



      </div>
      </Layout>

    </>

  )
}

export default Messages