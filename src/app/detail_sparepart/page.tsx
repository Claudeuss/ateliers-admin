import Order from '@/components/order';
import Sidebar from '@/components/sidebar';
import { Carousel } from 'flowbite';
import React from 'react';


const Page = () => {

    return (
        <>
            <Sidebar />
            <div className='bg-[#EAEAEA] h-screen w-screen'>
                <div className='pl-28 pr-[360px]'>
                    <div className="relative">
                        <div className="max-w-lg">

                        </div>
                    </div>
                </div>

            </div>
            <Order />
        </>
    );
}

export default Page;
