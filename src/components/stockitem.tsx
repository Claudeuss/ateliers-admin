import React from 'react'
import { BsBoxes } from 'react-icons/bs'

const Stockitem = ({ icon, title, total }: { icon?: any, title?: any, total?: any }) => {
    return (
        <div className='flex bg-white h-24 rounded-md shadow-md items-center px-10 justify-between'>
            <div className='flex items-center h-16 w-16 bg-[#1b24ff] rounded-full text-white'>
                {icon}
            </div>
            <p className='text-xl font-medium text-black'>
                {title}
            </p>
            <p className=' text-2xl font-semibold text-black'>
                {total}
            </p>
        </div>
    )
}

export default Stockitem