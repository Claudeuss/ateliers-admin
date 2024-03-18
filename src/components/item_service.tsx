'use client';
import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { QuerySnapshot, collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../../lib/firebase/page';
import PopupUpdateService from './popup_update_service';
import { useRouter } from 'next/navigation';

const ItemService = () => {
    const [services, setService] = useState<any[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const router = useRouter();
    const serviceCollectionRef = collection(db, "service");

    useEffect(() => {
        const getService = async () => {
            try {
                let querySnapshot: QuerySnapshot;
                if (selectedStatus) {
                    const q = query(serviceCollectionRef, where('status', '==', selectedStatus));
                    querySnapshot = await getDocs(q);
                } else {
                    querySnapshot = await getDocs(serviceCollectionRef);
                }
                setService(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        getService();
    }, [selectedStatus]);

    const handleUpdateClick = async (idd: any) => {
        router.push(`/service?id=${idd}`);
        setShowUpdate(true);
    };

    return (
        <div className='grid grid-cols-3 gap-3 '>
            <div
                className={`bg-white hover:bg-[#1B24FF] py-1 pb-2 group cursor-pointer hover:shadow-lg shadow-md ${selectedStatus === 'Not Yet' && 'bg-[#1B24FF]'
                    }`}
                onClick={() => setSelectedStatus('Not Yet')}
            >
                <h3 className="text-center text-xs text-black group-hover:text-white font-semibold ">Not Yet</h3>
            </div>
            <div
                className={`bg-white hover:bg-[#1B24FF] p-1 group cursor-pointer hover:shadow-lg shadow-md ${selectedStatus === 'In Process' && 'bg-[#1B24FF]'
                    }`}
                onClick={() => setSelectedStatus('In Process')}
            >
                <h3 className="text-center text-xs text-black group-hover:text-white font-semibold ">In Process</h3>
            </div>
            <div
                className={`bg-white hover:bg-[#1B24FF] p-1 group cursor-pointer hover:shadow-lg shadow-md ${selectedStatus === 'Done' && 'bg-[#1B24FF]'
                    }`}
                onClick={() => setSelectedStatus('Done')}
            >
                <h3 className="text-center text-xs text-black group-hover:text-white font-semibold ">Done</h3>
            </div>
            {
                services.map((service) => (
                    <div key={service.id} className='pt-1'>
                        <div className="rounded-md bg-white p-2 group cursor-pointer hover:shadow-md shadow-lg ">
                            <div className={`m-2 flex justify-between ${service.status === 'Done' ? 'bg-green-500' :
                                service.status === 'In Process' ? 'bg-yellow-500' : 'bg-[#FF0000] '
                                }`}>
                                <h1 className='text-white p-3 py-4  font-semibold'>
                                    {service.status}
                                </h1>
                                <FaRegTrashAlt className='text-white text-3xl my-auto pr-3' />
                            </div>
                            <div className='flex justify-between pb-2 px-2'>
                                <div className='my-auto '>
                                    <p className='text-[#595959] text-md font-semibold'>{service.serviceid}</p>
                                    <h1 className='font-semibold'>{service.mototype}</h1>
                                    <p className='text-[#2d2121] text-md font-semibold'>{service.owner}</p>
                                </div>
                            </div>
                            <div className='mx-2 mb-2'>
                                <button className="w-full place-self-end tracking-wider bg-[#1b23ff] text-[#ffffff] py-2 hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 " onClick={() => handleUpdateClick(service.id)}>
                                    <p className='text-xs'>
                                        Edit
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
            <PopupUpdateService isVisible={showUpdate} onClose={() => setShowUpdate(false)} />
        </div>
    );
}

export default ItemService;
