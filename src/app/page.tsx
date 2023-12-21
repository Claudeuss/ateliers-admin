"use client";
import ItemSparepart from '@/components/item_sparepart';
import Order from '@/components/order';

import Sidebar from '@/components/sidebar';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

import { Fragment, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase/page';
import SidebarGudang from '@/components/sidebar_gudang';

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {

        push('/login_admin');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Fragment>
      <Sidebar />

      <div className='bg-[#EAEAEA] h-screen w-full'>
        <div className='pl-28 pr-[360px]'>
          <div className='px-5 py-3'>
            <div>
              <h1>Welcome to the Main Page,!</h1>
              <h1 className='text-2xl font-semibold'>List Sparepart</h1>
              <div className='pt-3 grid grid-cols-4 gap-3 '>
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
                <div className="bg-white hover:bg-[#1B24FF] p-1 group cursor-pointer hover:shadow-lg shadow-md ">

                  <h3 className="text-center text-xs text-black group-hover:text-white font-semibold ">Maintenance
                  </h3>
                </div>



              </div>
              <ItemSparepart />

            </div>

          </div>
        </div>
      </div>
      <Order />

    </Fragment>

  );
}


