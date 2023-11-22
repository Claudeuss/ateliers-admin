"use client";
import Order from '@/components/order';
import Sidebar from '@/components/sidebar';

import Carousel from '@/components/Carousel';
import React, { useEffect } from 'react';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../lib/firebase/page';

const Page = () => {
    const { push } = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {

                push('/login_admin');
            }
        });

        return () => unsubscribe();
    }, []);
    let slides = [
        "assets/images/download 6.png",
        "assets/images/download 4.png",
        "assets/images/download 5.png",
        "assets/images/images 3.png"

    ]
    return (
        <>
            <Sidebar />
            <div className='bg-[#EAEAEA] h-screen w-screen'>
                <div className='pl-28 pr-[360px]'>
                    <div className='py-4 px-8'>
                        <button>
                            <a href="/">
                                <BsFillArrowLeftCircleFill />
                            </a>

                        </button>
                        <div className=''>
                            <h1 className='font-semibold text-2xl py-4'>Detail Spareparts</h1>
                            <div className="relative">
                                <div className=" grid grid-cols-2 gap-5 ">
                                    <div className='w-[100%]'>
                                        <Carousel slides={slides} />
                                    </div>
                                    <div className=''>
                                        <h1 className='font-semibold text-3xl'>Akrapovic Exhaust For Kawasaki MK5</h1>
                                        <p className='font-semibold text-lg text-[#3A3A3A] py-2'>Accesories</p>
                                        <div className='bg-white h-7 shadow-sm shadow-slate-500 flex justify-between'>

                                            <div className='bg-[#D9D9D9] h-7 w-[80px]'>
                                                <h1 className='font-semibold text-center text-[#3A3A3A]'>Stock</h1>
                                            </div>
                                            <h1 className='pr-5'>108</h1>

                                        </div>
                                        <div className='my-auto flex items-center py-[7.px]'>
                                            <AiOutlineMinusCircle className='text-[#595959] text-2xl' />
                                            <p className='p-3 text-lg'>23</p>
                                            <AiOutlinePlusCircle className='text-[#595959] text-2xl' />



                                        </div>
                                        <button className="tracking-wider bg-[#1b23ff] text-[#ffffff] py-1   hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full mb-2">
                                            Add

                                        </button>
                                    </div>

                                </div>
                                <div className='py-4'>
                                    <h1 className='text-xl font-semibold'>Description</h1>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim possimus reiciendis eaque officiis? Fugiat, sunt neque doloribus incidunt architecto perspiciatis, autem, provident aliquid consequuntur libero doloremque dolorum! Praesentium error consequuntur debitis nulla voluptates, autem amet ducimus quisquam modi aliquid velit maiores deserunt odio culpa, ab quo repudiandae accusamus vel dicta, rem cumque dolore! Enim reprehenderit quis culpa impedit minima, itaque ducimus mollitia eligendi, quibusdam iusto possimus repellendus doloribus id at necessitatibus. Animi delectus doloribus ipsam doloremque quo fuga officia ex, sequi porro quas quidem corrupti facilis ullam saepe, illum, soluta earum rem voluptatum deleniti. Vel commodi libero velit minima in.quiquidem corrupti facilis ullam saepe, illum</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <Order />
        </>
    );
}

export default Page;
