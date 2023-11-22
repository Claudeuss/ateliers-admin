import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
const ItemSparepart = () => {
    return (
        <div>
            <div className='grid grid-cols-4 gap-3 pt-3'>
                <div className="rounded-md bg-white p-2 group cursor-pointer hover:shadow-md shadow-lg ">
                    <a href="/detail_sparepart">

                        <img className='m-auto h-32 w-32' src="assets/images/ban motor.png" alt="" />
                        <div className='flex justify-between p-2'>
                            <div className='my-auto mx-1 '>
                                <h1 className='font-semibold'>Ban Tubles</h1>
                                <p className='text-[#595959] text-xs font-semibold'>Rp. 15.000.000,0</p>

                            </div>


                            <AiOutlinePlusCircle className='text-[#595959] text-3xl my-auto' />


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


                    </a>
                </div>



            </div>
        </div>
    );
}

export default ItemSparepart;
