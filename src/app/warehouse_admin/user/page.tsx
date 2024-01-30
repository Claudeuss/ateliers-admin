'use client'
import SidebarGudang from '@/components/sidebar_gudang'
import { QuerySnapshot, collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { BsSearch, BsTrash3 } from 'react-icons/bs'
import { db } from '../../../../lib/firebase/page'

const UserPage = () => {
    const [customer, setCustomer] = useState<any[]>([]);
    const itemCollectionRef = collection(db, 'users');

    useEffect(() => {
        const getCart = async () => {
            try {
                const data: QuerySnapshot = await getDocs(itemCollectionRef);
                setCustomer(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error('Error fetching spareparts:', error);
            }
        };

        getCart();
    }, []);
    return (
        <>
            <SidebarGudang />
            <div className=' pl-28 w-full h-screen bg-[#eaeaea]'>
                <div className='p-5'>
                    <div className=' justify-between flex'>
                        <h1 className=' text-2xl font-semibold'>User</h1>
                        <div className='flex w-[400px] h-8 my-auto bg-white gap-2 py-1 px-2 rounded-md shadow-sm shadow-slate-500 items-center'>
                            <BsSearch className=' text-slate-700' />
                            <input placeholder='Search Here' type="search" name="" id="" className=' w-full border-none outline-none text-base' />
                        </div>
                    </div>
                    <div className=' w-full h-[500px] bg-white my-4 rounded-md shadow-md border border-slate-200 shadow-slate-500 '>
                        <table className='table w-full'>
                            <thead>
                                <tr className=' border-b border-slate-500'>
                                    <th className='w-10 py-2'>Id</th>
                                    <th className='w-1/3 py-2'>Name</th>
                                    <th className='w-1/3 py-2'>Address</th>
                                    <th className='w-44 py-2'>Came</th>
                                    <th className='w-52 py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody className=' '>
                                {customer.map((item, index)=>(
                                    <tr className=' border-b' key={item.id}>
                                        <td className='text-center border-r'>{index + 1}</td>
                                        <td className=' text-center border-r px-2'>{item.name}</td>
                                        <td className=' text-center border-r px-2'>{item.adress}</td>
                                        <td className=' text-center border-r'>{item.came}</td>
                                        <td className='px-2 py-2'>
                                            <div className='w-full h-full hover:bg-red-500 hover:text-white py-1 rounded-md'>
                                                <BsTrash3 className='mx-auto text-xl ' />
                                            </div>
                                        </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPage