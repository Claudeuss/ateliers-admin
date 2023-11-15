"use client";
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';
import PopupCostumer from './popup_costumer';
const Order = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='p-1 w-[360px] h-screen fixed bg-white z-40 top-0 right-0'>
            <div className='pl-5 pb-2 pt-1
            '>
                <h1 className='text-2xl font-semibold'>
                    Orders
                </h1>
            </div>
            <div className='w-auto h-[312px] pl-6 pr-2 overflow-y-auto overflow-x-hidden '>
                <div className='bg-white w-auto h-14 my-1  shadow-md flex'>
                    <img className='h-12 w-12 my-auto mx-1' src="/assets/images/ban.png" alt="" />
                    <div className='my-auto mx-1'>
                        <h1 className='font-semibold'>Ban Tubles</h1>
                        <p className='text-[#595959] text-xs font-semibold'>Rp. 15.000.000,0</p>

                    </div>
                    <div className='ml-5 my-auto flex items-center'>
                        <AiOutlineMinusCircle className='text-[#471919] text-lg' />
                        <p className='p-2'>23</p>
                        <AiOutlinePlusCircle className='text-[#595959] text-lg' />

                        <FaRegTrashAlt className='text-red-500 text-md ml-[30px]' />

                    </div>


                </div>
                <div className='bg-white w-auto h-14 my-1  shadow-md flex'>
                    <img className='h-12 w-12 my-auto mx-1' src="/assets/images/ban.png" alt="" />
                    <div className='my-auto mx-1'>
                        <h1 className='font-semibold'>Ban Tubles</h1>
                        <p className='text-[#595959] text-xs font-semibold'>Rp. 15.000.000,0</p>

                    </div>
                    <div className='ml-5 my-auto flex items-center'>
                        <AiOutlineMinusCircle className='text-[#471919] text-lg' />
                        <p className='p-2'>23</p>
                        <AiOutlinePlusCircle className='text-[#595959] text-lg' />

                        <FaRegTrashAlt className='text-red-500 text-md ml-[30px]' />

                    </div>


                </div>
                <div className='bg-white w-auto h-14 my-1  shadow-md flex'>
                    <img className='h-12 w-12 my-auto mx-1' src="/assets/images/ban.png" alt="" />
                    <div className='my-auto mx-1'>
                        <h1 className='font-semibold'>Ban Tubles</h1>
                        <p className='text-[#595959] text-xs font-semibold'>Rp. 15.000.000,0</p>

                    </div>
                    <div className='ml-5 my-auto flex items-center'>
                        <AiOutlineMinusCircle className='text-[#471919] text-lg' />
                        <p className='p-2'>23</p>
                        <AiOutlinePlusCircle className='text-[#595959] text-lg' />

                        <FaRegTrashAlt className='text-red-500 text-md ml-[30px]' />

                    </div>


                </div>
                <div className='bg-white w-auto h-14 my-1  shadow-md flex'>
                    <img className='h-12 w-12 my-auto mx-1' src="/assets/images/ban.png" alt="" />
                    <div className='my-auto mx-1'>
                        <h1 className='font-semibold'>Ban Tubles</h1>
                        <p className='text-[#595959] text-xs font-semibold'>Rp. 15.000.000,0</p>

                    </div>
                    <div className='ml-5 my-auto flex items-center'>
                        <AiOutlineMinusCircle className='text-[#471919] text-lg' />
                        <p className='p-2'>23</p>
                        <AiOutlinePlusCircle className='text-[#595959] text-lg' />

                        <FaRegTrashAlt className='text-red-500 text-md ml-[30px]' />

                    </div>


                </div>
                <div className='bg-white w-auto h-14 my-1  shadow-md flex'>
                    <img className='h-12 w-12 my-auto mx-1' src="/assets/images/ban.png" alt="" />
                    <div className='my-auto mx-1'>
                        <h1 className='font-semibold'>Ban Tubles</h1>
                        <p className='text-[#595959] text-xs font-semibold'>Rp. 15.000.000,0</p>

                    </div>
                    <div className='ml-5 my-auto flex items-center'>
                        <AiOutlineMinusCircle className='text-[#471919] text-lg' />
                        <p className='p-2'>23</p>
                        <AiOutlinePlusCircle className='text-[#595959] text-lg' />

                        <FaRegTrashAlt className='text-red-500 text-md ml-[30px]' />

                    </div>


                </div>

                <div className='bg-white w-auto h-14 my-1  shadow-md flex'>
                    <img className='h-12 w-12 my-auto mx-1' src="/assets/images/ban.png" alt="" />
                    <div className='my-auto mx-1'>
                        <h1 className='font-semibold'>Ban Tubles</h1>
                        <p className='text-[#595959] text-xs font-semibold'>Rp. 15.000.000,0</p>

                    </div>
                    <div className='ml-5 my-auto flex items-center'>
                        <AiOutlineMinusCircle className='text-[#471919] text-lg' />
                        <p className='p-2'>23</p>
                        <AiOutlinePlusCircle className='text-[#595959] text-lg' />

                        <FaRegTrashAlt className='text-red-500 text-md ml-[30px]' />

                    </div>


                </div>


            </div>
            <div className='px-5 pt-2'>
                <button className="tracking-wider bg-[#1b23ff] text-[#ffffff] py-1   hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full mb-2" onClick={() => setShowModal(true)} >
                    Customer

                </button>

                <button className="tracking-wider bg-black text-[#ffffff] py-1   hover:bg-[#1a1a1a] hover:text-white text-center rounded-md transition-all duration-500 w-full mb-2"><a href="" >
                    Service
                </a>
                </button>
            </div>
            <div className='px-5'>
                <p className='text-[#595959] text-center'>------------------------------------------</p>
                <div className='flex items-center pt-1'>
                    <p className='text-[#595959] text-md'>Sub Total</p>
                    <p className='text-[#000000] text-sm fixed right-[22px]'>Rp. 1.160.000,00</p>

                </div>
                <div className='flex items-center'>
                    <p className='text-[#595959] text-md'>Discount</p>
                    <p className='text-[#000000] text-sm fixed right-[22px]'>Rp. 60.000,00</p>

                </div>
                <div className='flex items-center py-4'>
                    <p className='text-[#595959] text-md'>Total</p>
                    <p className='text-[#000000] text-sm fixed right-[22px]'>Rp. 1.100.000,00</p>

                </div>
                <button className="tracking-wider bg-black text-[#ffffff] py-2   hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full mb-2"><a href="" >
                    Payment
                </a>
                </button>
            </div>

            <PopupCostumer isVisible={showModal} onClose={() => setShowModal(false)} />

        </div>

    );
}

export default Order;
// transform hover:scale-105 hover:shadow-xl  shadow-inner shadow-lg