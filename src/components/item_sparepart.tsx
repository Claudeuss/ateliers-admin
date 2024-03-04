"use client";
import { QuerySnapshot, collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { db } from '../../lib/firebase/page';
const ItemSparepart = ({ onAddToOrder, selectedCategory }: { onAddToOrder?: any; selectedCategory: string | null }) => {
    const [sparepart, setSparepart] = useState<any[]>([]);
    const [filteredSparepart, setFilteredSparepart] = useState<any[]>([]);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const router = useRouter();
    const sparepartCollectionRef = collection(db, "sparepart");

    useEffect(() => {
        const getSparepart = async () => {
            try {
                const data: QuerySnapshot = await getDocs(sparepartCollectionRef);
                setSparepart(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        getSparepart();
    }, [sparepartCollectionRef]);

    useEffect(() => {
        // Apply filter based on selectedCategory
        setFilteredSparepart(
            selectedCategory
                ? sparepart.filter((spares) => spares.category === selectedCategory)
                : sparepart
        );
    }, [selectedCategory, sparepart]);

    const detailClick = async (idd: any) => {
        // Set the service ID in the URL
        router.push(`/detail_sparepart?id=${idd}`);
        // Show the update modal
    };

    return (
        <div className='grid grid-cols-4 gap-3'>
            {filteredSparepart.map((spares) => (
                <div key={spares.id} className='gap-3 pt-3'>
                    <div
                        className='rounded-md bg-white p-2 group cursor-pointer hover:shadow-md shadow-lg '
                        onClick={() => detailClick(spares.id)}
                    >
                        <img className='m-auto h-32 w-32' src={spares.assets} alt='' />
                        <div className='flex justify-between p-2'>
                            <div className='my-auto mx-1 '>
                                <h1 className='font-semibold line-clamp-1'>{spares.name}</h1>
                                <p className='text-[#595959] text-xs font-semibold'>Rp. {spares.price}</p>
                            </div>
                            <AiOutlinePlusCircle className='text-[#595959] text-3xl my-auto' />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemSparepart;