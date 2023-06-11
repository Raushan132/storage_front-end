import { BsFillPencilFill, BsFillInboxFill, BsFillSendFill } from 'react-icons/bs'
import Compose from '../../components/activity/Compose'
import { useEffect, useState } from 'react'
import Inbox from './Inbox';
import { getInboxMessage, getSentMessage } from '../../redux/fetch/messages/messageAction';
import { getUserId } from '../../redux/fetch/baseUrl';
// import  messageData  from '../../data/messageData';

const Messages = () => {

  const[composeVisible,setComposeVisible]=useState(false);

  const[messageSendRecive,setMessageSendRecive]= useState('INBOX')


  const [messageData, setMessageData] = useState([])
   
  
  useEffect(()=>{
 
    messageSendRecive=='SEND' ?  getSentMessage().then(res=>{
      setMessageData(res.data) 
    }) : getInboxMessage(). then(res=>{
       setMessageData(res.data)
    })

   

  },[messageSendRecive])

  const handleComposeVisible =()=>{
      setComposeVisible(false)
  }

  return (
    <>
      <div>
        {/* activities like compose btn inbox btn and sent btn */}
        <div className='flex gap-5'>

          <button className='btn flex gap-2' onClick={()=>setComposeVisible(true)}>
            <div><BsFillPencilFill /> </div>
            Compose
          </button>
          <button className='btn flex gap-2' onClick={()=> setMessageSendRecive('INBOX')}>
            <div><BsFillInboxFill /></div>
            Inbox
            <div className="">+99</div>
          </button>
          <button className='btn flex gap-2' onClick={()=> setMessageSendRecive('SEND')}>
            <div ><BsFillSendFill /> </div>
            Sent
          </button>
        </div>

    
    {
      
     composeVisible &&   <div> <Compose composeVisible={handleComposeVisible} />  </div>
    }


       <div>

              <Inbox data={messageData} />

       </div>

      </div>






    </>

  )
}

export default Messages