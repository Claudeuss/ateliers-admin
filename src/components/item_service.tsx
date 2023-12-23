"use client";
import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { QuerySnapshot, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase/page';
import PopupUpdateService from './popup_update_service';
import { useRouter } from 'next/navigation';
const ItemService = () => {
    const [services, setService] = useState<any[]>([]);
    const [selectedService, setSelectedService] = useState<any | null>(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const router = useRouter();
    const serviceCollectionRef = collection(db, "service");
    useEffect(() => {
        const getService = async () => {
            try {
                const data: QuerySnapshot = await getDocs(serviceCollectionRef);
                setService(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        getService();
    }, []);
    const handleUpdateClick = async (idd: any) => {
        // Set the service ID in the URL
        router.push(`/service?id=${idd}`);
        // Show the update modal
        // const docRef = doc(db, "service", idd);
        // const docSnap = await getDoc(docRef);
        // let data: any[] = [];
        // data.push(docSnap.data());
        // setNewServiceid(data[0].serviceid)
        // setNewMototype(data[0].mototype)
        // setNewOwner(data[0].owner)
        // setNewAddress(data[0].address)
        // setNewStatus(data[0].status)
        setShowUpdate(true);
    };
    return (
        <div className='grid grid-cols-3 gap-3 '>

            <div className="bg-white hover:bg-[#1B24FF] py-1 pb-2  group cursor-pointer hover:shadow-lg shadow-md">
                <h3 className="text-center text-xs text-black group-hover:text-white font-semibold ">Not Yet
                </h3>
            </div>
            <div className="bg-white hover:bg-[#1B24FF] p-1 group cursor-pointer hover:shadow-lg  shadow-md">
                <h3 className="text-center text-xs text-black group-hover:text-white font-semibold ">In Process
                </h3>
            </div>
            <div className="bg-white hover:bg-[#1B24FF] p-1 group cursor-pointer hover:shadow-lg shadow-md ">
                <h3 className="text-center text-xs text-black group-hover:text-white font-semibold ">Done
                </h3>
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
