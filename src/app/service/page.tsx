'use-client'
import Order from '@/components/order';
import Sidebar from '@/components/sidebar';
import React, { Fragment } from 'react';

const Service = () => {
    return (
        <div>

            <Sidebar />

            <div className='bg-[#EAEAEA] h-screen w-screen'>
                <div className='pl-28 pr-[360px]'>
                    <div className='px-5 py-3'>
                        <div>
                            <h1 className='text-2xl font-semibold'>List Sparepart</h1>
                            <div className='pt-3 grid grid-cols-3 gap-3 '>
                                <div className="bg-white hover:bg-[#1B24FF] py-1 pb-2  group cursor-pointer hover:shadow-lg shadow-md">

                                    <h3 className="text-center text-xs text-black group-hover:text-white font-semibold ">Accesories
                                    </h3>
                                </div>
                                <div className="bg-white hover:bg-[#1B24FF] p-1 group cursor-pointer hover:shadow-lg  shadow-md">

                                    <h3 className="text-center text-xs text-black group-hover:text-white font-semibold ">Wheels
                                    </h3>
                                </div>
                                <div className="bg-white hover:bg-[#1B24FF] p-1 group cursor-pointer hover:shadow-lg shadow-md ">

                                    <h3 className="text-center text-xs text-black group-hover:text-white font-semibold ">Engine
                                    </h3>
                                </div>




                            </div>
                            {/* <ItemSparepart /> */}

                        </div>

                    </div>
                </div>
            </div>
            <Order />


        </div>
    );
}

export default Service;
