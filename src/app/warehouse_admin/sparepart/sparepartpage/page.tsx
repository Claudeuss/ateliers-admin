'use client'
import Sidebar from '@/components/sidebar'
import SidebarGudang from '@/components/sidebar_gudang'
import Stockitem from '@/components/stockitem'
import { QuerySnapshot, collection, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { BsBoxSeam, BsBoxes, BsTrash3 } from 'react-icons/bs'
import { SlSocialDropbox } from 'react-icons/sl'
import { db } from '../../../../../lib/firebase/page'

const [sparepart, setSparepart] = useState<any[]>([])
const itemCollectionRef = collection(db, 'sparepart')

useEffect(
    () => {
        const getSparepart = async () => {
            try {
                const data: QuerySnapshot = await getDocs(itemCollectionRef);
                setSparepart(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error('Error', error);
            }
        };
        getSparepart();
    }, []
);

const sparepartpage = () => {
    return (
        <>
            <SidebarGudang />
            <div className=' w-screen pl-28 bg-[#EAEAEA]'>
                <div className=' p-5'>
                    <h1 className=' text-2xl font-semibold'>Sparepart</h1>
                    <div className='px-5 py-3'>
                        <div className=' grid grid-cols-3 gap-4 pb-4'>
                            <Stockitem icon={<BsBoxes className=" text-white m-auto text-4xl" />} title={'Total Stock'} total={'1000'} />
                            <Stockitem icon={<BsBoxSeam className=" text-white m-auto text-4xl" />} title={'Low Stock'} total={'100'} />
                            <Stockitem icon={<SlSocialDropbox className=" text-white m-auto text-4xl" />} title={'Empty Stock'} total={'10'} />
                        </div>
                        <div className=' w-full h-[400px] py-2 bg-white rounded-md'>
                            <div className=' flex px-5 justify-between'>
                                <div className='flex gap-5 justify-between'>
                                    <p className=' text-lg font-medium text-[#1b24ff] bg-[#EAEAEA] py-1 px-2 rounded-md'>Sparepart Data</p>
                                    <a href="/warehouse_admin/sparepart/input_spareparts">
                                        <p className=' text-lg font-medium text-black py-1 px-2 rounded-md'>Add Spareparts</p>
                                    </a>
                                </div>
                                <div className=' w-96 py-2 bg-[#EAEAEA] flex rounded-md px-2'>
                                    <BiSearch className=' text-slate-700 text-xl' />
                                    <input type="text" name="search" id="" className=' w-full px-2 bg-transparent border-none outline-none' />
                                </div>
                            </div>
                            <div className=' mt-2'>
                                <table className=' table border-t-2 border-black  w-full'>
                                    <thead className=' border-b'>
                                        <tr>
                                            <th className=' w-10 border-r'>Id</th>
                                            <th className=' w-64 border-r'>Name</th>
                                            <th className=' w-64 border-r'>Price</th>
                                            <th className=' w-56 border-r'>Category</th>
                                            <th className=' w-56 border-r'>Quantity</th>
                                            <th className=' '>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className=' '>

                                        {sparepart.map((item) => (
                                            <tr>
                                                <td className='w-10 py-1 text-center border-b border-r'>1</td>
                                                <td className='w-64 py-1 text-center border-b border-r truncate text-ellipsis line-clamp-1 px-2'>{item.name}</td>
                                                <td className=' w-64 py-1 text-center border-b border-r'>{item.price}</td>
                                                <td className=' w-56 py-1 text-center border-b border-r'>{item.category}</td>
                                                <td className=' w-56 py-1 text-center border-b border-r'>{item.quantity}</td>
                                                <td className=' py-1 text-center border-b'>
                                                    <BsTrash3 className=' text-xl m-auto' />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default sparepartpage