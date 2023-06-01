import { FaRegListAlt } from 'react-icons/fa'
import { BsGrid3X2 } from 'react-icons/bs'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Breadcrumbs from './Breadcrumbs'
import { useState } from 'react'


const View = () => {
  const breadcrumbs = ['Home', 'Document', 'Test']
  const [component, setComponent] = useState('BsGrid3X2')

  const handleView = () => {
    setComponent(prev => {
      return prev === 'BsGrid3X2' ? 'FaRegListAlt' : 'BsGrid3X2';
    })
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <Breadcrumbs path={breadcrumbs} />
        <div className='flex justify-center items-center gap-2'>
          <div className="tooltip tooltip-bottom" data-tip={component === 'FaRegListAlt' ? 'List' :'Grid'}>
            <div onClick={handleView} className='hover:bg-gray-500 rounded-full w-10 h-10 flex justify-center items-center transition-all cursor-pointer'>
              {component === 'FaRegListAlt' ? <FaRegListAlt /> : <BsGrid3X2 />}
            </div>
          </div>

          <div className="tooltip tooltip-bottom" data-tip='view detail'>
            <div className='hover:bg-gray-500 rounded-full w-10 h-10 flex justify-center items-center transition-all cursor-pointer'>
              <AiOutlineInfoCircle />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default View