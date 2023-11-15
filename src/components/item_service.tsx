"use client";
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';
import PopupItemService from './popup_item_service';

const ItemService = () => {
    const [showDetail, setShowItem] = useState(false);
    return (
        <div>
            <div className='grid grid-cols-3 gap-3 pt-3'>
                <div className="rounded-md bg-white p-2 group cursor-pointer hover:shadow-md shadow-lg ">
                    <div className='bg-[#FF0000] m-2 flex justify-between'>
                        <h1 className='text-white p-3 py-4  font-semibold'>
                            Not Yet
                        </h1>
                        <FaRegTrashAlt className='text-white text-3xl my-auto pr-3' />
                    </div>
                    <div className='flex justify-between pb-2 px-2'>
                        <div className='my-auto '>
                            <p className='text-[#595959] text-md font-semibold'>SM001</p>
                            <h1 className='font-semibold'>Honda Beatbox</h1>
                            <p className='text-[#595959] text-md font-semibold'>Herman Lee</p>

                        </div>





                    </div>
                    <div className='mx-2 mb-2'>
                        <button className="w-full place-self-end tracking-wider bg-[#1b23ff] text-[#ffffff] py-2 hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 " onClick={() => setShowItem(true)}>

                            <p className='text-xs'>
                                Edit
                            </p>



                        </button>
                    </div>


                    {/* <div className='flex'>
                    <div className='my-auto mx-1 p-1 mt-2 pl-3'>
                      <h1 className='font-semibold'>Ban Tubles</h1>
                      <p className='text-[#595959] text-xs font-semibold'>Rp. 15.000.000,0</p>

                    </div>
                    <div className='my-auto flex items-center'>


                      <FaRegTrashAlt className='text-red-500 text-md ml-[30px]' />

                    </div>
                  </div> */}

                </div>



            </div>
            <PopupItemService isVisible={showDetail} onClose={() => setShowItem(false)} />
        </div>
    );
}

export default ItemService;
