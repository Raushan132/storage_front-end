import React from 'react'

const CreateFolder = () => {

    

  return (
    <div className='flex flex-col gap-4 fixed left-1/2 top-1/2 border-2 bg-base-100 px-4 py-4 w-96 -translate-x-1/2 -translate-y-1/2 shadow-xl'>
       <div>
            <label htmlFor='createFolder'>New Folder</label>
       </div>
       <div >
           <input type="text" placeholder="Folder Name" className="input input-bordered input-info w-full max-w-xs" />
       </div>
       <div className='flex gap-5 justify-end'>
            <button className="btn">Cancel</button>
            <button className="btn btn-success">Create</button>
       </div>

    </div>
  )
}

export default CreateFolder