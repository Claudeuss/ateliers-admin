"use client";
import React from 'react';
import { BiHomeAlt2 } from 'react-icons/bi';
import { MdOutlineLogout } from 'react-icons/md';
import { LiaToolsSolid } from 'react-icons/lia';
import { auth } from '../../lib/firebase/page';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const { push } = useRouter();
    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('sign out successful')
            push('/login_admin');
        }

        ).catch(error => console.log(error))
    }
    return (
        <div className='p-7 w-28 h-screen fixed bg-white z-40 top-0 '>
            <div className='flex flex-col justify-center items-center mb-10'>
                <img src="assets/images/7.png" alt="" />

            </div>

            <div>
                <a href="/">
                    <div className="items-center hover:bg-[#1B24FF] p-1 rounded-md group cursor-pointer hover:shadow-lg mb-3">
                        <BiHomeAlt2 className="text-[#595959] group-hover:text-white mx-auto text-3xl" />
                        <h3 className="text-center text-xs text-[#595959] group-hover:text-white font-semibold ">Home
                        </h3>
                    </div>
                </a>
                {/* Menu */}

                <a href="/service">
                    <div className="items-center hover:bg-[#1B24FF] p-1 rounded-md group cursor-pointer hover:shadow-lg mb-3">
                        <LiaToolsSolid className="text-[#595959] group-hover:text-white mx-auto text-3xl" />
                        <h3 className="text-center text-xs text-[#595959] group-hover:text-white font-semibold ">Service
                        </h3>
                    </div>
                </a>


                <div className='absolute inset-x-0 bottom-7 px-7'>
                    <button onClick={userSignOut}>

                        <div className="items-center hover:bg-[#1B24FF] p-1 rounded-md group cursor-pointer hover:shadow-lg">
                            <MdOutlineLogout className="text-[#595959] group-hover:text-white mx-auto text-3xl" />
                            <h3 className="text-center text-xs text-[#595959] group-hover:text-white font-semibold ">Logout
                            </h3>
                        </div>
                    </button>


                </div>

            </div>

        </div>
    );
}

export default Sidebar;
