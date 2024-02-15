/* eslint-disable react/jsx-key */
'use client'
import SidebarGudang from '@/components/sidebar_gudang'
import SidebarSuper from '@/components/sidebar_super'
import { QuerySnapshot, collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { BsSearch, BsTrash3 } from 'react-icons/bs'
import { db } from '../../../../../lib/firebase/page'

const Page = () => {
    
    const usersCollectionRef = collection(db, "sparepart")
    const [validator, setValidator] = useState<any[]>([]); // Replace 'any[]' with the appropriate type for your users

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data: QuerySnapshot = await getDocs(usersCollectionRef);

                // Update the component's state with the fetched data
                setValidator(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        // Call the getUsers function when the component mounts (empty dependency array)
        getUsers();
    }, []);
    const handleStatusUpdate = async (itemId: string) => {
        try {
            // Mengirim permintaan pembaruan ke database untuk mengubah status
            const itemRef = doc(db, 'sparepart', itemId);
            await updateDoc(itemRef, { status: 'valid' });

            // Menyalin data state
            const updatedValidator = [...validator];

            // Mencari item yang diperbarui dan mengubah statusnya menjadi 'valid' di state lokal
            const updatedItemIndex = updatedValidator.findIndex(item => item.id === itemId);
            if (updatedItemIndex !== -1) {
                updatedValidator[updatedItemIndex].status = 'valid';
                setValidator(updatedValidator);
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };
    return (
        <>
            <SidebarSuper/>
            <div className=' pl-28 w-full h-screen bg-[#eaeaea]'>
                <div className='p-5'>
                    <div className=' justify-between flex'>
                        <h1 className=' text-2xl font-semibold'>User</h1>
                        <div className='flex w-[400px] h-8 my-auto bg-white gap-2 py-1 px-2 rounded-md shadow-sm shadow-slate-500 items-center'>
                            <BsSearch className=' text-slate-700' />
                            <input placeholder='Search Here' type="search" name="" id="" className=' w-full border-none outline-none text-base' />
                        </div>
                    </div>
                   <div className="bg-white drop-shadow-lg h-[230px] overflow-y-auto overflow-x-hidden ">

                        <table className="table w-full">
                            <thead className='bg-[#D9D9D9]'>
                                <tr className='P-4'>
                                    <th><p className='w-24 border-r text-center'>No</p></th>
                                    <th className='w-42 border-r text-center'>Name</th>
                                    <th><p className='w-42 border-r text-center'>Category</p></th>
                                    <th><p className='w-42 border-r text-center'>Type</p></th>
                                    <th><p className='w-42 border-r text-center'>Quantity</p></th>
                                    <th><p className='w-42 border-r text-center'>Price</p></th>
                                    <th><p className='w-56 text-center'>Validation</p></th>
                                </tr>
                            </thead>
                            <tbody className='overflow-y-auto overflow-x-hidden h-[60px]'>
                                {validator.map((valid, index) => (
                                    <tr key={valid.id}>
                                        <td><p className='w-24 py-1 text-center border-r'>{index + 1}</p></td>
                                        <td><p className='w-42 py-1 text-center border-r'>{valid.name}</p></td>
                                        <td><p className='w-42 py-1 text-center border-r'>{valid.category}</p></td>
                                        <td><p className='w-42 py-1 text-center border-r'>{valid.type}</p></td>
                                        <td><p className='w-42 py-1 text-center border-r'>{valid.quantity}</p></td>
                                        <td><p className='w-42 py-1 text-center border-r'>{valid.price}</p></td>


                                        <td className='w-56 py-1 text-center'>
                            <div className='w-full hover:bg-blue-800 hover:text-white py-1 rounded-md m-auto' onClick={() => handleStatusUpdate(valid.id)}>
                                <BiEdit className='mx-auto text-xl ' />
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

export default Page