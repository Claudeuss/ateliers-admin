"use client";
import React, { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { CustomRadio } from './custom_radio';
import { RadioGroup } from '@nextui-org/react';


const PopupItemService = ({ isVisible, onClose }: { isVisible?: any, onClose?: any }) => {
    const [showDetail, setShowItem] = useState(false);
    if (!isVisible) return null;
    return (
        <div className='z-20 fixed inset-0 flex justify-center items-center'>
            <div>



                <div className='bg-[#EAEAEA] h-screen w-screen'>
                    <div className='pl-28 pr-[360px]'>
                        <div className='px-5 py-3'>
                            <div>
                                <h1 className='text-2xl font-semibold'>Detail Service</h1>
                                <div className='pt-3 grid grid-cols-2
               
               
               
               gap-4'>



                                    <div>
                                        <p className='ml-1 font-semibold'>
                                            Service Id
                                        </p>
                                        <input
                                            type="text"
                                            name="text"
                                            placeholder='Udin Meleduaks'
                                            className="font-semibold bg-white px-2 py-[8px] pr-10 rounded-md text-sm focus:outline-none w-full AiOutlineSearch shadow-md"



                                        />
                                    </div>
                                    <div>
                                        <p className='ml-1 font-semibold'>
                                            Service Id
                                        </p>
                                        <input
                                            type="text"
                                            name="text"
                                            placeholder='Udin Meleduaks'
                                            className="font-semibold bg-white px-2 py-[8px] pr-10 rounded-md text-sm focus:outline-none w-full AiOutlineSearch shadow-md"



                                        />
                                    </div>
                                    <div>
                                        <p className='ml-1 font-semibold'>
                                            Owner
                                        </p>
                                        <input
                                            type="text"
                                            name="text"
                                            placeholder='Udin Meleduaks'
                                            className="font-semibold bg-white px-2 py-[8px] pr-10 rounded-md text-sm focus:outline-none w-full AiOutlineSearch shadow-md"



                                        />
                                    </div>
                                    <div>
                                        <p className='ml-1 font-semibold'>
                                            Address
                                        </p>
                                        <input
                                            type="text"
                                            name="text"
                                            placeholder='Udin Meleduaks'
                                            className="font-semibold bg-white px-2 py-[8px] pr-10 rounded-md text-sm focus:outline-none w-full AiOutlineSearch shadow-md"



                                        />
                                    </div>



                                </div>
                                <p className='ml-1 font-semibold pt-3'>
                                    Status
                                </p>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className=' grid grid-cols-3 gap-4'>




                                        <div className="bg-white shadow-sm py-[4px] rounded-md flex justify-center gap-2">
                                            <p className='font-semibold flex items-center text-xs'>Not Yet</p>
                                            <div className='my-auto items-center flex w-6 h-6 p-1 rounded-full border-black border bg-white'>

                                                <input
                                                    id='red-button'
                                                    type="radio"
                                                    name="radio"

                                                    className='bg-white w-full h-full rounded-full appearance-none checked:border-black  checked:bg-red-600'




                                                />
                                            </div>

                                        </div>
                                        <div className="bg-white shadow-sm py-[4px] rounded-md flex justify-center gap-2">
                                            <p className='font-semibold flex items-center text-xs'>In Process</p>
                                            <div className='my-auto items-center flex w-6 h-6 p-1 rounded-full border-black border bg-white'>

                                                <input
                                                    id='red-button'
                                                    type="radio"
                                                    name="radio"

                                                    className='bg-white w-full h-full rounded-full appearance-none checked:border-black  checked:bg-[#FA8A00]'




                                                />
                                            </div>

                                        </div>
                                        <div className="bg-white shadow-sm py-[4px] rounded-md flex justify-center gap-2">
                                            <p className='font-semibold flex items-center text-xs'>Done</p>
                                            <div className='my-auto items-center flex w-6 h-6 p-1 rounded-full border-black border bg-white'>

                                                <input
                                                    id='red-button'
                                                    type="radio"
                                                    name="radio"

                                                    className='bg-white w-full h-full rounded-full appearance-none checked:border-black  checked:bg-[#0FD80B]'




                                                />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4 pt-8'>
                                    <div className='flex justify-between gap-4' >
                                        <button className="w-full place-self-end tracking-wider bg-[#1b23ff] text-[#ffffff] py-2 hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 " >
                                            <a href="" >
                                                <p className='text-xs'>
                                                    Add
                                                </p>
                                            </a>


                                        </button>
                                        <button className="w-full place-self-end tracking-wider bg-black text-[#ffffff] py-2 hover:bg-[#1a1a1a] hover:text-white text-center rounded-md transition-all duration-500 " onClick={() => onClose()}>
                                            <a href="" >
                                                <p className='text-xs'>
                                                    Cancel
                                                </p>
                                            </a>


                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>


                <PopupItemService isVisible={showDetail} onClose={() => setShowItem(false)} />
            </div>
        </div>
    );
}

export default PopupItemService;
