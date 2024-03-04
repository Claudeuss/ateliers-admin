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
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredValidator = validator.filter(valid =>
        valid.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <SidebarSuper/>
            <div className='pl-28 w-full h-screen bg-[#eaeaea]'>
                <div className='p-5'>
                    <div className='justify-between flex mb-4'>
                        <h1 className='text-2xl font-semibold'>Validator</h1>
                        <div className='flex w-[400px] h-8 my-auto bg-white gap-2 py-1 px-2 rounded-md shadow-sm shadow-slate-500 items-center'>
                            <BsSearch className='text-slate-700' />
                            <input
                                placeholder='Search Here'
                                type='search'
                                name=''
                                id=''
                                className='w-full border-none outline-none text-base'
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="bg-white drop-shadow-lg overflow-hidden rounded-lg">
                        <table className="w-full">
                            <thead className='bg-[#D9D9D9]'>
                                <tr className='P-4'>
                                    <th className='py-2'>No</th>
                                    <th className='py-2'>Name</th>
                                    <th className='py-2'>Category</th>
                                    <th className='py-2'>Type</th>
                                    <th className='py-2'>Quantity</th>
                                    <th className='py-2'>Price</th>
                                    <th className='py-2'>Validation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredValidator.filter(valid => valid.status !== 'valid').map((valid, index) => (
                                        <tr key={valid.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                            <td className='text-center py-2'>{index + 1}</td>
                                            <td className='py-2'>{valid.name}</td>
                                            <td className='py-2'>{valid.category}</td>
                                            <td className='py-2'>{valid.type}</td>
                                            <td className='text-center py-2'>{valid.quantity}</td>
                                            <td className='text-center py-2'>{valid.price}</td>
                                            <td className='text-center py-2 '>
                                                <button className='focus:outline-none flex items-center justify-center text-blue-700 mx-auto px-4 py-1 rounded-md hover:bg-blue-700 hover:text-white' onClick={() => handleStatusUpdate(valid.id)}>
                                                    <BiEdit className='text-xl mr-1' />
                                                    Edit
                                                </button>
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