'use client'
import SidebarGudang from '@/components/sidebar_gudang'
import Stockitem from '@/components/stockitem'
import { QuerySnapshot, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { BiEdit, BiSearch } from 'react-icons/bi'
import { BsBoxSeam, BsBoxes, BsTrash3 } from 'react-icons/bs'
import { SlSocialDropbox } from 'react-icons/sl'
import { db } from '../../../../../lib/firebase/page'
import { useRouter } from 'next/navigation'

interface Sparepart {
    id: string;
    name: string;
    price: number;
    category: string;
    quantity: number;
}

const sparepartpage = () => {
    const [spareparts, setSparepart] = useState<any[]>([]);
    const itemCollectionRef = collection(db, 'sparepart')
    const router = useRouter();
    useEffect(
        () => {
            const getSparepart = async () => {
                try {
                    const data: QuerySnapshot = await getDocs(itemCollectionRef);
                    setSparepart(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                } catch (error) {
                    console.error('Error fetching spareparts:', error);
                }
            };

            getSparepart();
        }, []
    );

    // Delete Item Function
    const handleDelete = async (id: string) => {
        console.log('Deleting item with ID:', id);

        try {
            // Delete the document with the specified ID
            await deleteDoc(doc(db, 'sparepart', id));

            // Log after deletion
            console.log('Item deleted. Updating local state.');

            // Update the local state to remove the deleted item
            setSparepart((prevSpareparts) => prevSpareparts.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleUpdateClick = (id: any) => {
        router.push(`/warehouse_admin/sparepart/edit?id=${id}`);
    }

    return (
        <>
            <SidebarGudang />
            <div className=' w-full pl-28 bg-[#EAEAEA] overflow-hidden'>
                <div className=' p-5'>
                    <h1 className=' text-2xl font-semibold'>Sparepart</h1>
                    <div className='px-5 py-3'>
                        <div className=' grid grid-cols-3 gap-4 pb-4'>
                            <Stockitem icon={<BsBoxes className=" text-white m-auto text-4xl" />} title={'Total Stock'} total={spareparts.filter((item) => item.quantity >= 1).length} />
                            <Stockitem icon={<BsBoxSeam className=" text-white m-auto text-4xl" />} title={'Low Stock'} total={spareparts.filter((item) => item.quantity < 10 && item.quantity >= 1).length} />
                            <Stockitem icon={<SlSocialDropbox className=" text-white m-auto text-4xl" />} title={'Empty Stock'} total={spareparts.filter((item) => item.quantity === 0).length} />
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
                            <div className=' mt-2 h-[340px] overflow-y-scroll'>
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
                                    <tbody className=''>

                                        {spareparts.map((item, index) => (
                                            <tr key={item.id} className=''>
                                                <td className='w-10 py-1 text-center border-b border-r'>{index + 1}</td>
                                                <td className='w-64 py-1 text-center border-b border-r overflow-hidden whitespace-nowrap px-2'>{item.name}</td>
                                                <td className=' w-64 py-1 text-center border-b border-r'>{item.price}</td>
                                                <td className=' w-56 py-1 text-center border-b border-r'>{item.category}</td>
                                                <td className=' w-56 py-1 text-center border-b border-r'>{item.quantity}</td>
                                                <td className=' px-2 py-2 border-b flex'>
                                                    <div className='w-full h-full hover:bg-blue-800 hover:text-white py-1 rounded-md'
                                                        onClick={() => handleUpdateClick(item.id)}
                                                    >
                                                        <BiEdit className='mx-auto text-xl ' />
                                                    </div>
                                                    <div className='w-full h-full hover:bg-red-500 hover:text-white py-1 rounded-md'
                                                        onClick={() => handleDelete(item.id)}
                                                    >
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
                </div>
            </div>
        </>

    )
}

export default sparepartpage