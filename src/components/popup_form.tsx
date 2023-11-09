"use client";
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
const PopupForm = ({ isVisible, onClose }: { isVisible?: any, onClose?: any }) => {
    const [showModul, setShowModul] = useState(false);
    if (!isVisible) return null;
    return (
        <div className='z-20 fixed inset-0 flex justify-center items-center'>
            <div className='bg-[#D9D9D9] w-[650px] flex flex-col '>
                <div className='flex justify-between'>
                    <h1 className='text-xl m-2'>New Customer</h1>


                </div>

                <div className='bg-white  rounded h-[314px] p-5'>
                    <div className='bg-white drop-shadow-lg p-9 rounded h-full '>
                        <div className=''>
                            <div>
                                <p className='ml-1'>
                                    Name
                                </p>
                                <input
                                    type="text"
                                    name="text"
                                    placeholder='Udin Meleduaks'
                                    className="bg-[#D9D9D9] px-2 py-[8px] pr-10 rounded-md text-sm focus:outline-none w-full AiOutlineSearch"



                                />
                            </div>
                            <div className='py-2'>
                                <p className='ml-1'>
                                    Address
                                </p>
                                <input
                                    type="text"
                                    name="text"
                                    placeholder='Baghdad'
                                    className="bg-[#D9D9D9] px-2 py-[8px] pr-10 rounded-md text-sm focus:outline-none w-full AiOutlineSearch"



                                />
                            </div>
                            <div className='flex justify-between gap-2' >
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

                            {/* <input
                            type="search"
                            name="search"
                            placeholder="search"
                            className="bg-[#D9D9D9] px-5 pr-10 rounded-md text-sm focus:outline-none w-[400px] AiOutlineSearch"



                        />
                        <button className="mr-[15px] w-[180px] place-self-end tracking-wider bg-[#1b23ff] text-[#ffffff] py-2 hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 " >
                            <a href="" >
                                <p className='text-xs'>
                                    +New Customer
                                </p>
                            </a>


                        </button> */}
                        </div>

                    </div>
                </div>

            </div>


        </div>
    );
}

export default PopupForm;
