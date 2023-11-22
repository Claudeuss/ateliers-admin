"use client";
import Sidebar from '@/components/sidebar'
import React, { useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'

const AddPage = () => {
    let [count, setCount] = useState(0);
    function incrementCount() {
        count = count + 1;
        setCount(count);
    }
    function decrementCount() {
        if (count > 0) {
            count = count - 1;
            setCount(count);
        }
    }
    return (
        <>
            <Sidebar />
            <div className=' pl-28 bg-[#EAEAEA]'>
                <div className='p-5'>
                    <h1 className=' text-2xl font-semibold pb-4'>Sparepart</h1>
                    <div className=' w-full h-[500px] bg-white rounded-md py-2'>
                        <div className='flex gap-5 px-4 pb-2'>
                            <p className=' text-lg font-medium text-black py-1 px-2 rounded-md'>Spareparts Data</p>
                            <p className=' text-lg font-medium text-[#1b24ff] bg-[#EAEAEA] py-1 px-2 rounded-md'>Add Sparepart</p>
                        </div>
                        <div className=' w-full border-t-2 border-black px-12 py-8'>
                            <div className=' flex justify-between py-2'>
                                <p className='text-xl font-semibold'>Name</p>
                                <input placeholder='Product Name' type="text" className=' w-3/4 bg-white rounded-md border border-slate-400 outline-blue-700 px-2' />
                            </div>
                            <div className=' flex justify-between py-2'>
                                <p className='text-xl font-semibold'>Type</p>
                                <input placeholder='Product Type' type="text" className=' w-3/4 bg-white rounded-md border border-slate-400 outline-blue-700 px-2' />
                            </div>
                            <div className=' flex justify-between py-2'>
                                <p className='text-xl font-semibold'>Category</p>
                                <div className='flex w-3/4 justify-start gap-10 pl-1'>
                                    <div className='flex gap-2'>
                                        <p>Accesories</p>
                                        <input name='radio' placeholder='Product Name' type="radio" className=' w-5 checked:accent-blue-700' />
                                    </div>
                                    <div className='flex gap-2'>
                                        <p>Wheels</p>
                                        <input name='radio' placeholder='Product Name' type="radio" className='w-5 checked:accent-blue-700' />
                                    </div>
                                    <div className='flex gap-2'>
                                        <p>Maintenance</p>
                                        <input name='radio' placeholder='Product Name' type="radio" className='w-5 checked:accent-blue-700' />
                                    </div>
                                    <div className='flex gap-2'>
                                        <p>Engine</p>
                                        <input name='radio' placeholder='Product Name' type="radio" className='w-5 checked:accent-blue-700' />
                                    </div>
                                </div>
                            </div>
                            <div className=' flex justify-between py-2'>
                                <p className='text-xl font-semibold'>Price</p>
                                <input placeholder='Product Price' type="number" className=' w-3/4 bg-white rounded-md border border-slate-400 outline-blue-700 px-2' />
                            </div>
                            <div className=' flex justify-between py-2'>
                                <p className='text-xl font-semibold'>Quantity</p>
                                <div className=' w-3/4'>
                                    <div className=' rounded-md border border-black flex w-40 justify-between'>
                                        <button onClick={incrementCount}>
                                            <div className=' p-1 border-r rounded-md border-black bg-slate-200'>
                                                <BiPlus className=' text-lg' />
                                            </div>
                                        </button>
                                        <p>{count}</p>
                                        <button onClick={decrementCount}>
                                            <div className=' rounded-md border-l p-1 border-black bg-slate-200'>
                                                <BiMinus className=' text-lg' />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className=' flex justify-between py-2'>
                                <p className='text-xl font-semibold'>Image</p>
                                <input multiple type="file" className='block w-3/4 border rounded-lg border-slate-400 file:bg-[#1b24ff] file:py-1 file:px-4 file:rounded-md  file:border-0 file:text-white font-medium file:font-semibold file:hover:bg-[#1b23ffe1] hover:bg-slate-100' id='multiple_files' />
                            </div>
                            <div className='flex justify-end w-full py-4'>
                                <button className=' bg-[#1b24ff] py-1 w-80 rounded-md shadow-md hover:shadow-inner shadow-[#eaeaea] hover:bg-[#1b23ffe1]'>
                                    <p className=' text-white text-lg font-medium'>Submit</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AddPage