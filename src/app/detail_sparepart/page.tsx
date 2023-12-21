"use client";
import Order from '@/components/order';
import Sidebar from '@/components/sidebar';

import Carousel from '@/components/Carousel';
import React, { useEffect, useState } from 'react';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';

import { auth, db } from '../../../lib/firebase/page';
import { Firestore, addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

const Page = ({ }) => {
    const [newName, setNewName] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [totalPrice, setTotalPrice] = useState("")
    const [newType, setNewType] = useState("")
    const [newQuantity, setNewQuantity] = useState("")
    const [newAssets, setNewAssets] = useState("")
    const serviceCollectionRef = collection(db, "sparepart")
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const firestoreCollection = collection(db, "orders")
    const router = useRouter();
    const { push } = useRouter();



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {

                push('/login_admin');
            }
        });

        return () => unsubscribe();
    }, []);
    let slides = [
        newAssets[0],
        newAssets[1],
        newAssets[2],


    ]




    useEffect(() => {
        const getService = async (idd: any) => {
            try {
                const docRef = doc(db, "sparepart", idd);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setNewName(data.name);
                    setNewCategory(data.category);
                    setNewPrice(data.price);
                    setNewType(data.type);
                    setNewQuantity(data.quantity);
                    setNewAssets(data.assets);
                    setNewDescription(data.description)

                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        getService(id);
    }, [id]);
    let [count, setCount] = useState(1);
    function incrementCount() {
        count = count + 1;
        setCount(count);
    }
    function decrementCount() {
        if (count > 1) {
            count = count - 1;
            setCount(count);
        }
    }
    const calculatedTotalPrice = parseFloat(newPrice) * count;

    const handleAddToOrder = async () => {
        router.push('/');

        const orderData = {
            sparepart: id,
            name: newName,
            category: newCategory,
            price: newPrice,
            totalprice: calculatedTotalPrice,
            type: newType,
            quantity: count,
            assets: newAssets,
            description: newDescription,
        };

        try {
            // Check if the sparepart quantity is greater than 0
            const sparepartDocRef = doc(db, 'sparepart', id as string);
            const sparepartDoc = await getDoc(sparepartDocRef);

            if (sparepartDoc.exists()) {
                const sparepartQuantity = sparepartDoc.data().quantity;

                if (sparepartQuantity > 0) {
                    // Check if an order with the same sparepart ID already exists
                    const querySnapshot = await getDocs(query(collection(db, 'orders'), where('sparepart', '==', id)));

                    if (querySnapshot.size > 0) {
                        // If the order exists, update the quantity instead of creating a new document
                        const orderDoc = querySnapshot.docs[0];
                        const orderRef = doc(db, 'orders', orderDoc.id);

                        // Increment the quantity by 1
                        await updateDoc(orderRef, {
                            quantity: orderDoc.data().quantity + count,
                            totalprice: orderDoc.data().totalprice + calculatedTotalPrice,
                        });

                        console.log('Quantity updated for existing order with ID:', orderDoc.id);
                    } else {
                        // If the order does not exist, add a new document to the "orders" collection
                        const docRef = await addDoc(collection(db, 'orders'), orderData);
                        console.log('Document written with ID:', docRef.id);
                    }
                } else {
                    // Alert when the sparepart quantity is 0
                    alert('Barang habis. Tidak dapat menambahkan ke pesanan.');
                }
            } else {
                console.error('Sparepart document not found for ID:', id);
            }
        } catch (error) {
            console.error('Error adding/updating document:', error);
        }
    };



    return (
        <>
            <Sidebar />
            <div className='bg-[#EAEAEA] h-screen w-screen'>
                <div className='pl-28 pr-[360px]'>
                    <div className='py-4 px-8'>
                        <button>
                            <a href="/">
                                <BsFillArrowLeftCircleFill />
                            </a>

                        </button>
                        <div className=''>
                            <h1 className='font-semibold text-2xl py-4'>Detail Spareparts</h1>
                            <div className="relative">
                                <div className=" grid grid-cols-2 gap-5 ">
                                    <div className='w-[100%]'>
                                        < Carousel slides={slides} />
                                    </div>
                                    <div className=''>
                                        <h1 className='font-semibold text-3xl'>{newName}</h1>
                                        <p className='font-semibold text-lg text-[#3A3A3A] py-2'>{newCategory}</p>
                                        <div className='bg-white h-7 shadow-sm shadow-slate-500 flex justify-between'>

                                            <div className='bg-[#D9D9D9] h-7 w-[80px]'>
                                                <h1 className='font-semibold text-center text-[#3A3A3A]'>Stock</h1>
                                            </div>
                                            <h1 className='pr-5'>{newQuantity}</h1>

                                        </div>
                                        <div className='my-auto flex items-center py-[7.px]'>
                                            <AiOutlineMinusCircle className='text-[#595959] text-2xl' onClick={decrementCount} />
                                            <p className='p-3 text-lg'>{count}</p>
                                            <AiOutlinePlusCircle className='text-[#595959] text-2xl' onClick={incrementCount} />



                                        </div>
                                        <button onClick={handleAddToOrder} className="tracking-wider bg-[#1b23ff] text-[#ffffff] py-1   hover:bg-[#1b50ff] hover:text-white text-center rounded-md transition-all duration-500 w-full mb-2">
                                            Add

                                        </button>
                                    </div>

                                </div>
                                <div className='py-4'>
                                    <h1 className='text-xl font-semibold'>Description</h1>
                                    <p>{newDescription}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <Order />
        </>
    );
}

export default Page;


