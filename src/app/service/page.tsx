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
    return (
        <div>

            <Sidebar />

            <div className='bg-[#EAEAEA] h-screen w-screen'>
                <div className='pl-28 pr-[360px]'>
                    <div className='px-5 py-3'>
                        <div>
                            <div className='flex justify-between'>
                                <h1 className='text-2xl font-semibold pb-4'>List Sparepart</h1>
                                <button className="tracking-wider bg-black text-[#ffffff] py-1   hover:bg-[#1a1a1a] hover:text-white text-center rounded-md transition-all duration-500 w-[300px] mb-2" onClick={() => setShowItem(true)}>
                                    Service

                                </button>
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
