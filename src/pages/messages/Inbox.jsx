import React from 'react'
import DataTable from 'react-data-table-component'
import customStyles from '../../data/CustomTableStyle'




const Inbox = ({data}) => {
  
     console.log(data.map(d=>d.name))

    const columns=[{
        
        cell: (row)=> row?.name
        },
        {
        
            cell: (row)=> row.subject
        },
        {
        
            cell: (row)=> row.message
        }

    ]


    

  return (
    <div className='bg-base-200 max-h-[450px] overflow-y-auto my-8'>Inbox
    
      <DataTable 
       columns={columns}
        data={data}
        pointerOnHover
        noTableHead={true}
        customStyles={customStyles}
        highlightOnHover
      />

    </div>
  )
}

export default Inbox