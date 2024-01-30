import React from 'react'
import { BiHomeAlt2 } from 'react-icons/bi';
import { MdOutlineLogout } from 'react-icons/md';
import { LiaToolsSolid } from 'react-icons/lia';
import { RxDashboard } from "react-icons/rx";
import { PiUserCircleLight } from "react-icons/pi";
import { BiTransferAlt } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase/page';
import { MdAttachMoney } from "react-icons/md";

const SidebarSuper = () => {
    const { push } = useRouter();
    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('sign out successful')
            push('/login_admin');
        }

        ).catch(error => console.log(error))
    }
    return (
        <div className='py-7 px-5 w-28 h-screen fixed bg-white z-40 top-0 '>
            <div className='px-2 flex flex-col justify-center items-center mb-10'>
                <img src="assets/images/7.png" alt="" />

            </div>

            <div>
                <a href="/warehouse_admin/homepage">
                    <div className="items-center hover:bg-[#1B24FF] p-1 rounded-md group cursor-pointer hover:shadow-lg mb-3">
                        <RxDashboard className="text-[#595959] group-hover:text-white mx-auto text-4xl" />
                        <p className="text-center text-[#595959] text-xs group-hover:text-white font-semibold ">Home
                        </p>
                    </div>
                </a>
                {/* Menu */}

                <a href="/warehouse_admin/sparepart/sparepartpage">
                    <div className="items-center hover:bg-[#1B24FF] p-1 rounded-md group cursor-pointer hover:shadow-lg mb-3">
                        <LiaToolsSolid className="text-[#595959] group-hover:text-white mx-auto text-4xl" />
                        <h3 className="text-center text-xs text-[#595959] group-hover:text-white font-semibold "> Item
                        </h3>
                    </div>
                </a>
                <a href="/warehouse_admin/transaction">
                    <div className="items-center hover:bg-[#1B24FF] p-1 rounded-md group cursor-pointer hover:shadow-lg mb-3">
                        <BiTransferAlt className="text-[#595959] group-hover:text-white mx-auto text-4xl" />
                        <h3 className="text-center text-xs text-[#595959] group-hover:text-white font-semibold ">Activity
                        </h3>
                    </div>
                </a>
                <a href="/warehouse_admin/user">
                    <div className="items-center hover:bg-[#1B24FF] p-1 rounded-md group cursor-pointer hover:shadow-lg mb-3">
                        <PiUserCircleLight className="text-[#595959] group-hover:text-white mx-auto text-4xl" />
                        <h3 className="text-center text-xs text-[#595959] group-hover:text-white font-semibold ">User
                        </h3>
                    </div>
                </a>
                <a href="/warehouse_admin/user">
                    <div className="items-center hover:bg-[#1B24FF] p-1 rounded-md group cursor-pointer hover:shadow-lg mb-3">
                        <MdAttachMoney className="text-[#595959] group-hover:text-white mx-auto text-4xl" />
                        <h3 className="text-center text-xs text-[#595959] group-hover:text-white font-semibold ">Finance
                        </h3>
                    </div>
                </a>


                <div className='absolute inset-x-0 bottom-7 px-5'>
                    <div onClick={userSignOut}>
                        <div className="items-center hover:bg-[#1B24FF] p-1 rounded-md group cursor-pointer hover:shadow-lg  ">
                            <MdOutlineLogout className="text-[#595959] group-hover:text-white mx-auto text-4xl" />
                            <h3 className="text-center text-xs text-[#595959] group-hover:text-white font-semibold ">Logout
                            </h3>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default SidebarSuper