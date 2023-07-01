import React from 'react'
import DataTable from 'react-data-table-component'
import customStyles from '../../data/CustomTableStyle'




const Inbox = ({data}) => {
  
     

  


    console.log(data)

  return (
    <div className='bg-base-200 lg:w-[90%] max-h-[450px] overflow-y-auto my-8'>
    
      


      <table className='w-full'>
        
        <tbody>
          {
            data.map(message=>{return(

              <tr className='text-sm lg:text-lg h-12 hover:bg-base-300 hover:text-white transition-all cursor-pointer' key={message.messageId}>
             <td className='px-2 w-36 lg:w-44'>{message.senderName}</td>
             <td className='px-2'>{message.subject}</td>
             <td className='px-2'>{message.description}</td>
             <td className='px-2 text-md'>6:45</td>
           </tr>
               );})

          }
       
        </tbody>
       
      </table>

    </div>
  )
}

export default Inbox