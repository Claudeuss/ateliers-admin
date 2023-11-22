"use client";
import ItemService from '@/components/item_service';
import Order from '@/components/order';
import PopupItemService from '@/components/popup_item_service';
import Sidebar from '@/components/sidebar';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import { auth } from '../../../lib/firebase/page';

const Service = () => {
    const { push } = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {

                push('/login_admin');
            }
        });

        return () => unsubscribe();
    }, []);
    const [showDetail, setShowItem] = useState(false);
    // const [showModal, setShowModal] = useState(false);
    return (
        <div>

            <Sidebar />

            <div className='bg-[#EAEAEA] h-screen w-screen'>
                <div className='pl-28 pr-[360px]'>
                    <div className='px-5 py-3'>
                        <div>
                            <h1 className='text-2xl font-semibold'>List Sparepart</h1>
                            <div className='pt-3 grid grid-cols-3
                           
                           
                           
                           gap-3 '>
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
                            <ItemService />

                        </div>

                    </div>
                </div>
            </div>
            <Order />

            <PopupItemService isVisible={showDetail} onClose={() => setShowItem(false)} />
        </div>
    );
}

export default Service;
