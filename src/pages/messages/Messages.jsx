import { BsFillPencilFill, BsFillInboxFill, BsFillSendFill } from 'react-icons/bs'
import Compose from '../../components/activity/Compose'
import { useState } from 'react'
import Inbox from './Inbox';
import  messageData  from '../../data/messageData';

const Messages = () => {

  const[composeVisible,setComposeVisible]=useState(false);

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
          <button className='btn flex gap-2'>
            <div><BsFillInboxFill /></div>
            Inbox
            <div className="">+99</div>
          </button>
          <button className='btn flex gap-2'>
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